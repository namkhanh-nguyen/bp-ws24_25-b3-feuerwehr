'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/quiz.module.css';
import { quizData } from '../components/quiz/QuizData';
import { fetchJobs } from '@/app/api/jobs/fetchJobs';
import InputQuestion from '../components/quiz/InputQuestion';
import QuestionImageOptions from '../components/quiz/QuestionImageOption';
import QuestionSlider from '../components/quiz/QuestionSlider';
import QuestionTimer from '../components/quiz/QuestionTimer';
import { useRouter } from 'next/navigation';
import WaveProgress from '../components/quiz/WaveProgress';

const Quiz = () => {
    const [currentScreen, setCurrentScreen] = useState<'intro' | 'story' | 'intermediate' | 'quiz' | 'illustration01'| 'illustration02'| 'results'>('intro')  ;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{questionId: number, selectedOption: string, fullText: string}[]>([]);
    const [education, setEducation] = useState<string>('');
    const [quizResult, setQuizResult] = useState<any>(null);
    const [jobs, setJobs] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pushUpsValue, setPushUpsValue] = useState('');
    const [sitUpsValue, setSitUpsValue] = useState('');
    const router = useRouter();

    const currentQuestion = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;

    useEffect(() => {
        const loadJobs = async () => {
            const jobsData = await fetchJobs();
            setJobs(jobsData as any);
        };
        loadJobs();
    }, []);

    const goNext = () => {
        if (currentScreen === 'intro') {
            setCurrentScreen('intermediate');
        } else if (currentScreen === 'intermediate' && education) {
            setCurrentScreen('quiz');
        } else if (currentScreen === 'quiz') {
            if (currentQuestionIndex === 5) {
                setCurrentScreen('illustration01');
            } else if (currentQuestionIndex === quizData.length - 1) {
                submitQuiz();
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }  else if (currentScreen === 'illustration01') {
            setCurrentScreen('quiz');
            setCurrentQuestionIndex(6);
        }
    };

    const goBack = () => {
        if (currentScreen === 'intermediate') {
            setCurrentScreen('intro');
        } else if (currentScreen === 'quiz') {
            if (currentQuestionIndex === 0) {
                setCurrentScreen('intermediate');
            } else if (currentQuestionIndex === 6){
                setCurrentScreen('illustration01');
            }
            else {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
            }
        } else if (currentScreen === 'illustration01') {
            setCurrentScreen('quiz');
            setCurrentQuestionIndex(5);
        }
    };

    const selectAnswer = (category: string, text: string) => {
        if (currentQuestion.id === 1 && category === 'D') {
            alert("Um in die Feuerwehr-Ausbildung aufgenommen zu werden, musst du ein C1-SpSprachniveau erreichen.");
        }
        setAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestionIndex] = {
                questionId: currentQuestion.id,
                selectedOption: category,
                fullText: text
            };
            return updatedAnswers;
        });
        goNext();
    };
    const submitQuiz = async () => {
        setIsSubmitting(true);
        try {
            console.log("Answers:", answers);
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers: [
                        { questionId: 0, selectedOption: education },
                        ...answers.map(answer => ({
                            questionId: answer.questionId,
                            selectedOption: answer.selectedOption
                        }))
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            }

            const result = await response.json();
            setQuizResult(result);
            localStorage.setItem('quizResult', JSON.stringify(result));
            router.push('/results');
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('There was an error submitting the quiz. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateProgress = () => {
        if (currentScreen === 'quiz') {
            return ((currentQuestionIndex + 1) / totalQuestions) * 100;
        }
        return 0;
    };

    return (
        <div className={styles.quizContainer}>
            <div className={styles.quizWrapper}>
                {/* Intro Screen */}
                {currentScreen === 'intro' && (
                    <div className={`${styles.introContainer} ${styles.fadeIn}`}>
                        <img src="/Lupe.png" alt="Intro Image" className={styles.introImage}/>
                        <h3>Finde den Job, der zu Dir passt!</h3>
                        <p>
                            Willkommen beim Karriere-Navigator! Mit diesem Quiz findest Du heraus, welche Ausbildungsmöglichkeiten
                            bei der <span style={{ fontWeight: 'bold', color: 'red' }}>Berliner Feuerwehr</span> perfekt
                            zu Dir und Deinen Stärken passen.
                        </p>
                        <button onClick={goNext} className={styles.continueButton}>
                            Start
                        </button>
                    </div>
                )}

                {/* Intermediate Screen */}
                {currentScreen === 'intermediate' && (
                    <div className={`${styles.intermediateContainer} ${styles.fadeIn}`}>
                        <img src="/Peace.png" alt="Intermediate Image" className={styles.introImage}/>
                        <h3>Bitte wähle Deinen höchsten Abschluss aus der Liste aus.</h3>
                        <div className={`${styles.dropdown} ${education ? styles.selected : ''}`}>
                            <select
                                id="education"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            >
                                <option value="">Bitte auswählen</option>
                                <option value="Berufsbildungsreife">Berufsbildungsreife</option>
                                <option value="MSA">MSA (Mittlerer Schulabschluss)</option>
                                <option value="Abitur">Abitur</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option
                                    value="Hauptschulabschluss mit 2 Jahre Berufsausbildung/Fachabitur/mindestens 4-jährige Soldat">
                                    Hauptschulabschluss mit 2-jähriger Berufsausbildung/Fachabitur/mindestens 4-jährige Soldatenlaufbahn
                                </option>
                                <option value="Abgeschlossener Rettungsdienstberuf">
                                    Abgeschlossener Rettungsdienstberuf
                                </option>
                            </select>
                        </div>
                        <button className={styles.continueButton} onClick={goNext} disabled={!education}>
                            Weiter
                        </button>
                    </div>
                )}

                {/* Quiz Screen */}
                {currentScreen === 'quiz' && (
                    <>
                        <WaveProgress progress={calculateProgress()} showWaterDrop={false} />
                        <div className={styles.questionNumber}>
                            Frage {currentQuestionIndex + 1}
                        </div>
                        <div className={styles.questionTitle}>{currentQuestion.title}</div>

                        {currentQuestion.type === 'options' && currentQuestion.options && (
                            <div className={styles.optionsContainer}>
                                {currentQuestion.options.map((option, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.optionButton} ${answers[currentQuestionIndex]?.selectedOption === option.category ? styles.selectedOption : ''}`}
                                            onClick={() => {
                                                if (currentQuestion.id === 1 && option.category === 'D') {
                                                    alert("Um in die Feuerwehr-Ausbildung aufgenommen zu werden, musst du ein C1-Sprachniveau erreichen.");
                                                }
                                                setAnswers((prev) => {
                                                    const updatedAnswers = [...prev];
                                                    updatedAnswers[currentQuestionIndex] = {
                                                        questionId: currentQuestion.id,
                                                        selectedOption: option.category,
                                                        fullText: option.text,
                                                    };
                                                    return updatedAnswers;
                                                });
                                            }}
                                        >
                                            <span className={styles.optionPrefix}>{option.prefix}</span>
                                            <span className={styles.optionText}>{option.text}</span>
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {currentQuestion.type === 'input' && (
                            <div className={styles.inputContainer}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src="/assets/quiz/growRed.svg"
                                        alt="Icon for height question"
                                        className={styles.customSvg}
                                    />
                                </div>
                                <InputQuestion
                                    question={currentQuestion}
                                    value={answers[currentQuestionIndex]?.fullText || ''}
                                    onChange={(value: any) => {
                                        setAnswers((prev) => {
                                            const updatedAnswers = [...prev];
                                            updatedAnswers[currentQuestionIndex] = {
                                                questionId: currentQuestion.id,
                                                selectedOption: 'input',
                                                fullText: value,
                                            };
                                            return updatedAnswers;
                                        });
                                    }}
                                    onBlur={() => {
                                        const heightValue = parseFloat(answers[currentQuestionIndex]?.fullText || '');
                                        if (!isNaN(heightValue)) {
                                            if (heightValue < currentQuestion.minValue!) {
                                                alert(`Für die Verbeamtung bei der Berliner Feuerwehr ist eine Mindestgröße von ${currentQuestion.minValue} cm erforderlich. Du kannst jedoch ohne Verbeamtung einsteigen.`);
                                            } else if (heightValue > currentQuestion.maxValue!) {
                                                alert(`Für die Verbeamtung bei der Berliner Feuerwehr darf die Größe ${currentQuestion.maxValue} cm nicht überschreiten. Du kannst jedoch ohne Verbeamtung einsteigen.`);
                                            }
                                        }
                                    }
                                    }
                                />
                            </div>
                        )}

                        {currentQuestion.type === 'imageOptions' && currentQuestion.images && (
                            <QuestionImageOptions
                                images={currentQuestion.images}
                                onSelectionChange={(selectedImages) => {
                                    setAnswers((prev) => {
                                        const updatedAnswers = [...prev];
                                        const currentAnswer = updatedAnswers[currentQuestionIndex];
                                        // Check if the selected option already exists in the current answer
                                        const selectedCategories = selectedImages.map((image) => image.category).join(', ');
                                        const selectedSrc = selectedImages.map((image) => image.src).join(',');
                                        if (
                                            currentAnswer &&
                                            currentAnswer.selectedOption === selectedCategories &&
                                            currentAnswer.fullText === selectedSrc
                                        ) {
                                            return prev;
                                        }
                                        updatedAnswers[currentQuestionIndex] = {
                                            questionId: currentQuestion.id,
                                            selectedOption: selectedCategories,
                                            fullText: selectedSrc,
                                        };
                                        return updatedAnswers;
                                    });

                                }}
                            />
                        )}

                        {currentQuestion.type === 'slider' && (
                            <QuestionSlider
                                question={currentQuestion}
                                value={parseInt(answers[currentQuestionIndex]?.fullText || '50')}
                                onChange={(value: { toString: () => any; }) => {
                                    setAnswers((prev) => {
                                        const updatedAnswers = [...prev];
                                        updatedAnswers[currentQuestionIndex] = {
                                            questionId: currentQuestion.id,
                                            selectedOption: 'slider',
                                            fullText: value.toString(),
                                        };
                                        return updatedAnswers;
                                    });
                                }}
                            />
                        )}

                        {currentQuestion.type === 'fitness' && (
                            <div className={styles.fitnessContainer}>
                                {currentQuestion.questions?.map((subQuestion, index) => (
                                    <div key={index} className={styles.fitnessQuestion}>
                                        <label htmlFor={`fitness-${index}`} className={styles.fitnessLabel}>
                                            {subQuestion.label}
                                        </label>
                                        <select
                                            id={`fitness-${index}`}
                                            className={styles.fitnessDropdown}
                                            value={
                                                index === 0 ? pushUpsValue : sitUpsValue
                                            }
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                if (selectedValue === 'Weniger als 10') {
                                                    alert("Die Berliner Feuerwehr benötigt sportliche Personen. Bitte arbeite an deiner Fitness!");
                                                }
                                                if (index === 0) {
                                                    setPushUpsValue(e.target.value);
                                                } else {
                                                    setSitUpsValue(e.target.value);
                                                }
                                                setAnswers((prev) => {
                                                    const updatedAnswers = [...prev];
                                                    updatedAnswers[currentQuestionIndex] = {
                                                        questionId: currentQuestion.id,
                                                        selectedOption: `${pushUpsValue},${sitUpsValue}`,
                                                        fullText: `Push-ups: ${pushUpsValue}, Sit-ups: ${sitUpsValue}`,
                                                    };
                                                    return updatedAnswers;
                                                });
                                            }}
                                        >
                                            <option value="">Anzahl auswählen</option>
                                            {subQuestion.options.map((option, idx) => (
                                                <option key={idx} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === 'timer' && (
                            <QuestionTimer
                                onTimerComplete={(time: { toString: () => any; }) => {
                                    setAnswers((prev) => {
                                        const updatedAnswers = [...prev];
                                        updatedAnswers[currentQuestionIndex] = {
                                            questionId: currentQuestion.id,
                                            selectedOption: 'timer',
                                            fullText: time.toString(),
                                        };
                                        return updatedAnswers;
                                    });
                                }}
                            />
                        )}

                        {/* Navigation Buttons */}
                        <div className={styles.navButtons}>
                            <button
                                className={styles.backButton}
                                onClick={goBack}
                            >
                                Zurück
                            </button>
                            <button
                                className={styles.nextButton}
                                onClick={goNext}
                                disabled={!answers[currentQuestionIndex]?.selectedOption}
                            >
                                {currentQuestionIndex === totalQuestions - 1
                                    ? (isSubmitting ? 'Wird geladen...' : 'Ergebnisse')
                                    : 'Weiter'}
                            </button>
                        </div>
                    </>
                )}

                {currentScreen === 'illustration01' && (
                    <div className={styles.storyContainer}>
                        <img src='/assets/quiz/unfallNeu.svg'
                             className={styles.storyImage}
                        />
                        <h3>Erlebe eine Geschichte, in der Du die Entscheidungen triffst!</h3>
                        <p style={{fontSize: '18px', color: '#333' }}> Es ist ein entspannter Nachmittag und Du bist mit Deinen Freunden 👨🏻‍🤝‍👨🏼
                            unterwegs.</p>
                        <p style={{fontSize: '18px', color: '#333' }}>Als plötzlich ein lautes Krachen durch die Luft hallt. Ein Auto
                            ist frontal in einem Baum gekracht 🚗💥 und Rauch 💨 steigt aus der Motorhaube auf.</p>
                        {/* Navigation Buttons */}
                        <div className={styles.navButtons}>
                            <button
                                className={styles.backButton}
                                onClick={goBack}
                            >
                                Zurück
                            </button>
                            <button onClick={goNext} className={styles.nextButton}>
                                Weiter
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;

