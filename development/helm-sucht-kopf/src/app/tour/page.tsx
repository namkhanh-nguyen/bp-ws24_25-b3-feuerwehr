"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

export default function Tour() {
  const Video = dynamic(() => import("../components/video/Video"), {
    ssr: false,
  });

  return (
    <div style={{ marginTop: "-80px", padding: "3rem 1.25rem" }}>
      <div className="absolute left-5 mb-8" style={{ marginTop: "-2.5rem" }}>
        <Link href="/" className="text-[1.25rem]" style={{ color: "#e40422" }}>
          ← Zurück zur Startseite
        </Link>
      </div>
      <div>
        <Video />
      </div>

      <h2 className="mt-7 text-4xl font-bold text-center">
        Mehr als ein Job – eine Mission.
      </h2>

      {/* Description */}
      <p className="mt-2 text-center text-lg md:text-xl max-w-lg mx-auto">
        Neugierig, wie der Alltag eines Sanitäters in Ausbildung aussieht?
        Tauche ein in die Welt der Berliner Feuerwehr und erlebe hautnah, was es
        bedeutet, Teil eines Teams zu sein, das täglich Leben rettet.
      </p>
    </div>
  );
}
