import React from 'react';

export function CollaborationHeroSVG() {
  const styles = `
    @keyframes orbit {
      from {
        transform: rotate(0deg) translateX(120px) rotate(0deg);
      }
      to {
        transform: rotate(360deg) translateX(120px) rotate(-360deg);
      }
    }
    
    @keyframes pulse-hub {
      0%, 100% {
        transform: scale(1);
        opacity: 0.1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.15;
      }
    }
    
    @keyframes message-travel-1 {
      0% {
        opacity: 0;
        transform: translateX(0) translateY(0);
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateX(-80px) translateY(40px);
      }
    }
    
    @keyframes message-travel-2 {
      0% {
        opacity: 0;
        transform: translateX(0) translateY(0);
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateX(60px) translateY(80px);
      }
    }
    
    @keyframes message-travel-3 {
      0% {
        opacity: 0;
        transform: translateX(0) translateY(0);
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateX(-20px) translateY(-60px);
      }
    }
    
    @keyframes message-travel-4 {
      0% {
        opacity: 0;
        transform: translateX(0) translateY(0);
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateX(-100px) translateY(-20px);
      }
    }
    
    @keyframes float-particles {
      0% {
        opacity: 0;
        transform: translateY(0) scale(1);
      }
      50% {
        opacity: 0.6;
      }
      100% {
        opacity: 0;
        transform: translateY(-50px) scale(0.5);
      }
    }
    
    .orbit-icon {
      animation: orbit 18s linear infinite;
    }
    
    .pulse-hub {
      animation: pulse-hub 3s ease-in-out infinite;
    }
    
    .message-bubble-1 {
      animation: message-travel-1 2.4s ease-in-out infinite;
      animation-delay: 0s;
    }
    
    .message-bubble-2 {
      animation: message-travel-2 2.4s ease-in-out infinite;
      animation-delay: 0.6s;
    }
    
    .message-bubble-3 {
      animation: message-travel-3 2.4s ease-in-out infinite;
      animation-delay: 1.2s;
    }
    
    .message-bubble-4 {
      animation: message-travel-4 2.4s ease-in-out infinite;
      animation-delay: 1.8s;
    }
    
    .floating-particle {
      animation: float-particles 4s ease-out infinite;
    }
    
    .floating-particle:nth-child(2) {
      animation-delay: 1s;
    }
    
    .floating-particle:nth-child(3) {
      animation-delay: 2s;
    }
    
    .floating-particle:nth-child(4) {
      animation-delay: 3s;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .orbit-icon,
      .pulse-hub,
      .message-bubble-1,
      .message-bubble-2,
      .message-bubble-3,
      .message-bubble-4,
      .floating-particle {
        animation: none;
      }
    }
  `;

  return (
    <div className="relative w-full max-w-lg h-auto">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto drop-shadow-2xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Team collaboration across platforms illustration"
      >
        {/* Gradient definitions */}
        <defs>
          <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4EAFE" />
            <stop offset="100%" stopColor="#F5F7FA" />
          </radialGradient>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#141C3A" />
            <stop offset="100%" stopColor="#0D99FF" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D99FF" />
            <stop offset="100%" stopColor="#141C3A" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Central hub with pulsing animation */}
        <circle 
          cx="400" 
          cy="300" 
          r="160" 
          fill="url(#hubGradient)" 
          className="pulse-hub"
          filter="url(#glow)"
        />
        
        {/* Central laptop (main hub) */}
        <g transform="translate(350, 250)">
          <rect x="20" y="30" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#141C3A" strokeWidth="2" />
          <rect x="25" y="35" width="50" height="25" rx="2" fill="#141C3A" />
          <circle cx="50" cy="47" r="3" fill="#0D99FF" />
          <rect x="45" y="70" width="10" height="8" fill="#141C3A" />
          <ellipse cx="50" cy="78" rx="15" ry="2" fill="#141C3A" />
        </g>
        
        {/* Orbiting platform icons */}
        <g transform="translate(400, 300)">
          {/* Teams icon */}
          <g className="orbit-icon" style={{ transformOrigin: '0 0' }}>
            <g transform="translate(-15, -15)">
              <rect x="0" y="0" width="30" height="30" rx="6" fill="#6264A7" />
              <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">T</text>
            </g>
          </g>
          
          {/* Slack icon */}
          <g className="orbit-icon" style={{ transformOrigin: '0 0', animationDelay: '4.5s' }}>
            <g transform="translate(-15, -15)">
              <rect x="0" y="0" width="30" height="30" rx="6" fill="#4A154B" />
              <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">S</text>
            </g>
          </g>
          
          {/* Zoom icon */}
          <g className="orbit-icon" style={{ transformOrigin: '0 0', animationDelay: '9s' }}>
            <g transform="translate(-15, -15)">
              <circle cx="15" cy="15" r="15" fill="#2D8CFF" />
              <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Z</text>
            </g>
          </g>
          
          {/* Discord icon */}
          <g className="orbit-icon" style={{ transformOrigin: '0 0', animationDelay: '13.5s' }}>
            <g transform="translate(-15, -15)">
              <rect x="0" y="0" width="30" height="30" rx="6" fill="#5865F2" />
              <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">D</text>
            </g>
          </g>
        </g>
        
        {/* Animated message bubbles */}
        <g transform="translate(280, 180)">
          <ellipse className="message-bubble-1" cx="0" cy="0" rx="12" ry="8" fill="#FFFFFF" stroke="#0D99FF" strokeWidth="1" opacity="0" />
        </g>
        
        <g transform="translate(520, 200)">
          <ellipse className="message-bubble-2" cx="0" cy="0" rx="12" ry="8" fill="#FFFFFF" stroke="#4A154B" strokeWidth="1" opacity="0" />
        </g>
        
        <g transform="translate(400, 160)">
          <ellipse className="message-bubble-3" cx="0" cy="0" rx="12" ry="8" fill="#FFFFFF" stroke="#2D8CFF" strokeWidth="1" opacity="0" />
        </g>
        
        <g transform="translate(300, 420)">
          <ellipse className="message-bubble-4" cx="0" cy="0" rx="12" ry="8" fill="#FFFFFF" stroke="#5865F2" strokeWidth="1" opacity="0" />
        </g>
        
        {/* Floating particles */}
        <g transform="translate(350, 400)">
          <circle className="floating-particle" cx="0" cy="0" r="2" fill="#0D99FF" opacity="0.2" />
          <circle className="floating-particle" cx="20" cy="5" r="1.5" fill="#0D99FF" opacity="0.3" />
          <circle className="floating-particle" cx="-15" cy="-10" r="2.5" fill="#0D99FF" opacity="0.15" />
          <circle className="floating-particle" cx="30" cy="-5" r="1" fill="#0D99FF" opacity="0.25" />
        </g>
        
        {/* User avatars around the hub */}
        <g transform="translate(320, 220)">
          <circle cx="0" cy="0" r="20" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
          <circle cx="0" cy="-5" r="8" fill="#141C3A" />
          <ellipse cx="0" cy="8" rx="12" ry="8" fill="#0D99FF" />
        </g>
        
        <g transform="translate(480, 240)">
          <circle cx="0" cy="0" r="20" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
          <circle cx="0" cy="-5" r="8" fill="#141C3A" />
          <ellipse cx="0" cy="8" rx="12" ry="8" fill="#0D99FF" />
        </g>
        
        <g transform="translate(420, 380)">
          <circle cx="0" cy="0" r="20" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
          <circle cx="0" cy="-5" r="8" fill="#141C3A" />
          <ellipse cx="0" cy="8" rx="12" ry="8" fill="#0D99FF" />
        </g>
        
        <g transform="translate(360, 200)">
          <circle cx="0" cy="0" r="20" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
          <circle cx="0" cy="-5" r="8" fill="#141C3A" />
          <ellipse cx="0" cy="8" rx="12" ry="8" fill="#0D99FF" />
        </g>
        
        {/* SyncRivo logo watermark */}
        <g transform="translate(520, 360)" opacity="0.04">
          <circle cx="0" cy="0" r="25" fill="#141C3A" />
          <text x="0" y="6" textAnchor="middle" fill="white" fontSize="14" fontFamily="sans-serif" fontWeight="bold">SR</text>
        </g>
      </svg>
    </div>
  );
}