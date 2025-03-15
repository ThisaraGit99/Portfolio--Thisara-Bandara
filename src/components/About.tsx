import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-navy-light relative opacity-0 transition-opacity duration-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-light"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-accent uppercase tracking-wider text-sm font-medium mb-2 animate-fade-in">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white-off animate-fade-in animate-delay-100">Get to know me better</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group animate-fade-in-left opacity-0">
              <div className="absolute inset-0 bg-blue-accent/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="overflow-hidden rounded-xl border border-white/10 relative">
                <img 
                  src="/Portfolio--Thisara-Bandara/profilepic.jpg" 
                  alt="Thisara Navod Bandara" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            <div className="animate-fade-in-right opacity-0">
              <h3 className="text-2xl font-semibold mb-4 text-white-off">
                Dedicated and Innovative <span className="text-blue-accent">Software Engineer</span>
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Hello! I'm Thisara Navod Bandara, a passionate Full-Stack Developer with expertise in building responsive and scalable web applications. With a Bachelor's degree in Software Engineering and professional experience as a Software Engineer Intern, I enjoy creating robust solutions to complex problems.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-blue-accent rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-white-off">Education</h4>
                    <p className="text-sm text-muted-foreground">BSc (Hons) Software Engineering</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-blue-accent rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-white-off">Experience</h4>
                    <p className="text-sm text-muted-foreground">Software Engineer Intern</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-blue-accent rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-white-off">Specialization</h4>
                    <p className="text-sm text-muted-foreground">Full-Stack Development</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-2 bg-blue-accent rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-white-off">Location</h4>
                    <p className="text-sm text-muted-foreground">Mawanella, Sri Lanka</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="hire-me-btn px-8 py-3 bg-blue-accent text-white-off rounded-md hover:bg-blue-accent/90 transition-all duration-300 font-medium relative overflow-hidden group"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10">Let's Connect</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                </a>
                
                <a
                  href="/Portfolio--Thisara-Bandara/CV_Thisara.pdf"
                  className="hire-me-btn px-8 py-3 bg-secondary/70 text-white-off rounded-md hover:bg-secondary transition-all duration-300 font-medium flex items-center justify-center gap-2 backdrop-blur-sm group relative overflow-hidden"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Download size={18} />
                    Download CV
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
