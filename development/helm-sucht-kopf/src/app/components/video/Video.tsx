import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const videoPaths = {
    intro: "https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4",
    sporthalle: "https://static.videezy.com/system/resources/previews/000/012/324/original/Venice_10.mp4",
    rtw: "https://static.videezy.com/system/resources/previews/000/007/291/original/Dunes.mp4",
    wohnzimmer: "https://static.videezy.com/system/resources/previews/000/055/884/original/201118-CountdownChristmas.mp4",
    kugelraum: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    finale: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
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
            { label: "Sporthalle", video: videoPaths.sporthalle, img: "/assets/video/sporthalle.jpg" },
            { label: "RTW-Simulationsraum", video: videoPaths.rtw, img: "/assets/video/rtw.jpg" },
            { label: "Wohnzimmer-Simulationsraum", video: videoPaths.wohnzimmer, img: "/assets/video/wohnzimmer.jpg" },
            { label: "360°-Simulationsraum", video: videoPaths.kugelraum, img: "/assets/video/kugelraum.jpg" },
        ],
    },
    sporthalle_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Trainiere mit!", video: videoPaths.activities.sporthalle_train, img: "/assets/video/sporthalle_train.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
        ],
    },
    rtw_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Vitalzeichen messen", video: videoPaths.activities.rtw_vitalzeichen, img: "/assets/video/rtw_vitalzeichen.jpg" },
            { label: "Notfallausrüstung zeigen", video: videoPaths.activities.rtw_notfallausrüstung, img: "/assets/video/rtw_ausrüstung.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
        ],
    },
    wohnzimmer_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Erstversorgung zeigen", video: videoPaths.activities.wohnzimmer_erstversorgung, img: "/assets/video/wohnzimmer_erstversorgung.jpg" },
            { label: "Ausrüstung erklären", video: videoPaths.activities.wohnzimmer_ausrüstung, img: "/assets/video/wohnzimmer_ausrüstung.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
        ],
    },
    kugelraum_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Schau dich um", video: videoPaths.activities.kugelraum_umsehen, img: "/assets/video/kugelraum_umsehen.jpg" },
            { label: "Wie trainiert ihr hier?", video: videoPaths.activities.kugelraum_train, img: "/assets/video/kugelraum_train.jpg" },
            { label: "Weiter zur Karte", video: "karte", img: "/assets/video/back_to_map.jpg" },
        ],
    },
};

const Video: React.FC = () => {
    const [playing, setPlaying] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(videoPaths.intro);
    const [showOverlay, setShowOverlay] = useState<keyof typeof overlays | null>(null);
    const [showButtons, setShowButtons] = useState(false);
    const videoRef = useRef<ReactPlayer>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let buttonTimer: NodeJS.Timeout;

        if (playing) {
            buttonTimer = setTimeout(() => {
                setShowButtons(true);
            }, 5000);
        } else {
            setShowButtons(false);
        }

        return () => {
            clearTimeout(buttonTimer);
        };
    }, [playing]);

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

        setPlaying(false);
        setShowButtons(false);
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
        window.location.reload(); // Reload the component to reset the video
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setPlaying(false); // Pause video when exiting fullscreen
                setShowButtons(false); // Hide buttons
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
            style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "0 auto", aspectRatio: "16 / 9" }}
        >
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
            {document.fullscreenElement && (
                <button
                    onClick={handleExitFullscreen}
                    style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000, padding: "5px 10px", backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid #ccc", borderRadius: "5px", cursor: "pointer" }}
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
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                    }}
                >
                    <h2
                        style={{
                            position: "absolute",
                            top: "10%",
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            padding: "10px 20px",
                            borderRadius: "10px",
                        }}
                    >
                        {overlays[showOverlay].title}
                    </h2>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
                        {overlays[showOverlay].options.map((option, index: number) => (
                            <div key={index} style={{ textAlign: "center", pointerEvents: "auto" }}>
                                <img
                                    src={option.img}
                                    alt={option.label}
                                    style={{
                                        cursor: "pointer",
                                        marginBottom: "1rem",
                                        padding: "1rem",
                                        borderTopLeftRadius: "25%",
                                        borderTopRightRadius: "25%",
                                    }}
                                    onClick={() => handleOverlayClick(option.video)}
                                />
                                <button
                                    onClick={() => handleOverlayClick(option.video)}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "14px",
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {option.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Video;
