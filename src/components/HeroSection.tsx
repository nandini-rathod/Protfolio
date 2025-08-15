import { useEffect, useRef } from 'react';
import { ArrowRight } from 'phosphor-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial state
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });

    // Animation sequence
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');

    // Floating animation for CTA button
    gsap.to(ctaRef.current, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2
    });

  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="text-primary ">Nandini</span>
          <br />
          <span className="text-secondary">Computer Science Student</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          A passionate Computer Science student with strong problem-solving skills, experienced in software development, and always eager to learn new technologies.
        </p>

        <div ref={ctaRef}>
          <Button
            onClick={scrollToContact}
            className="glass-hover bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 px-8 py-6 text-lg rounded-full glow-primary group hover:scale-105 transition-all duration-300"
          >
            Hire Me
            <ArrowRight 
              size={20} 
              className="ml-2 group-hover:translate-x-1 transition-transform duration-300" 
            />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground">
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm font-light mb-2">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;