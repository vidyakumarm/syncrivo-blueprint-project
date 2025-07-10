
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { IdentifierStep } from '@/components/auth/IdentifierStep';
import { PasswordStep } from '@/components/auth/PasswordStep';
import { EnhancedSocialLoginButtons } from '@/components/auth/EnhancedSocialLoginButtons';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthFlow } from '@/hooks/useAuthFlow';

export default function Login() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state, actions } = useAuthFlow();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const renderStep = () => {
    switch (state.step) {
      case 'identifier':
        return (
          <IdentifierStep
            onNext={actions.proceedToPassword}
            isLoading={state.isLoading}
            error={state.error}
          />
        );
      case 'password':
        return (
          <PasswordStep
            email={state.email}
            onSubmit={actions.attemptSignIn}
            onBack={actions.goBack}
            isLoading={state.isLoading}
            error={state.error}
            attempts={state.attempts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AuthLayout 
      title="Sign in to SyncRivo"
      subtitle="Unify your team communications across all platforms"
    >
      <div className="space-y-6">
        {renderStep()}
        
        {state.step === 'identifier' && (
          <EnhancedSocialLoginButtons />
        )}
      </div>
    </AuthLayout>
  );
}
