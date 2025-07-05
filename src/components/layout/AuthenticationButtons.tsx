import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AuthenticationButtons() {
  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/login">Sign In</Link>
      </Button>
      <Button asChild className="bg-gradient-primary hover:bg-primary-hover shadow-glow">
        <Link to="/signup">Get Started Free</Link>
      </Button>
    </>
  );
}