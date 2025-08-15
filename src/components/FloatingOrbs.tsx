import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingOrbs = () => {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = orbsRef.current?.children;
    if (!orbs) return;

    Array.from(orbs).forEach((orb, index) => {
      gsap.to(orb, {
        y: -20,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.3
      });

      gsap.to(orb, {
        x: 15,
        duration: 4 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      });
    });
  }, []);

  return (
    <div ref={orbsRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Large Primary Orb */}
      <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      
      {/* Medium Secondary Orb */}
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary/15 blur-2xl" />
      
      {/* Small Accent Orb */}
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-accent/20 blur-xl" />
      
      {/* Tiny Floating Particles */}
      <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-primary/8 blur-lg" />
      <div className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-secondary/12 blur-lg" />
      <div className="absolute top-3/4 left-1/5 w-16 h-16 rounded-full bg-accent/15 blur-md" />
    </div>
  );
};

export default FloatingOrbs;