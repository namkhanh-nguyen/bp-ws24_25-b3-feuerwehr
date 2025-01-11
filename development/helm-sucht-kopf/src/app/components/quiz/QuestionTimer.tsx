import React, { useState, useRef, useEffect } from 'react';

interface QuestionTimerProps {
    onTimerComplete?: (time: number) => void; // Optional callback for when the timer stops
}

const QuestionTimer: React.FC<QuestionTimerProps> = ({ onTimerComplete }) => {
    const [time, setTime] = useState(0); // Elapsed time in seconds
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Interval reference
    const [finalTime, setFinalTime] = useState<string | null>(null);

    // Cleanup the timer when the component unmounts
    useEffect(() => {
        return () => {
            clearTimer(); // Clear the timer on unmount
        };
    }, []);

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startTimer = () => {
        clearTimer(); // Ensure no multiple intervals are running
        setIsRunning(true);
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1); // Increment time in seconds
        }, 1000);
    };

    const stopTimer = () => {
        setIsRunning(false);
        clearTimer(); // Stop the interval
        setFinalTime(
            `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`
        ); // Save the formatted time
        if (onTimerComplete) {
            onTimerComplete(time); // Trigger callback if provided
        }
    };

    const resetTimer = () => {
        clearTimer(); // timer is stopped
        setIsRunning(false);
        setTime(0);
        setFinalTime(null); // Reset the congratulation text
    };

    // Format time as MM:SS
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
                        color: '#666',
                        marginBottom: '20px',
                        textAlign: 'center',
                    }}
                >
                    Drücke Start, halte deinen Atem an und drücke Stopp, wenn du nicht mehr kannst!
                </p>
            )}

            {/* Timer display positioned above the icon */}
            <p
                style={{
                    fontSize: '2.5rem',
                    color: '#E40422',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}
            >
                {formatTime(time)}
            </p>

            {/* Congratulation text */}
            {finalTime && (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3 style={{ color: '#E40422', fontSize: '1.5rem', margin: '0' }}>Super!!</h3>
                    <p style={{ fontSize: '1.2rem', color: '#333' }}>
                        Du hast deinen Atem{' '}
                        <span style={{ fontWeight: 'bold', color: '#E40422' }}>{finalTime}</span> Sekunden
                        angehalten!
                    </p>
                </div>
            )}

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
                    src={isRunning ? '/assets/quiz/holdL.png' : '/assets/quiz/breathL.png'}
                    alt={isRunning ? 'Timer Running' : 'Timer Idle'}
                    style={{ width: '200px', height: '200px' }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '20px',
                    width: '100%',
                    maxWidth: '250px',
                }}
            >
                <button
                    style={{
                        fontSize: '0.9rem',
                        backgroundColor: 'transparent',
                        color: '#E40422',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    onClick={resetTimer}
                >
                    Wiederholen
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
                        Stop
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionTimer;
