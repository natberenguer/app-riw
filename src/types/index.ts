export interface Profile {
  id: string;
  name: string;
  age?: number;
  role: string;
  company: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  isOnline?: boolean;
}

export interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  timezone?: string;
  category: string;
  conference: string;
  stage: string;
  format?: string;
  speakerName?: string;
  speakerTitle?: string;
  speakerCompany?: string;
  location?: string;
  description?: string;
  thumbnailUrl?: string;
  tags?: string[];
  isFavorite?: boolean;
  date: Date;
}

export interface Invitation {
  id: string;
  count: number;
}

export interface QuickAccess {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface Match {
  id: string;
  profile: Profile;
  matchedAt: Date;
  lastMessage?: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: Date;
}
