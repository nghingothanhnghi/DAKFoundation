import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

// Import icons from assets
import superAppIcon from "../assets/superApp.svg";
import aiIcon from "../assets/ai.svg";
import blockchainIcon from "../assets/blockchain.svg";
import cloudIcon from "../assets/cloud.svg";

gsap.registerPlugin(ScrollTrigger, Draggable);

interface CarouselItem {
  title: string;
  description: string;
  color: string;
  icon: string;
}

const carouselItems: CarouselItem[] = [
  {
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technology",
    color: "#7000A8",
    icon: aiIcon
  },
  {
    title: "Security",
    description: "Enterprise-grade security for your assets",
    color: "#1D1050",
    icon: blockchainIcon
  },
  {
    title: "Scalability",
    description: "Built to grow with your needs",
    color: "#7000A8",
    icon: cloudIcon
  },
  {
    title: "Community",
    description: "Join our thriving ecosystem",
    color: "#1D1050",
    icon: superAppIcon
  }
];

export const HeroCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const carouselTriggerRef = useRef<ScrollTrigger | null>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedTitle, setAnimatedTitle] = useState(carouselItems[0].title);
  const [animatedDesc, setAnimatedDesc] = useState(carouselItems[0].description);

  const updateActiveIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (carouselRef.current && carouselContentRef.current) {
      gsap.set(carouselContentRef.current, { x: 0 });

      carouselTriggerRef.current = ScrollTrigger.create({
        trigger: carouselRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        markers: false,
        onUpdate: (self) => {
          if (!isDragging) {
            const progress = self.progress;

            gsap.to(carouselContentRef.current, {
              x: -progress * 100 + "%",
              duration: 0.3,
              ease: "power1.out"
            });

            const newIndex = Math.min(
              Math.floor(progress * carouselItems.length),
              carouselItems.length - 1
            );
            updateActiveIndex(newIndex);
          }
        }
      });

      draggableInstanceRef.current = Draggable.create(carouselContentRef.current, {
        type: "x",
        bounds: {
          minX: -((carouselItems.length - 1) * 300 + (carouselItems.length - 1) * 24),
          maxX: 0
        },
        onDragStart: () => {
          setIsDragging(true);
          carouselTriggerRef.current?.disable();
        },
        onDragEnd: () => {
          setIsDragging(false);
          carouselTriggerRef.current?.enable();

          if (carouselContentRef.current) {
            const x = gsap.getProperty(carouselContentRef.current, "x") as number;
            const itemWidth = 300 + 24;
            const newIndex = Math.min(
              Math.max(Math.round(Math.abs(x) / itemWidth), 0),
              carouselItems.length - 1
            );
            updateActiveIndex(newIndex);
          }
        }
      })[0];

      return () => {
        carouselTriggerRef.current?.kill();
        draggableInstanceRef.current?.kill();
      };
    }
  }, [isDragging]);

  useEffect(() => {
    if (titleRef.current && descriptionRef.current) {
      const titleEl = titleRef.current;
      const descEl = descriptionRef.current;

      // Fade out current content
      gsap.to([titleEl, descEl], {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          // Update content
          setAnimatedTitle(carouselItems[activeIndex].title);
          setAnimatedDesc(carouselItems[activeIndex].description);

          // Fade in new content
          gsap.to([titleEl, descEl], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: 0.1
          });
        }
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full md:w-[600px]">
      <div
        ref={carouselRef}
        className="relative w-full overflow-hidden py-8 cursor-grab active:cursor-grabbing"
      >
        <div
          ref={carouselContentRef}
          className="flex gap-6 px-4 touch-none"
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] h-[400px] rounded-lg select-none relative group"
              style={{ backgroundColor: item.color }}
            >
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src={item.icon} 
                  alt={item.title} 
                  className="w-32 h-32 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Title & description outside carousel */}
      <div className="mt-8 px-4 relative">
        {/* Dotted line gradient */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full h-24 w-px">
          <div
            className="h-full w-full bg-gradient-to-b from-transparent via-white/50 to-transparent"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, white 2px, transparent 2px)",
              backgroundSize: "8px 16px"
            }}
          />
        </div>

        <div className="max-w-[300px] mx-auto relative text-left">
          <h3
            ref={titleRef}
            className="text-2xl font-bold text-white mb-2"
          >
            {animatedTitle}
          </h3>
          <p
            ref={descriptionRef}
            className="text-sm text-white opacity-80"
          >
            {animatedDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
