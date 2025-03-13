
import React, { useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';
import AnimatedBackgroundIcons from './AnimatedBackgroundIcons';

type Job = {
  company: string;
  position: string;
  duration: string;
  description: string;
  responsibilities: string[];
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          
          // Observe timeline items once the section is visible
          timelineRefs.current.forEach((item, index) => {
            if (item) {
              setTimeout(() => {
                item.classList.add('opacity-100');
                item.classList.add('translate-y-0');
              }, index * 200);
            }
          });
          
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

  const jobs: Job[] = [
    {
      company: "Kongcepts Pvt. Ltd., Kandy, Sri Lanka",
      position: "Intern Software Engineer",
      duration: "Sept 2024 - Present",
      description: "Working as a software engineer intern developing web applications.",
      responsibilities: [
        "Developing web-based platforms to manage student records with admin panels",
        "Contributing to both React frontend and Laravel backend development",
        "Creating systems for car sales management with CodeIgniter and HTML",
        "Optimizing MySQL queries for improved performance",
        "Working with version control systems like Git"
      ]
    }
  ];

  const education = [
    {
      company: "Cardiff Metropolitan University",
      position: "Bachelor of Science with Honours in Software Engineering",
      duration: "Graduated: July 2024",
      description: "Completed a comprehensive degree program in Software Engineering.",
      responsibilities: [
        "Core courses in software development, databases, and web technologies",
        "Specialized in full-stack development and software architecture",
        "Completed projects using React, Spring Boot, and other modern frameworks",
        "Learned best practices in software design and implementation"
      ]
    },
    {
      company: "University of Bedfordshire",
      position: "Higher Diploma in Computer Science and Software Engineering",
      duration: "Completed: December 2022",
      description: "Foundation program focused on computer science fundamentals.",
      responsibilities: [
        "Studied programming fundamentals and algorithms",
        "Learned database design and management",
        "Developed skills in web development and UI design",
        "Completed practical projects applying theoretical concepts"
      ]
    }
  ];

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-navy relative opacity-0 transition-opacity duration-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-navy"></div>
      
      <div className="relative">
        <AnimatedBackgroundIcons />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-accent uppercase tracking-wider text-sm font-medium mb-2 animate-fade-in">Career & Education</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white-off animate-fade-in animate-delay-100">Professional Experience</h2>
            <div className="w-20 h-1 bg-blue-accent mx-auto mt-4 mb-6 animated-underline"></div>
          </div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-accent/80 via-blue-accent/50 to-blue-accent/10"></div>
            
            <div className="space-y-12">
              {jobs.map((job, index) => (
                <div 
                  key={index}
                  ref={el => timelineRefs.current[index] = el}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } opacity-0 translate-y-8 transition-all duration-700`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-navy-light border-4 border-blue-accent flex items-center justify-center z-10">
                    <Briefcase size={18} className="text-blue-accent" />
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pb-8 md:pb-0 ${
                    index % 2 === 0 ? 'md:pl-0 md:pr-16' : 'md:pl-16 md:pr-0'
                  } pl-16`}>
                    <div className="glass rounded-xl p-6 hover-scale">
                      <h3 className="text-xl font-semibold text-white-off">{job.position}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-accent font-medium">{job.company}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span className="text-muted-foreground text-sm">{job.duration}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{job.description}</p>
                      
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-accent flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Empty div for timeline alignment */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}

              {/* Education Section */}
              

              {education.map((edu, index) => (
                <div 
                  key={`edu-${index}`}
                  ref={el => timelineRefs.current[jobs.length + index] = el}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  } opacity-0 translate-y-8 transition-all duration-700`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-navy-light border-4 border-blue-accent flex items-center justify-center z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-accent">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                    </svg>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pb-8 md:pb-0 ${
                    index % 2 === 0 ? 'md:pl-16 md:pr-0' : 'md:pl-0 md:pr-16'
                  } pl-16`}>
                    <div className="glass rounded-xl p-6 hover-scale">
                      <h3 className="text-xl font-semibold text-white-off">{edu.position}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-blue-accent font-medium">{edu.company}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span className="text-muted-foreground text-sm">{edu.duration}</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{edu.description}</p>
                      
                      <ul className="space-y-2">
                        {edu.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-accent flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Empty div for timeline alignment */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
