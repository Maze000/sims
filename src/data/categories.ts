export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: string[];
  color: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    icon: '🏥',
    description: 'Health and wellness services',
    color: '#FF6B9D',
    services: [
      'Massage therapists',
      'Physiotherapists',
      'Occupational therapists',
      'Psychologists / Counsellors',
      'Nutritionists / Dietitians',
      'Personal trainers',
      'Yoga / Pilates instructors',
      'Acupuncturists',
      'Chiropractors'
    ]
  },
  {
    id: 'beauty-aesthetics',
    name: 'Beauty & Aesthetics',
    icon: '💄',
    description: 'Beauty and personal care services',
    color: '#FF9F43',
    services: [
      'Hairdressers / Hair stylists',
      'Nail technicians',
      'Makeup artists',
      'Waxing specialists',
      'Barbers',
      'Skincare specialists'
    ]
  },
  {
    id: 'personal-care',
    name: 'Personal Care & Assistance',
    icon: '👶',
    description: 'Personal care and assistance services',
    color: '#10AC84',
    services: [
      'Babysitters',
      'Caregivers',
      'Personal companions',
      'Dog walkers',
      'Pet trainers',
      'Pet sitters'
    ]
  },
  {
    id: 'education-development',
    name: 'Education & Development',
    icon: '📚',
    description: 'Educational and personal development services',
    color: '#5F27CD',
    services: [
      'Private tutors',
      'Language teachers',
      'Music teachers',
      'Art instructors',
      'Life coaches',
      'Professional mentors'
    ]
  },
  {
    id: 'creative-entertainment',
    name: 'Creative Services & Entertainment',
    icon: '🎨',
    description: 'Creative and entertainment services',
    color: '#00D2D3',
    services: [
      'Photographers / Videographers',
      'Graphic designers',
      'DJs / Musicians',
      'Performers',
      'Event coordinators',
      'Models / Talent for casting'
    ]
  },
  {
    id: 'home-practical',
    name: 'Home & Practical Assistance',
    icon: '🏠',
    description: 'Home and practical assistance services',
    color: '#FF6348',
    services: [
      'Personal assistants',
      'Home organisers',
      'House cleaners',
      'Handyman services'
    ]
  },
  {
    id: 'sports-physical',
    name: 'Sports & Physical Activities',
    icon: '⚽',
    description: 'Sports and physical activity services',
    color: '#2ED573',
    services: [
      'Fitness instructors',
      'Sports coaches (tennis, football, swimming, etc.)',
      'Hiking guides',
      'Outdoor activity instructors'
    ]
  },
  {
    id: 'technology-digital',
    name: 'Technology & Digital Support',
    icon: '💻',
    description: 'Technology and digital support services',
    color: '#3742FA',
    services: [
      'Virtual assistants',
      'IT support',
      'Social media managers',
      'Freelance developers'
    ]
  }
];

export const getCategoryById = (id: string): ServiceCategory | undefined => {
  return serviceCategories.find(category => category.id === id);
};

export const getCategoryColor = (id: string): string => {
  const category = getCategoryById(id);
  return category?.color || '#FF6B9D';
};
