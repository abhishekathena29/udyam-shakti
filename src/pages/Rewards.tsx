import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Rewards() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { rewards, bizCoins, dailyChallenges, redeemReward, completeChallenge } = useApp();
  const [peerDialogOpen, setPeerDialogOpen] = useState(false);
  const availableRewards = rewards.filter(r => !r.redeemed);
  const redeemedRewards = rewards.filter(r => r.redeemed);
  const completedChallenges = dailyChallenges.filter(c => c.completed);

  const handleChallengeStart = (challenge: typeof dailyChallenges[0]) => {
    if (challenge.completed) return;

    switch (challenge.type) {
      case 'lesson':
        // Navigate to Learn page
        navigate('/learn');
        toast({
          title: 'Challenge Started',
          description: 'Complete a lesson to earn your reward!',
        });
        break;
      
      case 'sales':
        // Navigate to Track page
        navigate('/track');
        toast({
          title: 'Challenge Started',
          description: 'Add a sale transaction to complete this challenge!',
        });
        break;
      
      case 'peer':
        // Show dialog for peer challenge
        setPeerDialogOpen(true);
        break;
      
      default:
        break;
    }
  };

  const handlePeerChallengeComplete = () => {
    const peerChallenge = dailyChallenges.find(c => c.type === 'peer' && !c.completed);
    if (peerChallenge) {
      completeChallenge(peerChallenge.id);
      toast({
        title: 'Challenge Completed!',
        description: `You earned ${peerChallenge.reward} BizCoins!`,
      });
    }
    setPeerDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Rewards</h1>
        <p className="text-muted-foreground mt-2">
          Redeem your BizCoins for amazing rewards
        </p>
      </div>

      {/* BizCoins Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="gradient-primary text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Your BizCoins</CardTitle>
            <CardDescription className="text-white/90">
              Available balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              <span className="text-3xl mr-2">🪙</span>
              {bizCoins.total.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Daily Challenges</CardTitle>
            <CardDescription>Complete challenges to earn BizCoins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    challenge.completed ? 'bg-muted' : 'bg-card'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{challenge.title}</h3>
                      {challenge.completed && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {challenge.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-sm">
                      🪙 {challenge.reward}
                    </Badge>
                    {challenge.completed ? (
                      <Badge variant="default" className="bg-success">
                        Completed
                      </Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleChallengeStart(challenge)}
                      >
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Redeem your BizCoins for these rewards</CardDescription>
          </CardHeader>
          <CardContent>
            {availableRewards.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No rewards available</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableRewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="text-4xl mb-2">{reward.emoji}</div>
                        <CardTitle>{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-sm">
                            🪙 {reward.cost.toLocaleString()}
                          </Badge>
                          <Button
                            size="sm"
                            disabled={bizCoins.total < reward.cost}
                            onClick={() => redeemReward(reward.id)}
                          >
                            Redeem
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Redeemed Rewards */}
      {redeemedRewards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Redeemed Rewards</CardTitle>
              <CardDescription>Rewards you've already claimed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {redeemedRewards.map((reward) => (
                  <Card key={reward.id} className="opacity-60">
                    <CardHeader>
                      <div className="text-4xl mb-2">{reward.emoji}</div>
                      <CardTitle>{reward.title}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="default" className="bg-success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Redeemed
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Peer Challenge Dialog */}
      <Dialog open={peerDialogOpen} onOpenChange={setPeerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help a Fellow Entrepreneur</DialogTitle>
            <DialogDescription>
              Share a business tip or advice with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Thank you for helping fellow entrepreneurs! Your tips and advice help build a stronger community.
            </p>
            <p className="text-sm text-muted-foreground">
              Click below to mark this challenge as complete and earn your reward.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPeerDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePeerChallengeComplete}>
                Complete Challenge
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

