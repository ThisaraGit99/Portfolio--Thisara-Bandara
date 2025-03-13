import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SkillCard from './SkillCard';

type Skill = {
  name: string;
  icon: string;
  color: string;
  description?: string;
  category: 'language' | 'framework' | 'database' | 'tool';
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const CARD_WIDTH = 180; // Width of a single card including gap

  const skills: Skill[] = [
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: '#F7DF1E',
      category: 'language',
      description: 'JavaScript – Dynamic Programming Language'
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: '#3178C6',
      category: 'language',
      description: 'TypeScript – Typed JavaScript Superset'
    },
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      color: '#ED8B00',
      category: 'language'
    },
    {
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      color: '#777BB4',
      category: 'language'
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: '#3776AB',
      category: 'language'
    },
    {
      name: 'React.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61DAFB',
      category: 'framework'
    },
    {
      name: 'Spring Boot',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      color: '#6DB33F',
      category: 'framework'
    },
    {
      name: 'Laravel',
      icon: '/laravel-svgrepo-com.svg',
      color: '#FF2D20',
      category: 'framework'
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: '#339933',
      category: 'framework'
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      color: '#ffffff',
      category: 'framework'
    },
    {
      name: 'Flask',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      color: '#000000',
      category: 'framework'
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      color: '#4479A1',
      category: 'database'
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: '#47A248',
      category: 'database'
    },
    {
      name: 'Git',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: '#F05032',
      category: 'tool'
    },
    {
      name: 'VS Code',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      color: '#007ACC',
      category: 'tool'
    },
    {
      name: 'Figma',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      color: '#F24E1E',
      category: 'tool'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollOneCard = () => {
      if (!isPaused) {
        // Smoothly scroll one card width
        container.scrollBy({
          left: CARD_WIDTH,
          behavior: 'smooth'
        });

        // Check if we need to reset to the beginning
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    };

    // Start auto-scroll with continuous smooth scrolling
    const scrollInterval = setInterval(scrollOneCard, 2000);
    autoScrollIntervalRef.current = scrollInterval;

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isPaused]);

  // Handle scroll position and arrows visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    // Handle mouse wheel horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: 'smooth'
        });
        checkScroll();
      }
    };

    // Handle touch events for swipe
    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientX;
      setIsPaused(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStart === 0) return;
      const touchDelta = touchStart - e.touches[0].clientX;
      container.scrollBy({
        left: touchDelta,
        behavior: 'smooth'
      });
      touchStart = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      touchStart = 0;
      setTimeout(() => setIsPaused(false), 1000);
    };

    container.addEventListener('scroll', checkScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', checkScroll);

    // Initial check
    checkScroll();

    return () => {
      container.removeEventListener('scroll', checkScroll);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsPaused(true);
    const scrollAmount = direction === 'left' ? -CARD_WIDTH : CARD_WIDTH;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    // Resume auto-scroll after manual navigation
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 md:py-32 relative opacity-0 transition-opacity duration-1000"
      style={{ 
        background: 'linear-gradient(145deg, #1A2526 0%, #1E2D2F 100%)'
      }}
    >
      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white-off animate-fade-in animate-delay-100">
              Technical Competencies
            </h2>
            <div className="w-20 h-1 bg-blue-accent mx-auto mt-4 mb-6 animated-underline"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are the technologies I've worked with and my areas of expertise.
            </p>
          </div>

          <div 
            className="relative group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setTimeout(() => setIsPaused(false), 500);
            }}
          >
            {showLeftArrow && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-navy-light/80 hover:bg-navy-light p-2 rounded-full 
                  shadow-lg backdrop-blur-sm border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-white-off" />
              </button>
            )}
            
            {showRightArrow && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-navy-light/80 hover:bg-navy-light p-2 rounded-full 
                  shadow-lg backdrop-blur-sm border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-white-off" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex-none w-[150px] snap-start"
                  onMouseEnter={() => {
                    setActiveCardIndex(index);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setActiveCardIndex(null);
                    setTimeout(() => setIsPaused(false), 500);
                  }}
                >
                  <SkillCard
                    name={skill.name}
                    icon={skill.icon}
                    color={skill.color}
                    description={skill.description}
                    index={index}
                    isActive={activeCardIndex === index}
                    globalActive={activeCardIndex === null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default Skills;
