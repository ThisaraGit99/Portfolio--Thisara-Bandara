import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-navy rounded-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white-off hover:text-blue-accent transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-8">
          <img 
            src={project.image || '/placeholder.svg'} 
            alt={project.title} 
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg mb-8" 
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-white-off mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies?.map((tech: string, index: number) => (
              <span key={index} className="bg-navy-light px-3 py-1 rounded-full text-sm text-white-off">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-white-off mb-4">Project Overview</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white-off mb-4">Challenge & Approach</h2>
              <p className="text-muted-foreground">
                {project.challenge || "This project presented unique challenges that required innovative solutions and careful planning to overcome."}
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white-off mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              {(project.features || [
                "Responsive design for all screen sizes",
                "Intuitive user interface and experience",
                "Optimized performance and loading speed",
                "Secure authentication and data handling"
              ]).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white-off mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.technologies?.map((tech: string, index: number) => (
                <div key={index} className="bg-navy-light p-4 rounded-lg text-center">
                  <span className="text-white-off">{tech}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-accent text-white px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-opacity-80 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Live Demo
              </a>
            )}
            
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-navy-light text-white-off px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-opacity-80 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 