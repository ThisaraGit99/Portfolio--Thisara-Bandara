
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';
import AnimatedBackgroundIcons from '../components/AnimatedBackgroundIcons';
import { useTheme } from '../hooks/use-theme';
import '../styles/animations.css';

const Index = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add fade-in animation to elements with animate-fade-in class
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('opacity-100');
      }, index * 100);
    });
    
    // Add reveal animations for sections on scroll
    const revealSections = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
      revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('revealed');
        }
      });
    };
    
    // Auto-highlight active section in navbar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const highlightNavOnScroll = () => {
      let scrollY = window.scrollY;
      
      sections.forEach(section => {
        // Type casting to HTMLElement to access offsetHeight and offsetTop
        const htmlSection = section as HTMLElement;
        const sectionHeight = htmlSection.offsetHeight;
        const sectionTop = htmlSection.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('text-blue-accent');
            link.classList.add('text-muted-foreground');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.remove('text-muted-foreground');
              link.classList.add('text-blue-accent');
            }
          });
        }
      });
    };
    
    // Initial check on page load
    revealOnScroll();
    highlightNavOnScroll();
    
    // Add scroll event listeners
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('scroll', highlightNavOnScroll);
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {
          e.preventDefault();
        });
      });
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('scroll', highlightNavOnScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen ${theme} bg-background text-foreground overflow-hidden`}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <div className="relative">
          <AnimatedBackgroundIcons />
          <Experience />
        </div>
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
