import { Link } from 'react-router-dom';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';

interface NavigationHeaderProps {
  scrollProgress?: number;
  isNavHovered?: boolean;
  isCtaHovered?: boolean;
}

export function NavigationHeader({
  scrollProgress,
  isNavHovered,
  isCtaHovered
}: NavigationHeaderProps) {
  return (
    <Link to="/" aria-label="SyncRivo Home" className="flex items-center gap-3 group">
      <AnimatedLogo
        className="h-16 w-auto"
        scrollProgress={scrollProgress}
        isNavHovered={isNavHovered}
        isCtaHovered={isCtaHovered}
      />
    </Link>
  );
}