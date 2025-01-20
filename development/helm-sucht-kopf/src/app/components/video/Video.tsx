import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const videoPaths = {
    intro: "https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4",
    sporthalle: "https://static.videezy.com/system/resources/previews/000/012/324/original/Venice_10.mp4",
    rtw: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    wohnzimmer: "https://static.videezy.com/system/resources/previews/000/055/884/original/201118-CountdownChristmas.mp4",
    kugelraum: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    finale: "https://static.videezy.com/system/resources/previews/000/007/291/original/Dunes.mp4",
    activities: {
        sporthalle_train: "https://static.videezy.com/system/resources/previews/000/031/414/original/4k-numbers-digits-countdown-close-up-background.mp4",
        rtw_vitalzeichen: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        rtw_notfallausrüstung: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        wohnzimmer_erstversorgung: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        wohnzimmer_ausrüstung: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        kugelraum_umsehen: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        kugelraum_train: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
};

type Overlay = {
    title: string;
    options: {
        label: string;
        video: string;
        img: string;
    }[];
};

const overlays: Record<string, Overlay> = {
    karte: {
        title: "Wohin möchtest du als nächstes?",
        options: [
            { label: "Sporthalle", video: videoPaths.sporthalle, img: "/assets/video/sporthalle.png" },
            { label: "RTW-Simulationsraum", video: videoPaths.rtw, img: "/assets/video/rtw.png" },
            { label: "Wohnzimmer-Simulationsraum", video: videoPaths.wohnzimmer, img: "/assets/video/wohnzimmer.png" },
            { label: "360°-Simulationsraum", video: videoPaths.kugelraum, img: "/assets/video/kugelraum.png" },
        ],
    },
    sporthalle_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Trainiere mit!", video: videoPaths.activities.sporthalle_train, img: "/assets/video/sporthalle_train.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/back_to_map.jpg" }
        ],
    },
    rtw_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Vitalzeichen messen", video: videoPaths.activities.rtw_vitalzeichen, img: "/assets/video/rtw_vitalzeichen.jpg" },
            { label: "Notfallausrüstung zeigen", video: videoPaths.activities.rtw_notfallausrüstung, img: "/assets/video/rtw_ausrüstung.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/back_to_map.jpg" }
        ],
    },
    wohnzimmer_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Erstversorgung zeigen", video: videoPaths.activities.wohnzimmer_erstversorgung, img: "/assets/video/wohnzimmer_erstversorgung.jpg" },
            { label: "Ausrüstung erklären", video: videoPaths.activities.wohnzimmer_ausrüstung, img: "/assets/video/wohnzimmer_ausrüstung.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/back_to_map.jpg" }
        ],
    },
    kugelraum_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Schau dich um", video: videoPaths.activities.kugelraum_umsehen, img: "/assets/video/kugelraum_umsehen.jpg" },
            { label: "Wie trainiert ihr hier?", video: videoPaths.activities.kugelraum_train, img: "/assets/video/kugelraum_train.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/back_to_map.jpg" }
        ],
    },
};

