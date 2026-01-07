export type BusinessType = 'vegetables' | 'street-food' | 'handicrafts' | 'services' | 'other';

export interface UserProfile {
  name: string;
  businessType: BusinessType;
  customBusinessType?: string;
  onboardingComplete: boolean;
  createdAt: string;
}

export interface BizCoins {
  total: number;
  earnedToday: number;
  lastUpdated: string;
}

export interface Streak {
  current: number;
  longest: number;
  lastActiveDate: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'lesson' | 'sales' | 'peer' | 'custom';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'basics' | 'sales' | 'digital' | 'marketing' | 'finance';
  thumbnailEmoji: string;
  progress: number; // 0-100
  completed: boolean;
}

export interface Transaction {
  id: string;
  item: string;
  emoji: string;
  amount: number;
  type: 'sale' | 'expense';
  timestamp: string;
}

export interface DailySummary {
  date: string;
  totalSales: number;
  totalExpenses: number;
  profit: number;
  transactionCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'marketing' | 'tools' | 'premium';
  emoji: string;
  redeemed: boolean;
}

export interface AppState {
  user: UserProfile | null;
  bizCoins: BizCoins;
  streak: Streak;
  dailyChallenges: DailyChallenge[];
  lessons: Lesson[];
  transactions: Transaction[];
  rewards: Reward[];
}
