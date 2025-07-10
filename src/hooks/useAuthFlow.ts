import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export type AuthStep = 'identifier' | 'password' | 'verification';

export interface AuthFlowState {
  step: AuthStep;
  email: string;
  isLoading: boolean;
  error: string | null;
  attempts: number;
}

export function useAuthFlow() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const [state, setState] = useState<AuthFlowState>({
    step: 'identifier',
    email: '',
    isLoading: false,
    error: null,
    attempts: 0
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const setStep = (step: AuthStep) => {
    setState(prev => ({ ...prev, step, error: null }));
  };

  const setEmail = (email: string) => {
    setState(prev => ({ ...prev, email, error: null }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const proceedToPassword = async (email: string) => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Simulate email validation check (in real app, you might check if user exists)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setState(prev => ({ 
      ...prev, 
      isLoading: false, 
      email, 
      step: 'password' 
    }));
    
    return true;
  };

  const attemptSignIn = async (password: string) => {
    if (state.attempts >= 5) {
      setError('Account temporarily locked due to too many failed attempts');
      return false;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await signIn(state.email, password);
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          attempts: prev.attempts + 1,
          error: error.message.includes('Invalid login credentials') 
            ? 'Incorrect password. Please try again.'
            : error.message
        }));
        return false;
      } else {
        toast.success('Welcome back!');
        navigate('/dashboard');
        return true;
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'An unexpected error occurred'
      }));
      return false;
    }
  };

  const goBack = () => {
    if (state.step === 'password') {
      setState(prev => ({ ...prev, step: 'identifier', error: null }));
    }
  };

  const reset = () => {
    setState({
      step: 'identifier',
      email: '',
      isLoading: false,
      error: null,
      attempts: 0
    });
  };

  return {
    state,
    actions: {
      setStep,
      setEmail,
      setError,
      proceedToPassword,
      attemptSignIn,
      goBack,
      reset
    },
    utils: {
      validateEmail
    }
  };
}