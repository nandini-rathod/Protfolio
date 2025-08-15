import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, percentageRef.current], { opacity: 0, y: 30 });
    gsap.set(progressBarRef.current, { width: '0%' });

    // Animation sequence
    tl.to([logoRef.current, percentageRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2
    })
    .to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentageRef.current) {
          percentageRef.current.textContent = `${progress}%`;
        }
      }
    })
    .to([logoRef.current, percentageRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.5')
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-secondary/20 blur-xl animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-accent/20 blur-xl animate-float" />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Name */}
        <div ref={logoRef} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-light text-foreground mb-4">
            <span className="text-primary">R</span>athod{' '}
            <span className="text-secondary">N</span>andini
          </h1>
          <p className="text-xl text-muted-foreground font-light tracking-wide">
            Computer Science Student
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 mx-auto">
          <div className="relative h-1 bg-muted rounded-full overflow-hidden mb-4">
            <div 
              ref={progressBarRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{ width: '0%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full animate-pulse" />
          </div>
          
          {/* Percentage */}
          <div 
            ref={percentageRef}
            className="text-sm text-muted-foreground font-light tracking-wider"
          >
            0%
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-6">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-sm text-muted-foreground">Loading</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;