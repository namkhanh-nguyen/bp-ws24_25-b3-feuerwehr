import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const videoPaths = {
    intro: "https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4",
    rtw: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    wohnzimmer: "https://static.videezy.com/system/resources/previews/000/055/884/original/201118-CountdownChristmas.mp4",
    kugelraum: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    finale: "https://static.videezy.com/system/resources/previews/000/007/291/original/Dunes.mp4",
    activities: {
        sporthalle_train: "https://static.videezy.com/system/resources/previews/000/031/414/original/4k-numbers-digits-countdown-close-up-background.mp4",
        rtw_vitalzeichen: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        rtw_notfallausrüstung: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        wohnzimmer_erstversorgung: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        wohnzimmer_ausrüstung: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        kugelraum_umsehen: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        kugelraum_train: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
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
            { label: "RTW-Simulationsraum", video: videoPaths.rtw, img: "/assets/video/rtw.jpg" },
            { label: "Wohnzimmer-Simulationsraum", video: videoPaths.wohnzimmer, img: "/assets/video/wohnzimmer.jpg" },
            { label: "360°-Simulationsraum", video: videoPaths.kugelraum, img: "/assets/video/kugelraum.jpg" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/exit.png" }
        ],
    },
    rtw_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Vitalzeichen messen", video: videoPaths.activities.rtw_vitalzeichen, img: "" },
            { label: "Notfallausrüstung zeigen", video: videoPaths.activities.rtw_notfallausrüstung, img: "" },
            { label: "Weiter zur Karte", video: "karte", img: "" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/exit.png" }
        ],
    },
    wohnzimmer_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Erstversorgung zeigen", video: videoPaths.activities.wohnzimmer_erstversorgung, img: "" },
            { label: "Ausrüstung erklären", video: videoPaths.activities.wohnzimmer_ausrüstung, img: "" },
            { label: "Weiter zur Karte", video: "karte", img: "" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/exit.png" }
        ],
    },
    kugelraum_overlay: {
        title: "Was möchtest du tun?",
        options: [
            { label: "Schau dich um", video: videoPaths.activities.kugelraum_umsehen, img: "" },
            { label: "Wie trainiert ihr hier?", video: videoPaths.activities.kugelraum_train, img: "" },
            { label: "Weiter zur Karte", video: "karte", img: "" },
            { label: "Zum Ausgang", video: videoPaths.finale, img: "/assets/video/exit.png" }
        ],
    },
};

const Video: React.FC = () => {
    const [requestRotate, setRequestRotate] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(videoPaths.intro);
    const [showOverlay, setShowOverlay] = useState<keyof typeof overlays | null>(null);
    const [showEndMessage, setShowEndMessage] = useState(false);
    const videoRef = useRef<ReactPlayer>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [fadeToBlack, setFadeToBlack] = useState(false);


    const handleVideoEnd = () => {
        if (currentVideo === videoPaths.intro) {
            setShowOverlay("karte");
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
    };

    const handleOverlayClick = (video: string) => {
        if (video === "karte") {
            setShowOverlay("karte");
        } else {
            setCurrentVideo(video);
            setShowOverlay(null);
        }
    };

    useEffect(() => {
        const checkOrientation = () => {
            if (window.innerHeight > window.innerWidth) {
                setRequestRotate(true); // Portrait mode
            } else {
                setRequestRotate(false); // Landscape mode
            }
        };

        // Check on mount
        checkOrientation();

        // Listen for resize events
        window.addEventListener("resize", checkOrientation);

        return () => {
            window.removeEventListener("resize", checkOrientation);
        };
    }, []);

    const handleReplay = () => {
        setCurrentVideo(videoPaths.intro);
        setShowEndMessage(false); // Hide the end screen
        setFadeToBlack(false); // Remove the fade effect
    };


    return (
        <div
            ref={videoContainerRef}
            style={{ position: "relative", width: "100%", maxWidth: "720px", margin: "0 auto", aspectRatio: "16 / 9" }} >
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

            {requestRotate && (
                <div>
                    <h2>
                        Bitte dein Gerät zu Landscape drehen
                    </h2>
                </div>
            )}

            <ReactPlayer
                ref={videoRef}
                url={currentVideo}
                controls={true}
                playsinline={true}
                width="100%"
                height="100%"
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
                                        cursor: "pointer", // Indicates the option is clickable
                                    }}
                                    onClick={() => handleOverlayClick(option.video)} // Make the entire option clickable
                                >
                                    {/* Image Container */}
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "80%", // 70% of the option's height for the image
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden", // Prevents any overflow
                                            backgroundColor: option.img ? "transparent" : "rgba(0, 0, 0, 0.7)", // Background for imageless options
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
                                        />
                                    </div>

                                    {/* Title Container */}
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "20%", // 30% of the option's height for the title
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "white", // White background for the title
                                            color: "black", // Text color for the title
                                            fontSize: "0.9rem",
                                            overflow: "hidden", // Prevents any overflow
                                            borderBottomLeftRadius: "10px",
                                            borderBottomRightRadius: "10px",
                                        }}
                                    >
                                        {option.label}
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
                        zIndex: 20,
                        width: "90%", // Ensures it doesn’t overflow
                        maxWidth: "500px", // Limits size on larger screens
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <img
                        src="/assets/video/logo.png"
                        alt="Berliner Feuerwehr Logo"
                        style={{
                            maxWidth: "100%",
                            height: "auto",   // Maintains aspect ratio
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
                            width: "100%", // Makes sure it doesn’t overflow
                            maxWidth: "200px", // Limits button width
                        }}
                        onClick={() => (window.location.href = `/ausbildungen/`)}
                    >
                        Jetzt bewerben!
                    </button>

                    {/* Replay Button */}
                    <button
                        style={{
                            padding: "8px 15px",
                            fontSize: "1rem",
                            backgroundColor: "#444",  // Different background for replay button
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            display: "block",
                            marginLeft: "auto", // Centers button horizontally
                            marginRight: "auto", // Centers button horizontally
                            marginTop: "20px", // Spacing between the buttons
                            width: "100%", // Makes sure it doesn’t overflow
                            maxWidth: "200px", // Limits button width
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