'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/quiz.module.css';
import { quizData } from '../components/quiz/QuizData';
import { fetchJobs } from '@/app/api/jobs/fetchJobs';
import JobCard from "@/app/components/jobs/JobCard";
import InputQuestion from '../components/quiz/InputQuestion';
import QuestionImageOptions from '../components/quiz/QuestionImageOption';
import QuestionSlider from '../components/quiz/QuestionSlider';
import QuestionTimer from '../components/quiz/QuestionTimer';


const Quiz = () => {
    const [currentScreen, setCurrentScreen] = useState<'intro' | 'story' | 'intermediate' | 'quiz' | 'results'>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{questionId: number, selectedOption: string, fullText: string}[]>([]);
    const [education, setEducation] = useState<string>('');
    const [quizResult, setQuizResult] = useState<any>(null);
    const [jobs, setJobs] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pushUpsValue, setPushUpsValue] = useState('');
    const [sitUpsValue, setSitUpsValue] = useState('');

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
            setCurrentScreen('story');
        } else if (currentScreen === 'story') {
            setCurrentScreen('quiz');
        } else if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else {
            submitQuiz();
        }
    };

    const goBack = () => {
        if (currentScreen === 'story') {
            setCurrentScreen('intro');
        } else if (currentScreen === 'quiz') {
            if (currentQuestionIndex === 0) {
                setCurrentScreen('story');
            } else {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
            }
        }
    };

    const selectAnswer = (category: string, text: string) => {
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
            setCurrentScreen('results');
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('There was an error submitting the quiz. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getRecommendedJobs = (type: 'direkt' | 'zukünftig') => {
        if (!quizResult) return [];
        const recommendedJobs = quizResult.result[type];
        return Object.values(jobs).filter(job => recommendedJobs.includes(job.name));
    };

    return (
        <div className={styles.quizContainer}>
            <div className={styles.quizWrapper}>

                <a href={'/jobs'}
                   style={{
                       alignItems: 'center',
                       justifyContent: 'flex-start',
                       color: 'var(--red-primary)',
                       marginBottom: '20px',
                       display: 'flex',
                       cursor: 'pointer'
                   }}>
                    <h3 style={{marginRight: '10px'}}>←</h3>
                    <h3 style={{textDecoration: 'underline'}}>
                        Zurück
                    </h3>
                </a>

                {/* Intro Screen */}
                {currentScreen === 'intro' && (
                    <div className={styles.introContainer}>
                        <img src="/Lupe.png" alt="Intro Image" className={styles.introImage}/>
                        <h3>Welcher Job passt zu Dir?</h3>
                        <p>
                            Willkommen beim Karriere Navigator! Dieser Quiz hilft Dir dabei,
                            herauszufinden, welcher Beruf bei der Berliner Feuerwehr am besten
                            zu Dir passt.
                        </p>
                        <button onClick={goNext} className={styles.startButton}>
                            Start
                        </button>
                    </div>
                )}

                {/* Intermediate Screen */}
                {currentScreen === 'intermediate' && (
                    <div className={styles.intermediateContainer}>
                        <img src="/Peace.png" alt="Intermediate Image" className={styles.intermediateImage}/>
                        <h3>Dein Hintergrund?</h3>
                        <div className={`${styles.dropdown} ${education ? styles.selected : ''}`}>
                            <label htmlFor="education">Mein Abschluss:</label>
                            <select
                                id="education"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            >
                                <option value="">Bitte auswählen</option>
                                <option value="Berufsbildungsreife">Berufsbildungsreife</option>
                                <option value="MSA">MSA</option>
                                <option value="Abitur">Abitur</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option
                                    value="Hauptschulabschluss mit 2 Jahre Berufsausbildung/Fachabitur/mindestens 4-jährige Soldat">Hauptschulabschluss
                                    mit 2 Jahre Berufsausbildung/Fachabitur/mindestens 4-jährige Soldat
                                </option>
                                <option value="Abgeschlossener Rettungsdienstberuf">Abgeschlossener
                                    Rettungsdienstberuf
                                </option>
                            </select>
                        </div>
                        <button className={styles.continueButton} onClick={goNext} disabled={!education}>
                            Weiter
                        </button>
                    </div>
                )}

                {/* Story Screen */}
                {currentScreen === 'story' && (
                    <div className={styles.storyContainer}>
                        <img src="/112_Notruf.png" alt="Story Image" className={styles.storyImage}/>
                        <h3>Eine kleine Geschichte...</h3>
                        <p>Es ist ein entspannter Nachmittag und Du bist mit Deinen Freunden unterwegs, als plötzlich
                            ein lautes Krachen durch die Luft hallt. Ein Auto ist frontal in einen Baum gekracht und
                            Rauch steigt aus der Motorhaube auf.</p>
                        <button onClick={goNext} className={styles.continueButton}>
                            Weiter
                        </button>
                    </div>
                )}

                {/* Quiz Screen */}
                {currentScreen === 'quiz' && (
                    <>
                        <div className={styles.progressBarContainer}>
                            <div
                                className={styles.progressBar}
                                style={{
                                    width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                                }}
                            />
                        </div>
                        <div className={styles.questionNumber}>
                            Frage {currentQuestionIndex + 1}
                        </div>
                        <div className={styles.questionTitle}>{currentQuestion.title}</div>
                        {/* Fitness Screen*/}

                        {currentQuestion.type === 'options' && currentQuestion.options && (
                            <div className={styles.optionsContainer}>
                                {currentQuestion.options.map(
                                    (option, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.optionButton} ${answers[currentQuestionIndex]?.selectedOption === option.category ? styles.selectedOption : ''}`}
                                            onClick={() => selectAnswer(option.category, option.text)}
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
                                {/* Conditional rendering for SVG image */}
                                {currentQuestion.id === 2 && (
                                    <div className={styles.imageContainer}>
                                        <img
                                            src="/assets/quiz/schulung.svg" // Path to your SVG
                                            alt="Icon for height question"
                                            className={styles.customSvg}
                                        />
                                    </div>
                                )}
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
                                />
                            </div>
                        )}

                        {currentQuestion.type === 'imageOptions' && currentQuestion.images && (
                                    <QuestionImageOptions
                                        images={currentQuestion.images}
                                        onSelectionChange={(selectedImages) => {
                                            setAnswers((prev) => {
                                                const updatedAnswers = [...prev];
                                                updatedAnswers[currentQuestionIndex] = {
                                                    questionId: currentQuestion.id,
                                                    selectedOption: selectedImages.map((image: { category: any; }) => image.category).join(', '),
                                                    fullText: selectedImages.map((image: { src: any; }) => image.src).join(', '),
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
                        {currentQuestion.id === 4 && (
                            <div>
                                <div className={styles.fitnessDropdownContainer}>
                                    {/* Push ups */}
                                    <label htmlFor="fitnessPushUps" className={styles.fitnessLabel}>
                                        Wie viele Liegestütze schaffst du in 60 sek?
                                    </label>
                                    <select
                                        id="fitnessPushUps"
                                        className={styles.fitnessDropdown}
                                        value={pushUpsValue}
                                        onChange={(e) => setPushUpsValue(e.target.value)}
                                    >
                                        <option value="">Anzahl auswählen</option>
                                        <option value="under10">Unter 10</option>
                                        <option value="10-20">10 - 20</option>
                                        <option value="20-30">20 - 30</option>
                                        <option value="30-40">30 - 40</option>
                                        <option value="40plus">+40</option>
                                    </select>
                                </div>

                                <div className={styles.fitnessDropdownContainer}>
                                    {/* Sit ups */}
                                    <label htmlFor="fitnessSitUps" className={styles.fitnessLabel}>
                                        Wie viele Sit ups schaffst du in 60 sek?
                                    </label>
                                    <select
                                        id="fitnessSitUps"
                                        className={styles.fitnessDropdown}
                                        value={sitUpsValue}
                                        onChange={(e) => setSitUpsValue(e.target.value)}
                                    >
                                        <option value="">Anzahl auswählen</option>
                                        <option value="under10">Unter 10</option>
                                        <option value="10-20">10 - 20</option>
                                        <option value="20-30">20 - 30</option>
                                        <option value="30-40">30 - 40</option>
                                        <option value="40plus">+40</option>
                                    </select>
                                </div>
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

                        {currentQuestion.type === 'illustration' && currentQuestion.images && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                {currentQuestion.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt={`Illustration ${index + 1}`}
                                    style={{ width: '300px', height: 'auto', margin: '20px auto' }}
                                />
                                    ))}
                                <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '20px' }}>
                                    {currentQuestion.title}
                                </p>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className={styles.navButtons}>
                            <button
                                className={styles.backButton}
                                onClick={goBack}
                                disabled={currentQuestionIndex === 0}
                            >
                                Zurück
                            </button>
                            <button
                                className={styles.nextButton}
                                onClick={goNext}
                                disabled={!answers[currentQuestionIndex] || isSubmitting}
                            >
                                {currentQuestionIndex === totalQuestions - 1
                                    ? (isSubmitting ? 'Wird geladen...' : 'Ergebnisse')
                                    : 'Weiter'}
                            </button>
                        </div>
                    </>
                )}

                {/* Result Screen */}
                {currentScreen === 'results' && (
                    <div className={styles.resultsContainer}>
                        <h3 className={styles.centeredHeader}>Aktuelle Möglichkeiten:</h3>
                        <p className={styles.centeredText}>Diese Ausbildungen kannst Du direkt mit Deinem aktuellen
                            Abschluss beginnen:</p>
                        <div className={`${styles.jobList} md:grid-cols-2`}>
                            {getRecommendedJobs('direkt').map(({id, name, slug, shortDesc}) => (
                                <div key={slug}>
                                    <JobCard
                                        id={id}
                                        slug={slug}
                                        name={name}
                                        shortDesc={shortDesc}
                                    />
                                </div>
                            ))}
                        </div>

                        <h3 className={styles.centeredHeader}>Zukünftige Möglichkeiten:</h3>
                        <p className={styles.centeredText}>Diese Ausbildungen kannst Du nach weiteren Qualifikationen
                            oder Abschlüssen beginnen:</p>
                        <div className={`${styles.jobList} md:grid-cols-2`}>
                            {getRecommendedJobs('zukünftig').map(({id, name, slug, shortDesc}) => (
                                <div key={slug}>
                                    <JobCard
                                        id={id}
                                        slug={slug}
                                        name={name}
                                        shortDesc={shortDesc}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.restartButton}
                                onClick={() => {
                                    setCurrentScreen('intro');
                                    setCurrentQuestionIndex(0);
                                    setAnswers([]);
                                    setEducation('');
                                    setQuizResult(null);
                                }}
                            >
                                Quiz erneut starten
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;

