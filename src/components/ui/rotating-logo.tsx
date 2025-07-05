import { useState, useEffect } from 'react';
import { Zap, RefreshCw, Link, Workflow, Database, Cloud } from 'lucide-react';

interface RotatingLogoProps {
  className?: string;
}

export function RotatingLogo({ className = "" }: RotatingLogoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const logoVariants = [
    { 
      icon: Zap, 
      text: "SyncRivo",
      subtitle: "Connect",
      color: "text-primary"
    },
    { 
      icon: RefreshCw, 
      text: "SyncRivo",
      subtitle: "Sync",
      color: "text-accent"
    },
    { 
      icon: Link, 
      text: "SyncRivo",
      subtitle: "Integrate",
      color: "text-primary"
    },
    { 
      icon: Workflow, 
      text: "SyncRivo",
      subtitle: "Automate",
      color: "text-accent"
    },
    { 
      icon: Database, 
      text: "SyncRivo",
      subtitle: "Organize",
      color: "text-primary"
    },
    { 
      icon: Cloud, 
      text: "SyncRivo",
      subtitle: "Scale",
      color: "text-accent"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logoVariants.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, [logoVariants.length]);

  const currentVariant = logoVariants[currentIndex];
  const Icon = currentVariant.icon;

  return (
    <div className={`flex items-center space-x-3 group cursor-pointer ${className}`}>
      <div className="relative">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary shadow-glow transition-all duration-500 group-hover:scale-110">
          <Icon 
            className={`h-6 w-6 text-white transition-all duration-500 ${
              currentIndex % 2 === 1 ? 'animate-spin' : ''
            }`} 
          />
        </div>
        
        {/* Rotating ring effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-primary/30 animate-spin" 
             style={{ animationDuration: '8s' }} />
      </div>
      
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent transition-all duration-500">
          {currentVariant.text}
        </span>
        <span className={`text-xs font-medium transition-all duration-500 ${currentVariant.color} opacity-80`}>
          {currentVariant.subtitle}
        </span>
      </div>
    </div>
  );
}