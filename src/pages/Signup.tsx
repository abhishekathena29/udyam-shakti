import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BusinessType } from '@/types/app';

const businessTypes = [
  { id: 'vegetables' as BusinessType, label: 'Vegetables & Fruits', emoji: '🥬' },
  { id: 'street-food' as BusinessType, label: 'Street Food', emoji: '🍲' },
  { id: 'handicrafts' as BusinessType, label: 'Handicrafts', emoji: '🧶' },
  { id: 'services' as BusinessType, label: 'Services', emoji: '🔧' },
  { id: 'other' as BusinessType, label: 'Other', emoji: '📦' },
];

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType>('other');
  const [customBusinessType, setCustomBusinessType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name, businessType, businessType === 'other' ? customBusinessType : undefined);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
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
            Join for free
          </div>
          <h2 className="font-heading text-3xl font-bold leading-tight">
            Start growing your business today.
          </h2>
          <div className="mt-8 space-y-3">
            {[
              'Get 100 BizCoins the moment you sign up',
              'Learn real skills with quick daily lessons',
              'Track sales and see your true daily profit',
            ].map((text) => (
              <div key={text} className="glass-card flex items-center gap-3 rounded-xl px-4 py-3 shadow-soft">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground">Empowering India's entrepreneurs, one day at a time.</p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 py-10 sm:p-10">
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
          <h1 className="text-center font-heading text-2xl font-bold lg:text-left">Create your account</h1>
          <p className="mt-2 text-center text-muted-foreground lg:text-left">
            Join Udyam Shakti and empower your business
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
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
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={businessType}
                onValueChange={(value) => setBusinessType(value as BusinessType)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <span className="flex items-center gap-2">
                        <span>{type.emoji}</span>
                        <span>{type.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {businessType === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="customBusinessType">Specify Business Type</Label>
                <Input
                  id="customBusinessType"
                  type="text"
                  placeholder="Enter your business type"
                  value={customBusinessType}
                  onChange={(e) => setCustomBusinessType(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
