
import React from 'react';
import { Briefcase, Code, Database, Server, GitBranch, Terminal, Laptop, Building, Computer } from 'lucide-react';

const AnimatedBackgroundIcons = () => {
  // Array of available icons with their properties
  const iconComponents = [
    { Icon: Briefcase, color: 'rgba(59, 130, 246, 0.1)', size: 32 },
    { Icon: Code, color: 'rgba(59, 130, 246, 0.1)', size: 40 },
    { Icon: Database, color: 'rgba(59, 130, 246, 0.1)', size: 36 },
    { Icon: Server, color: 'rgba(59, 130, 246, 0.1)', size: 28 },
    { Icon: GitBranch, color: 'rgba(59, 130, 246, 0.1)', size: 34 },
    { Icon: Terminal, color: 'rgba(59, 130, 246, 0.1)', size: 30 },
    { Icon: Laptop, color: 'rgba(59, 130, 246, 0.1)', size: 38 },
    { Icon: Building, color: 'rgba(59, 130, 246, 0.1)', size: 36 },
    { Icon: Computer, color: 'rgba(59, 130, 246, 0.1)', size: 32 }
  ];

  // Generate a set of randomly positioned icons
  const backgroundIcons = Array.from({ length: 15 }, (_, index) => {
    const randomIcon = iconComponents[Math.floor(Math.random() * iconComponents.length)];
    
    return {
      id: index,
      Icon: randomIcon.Icon,
      color: randomIcon.color,
      size: randomIcon.size,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${8 + Math.random() * 7}s`
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {backgroundIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute opacity-20 animate-float-slow"
          style={{
            top: icon.top,
            left: icon.left,
            animationDelay: icon.animationDelay,
            animationDuration: icon.animationDuration,
          }}
        >
          <icon.Icon size={icon.size} color={icon.color} />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackgroundIcons;
