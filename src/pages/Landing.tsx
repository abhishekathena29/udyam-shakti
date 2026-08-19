import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  Gift,
  ArrowRight,
  Sparkles,
  Coins,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { initialLessons } from '@/data/initialData';

const features = [
  {
    icon: BookOpen,
    emoji: '📚',
    title: 'Bite-sized lessons',
    description: `${initialLessons.length} practical lessons on pricing, marketing, digital payments and more — built for busy entrepreneurs, ${initialLessons[0].duration}-${Math.max(...initialLessons.map(l => l.duration))} minutes each.`,
    gradient: 'gradient-primary',
  },
  {
    icon: TrendingUp,
    emoji: '💰',
    title: 'Track sales & expenses',
    description: 'Log every sale and expense in seconds and see your real daily profit, not just revenue.',
    gradient: 'gradient-secondary',
  },
  {
    icon: Gift,
    emoji: '🪙',
    title: 'Earn BizCoins',
    description: 'Complete daily challenges and lessons to earn BizCoins, then redeem them for real rewards.',
    gradient: 'gradient-accent',
  },
];

const steps = [
  {
    title: 'Create your account',
    description: 'Tell us about your business — vegetables, street food, handicrafts, services, or anything else.',
  },
  {
    title: 'Learn & track daily',
    description: 'Finish a quick lesson, log your sales, and complete daily challenges as part of your routine.',
  },
  {
    title: 'Earn & redeem rewards',
    description: 'Collect BizCoins for everything you complete, then redeem them for rewards in the app.',
  },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-card shadow-soft' : 'bg-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow-primary">
              <span className="text-lg">🚀</span>
            </div>
            <span className="font-heading text-lg font-semibold">Udyam Shakti</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden mesh-gradient bg-dot-grid">
        <div className="container relative py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-sm font-medium shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Made for India's entrepreneurs
              </div>
              <h1 className="mt-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Learn, track, and{' '}
                <span className="section-heading">grow your business</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Udyam Shakti helps street vendors and small business owners build real skills,
                track daily sales and expenses, and earn rewards for showing up every day.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="text-base">
                  <Link to="/signup">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base">
                  <Link to="/login">I already have an account</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mx-auto w-full max-w-md"
            >
              <Card className="glass-card shadow-strong rounded-2xl">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-semibold text-muted-foreground">
                      Today's Summary
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-accent">
                      <Flame className="h-4 w-4" />
                      5 day streak
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border bg-card p-4 shadow-soft">
                      <p className="text-xs text-muted-foreground">Today's Sales</p>
                      <p className="mt-1 text-xl font-bold text-secondary">₹2,450</p>
                    </div>
                    <div className="rounded-xl border bg-card p-4 shadow-soft">
                      <p className="text-xs text-muted-foreground">Net Profit</p>
                      <p className="mt-1 text-xl font-bold text-success">₹960</p>
                    </div>
                  </div>
                  <div className="gradient-primary flex items-center justify-between rounded-xl p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      <span className="font-semibold">BizCoins</span>
                    </div>
                    <span className="font-heading text-lg font-bold">1,240</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border bg-card p-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span>Lesson completed: Smart Pricing Strategies</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="section-heading font-heading text-3xl font-bold md:text-4xl">
            Everything you need, in one app
          </h2>
          <p className="mt-4 text-muted-foreground">
            No complicated setup. Just the tools real vendors and small business owners use every day.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <Card className="surface-card h-full">
                <CardContent className="pt-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl text-white ${feature.gradient}`}
                  >
                    {feature.emoji}
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y bg-muted/40 py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-heading text-3xl font-bold md:text-4xl">How it works</h2>
            <p className="mt-4 text-muted-foreground">Three simple steps to start growing your business today.</p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative text-center md:text-left"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground shadow-glow-primary md:mx-0">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="gradient-primary overflow-hidden border-0 text-white shadow-strong">
            <CardContent className="flex flex-col items-center gap-6 py-14 text-center">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Ready to grow your business?
              </h2>
              <p className="max-w-xl text-white/90">
                Join Udyam Shakti today — it's free to get started, and every lesson and challenge
                earns you BizCoins from day one.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-base">
                <Link to="/signup">
                  Create your free account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-sm">🚀</span>
            </div>
            <span className="font-heading text-sm font-semibold">Udyam Shakti</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-foreground">Login</Link>
            <Link to="/signup" className="hover:text-foreground">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
