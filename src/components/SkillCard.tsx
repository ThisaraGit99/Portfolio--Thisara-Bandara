import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface SkillCardProps {
  name: string;
  icon: string;
  color: string;
  description?: string;
  index: number;
  isActive: boolean;
  globalActive: boolean;
}

const SkillCard = ({ name, icon, color, description, index, isActive, globalActive }: SkillCardProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`w-[150px] h-[180px] flex flex-col items-center justify-center p-6 rounded-xl 
              bg-white/5 backdrop-blur-sm relative skill-card
              border border-blue-500/30 ${isActive ? 'active' : ''} ${globalActive ? 'global-animation' : ''}`}
            style={{
              animationDelay: `${index * 3}s`
            }}
          >
            {/* Border glow container */}
            <div className="border-glow"></div>
            
            {/* Icon container */}
            <div className="relative mb-4 z-10">
              <img 
                src={icon} 
                alt={name} 
                className="w-14 h-14 transition-all duration-300"
              />
            </div>
            
            {/* Technology name */}
            <h3 className="text-lg font-medium text-white-off text-center relative z-10">{name}</h3>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-navy-light border border-white/10 text-white-off">
          <p>{description || `${name} – Technology`}</p>
        </TooltipContent>
      </Tooltip>

      <style jsx>{`
        .skill-card {
          transition: all 0.3s ease;
          overflow: visible;
        }

        .border-glow {
          position: absolute;
          inset: -2px;
          border-radius: 0.75rem;
          pointer-events: none;
          z-index: 1;
        }

        /* Sequential border glow animation */
        .skill-card.global-animation .border-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 2px solid transparent;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(59, 130, 246, 0.2) 25%,
            rgba(59, 130, 246, 0.8) 50%,
            rgba(59, 130, 246, 0.2) 75%,
            transparent 100%
          ) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: rotateBorderGlow 3s linear;
        }

        /* Hover glow effect */
        .skill-card.active .border-glow {
          border: 2px solid rgba(59, 130, 246, 0.5);
          box-shadow: 
            0 0 15px rgba(59, 130, 246, 0.3),
            0 0 30px rgba(59, 130, 246, 0.2);
          animation: hoverGlow 2s ease-in-out infinite;
        }

        @keyframes rotateBorderGlow {
          0% {
            clip-path: inset(0 0 calc(100% - 2px) 0);
          }
          25% {
            clip-path: inset(0 0 0 calc(100% - 2px));
          }
          50% {
            clip-path: inset(calc(100% - 2px) 0 0 0);
          }
          75% {
            clip-path: inset(0 calc(100% - 2px) 0 0);
          }
          100% {
            clip-path: inset(0 0 calc(100% - 2px) 0);
          }
        }

        @keyframes hoverGlow {
          0% {
            box-shadow: 
              0 0 15px rgba(59, 130, 246, 0.3),
              0 0 30px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 
              0 0 20px rgba(59, 130, 246, 0.5),
              0 0 40px rgba(59, 130, 246, 0.3);
          }
          100% {
            box-shadow: 
              0 0 15px rgba(59, 130, 246, 0.3),
              0 0 30px rgba(59, 130, 246, 0.2);
          }
        }
      `}</style>
    </TooltipProvider>
  );
};

export default SkillCard;
