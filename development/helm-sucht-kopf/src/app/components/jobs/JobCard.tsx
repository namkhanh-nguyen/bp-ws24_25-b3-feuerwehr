import React from "react";
import styles from "../../styles/jobs.module.css";

type JobCardProps = {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
};

const JobCard: React.FC<JobCardProps> = ({ id, slug, name, shortDesc }) => {
  return (
    <div
      key={id}
      className="job-card flex flex-col md:flex-row group"
      style={{
        flexDirection: "column",
        borderWidth: "1px",
        borderRadius: "1rem",
        position: "relative",
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
        opacity: 0,
        transform: "translateY(20px)",
      }}
      ref={(el) => {
        if (el) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  el.style.opacity = "1";
                  el.style.transform = "translateY(0)";
                }
              });
            },
            { threshold: 0.1 }
          );
          observer.observe(el);
        }
      }}
    >
      <img
        src={`./assets/jobs/${slug}.png`}
        alt={name}
        className={styles.jobImage}
        onClick={() => (window.location.href = `/ausbildungen/${slug}`)}
      />

      <div className="flex flex-col flex-grow">
        <h3
          className={styles.jobName}
          onClick={() => (window.location.href = `/ausbildungen/${slug}`)}
        >
          {name}
        </h3>
      </div>

      <div
        id={`desc-${id}`}
        className="block transition-all rounded-lg"
        style={{
          width: "85%",
          marginLeft: "1rem",
          marginBottom: "1rem",
        }}
      >
        <p className={styles.jobShortDesc}>{shortDesc}</p>
        <span
          className={styles.jobShortDesc}
          onClick={() => (window.location.href = `/ausbildungen/${slug}`)}
          style={{
            color: "var(--red-primary)",
            textDecorationLine: "underline",
            cursor: "pointer",
          }}
        >
          Mehr Infos
        </span>
      </div>
    </div>
  );
};

export default JobCard;
