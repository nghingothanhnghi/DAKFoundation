import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCarousel } from "./HeroCarousel";

// Import background image
import heroBackground from "../assets/hero_background.jpg";

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
            gsap.set(heading1Ref.current, { opacity: 1, y: 0, x: 0 });
            gsap.set(heading2Ref.current, { opacity: 1, y: 0, x: 0 });
            gsap.set(carouselRef.current, { opacity: 0 });
            
            // Scroll-triggered animation for transforming the text and revealing carousel
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=500",
                    scrub: 0.5,
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
                        y: -window.innerHeight / 2 + 50,  // Position h1 at the top
                        x: -containerRef.current.offsetWidth / 2 + 100,  // Position h1 to the left
                        scale: 0.2,  // Scale for better visibility
                        duration: 1,
                        ease: "power2.inOut",
                        onStart: () => {
                            // Ensure the gradient text remains visible
                            if (heading1Ref.current) {
                                heading1Ref.current.style.webkitTextFillColor = "transparent";
                                heading1Ref.current.style.background = "linear-gradient(100.73deg, #0066FF 13.44%, #AE0BFF 49.78%)";
                                heading1Ref.current.style.webkitBackgroundClip = "text";
                                heading1Ref.current.style.backgroundClip = "text";
                            }
                        }
                    },
                    0
                )
                .to(
                    heading2Ref.current,
                    {
                        y: -window.innerHeight / 2 + 120,  // Position h2 below h1
                        x: -containerRef.current.offsetWidth / 2 + 100,  // Align with h1
                        scale: 0.2,  // Scale for better visibility
                        duration: 1,
                        ease: "power2.inOut",
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
            className="overflow-hidden relative w-full h-screen flex items-center justify-center"
            style={{ 
                margin: 0, 
                padding: 0, 
                position: "relative", 
                top: 0,
                width: "100vw",
                height: "100vh",
                maxWidth: "100%",
                backgroundImage: `url(${heroBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div
                className="absolute top-0 left-0 size-full"
                role="presentation"
                aria-hidden="true"
            />
            <div
                ref={containerRef}
                className="relative px-5 mx-auto my-0 w-full z-[1] max-md:px-10 max-sm:px-5 text-center h-full flex flex-col items-center justify-center"
                aria-label="Hero content"
                style={{ margin: 0, padding: 0, position: "relative", top: 0 }}
            >
                <h1
                    ref={heading1Ref}
                    className="mb-4 text-7xl text-center max-md:text-5xl max-sm:text-4xl"
                    style={{
                        color: "#0066FF",  // Use solid color instead of gradient
                        margin: 0,
                        opacity: 1,
                        zIndex: 20,
                        position: "relative",
                        fontWeight: "bold"
                    }}
                >
                    The People's Tech Revolution
                </h1>
                <h2
                    ref={heading2Ref}
                    className="mx-auto my-0 text-8xl italic font-bold text-center text-white max-w-[840px] max-md:text-7xl max-sm:text-5xl"
                    style={{ margin: 0, opacity: 1, zIndex: 20, position: "relative" }}
                >
                    Break Barriers, Build Futures — No Cost, No Code, No Limits.
                </h2>
                
                {/* Carousel Component */}
                <div 
                    ref={carouselRef} 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[616px] h-[400px] max-sm:w-full max-sm:h-auto bg-[#27AAE1]/10 rounded-lg opacity-0 flex items-center justify-center"
                    style={{ 
                        zIndex: 10, 
                        backdropFilter: 'blur(50px)',
                        border: '19px solid',
                        borderImageSource: 'linear-gradient(112.35deg, #000F24 0.24%, #7000A8 99.76%)',
                        borderImageSlice: 1
                    }}
                >
                    <HeroCarousel />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;