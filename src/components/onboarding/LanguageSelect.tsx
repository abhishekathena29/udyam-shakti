import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LanguageSelectProps {
  onNext: () => void;
}

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
];

export function LanguageSelect({ onNext }: LanguageSelectProps) {
  const [selected, setSelected] = useState<string>('en');

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-8 safe-top safe-bottom">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col items-center"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-glow-primary">
          <span className="text-4xl">🚀</span>
        </div>
        <h1 className="font-heading text-h1 text-foreground">UdyamShakti</h1>
        <p className="text-body-sm text-muted-foreground">Digital Empowerment</p>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-center"
      >
        <h2 className="font-heading text-h2 text-foreground">Choose Your Language</h2>
        <p className="mt-1 text-body-sm text-muted-foreground">
          Select your preferred language
        </p>
      </motion.div>

      {/* Language Grid */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={() => setSelected(lang.code)}
            className={cn(
              'relative flex flex-col items-center rounded-xl border-2 p-4 transition-all duration-200',
              selected === lang.code
                ? 'border-primary bg-primary/10 scale-105 shadow-soft'
                : 'border-border bg-card hover:border-primary/50'
            )}
          >
            {selected === lang.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary"
              >
                <Check className="h-3 w-3 text-primary-foreground" />
              </motion.div>
            )}
            <span className="text-body font-medium text-foreground">{lang.native}</span>
            <span className="text-caption text-muted-foreground">{lang.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Voice Selection */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6 flex items-center justify-center gap-2 text-body-sm text-muted-foreground"
      >
        <Volume2 className="h-4 w-4" />
        <span>Tap to hear languages</span>
      </motion.button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-glow-primary"
        >
          Continue
        </Button>
      </motion.div>

      {/* Note about MVP */}
      <p className="mt-4 text-center text-caption text-muted-foreground">
        More languages coming soon!
      </p>
    </div>
  );
}
