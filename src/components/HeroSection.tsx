import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const heading1Ref = useRef<HTMLHeadingElement>(null);
    const heading2Ref = useRef<HTMLHeadingElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<any>(null);

    useEffect(() => {
        if (
            sectionRef.current &&
            heading1Ref.current &&
            heading2Ref.current &&
            carouselRef.current &&
            containerRef.current
        ) {
            // Reset any existing transforms
            gsap.set(sectionRef.current, { clearProps: "transform" });
            gsap.set(heading1Ref.current, { opacity: 1, y: 0 });
            gsap.set(heading2Ref.current, { opacity: 1, y: 0 });
            gsap.set(carouselRef.current, { opacity: 0 });
            
            // Scroll-triggered animation for transforming the text and revealing carousel
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    markers: false,
                    onEnter: () => {
                        // Ensure no transform is applied when entering
                        gsap.set(sectionRef.current, { clearProps: "transform" });
                    },
                    onLeaveBack: () => {
                        // Reset transform when scrolling back up
                        gsap.set(sectionRef.current, { clearProps: "transform" });
                    }
                },
            });

            // Store the ScrollTrigger instance for cleanup
            if (scrollTl.scrollTrigger) {
                scrollTriggerRef.current = scrollTl.scrollTrigger;
            }

            scrollTl
                .to(
                    heading1Ref.current,
                    {
                        x: -100,
                        y: -100,
                        fontSize: "24px",
                        duration: 1,
                        ease: "none",
                    },
                    0
                )
                .to(
                    heading2Ref.current,
                    {
                        x: -100,
                        y: -100,
                        fontSize: "34px",
                        duration: 1,
                        ease: "none",
                    },
                    0
                )
                .fromTo(
                    carouselRef.current,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
                    0.5
                );
        }

        // Cleanup function to reset transforms and kill ScrollTrigger
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
            if (sectionRef.current) {
                gsap.set(sectionRef.current, { clearProps: "transform" });
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="overflow-hidden relative bg-[radial-gradient(50%_50%_at_50%_50%,#7000A8_0%,#1D1050_100%)] w-full h-screen flex items-center justify-center"
            style={{ 
                margin: 0, 
                padding: 0, 
                position: "relative", 
                top: 0,
                width: "100vw",
                height: "100vh",
                maxWidth: "100%"
            }}
        >
            <div
                className="absolute top-0 left-0 size-full"
                role="presentation"
                aria-hidden="true"
            />
            <div
                ref={containerRef}
                className="relative px-5 mx-auto my-0 max-w-[1200px] z-[1] max-md:px-10 max-sm:px-5 text-center h-full flex flex-col items-center justify-center"
                aria-label="Hero content"
                style={{ margin: 0, padding: 0, position: "relative", top: 0 }}
            >
                <h1
                    ref={heading1Ref}
                    className="mb-4 text-7xl text-center max-md:text-5xl max-sm:text-4xl"
                    style={{
                        background: "linear-gradient(100.73deg, #0066FF 13.44%, #AE0BFF 49.78%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: 0,
                        opacity: 1,
                    }}
                >
                    Empower Your Future
                </h1>
                <h2
                    ref={heading2Ref}
                    className="mx-auto my-0 text-8xl italic font-bold text-center text-white max-w-[840px] max-md:text-7xl max-sm:text-5xl"
                    style={{ margin: 0, opacity: 1 }}
                >
                    Build, Innovate &amp; Thrive With DAK Foundation
                </h2>
                
                {/* Carousel Component */}
                <div 
                    ref={carouselRef} 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 flex items-center justify-center"
                >
                    <div className="text-white text-2xl">Carousel Component</div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;