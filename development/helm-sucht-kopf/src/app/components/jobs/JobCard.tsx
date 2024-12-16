import React from "react";
import styles from '../../styles/jobs.module.css';

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
            className="job-card flex flex-col md:flex-row md:items-center mt-8 group"
            style={{
                marginTop: "2rem",
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
                        {threshold: 0.1}
                    );
                    observer.observe(el);
                }
            }}
        >
            <img
                src={`./assets/jobs/${slug}.png`}
                alt={name}
                className={styles.jobImage}
                onClick={() => (window.location.href = `/jobs/${slug}`)}
            />

            <div className={styles.jobHoverInfo}>
                <p className={styles.jobShortDesc}>{shortDesc}</p>
                <span
                    className={styles.jobShortDesc}
                    onClick={() => (window.location.href = `/jobs/${slug}`)}
                    style={{
                        color: "var(--red-primary)",
                        textDecorationLine: "underline",
                        cursor: "pointer",
                    }}
                >
            Mehr Infos
        </span>
            </div>

            <div className="flex flex-col justify-between flex-grow relative">
                <h3
                    className={styles.jobName}
                    onClick={() => (window.location.href = `/jobs/${slug}`)}
                >
                    {name}
                </h3>

                <div
                    className="md:hidden"
                    style={{
                        padding: "0.5rem",
                        paddingBottom: "1rem",
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                    }}
                >
                    <button
                        style={{padding: "0.5rem"}}
                        onClick={(e) => {
                            e.stopPropagation();
                            document
                                .getElementById(`desc-${id}`)
                                ?.classList.toggle("hidden");
                        }}
                    >
                        ▼
                    </button>
                </div>
            </div>

            <div
                id={`desc-${id}`}
                className="hidden transition-all rounded-lg"
                style={{
                    width: "85%",
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                }}
            >
                <p className={styles.jobShortDesc}>{shortDesc}</p>
                <span
                    className={styles.jobShortDesc}
                    onClick={() => (window.location.href = `/jobs/${slug}`)}
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