'use client';

import dynamic from "next/dynamic";

export default function Tour() {

    const Video = dynamic(() => import("../components/video/Video"), { ssr: false });

    return (
        <div className="sec">
            <Video/>
        </div>
    );
}
