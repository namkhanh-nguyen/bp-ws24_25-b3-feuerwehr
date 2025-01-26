"use client";

import { useEffect, useRef } from "react";
import FiremenIcon from '@/app/components/quiz/FiremenIcon';
import HouseOnFireIcon from '@/app/components/quiz/HouseOnFire';

interface WaveProgressProps {
    progress: number; // 0 to 100
}

export default function WaveProgress({ progress }: WaveProgressProps) {
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
                {/* Firemen Icon at the start */}
                <foreignObject x="0" y="15" width="70" height="70">
                    <FiremenIcon />
                </foreignObject>

                {/* Waves */}
                <path
                    ref={waveRefs[0]}
                    d="M 70 27 C 150 -3, 150 57, 300 27 C 450 -3, 450 57, 530 27"
                    className="stroke-blue-500/80 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[1]}
                    d="M 70 27 C 150 -13, 150 67, 300 27 C 450 -13, 450 67, 530 27"
                    className="stroke-blue-400/60 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[2]}
                    d="M 70 27 C 150 7, 150 47, 300 27 C 450 7, 450 47, 530 27"
                    className="stroke-blue-600/70 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[3]}
                    d="M 70 27 C 150 -8, 150 62, 300 27 C 450 -8, 450 62, 530 27"
                    className="stroke-blue-300/50 stroke-[3] fill-none"
                />
                <path
                    ref={waveRefs[4]}
                    d="M 70 27 C 150 2, 150 52, 300 27 C 450 2, 450 52, 530 27"
                    className="stroke-blue-700/40 stroke-[3] fill-none"
                />

                {/* House on Fire icon at the end */}
                <foreignObject x="520" y="20" width="60" height="60">
                    <HouseOnFireIcon />
                </foreignObject>
            </svg>
        </div>
    );
}
