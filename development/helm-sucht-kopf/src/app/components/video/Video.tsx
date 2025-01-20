import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const Video: React.FC = () => {
    const [buttonText, setButtonText] = useState(["RTW", "Sporthalle", "360° Raum", "Wohnzimmer"]);
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
            {showButtons && playing && cycle < videosWatched.length - 1 &&(

                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        //transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        //pointerEvents: "none",
                        //borderRadius: "15px",
                        overflow: "visible",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        padding: "20px",
                        zIndex: "1",
                        //border: "3px solid #333333",
                    }}
                >
                    <h2
                        style={{
                            position: "absolute",
                            top: "5%",
                            left: "10%",
                            color: "black",
                            padding: "10px 20px",
                            borderRadius: "10px",
                            pointerEvents: "none",
                            zIndex: "2",
                        }}
                    >
                        Wohin möchtest du als nächstes?
                    </h2>

                    <div style={{ display: "flex", justifyContent: "space-evenly" , width: "95%" }}>
                        {[0, 1].map((index) => (
                            <div key={index}

                             style={{ textAlign: "center",
                              pointerEvents: "auto"  ,
                              display: "flex",            // Flexbox verwenden
                              flexDirection: "column",    // Bild und Text vertikal ausrichten
                              alignItems: "center",       // Text und Bild zentrieren
                              borderRadius: "15px",       // Abgerundete Ecken für das ganze Element
                              overflow: "hidden",         // Verhindert, dass das Bild über die abgerundeten Ecken hinausgeht
                              backgroundColor: "#ffffff",
                              marginLeft: "15px",             // Abstand von der linken Seite
                              marginRight: "15px",
                              marginBottom:"20px",

                             }}>
                                <img
                                    src={`/assets/video/Button+2.jpg`}
                                    // src={`https://via.placeholder.com/100x100?text=Image+${index + 1}`}
                                    alt={`Button ${index + 1}`}
                                    style={{
                                        cursor: "pointer",
                                         margin: "0", //mew
                                        padding: "0", //1rem
                                        borderTopLeftRadius: "15px", //25%
                                        borderTopRightRadius: "15px",

                                    }}
                                    onClick={() => handleClick(index)}
                                />
                                <button
                                    onClick={() => handleClick(index)}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "13px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                         marginTop: "0",
                                         color:"black",
                                          paddingTop: "6px", // Reduziere den Abstand oben
                                          paddingBottom: "6px", // Reduziere den Abstand unten

                                    }}
                                >
                                    {buttonText[index]}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-evenly", width: "95%" }}>
                        {[2, 3].map((index) => (
                            <div key={index} style={{
                             textAlign: "center",
                             pointerEvents: "auto"  ,
                             display: "flex",            // Flexbox verwenden
                             flexDirection: "column",    // Bild und Text vertikal ausrichten
                             alignItems: "center",       // Text und Bild zentrieren
                             borderRadius: "15px",       // Abgerundete Ecken für das ganze Element
                             overflow: "hidden",         // Verhindert, dass das Bild über die abgerundeten Ecken hinausgeht
                             backgroundColor: "#ffffff",
                             marginLeft: "15px",             // Abstand von der linken Seite
                             marginRight: "15px",
                             marginBottom:"20px",

                          }}>
                                <img
                                    src={`/assets/video/Button+2.jpg`}
                                    alt={`Button ${index + 1}`}
                                    style={{
                                        cursor: "pointer",
                                        margin: "0",
                                        padding: "0",
                                        borderTopLeftRadius: "15px",
                                        borderTopRightRadius: "15px",


                                    }}
                                    onClick={() => handleClick(index)}
                                />
                                <button
                                    onClick={() => handleClick(index)}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "13px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginTop: "0",
                                        color:"black",
                                        paddingTop: "6px",
                                        paddingBottom: "6px",

                                    }}
                                >

                                {buttonText[index]}
                                </button>
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
