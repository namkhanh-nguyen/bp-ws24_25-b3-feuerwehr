'use client';

import dynamic from "next/dynamic";

export default function Tour() {

    const Video = dynamic(() => import("../components/video/Video"), { ssr: false });

    return (

        <div className="sec">
            <div>
                <Video/>
            </div>

            <h2 className="mt-7 text-4xl font-bold text-center">Mehr als ein Job – eine Mission.</h2>


            {/* Description */}
            <p className="mt-2 text-center text-lg md:text-xl max-w-lg mx-auto">
                Neugierig, wie der Alltag eines Sanitäters in Ausbildung aussieht?
                Tauche ein in die Welt der Berliner Feuerwehr und erlebe hautnah, was es bedeutet,
                Teil eines Teams zu sein, das täglich Leben rettet.
            </p>
        </div>
    );
}
