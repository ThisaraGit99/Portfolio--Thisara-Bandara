
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { ArrowDown, Download, Code, Server, Database, Layout } from 'lucide-react';

const Hero = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [
          'Hi, I\'m Thisara Navod Bandara',
          'I\'m a Full-Stack Developer',
          'I build modern web applications'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }

    // Set up parallax effect
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("/hero-bg.jpg")', 
          filter: 'brightness(0.3)' 
        }}
      ></div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="tech-icon" style={{ top: '20%', left: '15%', animationDelay: '0s' }}>
          <Code size={36} className="text-blue-400" />
        </div>
        <div className="tech-icon" style={{ top: '65%', left: '10%', animationDelay: '1.5s' }}>
          <Server size={36} className="text-green-400" />
        </div>
        <div className="tech-icon" style={{ top: '30%', right: '15%', animationDelay: '0.8s' }}>
          <Layout size={36} className="text-purple-400" />
        </div>
        <div className="tech-icon" style={{ top: '75%', right: '10%', animationDelay: '2.2s' }}>
          <Database size={36} className="text-yellow-400" />
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden opacity-80">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-accent/10 filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/10 filter blur-[100px] animate-pulse-slow animation-delay-200"></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-blue-accent text-lg md:text-xl font-medium mb-4 animate-fade-in opacity-0">
            Welcome to my portfolio
          </h2>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white-off leading-tight mb-6 animate-fade-in opacity-0 animate-delay-200">
            <span ref={typedRef} className="text-white-off"></span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in opacity-0 animate-delay-300">
            I create elegant solutions to complex problems using modern technologies and best practices.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0 animate-delay-400">
            <a
              href="#contact"
              className="hire-me-btn px-8 py-3 bg-blue-accent text-white-off rounded-md hover:bg-blue-accent/90 transition-all duration-300 font-medium relative overflow-hidden group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">Hire Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white-off hover:text-blue-accent transition-all duration-300 animate-bounce"
        aria-label="Scroll Down"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
