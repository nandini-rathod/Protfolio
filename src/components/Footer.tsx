import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating particles animation
    gsap.to('.floating-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });

  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com', name: 'GitHub' },
    { icon: LinkedinLogo, href: 'https://linkedin.com', name: 'LinkedIn' }
  ];

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/50">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle absolute top-8 left-1/4 w-2 h-2 bg-primary/30 rounded-full" />
        <div className="floating-particle absolute top-16 right-1/3 w-1 h-1 bg-secondary/40 rounded-full" />
        <div className="floating-particle absolute bottom-12 left-1/2 w-1.5 h-1.5 bg-accent/35 rounded-full" />
        <div className="floating-particle absolute top-20 right-1/4 w-1 h-1 bg-primary/25 rounded-full" />
        <div className="floating-particle absolute bottom-8 left-1/3 w-2 h-2 bg-secondary/30 rounded-full" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-light tracking-wide mb-2">
              <span className="text-primary">R</span>athod{' '}
              <span className="text-secondary">N</span>andini
            </div>
            <p className="text-sm text-muted-foreground">
              Computer Science Student
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center">
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-hover flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <IconComponent 
                    size={18} 
                    className="group-hover:scale-110 transition-transform duration-300" 
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © 2024 Built with
            <Heart size={14} className="text-red-500 animate-pulse" />
            by Rathod Nandini
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;