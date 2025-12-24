import { Link } from 'react-router-dom';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';

export function NavigationHeader() {
  return (
    <Link to="/" aria-label="SyncRivo Home" className="flex items-center gap-3 group">
      <AnimatedLogo className="h-16 w-auto" />
    </Link>
  );
}