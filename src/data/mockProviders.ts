import { serviceCategories } from './categories';

export interface Service {
  name: string;
  price: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  specialization: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  available: boolean;
  experience: string;
  languages: string[];
  description: string;
  services: Service[];
  profileCompleteness: number;
  certifications: number;
  yearsExperience: number;
}

// Function to calculate Profile Score based on various factors
const calculateProfileScore = (
  profileCompleteness: number,
  certifications: number,
  yearsExperience: number,
  servicesCount: number,
  languagesCount: number
): number => {
  // Base score from profile completeness (0-3 points) - 100% = 3 stars max
  const completenessScore = (profileCompleteness / 100) * 3;
  
  // Certifications bonus (0-1 point)
  const certificationScore = Math.min(certifications * 0.2, 1);
  
  // Experience bonus (0-1 point)
  const experienceScore = Math.min(yearsExperience * 0.1, 1);
  
  // Services variety bonus (0-0.5 points)
  const servicesScore = Math.min(servicesCount * 0.1, 0.5);
  
  // Languages bonus (0-0.5 points)
  const languagesScore = Math.min(languagesCount * 0.1, 0.5);
  
  const totalScore = completenessScore + certificationScore + experienceScore + servicesScore + languagesScore;
  
  // Round to 1 decimal place and ensure it's between 1.0 and 5.0
  return Math.max(1.0, Math.min(5.0, Math.round(totalScore * 10) / 10));
};

