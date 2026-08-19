import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Users, BarChart3, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, bizCoins, dailyChallenges, lessons, getTodaySummary } = useApp();
  const summary = getTodaySummary();
  const completedChallenges = dailyChallenges.filter(c => c.completed).length;
  const inProgressLesson = lessons.find(l => l.progress > 0 && !l.completed);
  const totalReward = dailyChallenges.reduce((s, c) => s + c.reward, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mesh-gradient bg-dot-grid rounded-2xl border p-6 shadow-soft"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-semibold">
              Good morning, {user?.name || 'Friend'} 👋
            </h2>
            <p className="text-muted-foreground mt-1">
              Ready to grow your business today?
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="surface-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                <TrendingUp className="h-4 w-4 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">₹{summary.sales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total sales today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="surface-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                <TrendingUp className="h-4 w-4 rotate-180 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">₹{summary.expenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total expenses today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="surface-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                <BarChart3 className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{summary.profit.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Net profit today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="surface-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BizCoins</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                <span className="text-lg">🪙</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bizCoins.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total coins earned</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Daily Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="gradient-primary text-white border-0 shadow-glow-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Daily Challenges</CardTitle>
              <span className="text-sm font-semibold">
                {completedChallenges}/{dailyChallenges.length}
              </span>
            </div>
            <CardDescription className="text-white/90">
              Complete challenges to earn up to {totalReward} BizCoins!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(completedChallenges / dailyChallenges.length) * 100} 
              className="h-2 bg-white/30"
            />
            <Button asChild variant="secondary" className="mt-4 w-full">
              <Link to="/rewards">
                View Challenges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: BookOpen, label: 'Learn Today', href: '/learn', emoji: '📚' },
                { icon: TrendingUp, label: 'Track Sales', href: '/track', emoji: '💰' },
                { icon: BarChart3, label: 'My Progress', href: '/profile', emoji: '📊' },
              ].map((action) => (
                <Button
                  key={action.label}
                  asChild
                  variant="outline"
                  className="h-auto flex-col gap-2 py-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:shadow-medium"
                >
                  <Link to={action.href}>
                    <span className="text-3xl">{action.emoji}</span>
                    <span className="font-medium">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Continue Learning */}
      {inProgressLesson && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="surface-card">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="gradient-secondary flex h-16 w-16 items-center justify-center rounded-xl text-3xl shadow-soft">
                  {inProgressLesson.thumbnailEmoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{inProgressLesson.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{inProgressLesson.description}</p>
                  <Progress value={inProgressLesson.progress} className="mt-3 h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {inProgressLesson.progress}% complete
                  </p>
                </div>
                <Button asChild>
                  <Link to="/learn">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

