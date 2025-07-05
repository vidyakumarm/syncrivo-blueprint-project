import { Link } from 'react-router-dom';
import { RotatingLogo } from '@/components/ui/rotating-logo';

export function NavigationHeader() {
  return (
    <Link to="/">
      <RotatingLogo />
    </Link>
  );
}