// Mobile configuration and optimizations
export const MOBILE_CONFIG = {
  // Touch target sizes (minimum 44px for accessibility)
  touchTargets: {
    button: '44px',
    link: '44px',
    input: '44px',
    icon: '44px',
  },
  
  // Mobile breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    smallMobile: 480,
  },
  
  // Mobile-optimized spacing
  spacing: {
    mobile: {
      section: '2rem',
      container: '1rem',
      card: '1rem',
      button: '0.75rem',
    },
    desktop: {
      section: '3.5rem',
      container: '1.5rem',
      card: '1.5rem',
      button: '1rem',
    },
  },
  
  // Mobile-optimized text sizes
  typography: {
    mobile: {
      h1: '2rem',
      h2: '1.75rem',
      h3: '1.5rem',
      body: '1rem',
      small: '0.875rem',
    },
    desktop: {
      h1: '3.75rem',
      h2: '3rem',
      h3: '2.25rem',
      body: '1.125rem',
      small: '1rem',
    },
  },
  
  // Mobile performance optimizations
  performance: {
    reducedMotion: true,
    reducedAnimations: true,
    optimizedTransitions: '0.2s',
    lazyLoading: true,
  },
  
  // Mobile navigation
  navigation: {
    mobileMenuBreakpoint: 768,
    stickyHeader: true,
    mobileMenuAnimation: true,
  },
  
  // Mobile forms
  forms: {
    preventZoom: true,
    touchFriendly: true,
    mobileKeyboard: true,
  },
  
  // Mobile images
  images: {
    responsive: true,
    lazyLoading: true,
    webpSupport: true,
    mobileOptimized: true,
  },
};

// Mobile utility functions
export const mobileUtils = {
  // Check if device is mobile
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= MOBILE_CONFIG.breakpoints.mobile;
  },
  
  // Check if device is small mobile
  isSmallMobile: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= MOBILE_CONFIG.breakpoints.smallMobile;
  },
  
  // Check if device is tablet
  isTablet: (): boolean => {
    if (typeof window === 'undefined') return false;
    const width = window.innerWidth;
    return width > MOBILE_CONFIG.breakpoints.mobile && width <= MOBILE_CONFIG.breakpoints.tablet;
  },
  
  // Check if device supports touch
  isTouchDevice: (): boolean => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
  
  // Check if device prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Get mobile-optimized spacing
  getSpacing: (type: keyof typeof MOBILE_CONFIG.spacing.mobile) => {
    return mobileUtils.isMobile() 
      ? MOBILE_CONFIG.spacing.mobile[type] 
      : MOBILE_CONFIG.spacing.desktop[type];
  },
  
  // Get mobile-optimized text size
  getTextSize: (type: keyof typeof MOBILE_CONFIG.typography.mobile) => {
    return mobileUtils.isMobile() 
      ? MOBILE_CONFIG.typography.mobile[type] 
      : MOBILE_CONFIG.typography.desktop[type];
  },
};

export default MOBILE_CONFIG;
