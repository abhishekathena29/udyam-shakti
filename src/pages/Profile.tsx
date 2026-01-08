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
        <h1 className="text-3xl font-heading font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Your business journey and achievements
        </p>
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-semibold">{user?.name || 'User'}</h2>
                <p className="text-muted-foreground mt-1">
                  {user?.businessType === 'other' 
                    ? user?.customBusinessType 
                    : user?.businessType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Business Owner'}
                </p>
                <div className="flex gap-4 mt-4">
                  <Badge variant="outline" className="gap-2">
                    <Coins className="h-4 w-4" />
                    {bizCoins.total.toLocaleString()} BizCoins
                  </Badge>
                </div>
              </div>
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
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium">{user?.name || 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Business Type</span>
              <span className="font-medium">
                {user?.businessType === 'other' 
                  ? user?.customBusinessType || 'Other'
                  : user?.businessType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not set'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

