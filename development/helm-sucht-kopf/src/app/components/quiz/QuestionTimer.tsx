import React, { useState, useRef, useEffect } from 'react';

interface QuestionTimerProps {
    onTimerComplete?: (time: number) => void;
}

const QuestionTimer: React.FC<QuestionTimerProps> = ({ onTimerComplete }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [finalTime, setFinalTime] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<string>("/assets/quiz/smile.svg")

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startTimer = () => {
        clearTimer();
        setIsRunning(true);
        setCurrentImage('/assets/quiz/inhaleNormal.svg')
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
    };

    const stopTimer = () => {
        setIsRunning(false);
        clearTimer();
        setFinalTime(
            `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`
        );
        setCurrentImage('/assets/quiz/longExhale.svg')
        if (onTimerComplete) {
            onTimerComplete(time);
        }
    };

    const resetTimer = () => {
        clearTimer();
        setIsRunning(false);
        setTime(0);
        setFinalTime(null);
        setCurrentImage('/assets/quiz/smile.svg')
    };

    useEffect(() => {
        if (isRunning && time === 20) {
            setCurrentImage('/assets/quiz/inhaleLong.svg');
        }
    }, [time, isRunning]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            {/* Subtitle */}
            {!finalTime && (
                <p
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: 'normal',
                        color: '#333',
                        marginBottom: '5px',
                        textAlign: 'center',
                    }}
                >
                    Drücke auf <span style={{ color: 'green', fontWeight: 'bold' }}>'Start'</span>, halte deinen Atem an und drücke{' '}
                    <span style={{ color: '#E40422', fontWeight: 'bold' }}>'Stopp'</span>, wenn du nicht mehr kannst!
                </p>
            )}

            {/* Congratulation text */}
            {finalTime && (
                <div style={{ textAlign: 'center', marginBottom: '0' }}>
                    <p style={{ color: '#E40422', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0' }}>Super!!</p>
                    <p style={{ fontSize: '1.2rem', color: '#333' }}>
                        Du hast deinen Atem{' '}
                        <span style={{ fontWeight: 'bold', color: '#E40422' }}>{finalTime}</span> Sekunden
                        angehalten!
                    </p>
                </div>
            )}

            {/* Timer display positioned above the icon */}
            <p
                style={{
                    fontSize: '2.3rem',
                    color: '#E40422',
                    fontWeight: 'bold',
                }}
            >
                {formatTime(time)}
            </p>

            {/* Icon */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <img
                    src={currentImage}
                    alt={"Time state"}
                    style={{ width: '40vw', height: '20vh' }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px',
                    width: '100%',
                    maxWidth: '250px',
                }}
            >
                <button
                    style={{
                        fontSize: '1rem',
                        backgroundColor: 'transparent',
                        color: '#E40422',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    onClick={resetTimer}
                >
                    <img
                        src="/assets/quiz/laden.png"
                        alt="Wiederholen"
                        style={{
                            width: '30px',
                            height: '30px',
                            objectFit: 'contain',
                        }}
                    />
                </button>

                {!isRunning ? (
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '1rem',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                        }}
                        onClick={startTimer}
                    >
                        Start
                    </button>
                ) : (
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '1rem',
                            backgroundColor: '#E40422',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                        }}
                        onClick={stopTimer}
                    >
                        Stopp
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionTimer;