const Video: React.FC = () => {
    const [playing, setPlaying] = useState(false);
    const [visibleExitButton, setVisibleExitButton] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(videoPaths.intro);
    const [showOverlay, setShowOverlay] = useState<keyof typeof overlays | null>(null);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const videoRef = useRef<ReactPlayer>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [fadeToBlack, setFadeToBlack] = useState(false);


    const handleVideoEnd = () => {
        if (currentVideo === videoPaths.intro) {
            setShowOverlay("karte");
        } else if (currentVideo === videoPaths.sporthalle || currentVideo === videoPaths.activities.sporthalle_train) {
            setShowOverlay("sporthalle_overlay");
        } else if (currentVideo === videoPaths.rtw || currentVideo === videoPaths.activities.rtw_vitalzeichen || currentVideo === videoPaths.activities.rtw_notfallausrüstung) {
            setShowOverlay("rtw_overlay");
        } else if (currentVideo === videoPaths.wohnzimmer || currentVideo === videoPaths.activities.wohnzimmer_erstversorgung || currentVideo === videoPaths.activities.wohnzimmer_ausrüstung) {
            setShowOverlay("wohnzimmer_overlay");
        } else if (currentVideo === videoPaths.kugelraum || currentVideo === videoPaths.activities.kugelraum_umsehen || currentVideo === videoPaths.activities.kugelraum_train) {
            setShowOverlay("kugelraum_overlay");
        }
        else if (currentVideo === videoPaths.finale) {
            setFadeToBlack(true); // Trigger fade to black
            setTimeout(() => {
                setShowEndMessage(true); // Show end message after fade
            }, 2000); // 2 seconds fade duration
        }
        setPlaying(false);
    };

    const handleOverlayClick = (video: string) => {
        if (video === "karte") {
            setShowOverlay("karte");
        } else {
            setCurrentVideo(video);
            setShowOverlay(null);
            setPlaying(true);
        }
    };

    const handleStart = () => {
        const container = videoContainerRef.current;
        if (container && container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container && (container as any).webkitRequestFullscreen) {
            (container as any).webkitRequestFullscreen();
        } else if (container && (container as any).mozRequestFullScreen) {
            (container as any).mozRequestFullScreen();
        } else if (container && (container as any).msRequestFullscreen) {
            (container as any).msRequestFullscreen();
        }
        setVisibleExitButton(true);
        setPlaying(true); // Start video only in fullscreen
    };

    const handleExitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
        setShowEndMessage(false);
        window.location.reload(); // Reload the component to reset the video
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setPlaying(false); // Pause video when exiting fullscreen
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("msfullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("msfullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <div
            ref={videoContainerRef}
            style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "0 auto", aspectRatio: "16 / 9" }} >
            <style>{`
                    @keyframes fadeToBlack {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                `}</style>

            <ReactPlayer
                ref={videoRef}
                url={currentVideo}
                playing={playing}
                controls={true}
                width="100%"
                height="100%"
                onStart={handleStart}
                onEnded={handleVideoEnd}
            />
            {visibleExitButton && (
                <button
                    onClick={handleExitFullscreen}
                    style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000, padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
                >
                    X
                </button>
            )}
            {showOverlay && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", // Centers the entire container
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker semi-transparent background
                        overflow: "hidden", // Prevents unwanted overflow
                    }}
                >
                    {/* Container for header and buttons to keep them together */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center", // Ensures this block is centered
                        }}
                    >
                        <h2
                            style={{
                                color: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                borderRadius: "10px",
                                textAlign: "center",
                            }}
                        >
                            {overlays[showOverlay].title}
                        </h2>

                        {/* Centered Grid Layout */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)", // 2 Columns
                                gap: "15px",
                                justifyContent: "center",
                                alignItems: "center", // Ensures vertical centering
                                maxWidth: "100vw", // Prevents overflow
                                maxHeight: "90vh", // Prevents exceeding screen height
                            }}
                        >
                            {overlays[showOverlay].options.map((option, index: number) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        backgroundColor: "#ffffff",
                                        width: "40vw", // Each button is 40% of screen width
                                        maxWidth: "200px", // Prevents buttons from getting too big
                                        aspectRatio: "36/25", // Maintains correct aspect ratio
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%", // Ensures it scales within its container
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden", // Prevents any overflow
                                        }}
                                    >
                                        <img
                                            src={option.img}
                                            alt={option.label}
                                            style={{
                                                width: "100%",
                                                height: "100%", // Ensures full scaling
                                                objectFit: "cover", // Maintains aspect ratio without cropping
                                                aspectRatio: "36/25", // Enforces the correct proportions
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px",
                                            }}
                                            onClick={() => handleOverlayClick(option.video)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


             {fadeToBlack && (
                 <div
                     style={{
                         position: "absolute",
                         top: 0,
                         left: 0,
                         width: "100%",
                         height: "100%",
                         backgroundColor: "black",
                         opacity: 0,
                         animation: "fadeToBlack 2s forwards",
                         zIndex: 10,
                     }}
                 />
             )}

             {showEndMessage && (
                 <div
                     style={{
                         position: "absolute",
                         top: "50%",
                         left: "50%",
                         transform: "translate(-50%, -50%)",
                         textAlign: "center",
                         color: "reds",
                         zIndex: 20,
                     }}
                 >
                     <h2>Das war ein kleiner Einblick in die spannende Welt der Berliner Feuerwehr.</h2>
                     <p>Bereit, ein Teil davon zu werden? Deine Zukunft beginnt hier!</p>
                     <button
                         style={{
                             padding: "10px 20px",
                             fontSize: "16px",
                             backgroundColor: "#E40422",
                             color: "white",
                             border: "none",
                             borderRadius: "5px",
                             cursor: "pointer",
                             marginTop: "20px",
                         }}
                         onClick={() => (window.location.href = `/ausbildungen/`)}
                     >
                         Jetzt bewerben!
                     </button>
                 </div>
             )}

        </div>
    );
};

export default Video;
