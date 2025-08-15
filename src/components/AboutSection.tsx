import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileHtml, 
  FileCss, 
  Lightning, 
  Atom, 
  Archive,
  DeviceMobile,
  Database,
  GitBranch 
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'C++', icon: Lightning },
    { name: 'Python', icon: Lightning },
    { name: 'DSA', icon: Archive },
    { name: 'HTML5', icon: FileHtml },
    { name: 'CSS3', icon: FileCss },
    { name: 'JavaScript', icon: Lightning },
    { name: 'MySQL', icon: Database },
    { name: 'MongoDB', icon: Database },
    { name: 'Git', icon: GitBranch },
    { name: 'GitHub', icon: GitBranch },
    { name: 'TailwindCSS', icon: FileCss },
    { name: 'React', icon: Atom }
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

    // Section fade in
    tl.fromTo(sectionRef.current, 
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1 }
    );

    // Image animation
    tl.fromTo(imageRef.current,
      { opacity: 0, x: -50, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Content animation
    tl.fromTo(contentRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Skills stagger animation
    tl.fromTo('.skill-item',
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.4'
    );

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center glass glow-primary overflow-hidden">
                <img 
                  src="/profile.png"
                  alt="Rathod Nandini - Computer Science Student" 
                  className="w-72 h-72 rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Floating Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                About <span className="text-primary">Me</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Hi, I'm Rathod Nandini, a Computer Science student passionate about building impactful software solutions. I have a strong foundation in data structures and algorithms, experience with multiple programming languages, and proficiency in C++, Python, MySQL, MongoDB, Git/GitHub, and modern frontend technologies. I enjoy solving challenging problems, exploring new tools and frameworks, and continuously improving my development skills. This portfolio showcases my work and the tech stack I've mastered so far.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-light mb-6 text-primary">Core Skills</h3>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="skill-item glass-hover p-4 rounded-xl text-center group cursor-pointer"
                    >
                      <IconComponent 
                        size={32} 
                        className="mx-auto mb-2 text-primary group-hover:text-secondary duration-300 group-hover:scale-110 transform transition-colors"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;