import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { businessTypes } from '@/data/initialData';
import { BusinessType } from '@/types/app';
import { cn } from '@/lib/utils';

interface BusinessTypeSelectProps {
  onNext: (businessType: BusinessType, customType?: string) => void;
  onSkip: () => void;
}

export function BusinessTypeSelect({ onNext, onSkip }: BusinessTypeSelectProps) {
  const [selected, setSelected] = useState<BusinessType | null>(null);
  const [customType, setCustomType] = useState('');

  const handleContinue = () => {
    if (selected) {
      onNext(selected, selected === 'other' ? customType : undefined);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-8 safe-top safe-bottom">
      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onSkip}
        className="mb-4 self-end text-body-sm text-muted-foreground"
      >
        Skip <ChevronRight className="inline h-4 w-4" />
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="font-heading text-h1 text-foreground">What do you sell?</h2>
        <p className="mt-2 text-body text-muted-foreground">
          This helps us personalize your learning journey
        </p>
      </motion.div>

      {/* Business Type Cards */}
      <div className="mb-6 space-y-3">
        {businessTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelected(type.id)}
            className={cn(
              'relative flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200',
              selected === type.id
                ? 'border-primary bg-primary/10 shadow-soft'
                : 'border-border bg-card hover:border-primary/50'
            )}
          >
            <motion.div
              animate={{ scale: selected === type.id ? 1.1 : 1 }}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl"
            >
              {type.emoji}
            </motion.div>
            <span className="flex-1 text-left font-heading text-h3 text-foreground">
              {type.label}
            </span>
            {selected === type.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
              >
                <Check className="h-4 w-4 text-primary-foreground" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Custom Input for 'Other' */}
      {selected === 'other' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <Input
            placeholder="Tell us what you sell..."
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            className="h-12 rounded-xl border-2 text-body"
          />
        </motion.div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleContinue}
          disabled={!selected || (selected === 'other' && !customType.trim())}
          size="lg"
          className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-glow-primary disabled:opacity-50 disabled:shadow-none"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
