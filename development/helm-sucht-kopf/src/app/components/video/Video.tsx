import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Video: React.FC = () => {
    const [buttonText, setButtonText] = useState(["RTW", "Sporthalle", "360° Raum", "Wohnzimmer"]);
    const [showButtons, setShowButtons] = useState(false);
    const [playing, setPlaying] = useState(false); // Start with video not playing
    const [videoUrl, setVideoUrl] = useState("https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4"); // Default video URL
    const videoRef = useRef<ReactPlayer>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [cycle, setCycle] = useState(0); // To track the cycle

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
    }, [playing, videoUrl]);

    const handleClick = (index: number) => {
        const videoCycles = [
            [
                "https://static.videezy.com/system/resources/previews/000/031/414/original/4k-numbers-digits-countdown-close-up-background.mp4",
                "https://static.videezy.com/system/resources/previews/000/012/324/original/Venice_10.mp4",
                "https://static.videezy.com/system/resources/previews/000/007/291/original/Dunes.mp4",
                "https://static.videezy.com/system/resources/previews/000/055/884/original/201118-CountdownChristmas.mp4",
            ],
        ];

        // Reset cycle after last video
        if (cycle === videoCycles[0].length - 1) {
            setCycle(0);
            setVideoUrl("https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4"); // Go back to first video
        } else {
            setCycle(index);
            setVideoUrl(videoCycles[0][index]);
        }

        setShowButtons(false); // Hide buttons
        setPlaying(true); // Restart the video
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
                url={videoUrl}
                playing={playing}
                controls={true}
                width="100%"
                height="100%"
                onStart={handleStart}
            />
            {/* Exit Fullscreen Button */}
            {document.fullscreenElement && (
                <button
                    onClick={handleExitFullscreen}
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 1000,
                        padding: "5px 10px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    X
                </button>
            )}
            {/* Overlay elements */}
            {showButtons && playing && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
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
                            pointerEvents: "none",
                        }}
                    >
                        Wohin möchtest du als nächstes?
                    </h2>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
                        {[0, 1].map((index) => (
                            <div key={index} style={{ textAlign: "center", pointerEvents: "auto" }}>
                                <img
                                    src={`/assets/video/Button+2.jpg`}
                                    // src={`https://via.placeholder.com/100x100?text=Image+${index + 1}`}
                                    alt={`Button ${index + 1}`}
                                    style={{
                                        cursor: "pointer",
                                        marginBottom: "1rem",
                                        padding: "1rem",
                                        borderTopLeftRadius: "25%",
                                        borderTopRightRadius: "25%"
                                    }}
                                    onClick={() => handleClick(index)}
                                />
                                <button
                                    onClick={() => handleClick(index)}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "14px",
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {buttonText[index]}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "80%" }}>
                        {[2, 3].map((index) => (
                            <div key={index} style={{ textAlign: "center", pointerEvents: "auto" }}>
                                <img
                                    src={`/assets/video/Button+2.jpg`}
                                    alt={`Button ${index + 1}`}
                                    style={{
                                        cursor: "pointer",
                                        marginBottom: "1rem",
                                        padding: "1rem",
                                        borderTopLeftRadius: "25%",
                                        borderTopRightRadius: "25%"
                                    }}
                                    onClick={() => handleClick(index)}
                                />
                                <button
                                    onClick={() => handleClick(index)}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "14px",
                                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >

                                {buttonText[index]}
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
