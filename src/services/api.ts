import { Profile, Event, Match, ChatMessage } from '../types';
import {
  mockProfiles,
  getAllEvents,
  getEventsByDate,
  getRecommendedAttendees,
  addLike,
  getMatches,
  getChatMessages,
  toggleFavoriteEvent,
} from './mockData';

// Estrutura preparada para substituição por chamadas HTTP reais
// Por enquanto, retorna dados mockados

export const api = {
  // Profiles
  getProfiles: async (): Promise<Profile[]> => {
    // TODO: Substituir por chamada HTTP real
    // return fetch('/api/profiles').then(res => res.json());
    return Promise.resolve(mockProfiles);
  },

  getRecommendedAttendees: async (): Promise<Profile[]> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(getRecommendedAttendees());
  },

  // Events
  getEvents: async (): Promise<Event[]> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(getAllEvents());
  },

  getEventsByDate: async (date: Date): Promise<Event[]> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(getEventsByDate(date));
  },

  toggleFavoriteEvent: async (eventId: string): Promise<Event[]> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(toggleFavoriteEvent(eventId));
  },

  // Invitations
  getInvitationCount: async (): Promise<number> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(2);
  },

  // Matchmaking
  likeProfile: async (profileId: string): Promise<boolean> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(addLike(profileId));
  },

  getMatches: async (): Promise<Match[]> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(getMatches());
  },

  // Chat
  getChatMessages: async (matchId: string): Promise<ChatMessage[]> => {
    // TODO: Substituir por chamada HTTP real
    return Promise.resolve(getChatMessages(matchId));
  },
};
