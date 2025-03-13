import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const location = useLocation();

  useEffect(() => {
    // If we're on the project details page, set active section to projects
    if (location.pathname !== '/') {
      setActiveSection('projects');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the section ID and remove any leading slash
            const sectionId = entry.target.id.replace(/^#/, '');
            setActiveSection(sectionId);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-10% 0px -10% 0px' // Adjust the trigger point
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Set initial active section based on scroll position
    const setInitialActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.getBoundingClientRect().height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          const sectionId = section.id.replace(/^#/, '');
          setActiveSection(sectionId);
        }
      });
    };

    // Set initial active section
    setInitialActiveSection();

    // Update active section on scroll
    window.addEventListener('scroll', setInitialActiveSection);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', setInitialActiveSection);
    };
  }, [location.pathname]);

  return activeSection;
}; 