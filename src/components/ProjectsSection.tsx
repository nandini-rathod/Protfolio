import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, GithubLogo, ArrowSquareOut } from 'phosphor-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'CarbonSense',
      description: 'A sustainability-focused application designed to help users track and reduce their carbon footprint through intelligent monitoring and actionable insights.',
      image: '/Project1.png',
      github: 'https://github.com/nandini-rathod/CarbonSense',
      demo: 'https://github.com/nandini-rathod/CarbonSense',
      tech: ['Sustainability', 'Carbon Tracking', 'Environmental Tech']
    },

    {
      id: 2,
      title: 'DSA-Hub',
      description: 'A comprehensive platform for practicing Data Structures and Algorithms with interactive problems, solutions, and learning resources.',
      image: '/Project3.png', // replace with your DSA-Hub project image path
      github: 'https://github.com/nandini-rathod/DSA-Hub', // GitHub repo link
      demo: 'https://dsa-hub-beta.vercel.app', // live demo link if available
      tech: ['React', 'JavaScript', 'DSA', 'Algorithm Practice']
    },

    {
      id: 3,
      title: 'Web Page UI Design',
      description: 'A comprehensive UI/UX design project showcasing modern web design principles, created using Figma with focus on user experience and visual aesthetics.',
      image: '/Project2.png',
      github: 'https://www.figma.com/proto/uC23yZ4ln2bibKV1avu2I9/WEB-PAGE?node-id=1-2&t=boxNZV33GceTKtjE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2',
      demo: 'https://www.figma.com/proto/uC23yZ4ln2bibKV1avu2I9/WEB-PAGE?node-id=1-2&t=boxNZV33GceTKtjE-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2',
      tech: ['Figma', 'UI/UX Design', 'Prototyping', 'Web Design']
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(sectionRef.current,
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1 }
    );

  }, []);

  useEffect(() => {
    // Animate project transition
    gsap.fromTo('.project-card',
      { opacity: 0, x: 100, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [currentProject]);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProjectData = projects[currentProject];

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            A showcase of my recent work and the technologies I'm passionate about
          </p>
        </div>

        {/* Circular Carousel */}
        <div ref={carouselRef} className="relative max-w-4xl mx-auto">
          
          {/* Main Project Display */}
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="project-card glass glass-hover rounded-2xl overflow-hidden max-w-2xl w-full">
              
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <img 
                  src={currentProjectData.image} 
                  alt={currentProjectData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-light mb-4 text-foreground">
                  {currentProjectData.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {currentProjectData.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProjectData.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="glass-hover border-primary/20 text-primary hover:bg-primary/10"
                    onClick={() => window.open(currentProjectData.github, '_blank')}
                  >
                    <GithubLogo size={16} className="mr-2" />
                    Code
                  </Button>
                  
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.open(currentProjectData.demo, '_blank')}
                  >
                    <ArrowSquareOut size={16} className="mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 gap-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="glass-hover border-primary/20 text-primary hover:bg-primary/10 rounded-full w-12 h-12"
            >
              <ArrowLeft size={20} />
            </Button>

            {/* Project Indicators */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject
                      ? 'bg-primary scale-125'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="glass-hover border-primary/20 text-primary hover:bg-primary/10 rounded-full w-12 h-12"
            >
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Project Counter */}
          <div className="text-center mt-6">
            <span className="text-sm text-muted-foreground">
              {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;