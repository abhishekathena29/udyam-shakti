import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Coins } from 'lucide-react';

export default function Profile() {
  const { user, bizCoins } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-heading text-3xl font-heading font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Your business journey and achievements
        </p>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden rounded-2xl shadow-soft">
          <div className="gradient-primary bg-dot-grid h-20" />
          <CardContent className="relative pb-6 pt-0">
            <div className="flex items-end gap-6 -mt-10">
              <Avatar className="h-20 w-20 border-4 border-card shadow-medium">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pt-10">
                <h2 className="text-2xl font-heading font-semibold">{user?.name || 'User'}</h2>
                <p className="text-muted-foreground mt-1">
                  {user?.businessType === 'other'
                    ? user?.customBusinessType
                    : user?.businessType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Business Owner'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <Badge variant="outline" className="gap-2">
                <Coins className="h-4 w-4 text-accent" />
                {bizCoins.total.toLocaleString()} BizCoins
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Name', value: user?.name || 'Not set' },
                {
                  label: 'Business Type',
                  value:
                    user?.businessType === 'other'
                      ? user?.customBusinessType || 'Other'
                      : user?.businessType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not set',
                },
                {
                  label: 'Member Since',
                  value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
                },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

