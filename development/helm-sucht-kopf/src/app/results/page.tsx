"use client";

import { useRouter } from "next/navigation";
import styles from "../styles/quiz.module.css";
import styles2 from "../styles/jobs.module.css";
import JobCard from "@/app/components/jobs/JobCard";
import React, { useState, useEffect } from "react";
import { fetchJobs } from "@/app/api/jobs/fetchJobs";

const Results = () => {
  const [quizResult, setQuizResult] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem("quizResult");
    if (storedResult) {
      setQuizResult(JSON.parse(storedResult));
    } else {
      console.error("Quiz result not found in localStorage");
      router.push("/quiz"); // Redirect back if result is missing
    }
  }, []);
  useEffect(() => {
    const loadJobs = async () => {
      const jobsData = await fetchJobs();
      console.log("Fetched Jobs:", jobsData);
      setJobs(Object.values(jobsData));
    };
    loadJobs();
  }, []);

  // Filter recommended jobs based on quiz result
  const getRecommendedJobs = (type: "direkt" | "zukünftig") => {
    if (!quizResult) {
      console.warn("Quiz result is null or undefined");
      return [];
    }
    const recommendedJobs = quizResult.result[type];
    if (!recommendedJobs) {
      console.warn(`No recommendations found for type: ${type}`);
      return [];
    }
    console.log("Filtered Jobs:", recommendedJobs);
    return jobs.filter((job) => recommendedJobs.includes(job.name));
  };
  const futureJobs = getRecommendedJobs("zukünftig");
  const currentJobs = getRecommendedJobs("direkt");

  return (
    <div className={styles.resultsContainer}>
      {/* Display Immediate Opportunities */}
      <h3 className={styles.centeredHeader}>Aktuelle Möglichkeiten:</h3>
      {currentJobs.length > 0 ? (
        <>
          <p className={styles.centeredText}>
            Anhand Deiner Antworten im Quiz haben wir für Dich folgende Auswahl
            getroffen.
            <br />
            Diese Ausbildungen kannst Du direkt mit Deinem aktuellen Abschluss
            beginnen:
          </p>
          <div className={`${styles.jobList} md:grid-cols-2`}>
            {currentJobs.map(({ id, name, slug, shortDesc }) => (
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
        </>
      ) : (
        <p className={styles.centeredText}>
          Leider gibt es derzeit keine Ausbildungen, die direkt mit Deinem
          aktuellen Abschluss begonnen werden können. Schau Dir jedoch gerne
          deine zukünftigen Möglichkeiten an.
        </p>
      )}

      {/* Display Future Opportunities */}
      {futureJobs.length > 0 && (
        <>
          <h3 className={styles.centeredHeader2}>Zukünftige Möglichkeiten:</h3>
          <p className={styles.centeredText}>
            Diese Ausbildungen kannst Du nach weiteren Qualifikationen oder
            Abschlüssen beginnen:
          </p>
          <div className={`${styles.jobList} md:grid-cols-2`}>
            {futureJobs.map(({ id, name, slug, shortDesc }) => (
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
        </>
      )}

      {/* Restart Button */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.restartButton}
          onClick={() => router.push("/quiz")} // Redirect back to the quiz intro page
        >
          Quiz erneut starten
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0",
        }}
      >
        <div className={styles2.undecidedDiv}>
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <img
                src={`./assets/video/Azubis.jpg`}
                alt="Noch unsicher 1"
                style={{
                  borderRadius: "2rem",
                  filter: "brightness(0.7)",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  maxHeight: "40vh",
                }}
              />
              <div className={styles2.undecidedText}>
                Entdecke deine Ausbildung – <br />
                im interaktiven Video-Rundgang!
              </div>
              <button
                onClick={() => (window.location.href = "/tour")}
                className={styles2.startButton}
              >
                Starten!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
