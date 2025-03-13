
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface CircularProgressBarProps {
  percentage: number;
  color: string;
  trackColor?: string;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  color,
  trackColor = 'rgba(255, 255, 255, 0.2)',
  size = 80,
  strokeWidth = 6,
  showPercentage = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate the radius
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Animation for progress
  const { progress, strokeDash } = useSpring({
    from: { progress: 0, strokeDash: circumference },
    to: { progress: percentage, strokeDash: strokeDashoffset },
    delay: 300,
    config: { duration: 1500 }
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transform -rotate-90 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Track Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle */}
        <animated.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDash}
        />
      </svg>
      
      {/* Percentage Text - conditionally rendered */}
      {showPercentage && (
        <animated.div 
          className="absolute inset-0 flex items-center justify-center text-white font-medium"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s'
          }}
        >
          <animated.span>
            {progress.to(val => `${Math.floor(val)}%`)}
          </animated.span>
        </animated.div>
      )}
    </div>
  );
};

export default CircularProgressBar;
