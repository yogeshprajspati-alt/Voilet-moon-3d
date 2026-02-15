"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMounted, setIsMounted] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Try to autoplay muted on mount; if the browser blocks it, show a fallback UI
    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;

        const tryAutoplay = async () => {
            try {
                audio.muted = true;
                await audio.play();
                setIsPlaying(true);
                setMuted(true);
            } catch (err) {
                console.log("Autoplay prevented - user interaction required");
                setAutoplayBlocked(true);
            }
        };

        tryAutoplay();
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                console.log("Autoplay prevented - user interaction required");
            });
        }
        setIsPlaying(!isPlaying);
    };

    const enableAudioOnInteraction = async () => {
        if (!audioRef.current) return;
        try {
            // Unmute and resume playback with the chosen volume
            audioRef.current.muted = false;
            audioRef.current.volume = volume;
            await audioRef.current.play();
            setAutoplayBlocked(false);
            setMuted(false);
            setIsPlaying(true);
        } catch (err) {
            console.log("Still blocked after interaction", err);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/background.mp3"
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* Fallback overlay shown when autoplay is blocked */}
            {autoplayBlocked && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <button
                        onClick={enableAudioOnInteraction}
                        className="px-6 py-3 bg-violet-600/90 text-white rounded-lg backdrop-blur shadow-lg"
                    >
                        Enable Sound
                    </button>
                </div>
            )}

            {/* If autoplay succeeded but is muted, show an Unmute button */}
            {!autoplayBlocked && muted && isPlaying && (
                <div className="fixed bottom-24 right-8 z-50">
                    <button
                        onClick={enableAudioOnInteraction}
                        className="px-3 py-2 bg-violet-600/90 text-white rounded-full shadow-md"
                    >
                        Unmute
                    </button>
                </div>
            )}

            {/* Music Control Button */}
            <div className="fixed bottom-8 right-8 z-50 flex items-center gap-2 backdrop-blur-sm bg-violet-900/30 rounded-full px-3 py-2 border border-violet-500/30 hover:border-violet-500/60 transition-all">
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-16 h-1 bg-violet-900/50 rounded-lg appearance-none cursor-pointer accent-violet-400"
                    />
                </div>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 transition-colors text-white"
                    title={isPlaying ? "Pause Music" : "Play Music"}
                >
                    {isPlaying ? (
                        <VolumeX size={16} />
                    ) : (
                        <Volume2 size={16} />
                    )}
                </button>
            </div>
        </>
    );
}
