import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const videoPaths = {
    intro: "/assets/videos/intro.mp4",
    rtw: "/assets/videos/rtw.mp4",
    wohnzimmer: "/assets/videos/wohnzimmer.mp4",
    kugelraum: "/assets/videos/kugelraum.mp4",
    finale: "/assets/videos/final.mp4",
    activities: {
        rtw_vitalzeichen: "/assets/videos/vitalzeichen.mp4",
        wohnzimmer_erstversorgung: "/assets/videos/erstversorgung.mp4",
        wohnzimmer_ausruestung: "/assets/videos/ausruestung.mp4",
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
        title: "Wohin möchtest Du als nächstes?",
        options: [
            { label: "RTW-Simulationsraum", video: videoPaths.rtw, img: "/assets/video/rtw.jpg" },
            { label: "Wohnzimmer-Simulationsraum", video: videoPaths.wohnzimmer, img: "/assets/video/wohnzimmer.jpg" },
            { label: "360°-Simulationsraum", video: videoPaths.kugelraum, img: "/assets/video/kugelraum.jpg" }
        ],
    },
    rtw_overlay: {
        title: "Was möchtest Du tun?",
        options: [
            { label: "Vitalzeichen messen", video: videoPaths.activities.rtw_vitalzeichen, img: "" },
            { label: "Weiter zur Karte", video: "karte", img: "" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "" }
        ],
    },
    wohnzimmer_overlay: {
        title: "Was möchtest Du tun?",
        options: [
            { label: "Erstversorgung zeigen", video: videoPaths.activities.wohnzimmer_erstversorgung, img: "" },
            { label: "Ausrüstung erklären", video: videoPaths.activities.wohnzimmer_ausruestung, img: "" },
            { label: "Weiter zur Karte", video: "karte", img: "" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "" }
        ],
    },
    kugelraum_overlay: {
        title: "Was möchtest Du tun?",
        options: [
            { label: "Weiter zur Karte", video: "karte", img: "" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "" }
        ],
    },
};

const Video: React.FC = () => {
    const [playing, setPlaying] = useState(false);
    const [requestRotate, setRequestRotate] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(videoPaths.intro);
    const [showOverlay, setShowOverlay] = useState<keyof typeof overlays | null>(null);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const videoRef = useRef<ReactPlayer>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [fadeToBlack, setFadeToBlack] = useState(false);

    const enterFullscreen = () => {
        if (videoContainerRef.current) {
            if (videoContainerRef.current.requestFullscreen) {
                videoContainerRef.current.requestFullscreen();
            } else if ((videoContainerRef.current as any).webkitEnterFullscreen) {
                (videoContainerRef.current as any).webkitEnterFullscreen(); // For iOS
            } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
                (videoContainerRef.current as any).webkitRequestFullscreen(); // For Safari
            }
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement != null) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen(); // For Safari
        }
    };

    const handleVideoEnd = () => {
        exitFullscreen();

        if (currentVideo === videoPaths.intro) {
            setShowOverlay("karte");
        } else if (currentVideo === videoPaths.rtw || currentVideo === videoPaths.activities.rtw_vitalzeichen) {
            setShowOverlay("rtw_overlay");
        } else if (currentVideo === videoPaths.wohnzimmer || currentVideo === videoPaths.activities.wohnzimmer_erstversorgung || currentVideo === videoPaths.activities.wohnzimmer_ausruestung) {
            setShowOverlay("wohnzimmer_overlay");
        } else if (currentVideo === videoPaths.kugelraum) {
            setShowOverlay("kugelraum_overlay");
        } else if (currentVideo === videoPaths.finale) {
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
        setPlaying(true);
        enterFullscreen(); // Enter fullscreen when the video starts
    };

    const handleReplay = () => {
        setCurrentVideo(videoPaths.intro);
        setPlaying(true);
        setShowEndMessage(false);
        setFadeToBlack(false);
    };

    useEffect(() => {
        const checkOrientation = () => {
            if (window.innerHeight > window.innerWidth) {
                setRequestRotate(true); // Portrait mode
            } else {
                setRequestRotate(false); // Landscape mode
            }
        };

        checkOrientation();
        window.addEventListener("resize", checkOrientation);

        return () => {
            window.removeEventListener("resize", checkOrientation);
        };
    }, []);

    return (
        <div
            ref={videoContainerRef}
            style={{ position: "relative", width: "100%", maxWidth: "720px", margin: "0 auto", aspectRatio: "16 / 9" }}
        >
            <style>{`
                @keyframes fadeToBlack {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            {requestRotate && (
                <div>
                    <h2>Bitte dein Gerät zu Landscape drehen</h2>
                </div>
            )}

            <ReactPlayer
                ref={videoRef}
                url={currentVideo}
                playing={playing}
                controls={true}
                playsinline={true}
                width="100%"
                height="100%"
                light="/assets/video/Azubis.jpg"
                onStart={handleStart}
                onEnded={handleVideoEnd}
            />

            {(showOverlay && !requestRotate) && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <h2
                            style={{
                                color: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "10px",
                                marginBottom: "20px",
                            }}
                        >
                            {overlays[showOverlay].title}
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: showOverlay === "karte" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                                gap: "10px",
                                justifyContent: "center",
                                alignItems: "center",
                                maxWidth: "100vw",
                                maxHeight: "90vh",
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
                                        width: showOverlay === "karte" ? "40vw" : "25vw",
                                        maxWidth: showOverlay === "karte" ? "190px" : "150px",
                                        aspectRatio: showOverlay === "karte" ? "36/25" : "36/15",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleOverlayClick(option.video)}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: option.img ? "80%" : "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            backgroundColor: option.img ? "transparent" : "white",
                                        }}
                                    >
                                        {option.img ? (
                                            <img
                                                src={option.img}
                                                alt={option.label}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    aspectRatio: "36/25",
                                                    borderTopLeftRadius: "10px",
                                                    borderTopRightRadius: "10px",
                                                }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    color: "black",
                                                    fontSize: "1rem",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        )}
                                    </div>

                                    {option.img && (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "20%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "white",
                                                color: "black",
                                                fontSize: "0.9rem",
                                                overflow: "hidden",
                                                borderBottomLeftRadius: "10px",
                                                borderBottomRightRadius: "10px",
                                            }}
                                        >
                                            {option.label}
                                        </div>
                                    )}
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
                        zIndex: 20,
                        width: "90%",
                        maxWidth: "500px",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <img
                        src="/assets/video/logo.png"
                        alt="Berliner Feuerwehr Logo"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    />
                    <button
                        style={{
                            padding: "8px 15px",
                            fontSize: "1rem",
                            backgroundColor: "#E40422",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "50px",
                            width: "100%",
                            maxWidth: "200px",
                        }}
                        onClick={() => (window.location.href = `/ausbildungen/`)}
                    >
                        Jetzt bewerben!
                    </button>

                    <button
                        style={{
                            padding: "8px 15px",
                            fontSize: "1rem",
                            backgroundColor: "#444",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "20px",
                            width: "100%",
                            maxWidth: "200px",
                        }}
                        onClick={handleReplay}
                    >
                        Neu starten
                    </button>
                </div>
            )}
        </div>
    );
};

export default Video;