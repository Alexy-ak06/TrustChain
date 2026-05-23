import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPReveal({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // 🛡️ GSAP Context safely isolates all animations and triggers inside this block
    const ctx = gsap.context(() => {
      
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 60, // Slipped slightly up from 80 for a crisper, snappier slide feel
          scale: 0.97,
          filter: "blur(10px)",
          willChange: "transform, opacity, filter" // Forces hardware acceleration on the GPU
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out", // Shifted to power4 for a dramatically smoother deceleration curve
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%", // Triggers just slightly sooner to catch fast scrollers cleanly
            toggleActions: "play none none none", // Ensures animation fires exactly once per page lifecycle
          },
        }
      );

    }, containerRef); // Scopes the animation context to our wrapper container reference

    // 🧼 REVERSION LEAK PURGE: Instantly kills triggers and releases memory on component unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="will-change-[transform,opacity]">
      {children}
    </div>
  );
}