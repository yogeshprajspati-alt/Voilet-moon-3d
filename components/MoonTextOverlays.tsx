"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const sections = [
    { text: "Prachi ki aankhon mein hai chaand ki shaant chamak.", start: 0.1, end: 0.25 },
    { text: "Bina kehne ke hi samjha deti hain sab kuch..", start: 0.35, end: 0.5 },
    { text: "Na chamakne ki koshish, phir bhi roshni bikher jaati hai.", start: 0.6, end: 0.75 },
    { text: "Jaise chaand raat ko roshni dekar bhi shor nahi karta.", start: 0.85, end: 1.0 },
    { text: "Confidence hai par ego nahi.", start: 1.0, end: 1.25 },
    { text: "Grace hai par drama nahi.", start: 1.25, end: 1.5 },
    { text: "Woh chaand jaisi — door se bhi feel ho jaaye.", start: 1.5, end: 1.75 },
    { text: "Or Daag dekho, haina sundar.", start: 1.75, end: 2.0 },
];

export default function MoonTextOverlays() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
            {sections.map((section, index) => (
                <TextSection
                    key={index}
                    text={section.text}
                    scrollYProgress={scrollYProgress}
                    start={section.start}
                    end={section.end}
                />
            ))}
        </div>
    );
}

function TextSection({
    text,
    scrollYProgress,
    start,
    end,
}: {
    text: string;
    scrollYProgress: MotionValue<number>;
    start: number;
    end: number;
}) {
    // Fade in during the first half of the range, fade out during the second half
    const midpoint = (start + end) / 2;
    const opacity = useTransform(
        scrollYProgress,
        [start, midpoint, end],
        [0, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, end],
        [50, -50]
    );

    // Calculate position manually to distribute down the page (based on 500vh container)
    // We want them centered in the viewport at the midpoint of their visible range
    // But since the parent is absolute 100% height of 500vh, we can position them relatively
    // However, it's easier to use sticky logic or fixed positioning if we want them to stay in view
    // But specific requirement was "Scroll based fade in/out".

    // Let's use fixed center positioning, and control visibility purely with opacity
    // This allows the text to "appear" as you scroll, then "disappear".

    return (
        <motion.div
            style={{ opacity, y }}
            className="fixed top-1/2 left-0 w-full text-center -translate-y-1/2 flex justify-center items-center"
        >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-thin tracking-tighter text-violet-100 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                {text}
            </h2>
        </motion.div>
    );
}
