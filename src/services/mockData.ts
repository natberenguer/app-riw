import { Profile, Event, QuickAccess, Match, ChatMessage } from '../types';

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Ricardo',
    age: 31,
    role: 'Investor',
    company: 'Ventures VC',
    description: 'Early stage investor focused on LATAM startups. Open to pitch sessions.',
    tags: ['VC', 'STARTUPS', 'SEED'],
    imageUrl: 'https://i.pravatar.cc/300?img=12',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Ana Silva',
    role: 'Product Designer',
    company: 'TechFlow',
    description: 'Designing products that matter. Always open to collaborate.',
    tags: ['DESIGN', 'UX', 'PRODUCT'],
    imageUrl: 'https://i.pravatar.cc/300?img=47',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Carlos Ruiz',
    role: 'CTO',
    company: 'InnovateRio',
    description: 'Tech leader passionate about innovation and scaling startups.',
    tags: ['TECH', 'LEADERSHIP', 'STARTUPS'],
    imageUrl: 'https://i.pravatar.cc/300?img=33',
    isOnline: false,
  },
  {
    id: '4',
    name: 'Marin',
    role: 'Investor',
    company: 'Ventures',
    description: 'Venture capitalist looking for the next unicorn.',
    tags: ['VC', 'INVESTMENT'],
    imageUrl: 'https://i.pravatar.cc/300?img=20',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Julia Santos',
    age: 28,
    role: 'Founder',
    company: 'TechStart',
    description: 'Building the future of fintech in Brazil.',
    tags: ['FINTECH', 'FOUNDER', 'STARTUPS'],
    imageUrl: 'https://i.pravatar.cc/300?img=45',
    isOnline: true,
  },
  {
    id: '6',
    name: 'Pedro Alves',
    age: 35,
    role: 'CEO',
    company: 'Innovation Labs',
    description: 'Serial entrepreneur with 3 successful exits.',
    tags: ['CEO', 'ENTREPRENEUR'],
    imageUrl: 'https://i.pravatar.cc/300?img=15',
    isOnline: false,
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Crossover Day | Abertura Oficial',
    startTime: '09:00',
    endTime: '10:00',
    timezone: 'GMT-6',
    category: 'Keynote',
    conference: 'SXSW EDU',
    stage: 'Main Stage',
    format: 'Talk',
    speakerName: 'Ana Costa',
    speakerTitle: 'Chief Learning Officer',
    speakerCompany: 'Bright Future',
    location: 'Main Stage',
    tags: ['Abertura', 'Educação'],
    date: new Date(2024, 2, 6),
    thumbnailUrl: 'https://picsum.photos/200/200?random=11',
  },
  {
    id: '2',
    title: 'Hands-on: IA aplicada a produtos educacionais',
    startTime: '10:30',
    endTime: '12:00',
    timezone: 'GMT-6',
    category: 'Workshop',
    conference: 'SXSW EDU',
    stage: 'Room 10C',
    format: 'Workshop',
    speakerName: 'Marcos Lima',
    speakerTitle: 'Product Lead',
    speakerCompany: 'LearningX',
    location: 'Room 10C',
    tags: ['IA', 'Produto', 'Educação'],
    date: new Date(2024, 2, 6),
    thumbnailUrl: 'https://picsum.photos/200/200?random=12',
  },
  {
    id: '3',
    title: 'Crossover Mixer | Edu & Tech',
    startTime: '17:00',
    endTime: '19:00',
    timezone: 'GMT-6',
    category: 'Networking',
    conference: 'SXSW EDU',
    stage: 'Brush Square Park',
    format: 'Mixer',
    speakerName: 'Time de curadoria',
    speakerTitle: 'Hosts',
    speakerCompany: 'SXSW EDU',
    location: 'Brush Square Park',
    tags: ['Networking', 'Comunidade'],
    date: new Date(2024, 2, 6),
    thumbnailUrl: 'https://picsum.photos/200/200?random=13',
  },
  {
    id: '4',
    title: 'Keynote: Innovation in Tech',
    startTime: '08:30',
    endTime: '09:30',
    timezone: 'GMT-6',
    category: 'Keynote',
    conference: 'SXSW',
    stage: 'Main Stage',
    format: 'Talk',
    speakerName: 'Julia Martins',
    speakerTitle: 'CEO',
    speakerCompany: 'FutureLab',
    location: 'Main Stage',
    tags: ['Tecnologia', 'Futuro'],
    date: new Date(2024, 2, 7),
    thumbnailUrl: 'https://picsum.photos/200/200?random=14',
  },
  {
    id: '5',
    title: 'Painel: Fintechs na América Latina',
    startTime: '11:00',
    endTime: '12:00',
    timezone: 'GMT-6',
    category: 'Panel',
    conference: 'SXSW',
    stage: 'Conference Hall B',
    format: 'Panel',
    speakerName: 'Ricardo Nunes',
    speakerTitle: 'Head of Banking',
    speakerCompany: 'LatAm Bank',
    location: 'Conference Hall B',
    tags: ['Fintech', 'Investimento'],
    date: new Date(2024, 2, 7),
    thumbnailUrl: 'https://picsum.photos/200/200?random=15',
  },
  {
    id: '6',
    title: 'Workshop: Prototipagem rápida em Figma',
    startTime: '14:00',
    endTime: '15:30',
    timezone: 'GMT-6',
    category: 'Design',
    conference: 'SXSW',
    stage: 'Design Lab',
    format: 'Workshop',
    speakerName: 'Fernanda Araújo',
    speakerTitle: 'Lead Product Designer',
    speakerCompany: 'Craft Studio',
    location: 'Design Lab',
    tags: ['Design', 'Produto'],
    date: new Date(2024, 2, 7),
    thumbnailUrl: 'https://picsum.photos/200/200?random=16',
  },
  {
    id: '7',
    title: 'Manhã: HealthTech pitches',
    startTime: '09:00',
    endTime: '10:30',
    timezone: 'GMT-6',
    category: 'Pitch',
    conference: 'SXSW',
    stage: 'Startup Village',
    format: 'Pitch Session',
    speakerName: 'Curadoria HealthTech',
    speakerTitle: 'Hosts',
    speakerCompany: 'SXSW',
    location: 'Startup Village',
    tags: ['HealthTech', 'Startups'],
    date: new Date(2024, 2, 8),
    thumbnailUrl: 'https://picsum.photos/200/200?random=17',
  },
  {
    id: '8',
    title: 'Fireside: Mobilidade e cidades inteligentes',
    startTime: '13:00',
    endTime: '14:00',
    timezone: 'GMT-6',
    category: 'Fireside',
    conference: 'SXSW',
    stage: 'Urban Future',
    format: 'Fireside Chat',
    speakerName: 'Carla Mendes',
    speakerTitle: 'Head of Mobility',
    speakerCompany: 'MoveNow',
    location: 'Urban Future',
    tags: ['Mobilidade', 'Sustentabilidade'],
    date: new Date(2024, 2, 8),
    thumbnailUrl: 'https://picsum.photos/200/200?random=18',
  },
  {
    id: '9',
    title: 'Masterclass: Construindo marketplaces resilientes',
    startTime: '15:30',
    endTime: '17:00',
    timezone: 'GMT-6',
    category: 'Business',
    conference: 'SXSW',
    stage: 'Product Stage',
    format: 'Masterclass',
    speakerName: 'Eduardo Prado',
    speakerTitle: 'COO',
    speakerCompany: 'MarketFlow',
    location: 'Product Stage',
    tags: ['Marketplace', 'Operações'],
    date: new Date(2024, 2, 8),
    thumbnailUrl: 'https://picsum.photos/200/200?random=19',
  },
  {
    id: '10',
    title: 'Closing Keynote: Designing for Impact',
    startTime: '16:00',
    endTime: '17:00',
    timezone: 'GMT-6',
    category: 'Keynote',
    conference: 'SXSW',
    stage: 'Main Stage',
    format: 'Talk',
    speakerName: 'Laura Bittencourt',
    speakerTitle: 'Chief Experience Officer',
    speakerCompany: 'Impact Co.',
    location: 'Main Stage',
    tags: ['Impacto', 'Design'],
    date: new Date(2024, 2, 9),
    thumbnailUrl: 'https://picsum.photos/200/200?random=20',
  },
];

