import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Video: React.FC = () => {
    const [buttonName, setButtonName] = useState(["rtw", "sporthalle", "360raum", "wohnzimmer"]);
    const [showButtons, setShowButtons] = useState(false);
    const [playing, setPlaying] = useState(false); // Start with video not playing
    const [videoUrl, setVideoUrl] = useState("https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4");// Default video URL
    const [videosWatched, setVideosWatched] = useState<boolean[]>([false, false, false, false]);
    const [showEndMessage, setShowEndMessage] = useState(false);

    const videoRef = useRef<ReactPlayer>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const [cycle, setCycle] = useState(0); // To track the cycle
    const [fadeToBlack, setFadeToBlack] = useState(false); //new

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

                const updatedVideosWatched = [...videosWatched];
                updatedVideosWatched[index] = true;
                setVideosWatched(updatedVideosWatched);


                const allVideosWatched = updatedVideosWatched.every((watched) => watched);
                if (allVideosWatched) {
                    setShowEndMessage(false);
                }

         //Reset cycle after last video
       // if (cycle === videoCycles[0].length - 1) {
          //  setCycle(0);
          //  setVideoUrl("https://static.videezy.com/system/resources/previews/000/052/918/original/21.mp4"); // Go back to first video
        //} else {
         //  setCycle(index);
          //  setVideoUrl(videoCycles[0][index]);
       //}
        setCycle(index);
        setVideoUrl(videoCycles[0][index]);
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

    const handleVideoEnd = () => {
        if (cycle === videosWatched.length - 1) {
            setFadeToBlack(true); // Trigger fade to black
            setTimeout(() => {
                setShowEndMessage(true); // Show end message after fade
            }, 2000); // 2 seconds fade duration
        } else {
            setShowButtons(true);
        }
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
                url={videoUrl}
                playing={playing}
                controls={true}
                width="100%"
                height="100%"
                onStart={handleStart}
                onEnded={handleVideoEnd}
            />
            {/* Overlay elements */}
            {showButtons && playing && cycle < videosWatched.length - 1 && (
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
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker semi-transparent background
                        padding: "20px",
                        zIndex: "1",
                        overflow: "hidden", // Prevents unwanted overflow
                    }}
                >
                    <h2
                        style={{
                            color: "white",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            padding: "12px",
                            borderRadius: "10px",
                            textAlign: "center",
                            marginBottom: "20px"
                        }}
                    >
                        Wohin möchtest du als nächstes?
                    </h2>

                    {/* Grid Layout for 2x2 Buttons */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)", // 2 Columns
                            gap: "15px",
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "100vw", // Prevents overflow
                            maxHeight: "90vh", // Prevents exceeding screen height
                            overflow: "auto", // Adds scroll if needed
                            margin: "0 auto",
                        }}
                    >
                        {buttonName.map((name, index) => (
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
                                    maxHeight: "30vh", // Prevents buttons from exceeding 30% of screen height
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
                                        src={`/assets/video/${name}.png`}
                                        alt={`${name}`}
                                        style={{
                                            width: "100%",
                                            height: "100%", // Ensures full scaling
                                            objectFit: "contain", // Prevents cropping
                                            aspectRatio: "36/25", // Maintains correct proportions
                                            borderTopLeftRadius: "10px",
                                            borderTopRightRadius: "10px",
                                        }}
                                        onClick={() => handleClick(index)}
                                    />
                                </div>
                            </div>
                        ))}
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