export const mockProviders: ServiceProvider[] = [
  // Health and Wellness
  {
    id: '1',
    name: 'Sarah Mitchell',
    specialization: 'Personal Trainer',
    category: 'health-wellness',
    location: 'Auckland Central',
    rating: 4.2,
    reviews: 127,
    price: '80',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '8 years',
    languages: ['English', 'Spanish'],
    description: 'Certified personal trainer specializing in strength training and weight loss.',
    services: [
      { name: 'Personal Training', price: 80 },
      { name: 'Nutrition Coaching', price: 60 },
      { name: 'Group Classes', price: 45 }
    ],
    profileCompleteness: 95,
    certifications: 3,
    yearsExperience: 8
  },
  {
    id: '2',
    name: 'David Chen',
    specialization: 'Yoga Instructor',
    category: 'health-wellness',
    location: 'Wellington CBD',
    rating: 4.6,
    reviews: 89,
    price: '95',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '12 years',
    languages: ['English', 'Mandarin'],
    description: 'Experienced yoga instructor with focus on mindfulness and flexibility.',
    services: [
      { name: 'Hatha Yoga', price: 95 },
      { name: 'Vinyasa Flow', price: 85 },
      { name: 'Meditation Classes', price: 70 }
    ],
    profileCompleteness: 98,
    certifications: 4,
    yearsExperience: 12
  },
  {
    id: '3',
    name: 'Sarah Thompson',
    specialization: 'Nutritionist',
    category: 'health-wellness',
    location: 'Christchurch',
    rating: 3.8,
    reviews: 156,
    price: '75',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: false,
    experience: '5 years',
    languages: ['English'],
    description: 'Registered nutritionist helping clients achieve their health goals.',
    services: [
      { name: 'Meal Planning', price: 75 },
      { name: 'Diet Analysis', price: 60 },
      { name: 'Weight Management', price: 85 }
    ],
    profileCompleteness: 85,
    certifications: 2,
    yearsExperience: 5
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    specialization: 'Physiotherapist',
    category: 'health-wellness',
    location: 'Hamilton',
    rating: 4.4,
    reviews: 98,
    price: '85',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '10 years',
    languages: ['English', 'Spanish'],
    description: 'Licensed physiotherapist specializing in sports injuries and rehabilitation.',
    services: [
      { name: 'Injury Treatment', price: 85 },
      { name: 'Rehabilitation', price: 75 },
      { name: 'Sports Therapy', price: 95 }
    ],
    profileCompleteness: 92,
    certifications: 3,
    yearsExperience: 10
  },
  {
    id: '5',
    name: 'Emma Wilson',
    specialization: 'Massage Therapist',
    category: 'health-wellness',
    location: 'Tauranga',
    rating: 4.8,
    reviews: 203,
    price: '90',
    image: 'https://images.unsplash.com/photo-1594824377892-c34d0b0b5b5b?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '15 years',
    languages: ['English', 'French'],
    description: 'Professional massage therapist with expertise in therapeutic and relaxation massage.',
    services: [
      { name: 'Swedish Massage', price: 90 },
      { name: 'Deep Tissue', price: 110 },
      { name: 'Hot Stone Therapy', price: 130 }
    ],
    profileCompleteness: 100,
    certifications: 4,
    yearsExperience: 15
  },

  // Beauty and Aesthetics
  {
    id: '6',
    name: 'Lisa Park',
    specialization: 'Hair Stylist',
    category: 'beauty-aesthetics',
    location: 'Auckland Central',
    rating: 4.1,
    reviews: 145,
    price: '65',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '7 years',
    languages: ['English', 'Korean'],
    description: 'Creative hair stylist specializing in modern cuts and coloring techniques.',
    services: [
      { name: 'Haircuts', price: 65 },
      { name: 'Coloring', price: 120 },
      { name: 'Styling', price: 45 },
      { name: 'Extensions', price: 200 }
    ],
    profileCompleteness: 88,
    certifications: 2,
    yearsExperience: 7
  },
  {
    id: '7',
    name: 'James Brown',
    specialization: 'Barber',
    category: 'beauty-aesthetics',
    location: 'Dunedin',
    rating: 3.2,
    reviews: 67,
    price: '70',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '6 years',
    languages: ['English'],
    description: 'Traditional barber with modern techniques for men\'s grooming.',
    services: [
      { name: 'Haircuts', price: 70 },
      { name: 'Beard Trimming', price: 30 },
      { name: 'Shaves', price: 40 },
      { name: 'Styling', price: 25 }
    ],
    profileCompleteness: 75,
    certifications: 1,
    yearsExperience: 6
  },
  {
    id: '8',
    name: 'Sophie Martinez',
    specialization: 'Makeup Artist',
    category: 'beauty-aesthetics',
    location: 'Wellington CBD',
    rating: 4.5,
    reviews: 89,
    price: '120',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '8 years',
    languages: ['English', 'Spanish'],
    description: 'Professional makeup artist for special events and photoshoots.',
    services: [
      { name: 'Wedding Makeup', price: 120 },
      { name: 'Event Makeup', price: 80 },
      { name: 'Photoshoot Makeup', price: 100 },
      { name: 'Lessons', price: 60 }
    ],
    profileCompleteness: 95,
    certifications: 3,
    yearsExperience: 8
  },
  {
    id: '9',
    name: 'Alex Johnson',
    specialization: 'Nail Technician',
    category: 'beauty-aesthetics',
    location: 'Christchurch',
    rating: 3.6,
    reviews: 112,
    price: '55',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '4 years',
    languages: ['English'],
    description: 'Skilled nail technician offering manicures, pedicures, and nail art.',
    services: [
      { name: 'Manicures', price: 55 },
      { name: 'Pedicures', price: 65 },
      { name: 'Nail Art', price: 45 },
      { name: 'Gel Extensions', price: 85 }
    ],
    profileCompleteness: 82,
    certifications: 2,
    yearsExperience: 4
  },

  // Education and Development
  {
    id: '10',
    name: 'Dr. Rachel Green',
    specialization: 'Math Tutor',
    category: 'education-development',
    location: 'Auckland Central',
    rating: 4.9,
    reviews: 156,
    price: '60',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '12 years',
    languages: ['English'],
    description: 'Mathematics tutor specializing in high school and university level math.',
    services: [
      { name: 'Algebra', price: 60 },
      { name: 'Calculus', price: 70 },
      { name: 'Statistics', price: 65 },
      { name: 'Test Prep', price: 80 }
    ],
    profileCompleteness: 100,
    certifications: 5,
    yearsExperience: 12
  },
  {
    id: '11',
    name: 'Tom Anderson',
    specialization: 'Guitar Teacher',
    category: 'education-development',
    location: 'Hamilton',
    rating: 4.3,
    reviews: 78,
    price: '45',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '10 years',
    languages: ['English'],
    description: 'Professional guitarist offering lessons for all skill levels.',
    services: [
      { name: 'Acoustic Guitar', price: 45 },
      { name: 'Electric Guitar', price: 50 },
      { name: 'Music Theory', price: 40 },
      { name: 'Songwriting', price: 55 }
    ],
    profileCompleteness: 90,
    certifications: 2,
    yearsExperience: 10
  },
  {
    id: '12',
    name: 'Anna Lee',
    specialization: 'English Teacher',
    category: 'education-development',
    location: 'Wellington CBD',
    rating: 4.0,
    reviews: 134,
    price: '50',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '8 years',
    languages: ['English', 'Mandarin'],
    description: 'ESL teacher helping students improve their English language skills.',
    services: [
      { name: 'Conversation Practice', price: 50 },
      { name: 'Grammar', price: 45 },
      { name: 'Writing', price: 55 },
      { name: 'IELTS Prep', price: 60 }
    ],
    profileCompleteness: 87,
    certifications: 3,
    yearsExperience: 8
  },
  {
    id: '13',
    name: 'Mark Davis',
    specialization: 'Life Coach',
    category: 'education-development',
    location: 'Tauranga',
    rating: 4.4,
    reviews: 92,
    price: '100',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '6 years',
    languages: ['English'],
    description: 'Certified life coach helping clients achieve personal and professional goals.',
    services: [
      { name: 'Goal Setting', price: 100 },
      { name: 'Career Coaching', price: 120 },
      { name: 'Personal Development', price: 90 },
      { name: 'Motivation', price: 80 }
    ],
    profileCompleteness: 93,
    certifications: 4,
    yearsExperience: 6
  },

  // Creative Services
  {
    id: '14',
    name: 'Jessica Wong',
    specialization: 'Photographer',
    category: 'creative-entertainment',
    location: 'Auckland Central',
    rating: 4.7,
    reviews: 167,
    price: '200',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '9 years',
    languages: ['English', 'Cantonese'],
    description: 'Professional photographer specializing in portraits and events.',
    services: [
      { name: 'Portrait Photography', price: 200 },
      { name: 'Wedding Photography', price: 300 },
      { name: 'Event Photography', price: 150 },
      { name: 'Photo Editing', price: 80 }
    ],
    profileCompleteness: 96,
    certifications: 3,
    yearsExperience: 9
  },
  {
    id: '15',
    name: 'Ryan Murphy',
    specialization: 'Graphic Designer',
    category: 'creative-entertainment',
    location: 'Christchurch',
    rating: 3.9,
    reviews: 89,
    price: '80',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '7 years',
    languages: ['English'],
    description: 'Creative graphic designer with expertise in branding and digital design.',
    services: [
      { name: 'Logo Design', price: 80 },
      { name: 'Branding', price: 150 },
      { name: 'Web Design', price: 200 },
      { name: 'Print Design', price: 100 }
    ],
    profileCompleteness: 89,
    certifications: 2,
    yearsExperience: 7
  },
  {
    id: '16',
    name: 'Maya Patel',
    specialization: 'DJ',
    category: 'creative-entertainment',
    location: 'Wellington CBD',
    rating: 3.7,
    reviews: 45,
    price: '150',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '5 years',
    languages: ['English', 'Hindi'],
    description: 'Professional DJ for weddings, parties, and corporate events.',
    services: [
      { name: 'Wedding DJ', price: 150 },
      { name: 'Party DJ', price: 120 },
      { name: 'Corporate Events', price: 200 },
      { name: 'Music Mixing', price: 100 }
    ],
    profileCompleteness: 84,
    certifications: 2,
    yearsExperience: 5
  },

  // Personal Care
  {
    id: '17',
    name: 'Jennifer Taylor',
    specialization: 'Babysitter',
    category: 'personal-care',
    location: 'Auckland Central',
    rating: 4.2,
    reviews: 78,
    price: '25',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '6 years',
    languages: ['English'],
    description: 'Experienced babysitter with first aid certification and child development knowledge.',
    services: [
      { name: 'Childcare', price: 25 },
      { name: 'Homework Help', price: 20 },
      { name: 'Meal Preparation', price: 15 },
      { name: 'Bedtime Routine', price: 18 }
    ],
    profileCompleteness: 91,
    certifications: 2,
    yearsExperience: 6
  },
  {
    id: '18',
    name: 'Robert Kim',
    specialization: 'Pet Sitter',
    category: 'personal-care',
    location: 'Hamilton',
    rating: 3.4,
    reviews: 56,
    price: '30',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '4 years',
    languages: ['English', 'Korean'],
    description: 'Animal lover providing pet sitting and dog walking services.',
    services: [
      { name: 'Pet Sitting', price: 30 },
      { name: 'Dog Walking', price: 25 },
      { name: 'Pet Feeding', price: 20 },
      { name: 'Pet Grooming', price: 40 }
    ],
    profileCompleteness: 78,
    certifications: 1,
    yearsExperience: 4
  },
  {
    id: '19',
    name: 'Linda Chen',
    specialization: 'Elderly Care',
    category: 'personal-care',
    location: 'Tauranga',
    rating: 4.6,
    reviews: 89,
    price: '35',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '8 years',
    languages: ['English', 'Mandarin'],
    description: 'Compassionate caregiver specializing in elderly care and companionship.',
    services: [
      { name: 'Personal Care', price: 35 },
      { name: 'Medication Reminders', price: 25 },
      { name: 'Companionship', price: 20 },
      { name: 'Light Housekeeping', price: 30 }
    ],
    profileCompleteness: 94,
    certifications: 3,
    yearsExperience: 8
  },

  // Home and Practical
  {
    id: '20',
    name: 'Carlos Mendez',
    specialization: 'House Cleaner',
    category: 'home-practical',
    location: 'Wellington CBD',
    rating: 3.8,
    reviews: 123,
    price: '40',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '5 years',
    languages: ['English', 'Spanish'],
    description: 'Professional house cleaner with eco-friendly cleaning products.',
    services: [
      { name: 'Regular Cleaning', price: 40 },
      { name: 'Deep Cleaning', price: 80 },
      { name: 'Move-in/Move-out', price: 120 },
      { name: 'Window Cleaning', price: 60 }
    ],
    profileCompleteness: 83,
    certifications: 2,
    yearsExperience: 5
  },
  {
    id: '21',
    name: 'Sarah Johnson',
    specialization: 'Home Organizer',
    category: 'home-practical',
    location: 'Christchurch',
    rating: 3.5,
    reviews: 67,
    price: '60',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '3 years',
    languages: ['English'],
    description: 'Professional organizer helping clients declutter and organize their homes.',
    services: [
      { name: 'Home Organization', price: 60 },
      { name: 'Closet Organization', price: 45 },
      { name: 'Office Organization', price: 50 },
      { name: 'Decluttering', price: 40 }
    ],
    profileCompleteness: 86,
    certifications: 2,
    yearsExperience: 3
  },
  {
    id: '22',
    name: 'Mike Wilson',
    specialization: 'Handyman',
    category: 'home-practical',
    location: 'Dunedin',
    rating: 4.1,
    reviews: 94,
    price: '50',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '10 years',
    languages: ['English'],
    description: 'Skilled handyman for home repairs and maintenance tasks.',
    services: [
      { name: 'Furniture Assembly', price: 50 },
      { name: 'Minor Repairs', price: 40 },
      { name: 'Painting', price: 60 },
      { name: 'Plumbing', price: 80 }
    ],
    profileCompleteness: 88,
    certifications: 2,
    yearsExperience: 10
  },

  // Sports and Physical
  {
    id: '23',
    name: 'Alex Thompson',
    specialization: 'Tennis Coach',
    category: 'sports-physical',
    location: 'Auckland Central',
    rating: 4.5,
    reviews: 78,
    price: '70',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '8 years',
    languages: ['English'],
    description: 'Professional tennis coach for all skill levels and ages.',
    services: [
      { name: 'Private Lessons', price: 70 },
      { name: 'Group Lessons', price: 45 },
      { name: 'Tennis Clinics', price: 60 },
      { name: 'Match Coaching', price: 80 }
    ],
    profileCompleteness: 92,
    certifications: 3,
    yearsExperience: 8
  },
  {
    id: '24',
    name: 'Emma Davis',
    specialization: 'Swimming Instructor',
    category: 'sports-physical',
    location: 'Hamilton',
    rating: 4.3,
    reviews: 112,
    price: '55',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '6 years',
    languages: ['English'],
    description: 'Certified swimming instructor for children and adults.',
    services: [
      { name: 'Learn to Swim', price: 55 },
      { name: 'Stroke Correction', price: 60 },
      { name: 'Water Safety', price: 50 },
      { name: 'Competitive Swimming', price: 70 }
    ],
    profileCompleteness: 90,
    certifications: 3,
    yearsExperience: 6
  },
  {
    id: '25',
    name: 'Jake Miller',
    specialization: 'Hiking Guide',
    category: 'sports-physical',
    location: 'Queenstown',
    rating: 4.4,
    reviews: 45,
    price: '120',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '7 years',
    languages: ['English'],
    description: 'Experienced hiking guide for New Zealand\'s beautiful trails.',
    services: [
      { name: 'Day Hikes', price: 120 },
      { name: 'Multi-day Treks', price: 200 },
      { name: 'Mountain Climbing', price: 250 },
      { name: 'Nature Tours', price: 100 }
    ],
    profileCompleteness: 93,
    certifications: 3,
    yearsExperience: 7
  },

  // Technology and Digital
  {
    id: '26',
    name: 'Daniel Park',
    specialization: 'IT Support',
    category: 'technology-digital',
    location: 'Wellington CBD',
    rating: 4.2,
    reviews: 89,
    price: '80',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '9 years',
    languages: ['English', 'Korean'],
    description: 'Professional IT support specialist for home and business computers.',
    services: [
      { name: 'Computer Repair', price: 80 },
      { name: 'Software Installation', price: 60 },
      { name: 'Network Setup', price: 100 },
      { name: 'Data Recovery', price: 120 }
    ],
    profileCompleteness: 89,
    certifications: 3,
    yearsExperience: 9
  },
  {
    id: '27',
    name: 'Rachel Brown',
    specialization: 'Social Media Manager',
    category: 'technology-digital',
    location: 'Auckland Central',
    rating: 3.9,
    reviews: 67,
    price: '90',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '5 years',
    languages: ['English'],
    description: 'Social media expert helping businesses grow their online presence.',
    services: [
      { name: 'Content Creation', price: 90 },
      { name: 'Social Media Strategy', price: 120 },
      { name: 'Community Management', price: 80 },
      { name: 'Analytics', price: 100 }
    ],
    profileCompleteness: 87,
    certifications: 2,
    yearsExperience: 5
  },
  {
    id: '28',
    name: 'Kevin Lee',
    specialization: 'Web Developer',
    category: 'technology-digital',
    location: 'Christchurch',
    rating: 4.8,
    reviews: 134,
    price: '100',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '8 years',
    languages: ['English', 'Mandarin'],
    description: 'Full-stack web developer creating modern, responsive websites.',
    services: [
      { name: 'Website Development', price: 100 },
      { name: 'E-commerce', price: 150 },
      { name: 'Web Applications', price: 200 },
      { name: 'SEO Optimization', price: 80 }
    ],
    profileCompleteness: 95,
    certifications: 4,
    yearsExperience: 8
  },
  {
    id: '29',
    name: 'Amanda White',
    specialization: 'Virtual Assistant',
    category: 'technology-digital',
    location: 'Tauranga',
    rating: 3.7,
    reviews: 56,
    price: '35',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '4 years',
    languages: ['English'],
    description: 'Efficient virtual assistant providing administrative and creative support.',
    services: [
      { name: 'Email Management', price: 35 },
      { name: 'Scheduling', price: 30 },
      { name: 'Data Entry', price: 25 },
      { name: 'Research', price: 40 }
    ],
    profileCompleteness: 85,
    certifications: 2,
    yearsExperience: 4
  },
  {
    id: '30',
    name: 'Chris Anderson',
    specialization: 'Digital Marketing',
    category: 'technology-digital',
    location: 'Dunedin',
    rating: 4.0,
    reviews: 78,
    price: '85',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    experience: '6 years',
    languages: ['English'],
    description: 'Digital marketing specialist helping businesses reach their target audience.',
    services: [
      { name: 'Google Ads', price: 85 },
      { name: 'Facebook Marketing', price: 90 },
      { name: 'Email Marketing', price: 70 },
      { name: 'Analytics', price: 80 }
    ],
    profileCompleteness: 88,
    certifications: 3,
    yearsExperience: 6
  }
];
