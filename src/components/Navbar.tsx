import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const location = useLocation();
  const isProjectPage = location.pathname !== '/';

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // If we're on the project details page, navigate to home first
    if (isProjectPage) {
      window.location.href = `/${href}`;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-navy/90 backdrop-blur-md shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <a 
            href="#home" 
            className="text-2xl font-bold text-white-off tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              if (isProjectPage) {
                window.location.href = '/#home';
              } else {
                handleNavClick("#home");
              }
            }}
          >
            <span className="text-blue-accent">T</span>hisara
          </a>

          {/* Desktop Navigation */}
          {!isProjectPage && (
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative text-sm font-medium transition-colors duration-300
                    ${activeSection === item.href.slice(1) 
                      ? 'text-blue-accent' 
                      : 'text-white-off hover:text-blue-accent'
                    }`}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-accent animate-expandWidth"></span>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Mobile menu button */}
          {!isProjectPage && (
            <button
              className="md:hidden text-white-off hover:text-blue-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Navigation */}
      {!isProjectPage && (
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-navy-light/95 backdrop-blur-md transition-all duration-300 overflow-hidden glass ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col py-4 px-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative text-sm font-medium transition-colors duration-300
                  ${activeSection === item.href.slice(1) 
                    ? 'text-blue-accent' 
                    : 'text-white-off hover:text-blue-accent'
                  }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-accent animate-expandWidth"></span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