export let mockFavoriteEventIds: string[] = [];

export const mockQuickAccess: QuickAccess[] = [
  {
    id: '1',
    label: 'My schedule',
    icon: 'calendar-outline',
    color: '#007AFF',
  },
  {
    id: '2',
    label: 'My ticket',
    icon: 'receipt-outline',
    color: '#AF52DE',
  },
  {
    id: '3',
    label: 'Live now',
    icon: 'videocam-outline',
    color: '#FF3B30',
  },
  {
    id: '4',
    label: 'Essentials',
    icon: 'restaurant-outline',
    color: '#FF9500',
  },
  {
    id: '5',
    label: 'Night Summit',
    icon: 'moon-outline',
    color: '#5856D6',
  },
];

export const mockInvitations = {
  count: 2,
};

// Mock data para matches e likes
export let mockMatches: Match[] = [];
export let mockLikes: string[] = []; // IDs de perfis que o usuário deu like

export const getAllEvents = (): Event[] =>
  mockEvents.map((event) => ({
    ...event,
    isFavorite: mockFavoriteEventIds.includes(event.id),
  }));

export const toggleFavoriteEvent = (eventId: string): Event[] => {
  if (mockFavoriteEventIds.includes(eventId)) {
    mockFavoriteEventIds = mockFavoriteEventIds.filter((id) => id !== eventId);
  } else {
    mockFavoriteEventIds = [...mockFavoriteEventIds, eventId];
  }
  return getAllEvents();
};

export const getEventsByDate = (date: Date): Event[] => {
  return getAllEvents().filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  );
};

export const getRecommendedAttendees = (): Profile[] => {
  return mockProfiles.filter((p) => p.id !== '1').slice(0, 3);
};

export const addLike = (profileId: string): boolean => {
  if (!mockLikes.includes(profileId)) {
    mockLikes.push(profileId);
    // Simular match (se o perfil também deu like no usuário atual)
    // Por enquanto, vamos simular que alguns perfis já deram like
    const mutualLikes = ['2', '5']; // Ana e Julia já deram like
    if (mutualLikes.includes(profileId)) {
      const profile = mockProfiles.find((p) => p.id === profileId);
      if (profile) {
        const match: Match = {
          id: `match-${profileId}`,
          profile,
          matchedAt: new Date(),
          unreadCount: 0,
        };
        mockMatches.push(match);
        return true; // Match!
      }
    }
  }
  return false; // Apenas like, sem match
};

export const getMatches = (): Match[] => {
  return mockMatches;
};

export const getChatMessages = (matchId: string): ChatMessage[] => {
  // Mock messages
  return [];
};
