import { motion } from 'framer-motion';
import { Flame, BookOpen, TrendingUp, Users, BarChart3, Home, Gift, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export function Dashboard() {
  const { user, bizCoins, streak, dailyChallenges, lessons, getTodaySummary } = useApp();
  const summary = getTodaySummary();
  const completedChallenges = dailyChallenges.filter(c => c.completed).length;
  const inProgressLesson = lessons.find(l => l.progress > 0 && !l.completed);

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/95 backdrop-blur px-4 py-4 safe-top"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-body-sm text-muted-foreground">Good morning,</p>
            <h1 className="font-heading text-h2 text-foreground">{user?.name || 'Friend'} 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1.5">
              <Flame className={cn("h-4 w-4 text-primary", streak.current > 0 && "flame-pulse")} />
              <span className="font-semibold text-body-sm">{streak.current}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1.5">
              <span className="text-lg">🪙</span>
              <span className="font-semibold text-body-sm">{bizCoins.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 px-4 space-y-6">
        {/* Daily Challenge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl gradient-primary p-4 text-white shadow-glow-primary"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-body-sm opacity-90">Daily Challenges</span>
            <span className="font-semibold">{completedChallenges}/{dailyChallenges.length}</span>
          </div>
          <div className="h-2 rounded-full bg-white/30 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(completedChallenges / dailyChallenges.length) * 100}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="mt-2 text-body-sm opacity-90">
            Complete challenges to earn up to {dailyChallenges.reduce((s, c) => s + c.reward, 0)} BizCoins!
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-heading text-h3 text-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: BookOpen, label: 'Learn Today', color: 'primary', emoji: '📚' },
              { icon: TrendingUp, label: 'Track Sales', color: 'secondary', emoji: '💰' },
              { icon: Users, label: 'Ask Mentor', color: 'accent', emoji: '🤝' },
              { icon: BarChart3, label: 'My Progress', color: 'muted', emoji: '📊' },
            ].map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex flex-col items-center gap-2 rounded-xl border-2 border-border bg-card p-4 card-hover"
              >
                <span className="text-3xl">{action.emoji}</span>
                <span className="font-medium text-body-sm text-foreground">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border-2 border-border bg-card p-4"
        >
          <h2 className="font-heading text-h3 text-foreground mb-3">Today's Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-h2 font-heading text-secondary">₹{summary.sales}</p>
              <p className="text-caption text-muted-foreground">Sales</p>
            </div>
            <div>
              <p className="text-h2 font-heading text-destructive">₹{summary.expenses}</p>
              <p className="text-caption text-muted-foreground">Expenses</p>
            </div>
            <div>
              <p className="text-h2 font-heading text-success">₹{summary.profit}</p>
              <p className="text-caption text-muted-foreground">Profit</p>
            </div>
          </div>
        </motion.div>

        {/* Continue Learning */}
        {inProgressLesson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border-2 border-border bg-card p-4"
          >
            <h2 className="font-heading text-h3 text-foreground mb-3">Continue Learning</h2>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl">
                {inProgressLesson.thumbnailEmoji}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{inProgressLesson.title}</p>
                <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${inProgressLesson.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-border bg-background px-4 py-3 safe-bottom">
        {[
          { icon: Home, label: 'Home', active: true },
          { icon: BookOpen, label: 'Learn', active: false },
          { icon: TrendingUp, label: 'Track', active: false },
          { icon: Gift, label: 'Rewards', active: false },
          { icon: User, label: 'Profile', active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1",
              item.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-caption">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
