import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, TrendingUp, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TutorialProps {
  onComplete: (name: string) => void;
}

const tutorialSlides = [
  {
    icon: BookOpen,
    title: 'Learn & Grow',
    description: 'Get bite-sized business lessons tailored for street entrepreneurs. Just 3-5 minutes a day!',
    color: 'primary',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Success',
    description: 'Simple sales tracking that shows you your daily profit. No complicated math needed!',
    color: 'secondary',
  },
  {
    icon: Trophy,
    title: 'Earn Rewards',
    description: 'Complete challenges, earn BizCoins, and unlock real rewards for your business!',
    color: 'accent',
  },
];

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  const handleNext = () => {
    if (currentSlide < tutorialSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowNameInput(true);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  const slide = tutorialSlides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-8 safe-top safe-bottom">
      <AnimatePresence mode="wait">
        {!showNameInput ? (
          <motion.div
            key="tutorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 flex-col"
          >
            {/* Skip */}
            <button
              onClick={() => setShowNameInput(true)}
              className="mb-4 self-end text-body-sm text-muted-foreground"
            >
              Skip <ChevronRight className="inline h-4 w-4" />
            </button>

            {/* Slide Content */}
            <div className="flex flex-1 flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className={cn(
                      'mb-8 flex h-32 w-32 items-center justify-center rounded-3xl shadow-strong',
                      slide.color === 'primary' && 'gradient-primary',
                      slide.color === 'secondary' && 'gradient-secondary',
                      slide.color === 'accent' && 'gradient-accent'
                    )}
                  >
                    <IconComponent className="h-16 w-16 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h2 className="mb-4 font-heading text-h1 text-foreground">{slide.title}</h2>

                  {/* Description */}
                  <p className="max-w-xs text-body text-muted-foreground">{slide.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="mb-8 flex justify-center gap-2">
              {tutorialSlides.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: index === currentSlide ? 1.2 : 1,
                    backgroundColor:
                      index === currentSlide
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--muted))',
                  }}
                  className="h-2 w-2 rounded-full"
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {currentSlide > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrev}
                  className="flex-1 py-6 text-lg rounded-xl"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                size="lg"
                className={cn(
                  'flex-1 gradient-primary text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-glow-primary',
                  currentSlide === 0 && 'w-full'
                )}
              >
                {currentSlide === tutorialSlides.length - 1 ? "Let's Start!" : 'Next'}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="name-input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-1 flex-col"
          >
            {/* Back button */}
            <button
              onClick={() => setShowNameInput(false)}
              className="mb-4 flex items-center text-body-sm text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex flex-1 flex-col items-center justify-center">
              {/* Celebration */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="mb-8 text-7xl"
              >
                🎉
              </motion.div>

              <h2 className="mb-2 font-heading text-h1 text-foreground">Welcome!</h2>
              <p className="mb-8 text-center text-body text-muted-foreground">
                What should we call you?
              </p>

              {/* Name Input */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mb-6 w-full max-w-xs rounded-xl border-2 border-border bg-card px-4 py-4 text-center text-h3 font-heading text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                autoFocus
              />

              {/* Bonus message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2"
              >
                <span className="text-lg">🪙</span>
                <span className="text-body-sm font-medium text-accent-foreground">
                  +100 BizCoins welcome bonus!
                </span>
              </motion.div>
            </div>

            {/* Start Button */}
            <Button
              onClick={handleComplete}
              disabled={!name.trim()}
              size="lg"
              className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-glow-primary disabled:opacity-50 disabled:shadow-none"
            >
              🚀 Start Earning
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
