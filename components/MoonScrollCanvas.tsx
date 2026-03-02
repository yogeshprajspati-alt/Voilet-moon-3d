"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const FRAME_COUNT = 200;

export default function MoonScrollCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Scroll progress for the entire container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            // Preload all images from images folder
            const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    const frameNumber = String(i + 1).padStart(3, '0');
                    img.src = `/images/ezgif-frame-${frameNumber}.jpg`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load image ${frameNumber}`);
                        // Fallback to avoid crash, maybe resolving anyway
                        resolve();
                    }
                });
            });

            await Promise.all(promises);
            setImages(loadedImages);
            setImagesLoaded(true);
        };

        loadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded || images.length === 0) return;

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;

            // Calculate current frame
            const currentProgress = scrollYProgress.get();
            // Clamp index
            let index = Math.floor(currentProgress * (FRAME_COUNT - 1));
            if (index < 0) index = 0;
            if (index >= FRAME_COUNT) index = FRAME_COUNT - 1;

            const img = images[index];

            if (img) {
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw image fullscreen "cover" style
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio); // Cover - fills entire screen

                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [imagesLoaded, images, scrollYProgress]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize(); // Init

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[500vh]">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                />

                {/* Loading Indicator */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-violet-300 animate-pulse">
                        Loading Prachi&apos;s Experience...
                    </div>
                )}

                {/* Text Overlays */}
                <TextOverlays scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

const textSections = [
   { text: "Prachi moves like moonlight.", start: 0.05, end: 0.15 },
{ text: "Soft glow, no noise.", start: 0.2, end: 0.3 },
{ text: "Her silence speaks deeper.", start: 0.35, end: 0.45 },
{ text: "Calm like a full moon night.", start: 0.5, end: 0.6 },
{ text: "Presence that settles the room.", start: 0.65, end: 0.75 },
{ text: "Warmth without trying.", start: 0.78, end: 0.85 },
{ text: "You feel her before you see her.", start: 0.88, end: 0.95 },
{ text: "Moon doesn't chase stars — neither does she.", start: 0.97, end: 1.0 },
];

function TextOverlays({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
            {textSections.map((section, index) => (
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
    const midpoint = (start + end) / 2;
    const opacity = useTransform(scrollYProgress, [start, midpoint, end], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [start, end], [50, -50]);

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
