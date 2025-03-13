import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ExternalLink, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showMore, setShowMore] = useState(false);

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

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const displayedProjects = showMore ? projects : projects.slice(0, 9);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-navy relative opacity-0 transition-opacity duration-1000"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-navy"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-accent uppercase tracking-wider text-sm font-medium mb-2 animate-fade-in">My Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white-off animate-fade-in animate-delay-100">Featured Projects</h2>
            <div className="w-20 h-1 bg-blue-accent mx-auto mt-4 mb-6 animated-underline"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-navy-light border border-blue-500/30 hover:border-blue-accent transition-all duration-300 h-full">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white-off mb-3 group-hover:text-blue-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                        <span 
                          key={index} 
                          className="bg-navy px-2 py-1 rounded-md text-xs text-blue-accent/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="bg-navy px-2 py-1 rounded-md text-xs text-muted-foreground">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-blue-accent text-sm">
                      <span className="underline underline-offset-2">View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {projects.length > 9 && !showMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowMore(true)}
                className="bg-navy-light text-white-off px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all inline-flex items-center gap-2"
              >
                Show More Projects
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
