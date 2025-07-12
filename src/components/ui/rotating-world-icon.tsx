import { cn } from "@/lib/utils";

interface RotatingWorldIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  speed?: "ultra-slow" | "slow" | "normal";
}

export function RotatingWorldIcon({ 
  className, 
  size = "md", 
  speed = "ultra-slow" 
}: RotatingWorldIconProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  const speedClasses = {
    "ultra-slow": "animate-[spin_25s_linear_infinite]",
    slow: "animate-[spin_12s_linear_infinite]",
    normal: "animate-[spin_6s_linear_infinite]"
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Rich World Map SVG with detailed continents */}
      <div className={cn(
        "relative transition-all duration-500 group-hover:scale-110",
        sizeClasses[size],
        speedClasses[speed]
      )}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-lg"
          aria-label="Global integration platform"
        >
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="worldGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            </radialGradient>
            <radialGradient id="continentGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Globe outline with subtle shadow */}
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="url(#worldGradient)" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1.5" 
            opacity="0.8"
            filter="url(#glow)"
          />
          
          {/* Detailed continent shapes - North America */}
          <path 
            d="M25 35 Q30 30 35 35 L40 40 Q38 45 35 45 Q30 50 25 45 Q20 40 25 35 Z" 
            fill="url(#continentGradient)" 
            opacity="0.9"
          />
          
          {/* South America */}
          <path 
            d="M30 55 Q32 50 35 55 L38 65 Q35 70 32 68 Q28 65 30 55 Z" 
            fill="url(#continentGradient)" 
            opacity="0.8"
          />
          
          {/* Europe/Africa */}
          <path 
            d="M45 25 Q50 20 55 25 L58 35 Q60 45 58 55 L55 65 Q50 70 45 65 Q42 55 45 45 Q43 35 45 25 Z" 
            fill="url(#continentGradient)" 
            opacity="0.9"
          />
          
          {/* Asia */}
          <path 
            d="M60 20 Q70 15 80 25 L85 35 Q83 45 80 50 Q75 55 70 50 Q65 45 60 40 Q58 30 60 20 Z" 
            fill="url(#continentGradient)" 
            opacity="0.85"
          />
          
          {/* Australia */}
          <path 
            d="M70 65 Q75 62 78 66 Q80 70 75 72 Q70 75 68 70 Q67 67 70 65 Z" 
            fill="url(#continentGradient)" 
            opacity="0.7"
          />
          
          {/* Latitude/Longitude grid lines */}
          <g stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" fill="none">
            {/* Equator */}
            <ellipse cx="50" cy="50" rx="47" ry="15" />
            {/* Tropic lines */}
            <ellipse cx="50" cy="50" rx="45" ry="8" />
            <ellipse cx="50" cy="50" rx="43" ry="22" />
            {/* Meridians */}
            <ellipse cx="50" cy="50" rx="20" ry="47" />
            <ellipse cx="50" cy="50" rx="35" ry="47" />
          </g>
          
          {/* Subtle highlight for 3D effect */}
          <ellipse 
            cx="40" 
            cy="35" 
            rx="15" 
            ry="8" 
            fill="hsl(var(--primary))" 
            opacity="0.2"
          />
          
          {/* Connection dots representing global networks */}
          <g fill="hsl(var(--accent))" opacity="0.6">
            <circle cx="30" cy="40" r="1.5" className="animate-pulse" />
            <circle cx="55" cy="30" r="1.5" className="animate-pulse" style={{animationDelay: "0.5s"}} />
            <circle cx="75" cy="45" r="1.5" className="animate-pulse" style={{animationDelay: "1s"}} />
            <circle cx="35" cy="60" r="1.5" className="animate-pulse" style={{animationDelay: "1.5s"}} />
            <circle cx="70" cy="68" r="1.5" className="animate-pulse" style={{animationDelay: "2s"}} />
          </g>
        </svg>
      </div>
      
      {/* Enhanced glow effect on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse",
        sizeClasses[size]
      )} />
      
      {/* Orbital ring effect */}
      <div className={cn(
        "absolute inset-0 border border-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500",
        sizeClasses[size]
      )} 
      style={{
        animation: "spin 15s linear infinite reverse"
      }} />
    </div>
  );
}