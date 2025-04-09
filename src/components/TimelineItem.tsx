import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TimelineItemProps {
    title: string;
    month: string;
    year: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
    title,
    month,
    year,
}) => {
    const itemRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const monthRef = useRef<HTMLTimeElement>(null);
    const yearRef = useRef<HTMLTimeElement>(null);

    useEffect(() => {
        if (itemRef.current && lineRef.current && titleRef.current && monthRef.current && yearRef.current) {
            // Create a timeline for the vertical line animation
            const lineTl = gsap.timeline({ paused: true });
            
            // Animate the line from top to bottom
            lineTl.fromTo(
                lineRef.current,
                { 
                    height: 0,
                    opacity: 0
                },
                { 
                    height: 96, // 24px * 4 (h-24)
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                }
            );

            // Create a timeline for text animations
            const textTl = gsap.timeline({ paused: true });
            
            // Animate the title
            textTl.fromTo(
                titleRef.current,
                { 
                    opacity: 0,
                    y: -20
                },
                { 
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );
            
            // Animate the month
            textTl.fromTo(
                monthRef.current,
                { 
                    opacity: 0,
                    x: -10
                },
                { 
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                },
                "-=0.2"
            );
            
            // Animate the year
            textTl.fromTo(
                yearRef.current,
                { 
                    opacity: 0,
                    x: 10
                },
                { 
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                },
                "-=0.2"
            );

            // Play the animations when the component mounts
            lineTl.play();
            textTl.play();

            // Add hover effect to the entire item
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl.to(
                [titleRef.current, monthRef.current, yearRef.current],
                {
                    color: "#F899FF",
                    duration: 0.3,
                    ease: "power1.out"
                }
            );
            
            hoverTl.to(
                lineRef.current,
                {
                    backgroundColor: "#F899FF",
                    duration: 0.3,
                    ease: "power1.out"
                },
                0
            );

            // Add event listeners for hover
            itemRef.current.addEventListener("mouseenter", () => {
                hoverTl.play();
            });
            
            itemRef.current.addEventListener("mouseleave", () => {
                hoverTl.reverse();
            });

            // Cleanup function
            return () => {
                if (itemRef.current) {
                    itemRef.current.removeEventListener("mouseenter", () => {});
                    itemRef.current.removeEventListener("mouseleave", () => {});
                }
            };
        }
    }, []);

    return (
        <article ref={itemRef} className="flex flex-col cursor-pointer relative z-10">
            <h2 
                ref={titleRef}
                className="text-4xl font-medium text-stone-300 max-md:text-3xl max-sm:text-2xl"
            >
                {title}
            </h2>
            <div 
                ref={lineRef}
                className="mt-14 mb-9 h-24 bg-white w-[13px] origin-top" 
            />
            <time 
                ref={monthRef}
                dateTime={`2025-${month}-01`}
                className="text-3xl font-bold text-fuchsia-700 max-md:text-3xl max-sm:text-2xl"
            >
                {month}
            </time>
            <time 
                ref={yearRef}
                dateTime={year}
                className="text-3xl font-medium text-stone-300 max-md:text-3xl max-sm:text-2xl"
            >
                {year}
            </time>
        </article>
    );
};
