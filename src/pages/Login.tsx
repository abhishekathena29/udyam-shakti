import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, TrendingUp, BookOpen, Coins } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="mesh-gradient bg-dot-grid relative hidden flex-col justify-between p-10 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow-primary">
            <span className="text-lg">🚀</span>
          </div>
          <span className="font-heading text-lg font-semibold">Udyam Shakti</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-sm font-medium shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Welcome back
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight">
            Pick up right where you left off.
          </h2>
          <div className="mt-8 space-y-3">
            {[
              { icon: BookOpen, text: 'Continue your lessons' },
              { icon: TrendingUp, text: 'Log today’s sales' },
              { icon: Coins, text: 'Keep earning BizCoins' },
            ].map((item) => (
              <div key={item.text} className="glass-card flex items-center gap-3 rounded-xl px-4 py-3 shadow-soft">
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground">Empowering India's entrepreneurs, one day at a time.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow-primary">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
          <h1 className="text-center font-heading text-2xl font-bold lg:text-left">Welcome back</h1>
          <p className="mt-2 text-center text-muted-foreground lg:text-left">
            Sign in to your Udyam Shakti account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
