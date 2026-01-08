import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from '@/contexts/AuthContext';
import { 
  UserProfile, 
  BizCoins, 
  Streak, 
  DailyChallenge, 
  Lesson, 
  Transaction,
  Reward,
  BusinessType 
} from '@/types/app';
import { initialDailyChallenges, initialLessons, initialRewards } from '@/data/initialData';

interface AppContextType {
  // User
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  completeOnboarding: (name: string, businessType: BusinessType, customType?: string) => void;
  
  // BizCoins
  bizCoins: BizCoins;
  addCoins: (amount: number) => void;
  
  // Streak
  streak: Streak;
  updateStreak: () => void;
  
  // Challenges
  dailyChallenges: DailyChallenge[];
  completeChallenge: (id: string) => void;
  
  // Lessons (hard-coded with user progress)
  lessons: Lesson[];
  updateLessonProgress: (id: string, progress: number) => void;
  completeLesson: (id: string) => void;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  removeTransaction: (id: string) => void;
  getTodaySummary: () => { sales: number; expenses: number; profit: number };
  
  // Rewards
  rewards: Reward[];
  redeemReward: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { userProfile: firebaseUserProfile, currentUser } = useAuth();
  
  // Use Firebase user profile if available, otherwise fallback to localStorage
  const [localUser, setLocalUser] = useLocalStorage<UserProfile | null>('udyam-user', null);
  const user = firebaseUserProfile || localUser;
  
  const setUser = useCallback((newUser: UserProfile | null) => {
    setLocalUser(newUser);
  }, [setLocalUser]);
  const [bizCoins, setBizCoins] = useLocalStorage<BizCoins>('udyam-coins', {
    total: 0,
    earnedToday: 0,
    lastUpdated: new Date().toISOString(),
  });
  const [streak, setStreak] = useLocalStorage<Streak>('udyam-streak', {
    current: 0,
    longest: 0,
    lastActiveDate: '',
  });
  const [dailyChallenges, setDailyChallenges] = useLocalStorage<DailyChallenge[]>(
    'udyam-challenges',
    initialDailyChallenges
  );
  // Hard-coded lessons - always use initial lessons
  const [lessons] = useState<Lesson[]>(initialLessons);
  
  // Store only progress and completion status in localStorage
  const [lessonProgress, setLessonProgress] = useLocalStorage<Record<string, { progress: number; completed: boolean }>>(
    'udyam-lesson-progress',
    {}
  );
  
  // Merge hard-coded lessons with user progress
  const lessonsWithProgress = lessons.map(lesson => ({
    ...lesson,
    progress: lessonProgress[lesson.id]?.progress ?? 0,
    completed: lessonProgress[lesson.id]?.completed ?? false,
  }));
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('udyam-transactions', []);
  const [rewards, setRewards] = useLocalStorage<Reward[]>('udyam-rewards', initialRewards);

  // Reset daily data if it's a new day
  useEffect(() => {
    const today = new Date().toDateString();
    const lastUpdate = new Date(bizCoins.lastUpdated).toDateString();
    
    if (today !== lastUpdate) {
      setBizCoins(prev => ({
        ...prev,
        earnedToday: 0,
        lastUpdated: new Date().toISOString(),
      }));
      setDailyChallenges(initialDailyChallenges);
    }
  }, []);

  const completeOnboarding = useCallback((name: string, businessType: BusinessType, customType?: string) => {
    const newUser: UserProfile = {
      name,
      businessType,
      customBusinessType: customType,
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    // Give welcome bonus
    setBizCoins(prev => ({
      ...prev,
      total: prev.total + 100,
      earnedToday: prev.earnedToday + 100,
    }));
  }, [setUser, setBizCoins]);

  const addCoins = useCallback((amount: number) => {
    setBizCoins(prev => ({
      ...prev,
      total: prev.total + amount,
      earnedToday: prev.earnedToday + amount,
      lastUpdated: new Date().toISOString(),
    }));
  }, [setBizCoins]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    setStreak(prev => {
      if (prev.lastActiveDate === today) return prev;
      
      const newCurrent = prev.lastActiveDate === yesterday ? prev.current + 1 : 1;
      return {
        current: newCurrent,
        longest: Math.max(prev.longest, newCurrent),
        lastActiveDate: today,
      };
    });
  }, [setStreak]);

  const completeChallenge = useCallback((id: string) => {
    setDailyChallenges(prev => 
      prev.map(c => {
        if (c.id === id && !c.completed) {
          addCoins(c.reward);
          return { ...c, completed: true };
        }
        return c;
      })
    );
  }, [setDailyChallenges, addCoins]);

  const updateLessonProgress = useCallback((id: string, progress: number) => {
    setLessonProgress(prev => ({
      ...prev,
      [id]: {
        progress: Math.min(100, progress),
        completed: prev[id]?.completed ?? false,
      },
    }));
  }, [setLessonProgress]);

  const completeLesson = useCallback((id: string) => {
    setLessonProgress(prev => {
      if (prev[id]?.completed) return prev; // Already completed
      
      addCoins(50);
      // Check if this completes the lesson challenge
      const lessonChallenge = dailyChallenges.find(c => c.type === 'lesson' && !c.completed);
      if (lessonChallenge) {
        completeChallenge(lessonChallenge.id);
      }
      
      return {
        ...prev,
        [id]: {
          progress: 100,
          completed: true,
        },
      };
    });
  }, [setLessonProgress, addCoins, dailyChallenges, completeChallenge]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Check if this completes the sales challenge
    if (transaction.type === 'sale') {
      const salesChallenge = dailyChallenges.find(c => c.type === 'sales' && !c.completed);
      if (salesChallenge) {
        completeChallenge(salesChallenge.id);
      }
    }
  }, [setTransactions, dailyChallenges, completeChallenge]);

  const removeTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [setTransactions]);

  const getTodaySummary = useCallback(() => {
    const today = new Date().toDateString();
    const todayTransactions = transactions.filter(
      t => new Date(t.timestamp).toDateString() === today
    );
    
    const sales = todayTransactions
      .filter(t => t.type === 'sale')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = todayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { sales, expenses, profit: sales - expenses };
  }, [transactions]);

  const redeemReward = useCallback((id: string): boolean => {
    const reward = rewards.find(r => r.id === id);
    if (!reward || reward.redeemed || bizCoins.total < reward.cost) {
      return false;
    }
    
    setBizCoins(prev => ({ ...prev, total: prev.total - reward.cost }));
    setRewards(prev => prev.map(r => (r.id === id ? { ...r, redeemed: true } : r)));
    return true;
  }, [rewards, bizCoins.total, setBizCoins, setRewards]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        completeOnboarding,
        bizCoins,
        addCoins,
        streak,
        updateStreak,
        dailyChallenges,
        completeChallenge,
        lessons: lessonsWithProgress,
        updateLessonProgress,
        completeLesson,
        transactions,
        addTransaction,
        removeTransaction,
        getTodaySummary,
        rewards,
        redeemReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
