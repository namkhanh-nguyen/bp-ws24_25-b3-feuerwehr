'use client';

import { useState, useEffect } from 'react';
import styles from './quiz.module.css';
import { quizData } from './quizData';
import { fetchJobs } from '../services/fetchJobs';

const Quiz = () => {

    const [currentScreen, setCurrentScreen] = useState<'intro' | 'story' | 'intermediate' | 'quiz' | 'results'>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [sliderValue, setSliderValue] = useState<number | string>('');
    const [education, setEducation] = useState<string>(''); // State for first dropdown
    const [careerGoal, setCareerGoal] = useState<string>(''); // State for second dropdown

    const [jobs, setJobs] = useState<any[]>([]); // Fetched jobs
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]); // Jobs matching the user's results

    const currentQuestion = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;

    useEffect(() => {
        const getJobs = async () => {
            const data = await fetchJobs();
            setJobs(data);
            return data; // Return data for further chaining if needed
        };

        getJobs()
            .then((result) => console.log('Fetched Jobs:', result)) // Properly handle the Promise
            .catch((error) => console.error('Error fetching jobs:', error));
    }, []);



    const goNext = () => {
        if (currentScreen === 'intro') {
            setCurrentScreen('intermediate');
        }else if (currentScreen === 'intermediate') {
                setCurrentScreen('story');
        } else if (currentScreen === 'story') {
            setCurrentScreen('quiz');
        } else if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSliderValue(''); // Reset slider value after moving to the next question
        } else {
            filterJobs(); // Filter jobs based on results
            setCurrentScreen('results');
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

    const selectAnswer = (answer: any) => {
        setAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestionIndex] = answer;
            return updatedAnswers;
        });
        goNext();
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value)); // Update the slider value
    };

    const handleSliderBlur = () => {
        // Save the slider value as an answer when the slider interaction finishes
        if (sliderValue !== '') {
            selectAnswer(`Value: ${sliderValue}`);
        }
    };

    const filterJobs = () => {
        // Example: match tags from answers with job tags
        const relevantTags = answers.map((answer: any) => answer.toLowerCase());

        const matchedJobs = jobs.filter((job) =>
            relevantTags.some((tag) => job.tags?.includes(tag))
        );

        setFilteredJobs(matchedJobs);
    };

    return (
        <div className={styles.quizContainer}>
            <div className={styles.quizWrapper}>
                {/* <h2 className={styles.quizTitle}>Karriere Navigator</h2> */}

                {/* Intro Screen */}
                {currentScreen === 'intro' && (
                    <div className={styles.introContainer}>
                        <img src="Lupe.png" alt="Intro Image" className={styles.introImage}/>
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

                {/* Result Screen */}
                {currentScreen === 'results' && (
                    <div className={styles.resultsContainer}>
                        <h2>Deine Ergebnisse</h2>
                        <p>Basierend auf Deinen Antworten sind diese Berufe für Dich am besten geeignet:</p>
                        {filteredJobs.length > 0 ? (
                            <ul className={styles.jobsList}>
                                {filteredJobs.map((job) => (
                                    <li
                                        key={job.id}
                                        className={styles.jobCard}
                                        onClick={() => (window.location.href = `/jobs/${job.slug}`)}
                                    >
                                        <img
                                            src={job.imageUrl}
                                            alt={job.name}
                                            className={styles.jobImage}
                                        />
                                        <h3>{job.name}</h3>
                                        <p>{job.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <>
                            <p>Schaue Dir auch die anderen Ausbildungen, die wie bieten:</p>
                                <ul className={styles.jobsList}>
                                    {jobs.map((job) => (
                                        <li
                                            key={job.id}
                                            className={styles.jobCard}
                                            onClick={() => (window.location.href = `/jobs/${job.slug}`)}
                                        >
                                            <img
                                                src={job.imageUrl}
                                                alt={job.name}
                                                className={styles.jobImage}
                                            />
                                            <h3>{job.name}</h3>
                                            <p>{job.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        <button
                            className={styles.restartButton}
                            onClick={() => {
                                setCurrentScreen('intro');
                                setCurrentQuestionIndex(0);
                                setAnswers([]);
                                setFilteredJobs([]);
                            }}
                        >
                            Quiz erneut starten
                        </button>
                    </div>
                )}


                {currentScreen === 'intermediate' && (
                    <div className={styles.intermediateContainer}>
                        <img src="/Peace.png" alt="Intemediate Image" className={styles.intermediateImage}/>
                        <h3>Dein Hintergrund?</h3>

                        {/* Dropdown for education */}
                        <div className={`${styles.dropdown} ${education ? styles.selected : ''}`}>
                            <label htmlFor="education">Mein Abschluss:</label>
                            <select
                                id="education"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            >
                                <option value="">Bitte auswählen</option>
                                <option value="bbr/ebbr">BBR/EBBR</option>
                                <option value="msa">MSA</option>
                                <option value="abitur">Abitur</option>
                                <option value="bachelor">Bachelor</option>
                                <option value="master">Master</option>
                            </select>
                        </div>

                        {/* Dropdown for career goals */}
                        <div className={`${styles.dropdown} ${careerGoal ? styles.selected : ''}`}>
                            <label htmlFor="careerGoal">Ich suche nach:</label>
                            <select
                                id="careerGoal"
                                value={careerGoal}
                                onChange={(e) => setCareerGoal(e.target.value)}
                            >
                                <option value="">Bitte auswählen</option>
                                <option value="ausbildung">Ausbildung</option>
                                <option value="freiwilligen">Freiwilligen</option>
                                <option value="praktikum">Praktikum</option>
                                <option value="quereinstieg">Quereinstieg</option>
                            </select>
                        </div>

                        <button className={styles.continueButton} onClick={goNext}>
                            Weiter
                        </button>
                    </div>
                )}

                {/* Story Screen */}
                {currentScreen === 'story' && (
                    <div className={styles.storyContainer}>
                        <img src="/112_Notruf.png" alt="Story Image" className={styles.storyImage}/>

                        <h3>Eine kleine Geschichte...</h3>
                        <p>Es ist ein entspannter Nachmittag und Du bist mit Deinen Freunden unterwegs, als plotzlich ein lautes Krachen durch die Luft hallt. Ein Auto ist frontal in einen Baum gekracht und Rauch steigt aus der Motorhaube auf.</p>
                        <button onClick={goNext} className={styles.continueButton}>
                            Weiter
                        </button>
                    </div>
                )}


                {/* Quiz Screen */}
                {currentScreen === 'quiz' && (
                    <>
                        {/* Progress text */}
                        {/*
                        <div className={styles.progressText}>
                            Frage {currentQuestionIndex + 1} von {totalQuestions}
                        </div>
                        */}

                        {/* Progress bar */}
                        <div className={styles.progressBarContainer}>
                            <div
                                className={styles.progressBar}
                                style={{
                                    width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                                }}
                            />
                        </div>

                        {/* Display the question number at the top-left */}
                        <div className={styles.questionNumber}>
                            Frage {currentQuestionIndex + 1}
                        </div>


                        <div className={styles.questionTitle}>{currentQuestion.title}</div>

                        {/* Render Options */}
                        {currentQuestion.type === 'options' && currentQuestion.options && (
                            <div className={styles.optionsContainer}>
                                {currentQuestion.options.map(
                                    (option: { prefix: string; text: string }, index: number) => (
                                        <button
                                            key={index}
                                            className={`${styles.optionButton} ${answers[currentQuestionIndex] === option.text ? styles.selectedOption : ''}`}
                                            onClick={() => selectAnswer(option.text)} // Save only the text as the answer
                                        >
                                            <span className={styles.optionPrefix}>{option.prefix}</span>
                                            <span className={styles.optionText}>{option.text}</span>
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {currentQuestion.type === 'imageOptions' && currentQuestion.images && (
                            <div className={styles.imageOptionsContainer}>
                                {currentQuestion.images.map((image: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`${styles.imageOption} ${answers[currentQuestionIndex] === image.label ? styles.selectedImage : ''}`}
                                        onClick={() => selectAnswer(image.label)}
                                    >
                                        <img src={image.src} alt={image.label} className={styles.image} />
                                        <div className={styles.imageLabel}>{image.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {currentQuestion.type === 'scale' && (
                            <div className={styles.scaleContainer}>
                                <div className={styles.scaleLabels}>
                                    <span>{currentQuestion.minLabel}</span>
                                    <span>{currentQuestion.maxLabel}</span>
                                </div>
                                <input
                                    type="range"
                                    min={currentQuestion.minValue}
                                    max={currentQuestion.maxValue}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    onBlur={handleSliderBlur} // Save the value when the slider loses focus
                                    className={styles.scaleSlider}

                                />
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
                                disabled={answers[currentQuestionIndex] === undefined}
                            >
                                Weiter
                            </button>
                        </div>
                    </>
                  )}
            </div>
        </div>
    )
};

export default Quiz;
