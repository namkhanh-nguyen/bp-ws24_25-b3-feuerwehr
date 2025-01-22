"use client";

import { useEffect, useRef } from "react";

interface WaveProgressProps {
    progress: number; // 0 to 100
    showWaterDrop: boolean; // Indicates whether to replace the fire icon with the water drop
}

export default function WaveProgress({ progress, showWaterDrop }: WaveProgressProps) {
    const waveRefs = [
        useRef<SVGPathElement>(null),
        useRef<SVGPathElement>(null),
        useRef<SVGPathElement>(null),
        useRef<SVGPathElement>(null),
        useRef<SVGPathElement>(null),
    ];

    useEffect(() => {
        waveRefs.forEach((waveRef, index) => {
            const wave = waveRef.current;
            if (!wave) return;

            const length = wave.getTotalLength();
            wave.style.strokeDasharray = `${length}`;
            wave.style.strokeDashoffset = `${length * (1 - progress / 100)}`;
        });
    }, [progress]);

    return (
        <div className="w-full h-16 flex items-center justify-center bg-transparent relative">
            {/* SVG container */}
            <svg
                viewBox="0 0 600 100"
                className="w-full"
                preserveAspectRatio="none"
            >
                {/* Pipe icon at the start */}
                <text x="0" y="60" className="text-gray-800" fontSize="40">
                    🛁
                </text>

                {/* Waves */}
                <path
                    ref={waveRefs[0]}
                    d="M 50 50 C 150 20, 150 80, 300 50 C 450 20, 450 80, 550 50"
                    className="stroke-blue-500/80 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[1]}
                    d="M 50 50 C 150 10, 150 90, 300 50 C 450 10, 450 90, 570 50"
                    className="stroke-blue-400/60 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[2]}
                    d="M 50 50 C 150 30, 150 70, 300 50 C 450 30, 450 70, 570 50"
                    className="stroke-blue-600/70 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[3]}
                    d="M 50 50 C 150 15, 150 85, 300 50 C 450 15, 450 85, 570 50"
                    className="stroke-blue-300/50 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[4]}
                    d="M 50 50 C 150 25, 150 75, 300 50 C 450 25, 450 75, 570 50"
                    className="stroke-blue-700/40 stroke-[3] fill-none"
                />

                {/* Fire or water drop icon at the end */}
                <text
                    x="550" // Fixed position near the end of the path
                    y="60"
                    className="text-gray-800"
                    fontSize="40"
                >
                    {showWaterDrop ? "💧" : "🔥"}
                </text>
            </svg>
        </div>
    );
}
