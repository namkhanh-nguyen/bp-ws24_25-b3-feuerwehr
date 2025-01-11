'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/quiz.module.css';
import JobCard from "@/app/components/jobs/JobCard";
import React, {useState, useEffect} from "react";
import { fetchJobs } from '@/app/api/jobs/fetchJobs';


const Results = () => {
    const [quizResult, setQuizResult] = useState<any>(null);
    const [jobs, setJobs] = useState<any[]>([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const storedResult = localStorage.getItem('quizResult');
        if (storedResult) {
            setQuizResult(JSON.parse(storedResult));
        } else {
            console.error('Quiz result not found in localStorage');
            router.push('/quiz'); // Redirect back if result is missing
        }
    }, []);
    useEffect(() => {
        const loadJobs = async () => {
            const jobsData = await fetchJobs();
            console.log('Fetched Jobs:', jobsData);
            setJobs(Object.values(jobsData));
        };
        loadJobs();
    }, []);


// Filter recommended jobs based on quiz result
    const getRecommendedJobs = (type: 'direkt' | 'zukünftig') => {
        if (!quizResult) {
            console.warn('Quiz result is null or undefined');
            return [];
        }
        const recommendedJobs = quizResult.result[type];
        if (!recommendedJobs) {
            console.warn(`No recommendations found for type: ${type}`);
            return [];
        }
        console.log('Filtered Jobs:', recommendedJobs);
        return jobs.filter((job) => recommendedJobs.includes(job.name));
    };


    return (
        <div className={styles.resultsContainer}>
            {/* Display Comments */}
            {quizResult?.comments && quizResult.comments.length > 0 && (
                <div className={styles.commentsContainer}>
                    <h3 className={styles.centeredHeader}>Hinweise:</h3>
                    <ul className={styles.commentList}>
                        {quizResult.comments.map((comment: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                            <li key={index} className={styles.commentItem}>
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Display Immediate Opportunities */}
            <h3 className={styles.centeredHeader}>Aktuelle Möglichkeiten:</h3>
            <p className={styles.centeredText}>
                Diese Ausbildungen kannst Du direkt mit Deinem aktuellen Abschluss beginnen:
            </p>
            <div className={`${styles.jobList} md:grid-cols-2`}>
                {getRecommendedJobs('direkt').map(({ id, name, slug, shortDesc }) => (
                    <div key={slug}>
                        <JobCard id={id} slug={slug} name={name} shortDesc={shortDesc} />
                    </div>
                ))}
            </div>

            {/* Display Future Opportunities */}
            <h3 className={styles.centeredHeader}>Zukünftige Möglichkeiten:</h3>
            <p className={styles.centeredText}>
                Diese Ausbildungen kannst Du nach weiteren Qualifikationen oder Abschlüssen beginnen:
            </p>
            <div className={`${styles.jobList} md:grid-cols-2`}>
                {getRecommendedJobs('zukünftig').map(({ id, name, slug, shortDesc }) => (
                    <div key={slug}>
                        <JobCard id={id} slug={slug} name={name} shortDesc={shortDesc} />
                    </div>
                ))}
            </div>

            {/* Restart Button */}
            <div className={styles.buttonContainer}>
                <button
                    className={styles.restartButton}
                    onClick={() => router.push('/quiz')} // Redirect back to the quiz intro page
                >
                    Quiz erneut starten
                </button>
            </div>
        </div>
    );
};

export default Results;
