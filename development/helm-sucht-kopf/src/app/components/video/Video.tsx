import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Video: React.FC = () => {
    const [buttonText, setButtonText] = useState(["Button 1", "Button 2", "Button 3", "Button 4"]);
    const [showButtons, setShowButtons] = useState(false);
    const [playing, setPlaying] = useState(true);
    const [videoUrl, setVideoUrl] = useState("https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4"); // Default video URL
    const videoRef = useRef<ReactPlayer>(null);
    const [cycle, setCycle] = useState(0); // To track the cycle

    useEffect(() => {
        // Show buttons after 5 seconds
        const buttonTimer = setTimeout(() => {
            setShowButtons(true);
        }, 5000);

        return () => {
            clearTimeout(buttonTimer);
        };
    }, [videoUrl]);

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

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "0 auto", aspectRatio: "16 / 9" }}>
            <ReactPlayer
                ref={videoRef}
                url={videoUrl}
                playing={playing}
                controls={true}
                width="100%"
                height="100%"
            />
            {/* Overlay elements */}
            {showButtons && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        pointerEvents: "none", // Allows clicking through to the video player controls
                        flexDirection: "column",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        {[0, 1].map((index) => (
                            <button
                                key={index}
                                onClick={() => handleClick(index)}
                                style={{
                                    pointerEvents: "auto", // Enable button interactions
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
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                        {[2, 3].map((index) => (
                            <button
                                key={index}
                                onClick={() => handleClick(index)}
                                style={{
                                    pointerEvents: "auto", // Enable button interactions
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Video;
