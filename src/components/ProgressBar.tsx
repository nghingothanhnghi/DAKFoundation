import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const ProgressBar: React.FC = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const filledRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current && backgroundRef.current && filledRef.current && placeholderRef.current) {
      // Initial state
      gsap.set([backgroundRef.current, filledRef.current], {
        scaleX: 0,
        transformOrigin: "left center"
      });

      gsap.set(placeholderRef.current, {
        opacity: 0,
        y: 20
      });

      // Create animation timeline
      const progressTl = gsap.timeline({
        defaults: {
          ease: "power2.inOut"
        }
      });

      // Animate the background first, then the filled portion
      progressTl
        .to(backgroundRef.current, {
          scaleX: 1,
          duration: 0.8
        })
        .to(filledRef.current, {
          scaleX: 1,
          duration: 1
        }, "-=0.4")
        .to(placeholderRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5
        }, "-=0.3");

      // Add subtle pulsing animation to the filled portion
      gsap.to(filledRef.current, {
        opacity: 0.85,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <div ref={progressRef} className="relative h-24">
      {/* Background bar */}
      <div 
        ref={backgroundRef}
        className="absolute left-0 h-full w-full bg-zinc-800/50 backdrop-blur-sm rounded-lg" 
      />
      {/* Filled progress */}
      <div 
        ref={filledRef}
        className="absolute left-0 h-full w-[33%] bg-[linear-gradient(112deg,#F899FF_0.24%,#A0F_99.76%)] rounded-lg" 
      />
      {/* Placeholder outside the progress bar */}
      <div 
        ref={placeholderRef}
        className="absolute -right-20 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-xs font-medium"
      >
        33%
      </div>
    </div>
  );
};
