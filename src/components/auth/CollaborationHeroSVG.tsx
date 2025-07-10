import React from 'react';

export function CollaborationHeroSVG() {
  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full max-w-lg h-auto drop-shadow-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="400" cy="300" r="280" fill="url(#gradient1)" opacity="0.1" />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141C3A" />
          <stop offset="100%" stopColor="#0D99FF" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D99FF" />
          <stop offset="100%" stopColor="#141C3A" />
        </linearGradient>
      </defs>
      
      {/* People illustrations */}
      {/* Person 1 - Left */}
      <g transform="translate(150, 200)">
        <circle cx="40" cy="30" r="25" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
        <rect x="15" y="55" width="50" height="60" rx="25" fill="#0D99FF" />
        <rect x="5" y="80" width="70" height="80" rx="8" fill="#FFFFFF" stroke="#141C3A" strokeWidth="1" />
        {/* Laptop screen */}
        <rect x="10" y="85" width="60" height="35" rx="2" fill="#141C3A" />
        <circle cx="40" cy="102" r="3" fill="#0D99FF" />
      </g>
      
      {/* Person 2 - Right */}
      <g transform="translate(550, 180)">
        <circle cx="40" cy="30" r="25" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
        <rect x="15" y="55" width="50" height="60" rx="25" fill="#141C3A" />
        <rect x="20" y="85" width="40" height="60" rx="4" fill="#FFFFFF" stroke="#0D99FF" strokeWidth="1" />
        {/* Phone screen */}
        <rect x="25" y="90" width="30" height="20" rx="2" fill="#0D99FF" />
        <circle cx="40" cy="100" r="2" fill="#FFFFFF" />
      </g>
      
      {/* Person 3 - Center back */}
      <g transform="translate(350, 150)">
        <circle cx="40" cy="30" r="25" fill="#F5F7FA" stroke="#141C3A" strokeWidth="2" />
        <rect x="15" y="55" width="50" height="60" rx="25" fill="#0D99FF" />
        <rect x="5" y="80" width="70" height="80" rx="8" fill="#FFFFFF" stroke="#141C3A" strokeWidth="1" />
        {/* Monitor */}
        <rect x="10" y="85" width="60" height="40" rx="2" fill="#141C3A" />
        <rect x="35" y="125" width="10" height="15" fill="#141C3A" />
        <ellipse cx="40" cy="140" rx="20" ry="3" fill="#141C3A" />
      </g>
      
      {/* Platform icons floating around */}
      {/* Teams icon */}
      <g transform="translate(250, 120)">
        <rect x="0" y="0" width="30" height="30" rx="6" fill="#6264A7" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">T</text>
      </g>
      
      {/* Slack icon */}
      <g transform="translate(520, 120)">
        <rect x="0" y="0" width="30" height="30" rx="6" fill="#4A154B" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">S</text>
      </g>
      
      {/* Zoom icon */}
      <g transform="translate(380, 100)">
        <circle cx="15" cy="15" r="15" fill="#2D8CFF" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">Z</text>
      </g>
      
      {/* Discord icon */}
      <g transform="translate(300, 350)">
        <rect x="0" y="0" width="30" height="30" rx="6" fill="#5865F2" />
        <text x="15" y="20" textAnchor="middle" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">D</text>
      </g>
      
      {/* Connection lines */}
      <path
        d="M 200 240 Q 400 200 550 220"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        opacity="0.6"
      />
      <path
        d="M 200 280 Q 300 350 520 250"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="3,3"
        opacity="0.6"
      />
      <path
        d="M 380 200 Q 300 300 200 260"
        stroke="#0D99FF"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4,4"
        opacity="0.4"
      />
      
      {/* Floating message bubbles */}
      <g transform="translate(450, 280)">
        <ellipse cx="0" cy="0" rx="25" ry="15" fill="#0D99FF" opacity="0.8" />
        <circle cx="-8" cy="0" r="2" fill="white" />
        <circle cx="0" cy="0" r="2" fill="white" />
        <circle cx="8" cy="0" r="2" fill="white" />
      </g>
      
      <g transform="translate(320, 320)">
        <ellipse cx="0" cy="0" rx="30" ry="18" fill="#141C3A" opacity="0.8" />
        <rect x="-15" y="-3" width="30" height="2" fill="white" />
        <rect x="-10" y="1" width="20" height="2" fill="white" />
      </g>
    </svg>
  );
}