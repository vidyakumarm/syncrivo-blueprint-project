import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function AuthenticationButtons() {
  const { t } = useTranslation();

  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/login">{t('common.login')}</Link>
      </Button>
      <Button asChild className="bg-gradient-primary hover:bg-primary-hover shadow-glow">
        <Link to="/signup">{t('common.signup')}</Link>
      </Button>
    </>
  );
}