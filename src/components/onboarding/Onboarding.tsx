import { useState } from 'react';
import { BusinessTypeSelect } from './BusinessTypeSelect';
import { Tutorial } from './Tutorial';
import { BusinessType } from '@/types/app';
import { useApp } from '@/contexts/AppContext';

type OnboardingStep = 'business' | 'tutorial';

export function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>('business');
  const [businessType, setBusinessType] = useState<BusinessType>('vegetables');
  const [customBusinessType, setCustomBusinessType] = useState<string>();
  const { completeOnboarding } = useApp();

  const handleBusinessNext = (type: BusinessType, customType?: string) => {
    setBusinessType(type);
    setCustomBusinessType(customType);
    setStep('tutorial');
  };

  const handleBusinessSkip = () => {
    setStep('tutorial');
  };

  const handleComplete = (name: string) => {
    completeOnboarding(name, businessType, customBusinessType);
  };

  switch (step) {
    case 'business':
      return <BusinessTypeSelect onNext={handleBusinessNext} onSkip={handleBusinessSkip} />;
    case 'tutorial':
      return <Tutorial onComplete={handleComplete} />;
    default:
      return null;
  }
}
