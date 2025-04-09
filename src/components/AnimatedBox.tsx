import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBox = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('AnimatedBox mounted');
    console.log('Box ref:', boxRef.current);
    
    if (boxRef.current) {
      // Create a more complex animation sequence
      timelineRef.current = gsap.timeline({ 
        repeat: -1,
        repeatDelay: 1
      });
      
      console.log('Creating animation timeline');
      
      // Reset initial state
      gsap.set(boxRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1
      });
      
      timelineRef.current
        .to(boxRef.current, {
          x: 100,
          y: -50,
          rotation: 180,
          duration: 1.5,
          ease: "power1.inOut"
        })
        .to(boxRef.current, {
          x: 0,
          y: 0,
          rotation: 360,
          duration: 1.5,
          ease: "power1.inOut"
        })
        .to(boxRef.current, {
          scale: 1.5,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        })
        .to(boxRef.current, {
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.3)"
        });

      console.log('Animation timeline created');
    }
  }, []);

  const playAnimation = () => {
    console.log('Play animation clicked');
    if (timelineRef.current) {
      console.log('Restarting timeline');
      timelineRef.current.restart();
      
      // Animate particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.to(particles, {
          y: -100,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(particles, { y: 0, opacity: 1 });
          }
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">GSAP Animation</h2>
      
      <div className="relative">
        <div 
          ref={boxRef}
          className="w-24 h-24 bg-blue-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow mb-4"
          style={{ transformOrigin: 'center center' }}
        />
        
        <div 
          ref={particlesRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{ 
                left: `${Math.random() * 100 - 50}px`, 
                top: `${Math.random() * 100 - 50}px`,
                backgroundColor: 'red',
                opacity: 1
              }}
            />
          ))}
        </div>
      </div>
      
      <button 
        onClick={playAnimation}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Restart Animation
      </button>
    </div>
  );
};

export default AnimatedBox; 