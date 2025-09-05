const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Membership = require('../models/Membership');
const User = require('../models/User');

// Create Stripe customer and start trial
exports.startTrial = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user already has a membership
    const existingMembership = await Membership.findOne({ userId: req.userId });
    if (existingMembership) {
      return res.status(400).json({ message: 'User already has a membership' });
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      metadata: {
        userId: req.userId.toString()
      }
    });

    // Create membership with trial
    const membership = new Membership({
      userId: req.userId,
      stripeCustomerId: customer.id,
      plan: 'trial',
      status: 'trial'
    });

    await membership.save();

    res.status(201).json({
      message: 'Trial started successfully',
      membership: {
        id: membership._id,
        plan: membership.plan,
        status: membership.status,
        trialEndDate: membership.trialEndDate,
        isInTrial: membership.isInTrial
      }
    });
  } catch (error) {
    console.error('Start trial error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get membership status
exports.getMembershipStatus = async (req, res) => {
  try {
    const membership = await Membership.findOne({ userId: req.userId });
    
    if (!membership) {
      return res.status(404).json({ message: 'No membership found' });
    }

    res.json({
      membership: {
        id: membership._id,
        plan: membership.plan,
        status: membership.status,
        trialStartDate: membership.trialStartDate,
        trialEndDate: membership.trialEndDate,
        subscriptionStartDate: membership.subscriptionStartDate,
        subscriptionEndDate: membership.subscriptionEndDate,
        nextBillingDate: membership.nextBillingDate,
        amount: membership.amount,
        currency: membership.currency,
        isInTrial: membership.isInTrial,
        trialExpired: membership.trialExpired,
        isMembershipActive: membership.isMembershipActive()
      }
    });
  } catch (error) {
    console.error('Get membership status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create subscription after trial
exports.createSubscription = async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    const membership = await Membership.findOne({ userId: req.userId });
    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    if (membership.plan !== 'trial') {
      return res.status(400).json({ message: 'User is not in trial period' });
    }

    if (!membership.trialExpired) {
      return res.status(400).json({ message: 'Trial period has not expired yet' });
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: membership.stripeCustomerId,
    });

    // Set as default payment method
    await stripe.customers.update(membership.stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: membership.stripeCustomerId,
      items: [{ price: process.env.STRIPE_MONTHLY_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Update membership
    membership.stripeSubscriptionId = subscription.id;
    membership.plan = 'monthly';
    membership.status = subscription.status;
    membership.subscriptionStartDate = new Date(subscription.current_period_start * 1000);
    membership.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
    membership.nextBillingDate = new Date(subscription.current_period_end * 1000);
    membership.amount = subscription.items.data[0].price.unit_amount / 100; // Convert from cents
    membership.currency = subscription.currency.toUpperCase();

    await membership.save();

    res.json({
      message: 'Subscription created successfully',
      subscription: {
        id: subscription.id,
        status: subscription.status,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
      }
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const membership = await Membership.findOne({ userId: req.userId });
    if (!membership || !membership.stripeSubscriptionId) {
      return res.status(404).json({ message: 'Active subscription not found' });
    }

    // Cancel at period end
    await stripe.subscriptions.update(membership.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    membership.cancelAtPeriodEnd = true;
    membership.canceledAt = new Date();
    await membership.save();

    res.json({ message: 'Subscription will be canceled at the end of the current period' });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Reactivate subscription
exports.reactivateSubscription = async (req, res) => {
  try {
    const membership = await Membership.findOne({ userId: req.userId });
    if (!membership || !membership.stripeSubscriptionId) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    if (!membership.cancelAtPeriodEnd) {
      return res.status(400).json({ message: 'Subscription is not scheduled for cancellation' });
    }

    // Reactivate subscription
    await stripe.subscriptions.update(membership.stripeSubscriptionId, {
      cancel_at_period_end: false,
    });

    membership.cancelAtPeriodEnd = false;
    membership.canceledAt = undefined;
    await membership.save();

    res.json({ message: 'Subscription reactivated successfully' });
  } catch (error) {
    console.error('Reactivate subscription error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Webhook handler for Stripe events
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

// Handle successful payment
async function handlePaymentSucceeded(invoice) {
  const membership = await Membership.findOne({ 
    stripeCustomerId: invoice.customer 
  });
  
  if (membership) {
    membership.status = 'active';
    membership.subscriptionEndDate = new Date(invoice.period_end * 1000);
    membership.nextBillingDate = new Date(invoice.next_payment_attempt * 1000);
    await membership.save();
  }
}

// Handle failed payment
async function handlePaymentFailed(invoice) {
  const membership = await Membership.findOne({ 
    stripeCustomerId: invoice.customer 
  });
  
  if (membership) {
    membership.status = 'past_due';
    await membership.save();
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription) {
  const membership = await Membership.findOne({ 
    stripeSubscriptionId: subscription.id 
  });
  
  if (membership) {
    membership.status = 'canceled';
    membership.isActive = false;
    await membership.save();
  }
}
