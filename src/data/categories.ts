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
    name: 'Salud y bienestar',
    icon: '🏥',
    description: 'Servicios de salud y bienestar personal',
    color: '#FF6B9D',
    services: [
      'Masajistas',
      'Fisioterapeutas / Kinesiologistas',
      'Terapeutas ocupacionales',
      'Psicólogos / Consejeros',
      'Nutricionistas / Dietistas',
      'Entrenadores personales / Personal trainers',
      'Yoga / Pilates instructors',
      'Acupunturistas',
      'Quiroprácticos'
    ]
  },
  {
    id: 'beauty-aesthetics',
    name: 'Belleza y estética',
    icon: '💄',
    description: 'Servicios de belleza y cuidado personal',
    color: '#FF9F43',
    services: [
      'Estilistas / Hairdressers',
      'Manicuristas / Pedicuristas',
      'Maquilladores / Makeup artists',
      'Depiladores / Waxing specialists',
      'Barberos',
      'Esteticistas / Skin care specialists'
    ]
  },
  {
    id: 'personal-care',
    name: 'Cuidado y asistencia personal',
    icon: '👶',
    description: 'Cuidado personal y asistencia',
    color: '#10AC84',
    services: [
      'Niñeras / Babysitters',
      'Cuidadores de ancianos / Caregivers',
      'Acompañantes personales / Companions',
      'Paseadores de perros / Dog walkers',
      'Entrenadores de mascotas / Pet trainers',
      'Cuidadores de mascotas / Pet sitters'
    ]
  },
  {
    id: 'education-development',
    name: 'Educación y desarrollo',
    icon: '📚',
    description: 'Servicios educativos y de desarrollo personal',
    color: '#5F27CD',
    services: [
      'Tutores / Private tutors',
      'Instructores de idiomas / Language teachers',
      'Clases de música / Music teachers',
      'Clases de arte / Art instructors',
      'Coaching / Life coaches',
      'Mentores profesionales'
    ]
  },
  {
    id: 'creative-entertainment',
    name: 'Servicios creativos y entretenimiento',
    icon: '🎨',
    description: 'Servicios creativos y de entretenimiento',
    color: '#00D2D3',
    services: [
      'Fotógrafos / Videographers',
      'Diseñadores gráficos / Graphic designers',
      'DJs / Músicos',
      'Animadores / Performers',
      'Organizadores de eventos / Event coordinators',
      'Modelos / Talent for casting'
    ]
  },
  {
    id: 'home-practical',
    name: 'Hogar y asistencia práctica',
    icon: '🏠',
    description: 'Servicios para el hogar y asistencia práctica',
    color: '#FF6348',
    services: [
      'Asistentes personales / Personal assistants',
      'Organización de hogar / Home organizers',
      'Limpieza doméstica / House cleaners',
      'Reparaciones menores / Handyman services'
    ]
  },
  {
    id: 'sports-physical',
    name: 'Deportes y actividades físicas',
    icon: '⚽',
    description: 'Servicios deportivos y actividades físicas',
    color: '#2ED573',
    services: [
      'Entrenadores de fitness / Fitness instructors',
      'Entrenadores de deportes específicos (tenis, fútbol, natación…)',
      'Guías de senderismo / Hiking guides',
      'Monitores de actividades al aire libre / Outdoor activity instructors'
    ]
  },
  {
    id: 'technology-digital',
    name: 'Tecnología y soporte digital',
    icon: '💻',
    description: 'Servicios tecnológicos y soporte digital',
    color: '#3742FA',
    services: [
      'Asistentes virtuales / Virtual assistants',
      'Soporte técnico / IT support',
      'Community managers / Social media managers',
      'Desarrolladores freelance / Freelance developers'
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
