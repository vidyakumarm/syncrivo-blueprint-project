import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface RotatingWorldIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  speed?: "slow" | "normal" | "fast";
}

export function RotatingWorldIcon({ 
  className, 
  size = "md", 
  speed = "slow" 
}: RotatingWorldIconProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  const speedClasses = {
    slow: "animate-[spin_8s_linear_infinite]",
    normal: "animate-[spin_4s_linear_infinite]", 
    fast: "animate-[spin_2s_linear_infinite]"
  };

  return (
    <div className={cn("relative group", className)}>
      <Globe 
        className={cn(
          "text-primary transition-all duration-300 group-hover:text-primary-hover group-hover:scale-110",
          sizeClasses[size],
          speedClasses[speed]
        )}
        aria-label="Global integration platform"
      />
      {/* Subtle glow effect on hover */}
      <div className={cn(
        "absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        sizeClasses[size]
      )} />
    </div>
  );
}