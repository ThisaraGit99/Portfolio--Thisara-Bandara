
import React from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={18} />, url: "https://github.com/ThisaraGit99", label: "GitHub" },
    { icon: <Linkedin size={18} />, url: "https://linkedin.com/in/thisaranavodbandara/", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-navy py-10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold text-white-off tracking-tight">
              <span className="text-blue-accent">T</span>hisara
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              Full-Stack Developer | Creating digital experiences that matter
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/40 flex items-center justify-center hover:bg-blue-accent/20 transition-colors group"
                aria-label={link.label}
              >
                <span className="text-muted-foreground group-hover:text-blue-accent transition-colors">
                  {link.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Thisara Navod Bandara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
