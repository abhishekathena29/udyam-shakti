import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { quickAddItems } from '@/data/initialData';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { transactionService } from '@/services/transactionService';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddTransactionDialog({ open, onOpenChange, onSuccess }: AddTransactionDialogProps) {
  const { currentUser } = useAuth();
  const [item, setItem] = useState('');
  const [emoji, setEmoji] = useState('📦');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'sale' | 'expense'>('sale');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleQuickSelect = (quickItem: typeof quickAddItems[0]) => {
    setItem(quickItem.name);
    setEmoji(quickItem.emoji);
    setAmount(quickItem.defaultPrice.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!item.trim()) {
      setError('Please enter an item name');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!currentUser) {
      setError('You must be logged in to add transactions');
      return;
    }

    setIsSubmitting(true);

    try {
      await transactionService.addTransaction(currentUser.uid, {
        item: item.trim(),
        emoji,
        amount: amountNum,
        type,
      });

      // Reset form
      setItem('');
      setEmoji('📦');
      setAmount('');
      setType('sale');
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Record a new sale or expense
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick Add Items */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Quick Add</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAddItems.map((quickItem) => (
                <Button
                  key={quickItem.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-2"
                  onClick={() => handleQuickSelect(quickItem)}
                >
                  <span className="text-xl">{quickItem.emoji}</span>
                  <span className="text-xs">{quickItem.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Transaction Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as 'sale' | 'expense')}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Item Name */}
          <div className="space-y-2">
            <Label htmlFor="item">Item Name</Label>
            <div className="flex gap-2">
              <Input
                id="item"
                placeholder="Enter item name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Emoji"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  className="w-20"
                  maxLength={2}
                />
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Transaction'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

