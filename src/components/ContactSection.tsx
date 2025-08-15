import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  EnvelopeSimple, 
  Phone, 
  MapPin, 
  GithubLogo, 
  LinkedinLogo,
  CheckCircle
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

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

    // Left column animation
    tl.fromTo(leftColumnRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Right column animation  
    tl.fromTo(rightColumnRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Social icons stagger
    tl.fromTo('.social-icon',
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Available section animation
    tl.fromTo('.availability-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    );

  }, []);

  const contactInfo = [
    {
      icon: EnvelopeSimple,
      label: 'Email',
      value: 'nandinirathod1201@gmail.com',
      href: 'mailto:nandinirathod1201@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 85007 21504',
      href: 'tel:+918500721504'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hyderabad',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: GithubLogo,
      name: 'GitHub',
      href: 'https://github.com/nandini-rathod',
      color: 'hover:text-foreground'
    },
    {
      icon: LinkedinLogo,
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/nandini-rathod-67080928a',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Looking for a motivated and skilled Computer Science student to join your software development team? I'm eager to contribute as an SDE Intern — let's connect!
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          
          {/* Left Column - Contact Info */}
          <div ref={leftColumnRef} className="space-y-8">
            <div className="glass glass-hover p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-primary">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Social & Availability */}
          <div ref={rightColumnRef} className="space-y-8">
            
            {/* Follow Me Section */}
            <div className="glass glass-hover p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-secondary">Social Media Accounts</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon glass-hover p-6 rounded-xl text-center group transition-colors duration-300 ${social.color}`}
                    >
                      <IconComponent 
                        size={32} 
                        className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" 
                      />
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Available for Work */}
            <div className="availability-section glass glass-hover p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-xl font-light text-accent">Available for Work</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Open to internships and opportunities in software development, frontend engineering, and problem-solving roles.
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
                <CheckCircle size={16} />
                <span>Responding within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;