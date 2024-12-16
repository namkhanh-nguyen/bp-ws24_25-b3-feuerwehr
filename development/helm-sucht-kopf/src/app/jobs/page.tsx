'use client';
import React, {useEffect, useState} from 'react';
import {fetchJobs} from '@/app/api/jobs/fetchJobs';
import {useRouter} from 'next/compat/router';
import styles from '../styles/jobs.module.css';
import Loading from "@/app/components/Loading";

const filters = [
    // Filter by qualification type
    {key: 'msa', label: 'MSA'},
    {key: 'bbr', label: 'BBR'},
    {key: 'bachelor', label: 'Bachelor'},
    {key: 'master', label: 'Master'},
    {key: 'hsa2j', label: 'Hauptschulabschluss und 2 Jahre Berufsausbildung'},
    {key: 'aghr', label: 'Allgemeine Hochschulreife'},
    {key: 'arb', label: 'Abgeschlossener Rettungsdienstberuf'}
];

export default function JobsPage() {
    const [jobs, setJobs] = useState<{
        [key: string]: {
            tags: string[],
            id: string,
            name: string,
            slug: string,
            shortDesc: string
        }
    }>({});
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useRouter();
    useEffect(() => {
        const getJobs = async () => {
            const data = await fetchJobs();
            setJobs(data as { [key: string]: any });
            setIsLoading(false);
        };
        getJobs();
    }, []);

    if (isLoading) {
        return <Loading/>;
    }

    const handleReset = () => {
        setSelectedFilters([]);
    };

    const filteredJobs = Object.values(jobs).filter((job) =>
        selectedFilters.every(filter => job.tags.includes(filter))
    );

    return (
        <div className={styles.pageMasterDiv}>
            <div style={{width: '100%', padding: '1.5rem'}}>
                <h1 className={styles.deinWeg}>
                    Dein Weg bei der Berliner Feuerwehr
                </h1>

                <p style={{textAlign: 'left', marginTop: '0.5rem'}}>
                    Finde deinen idealen Karriereweg bei der Feuerwehr Berlin. Der Karriere Navigator zeigt dir
                    alle Optionen, Spezialisierungen und Aufstiegschancen – für eine erfolgreiche und spannende
                    Laufbahn.
                </p>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                    <button
                        onClick={() => window.location.href = '/quiz'}
                        className={styles.zumNavigator}
                    >
                        Zum Navigator
                    </button>
                </div>

            </div>

            <div className={styles.jobSection}>
                <div className={styles.filterContainer}>
                    <h2>
                        Ergebnisse: {filteredJobs.length}
                    </h2>
                    <div className="block p-2">
                        <select
                            value={selectedFilters[0] || ""}
                            onChange={(e) => setSelectedFilters([e.target.value])}
                            className={styles.filterDropdown}
                        >
                            <option value="" disabled>Schulabschluss</option>
                            {filters.map(({key, label}) => (
                                <option key={key} value={key} className="p-2">
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className={styles.resetButton}
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>

                    <div className="p-2 flex justify-between md:hidden">
                        <h3 className="p-2">
                            Ergebnisse: {filteredJobs.length}
                        </h3>
                        <button
                            style={{
                                borderRadius: '1.5rem',
                                border: '1px solid black',
                                width: '30%',
                                padding: '0.5rem',
                                backgroundColor: '#E5E7EB',
                                display: isFiltersVisible ? 'none' : 'block'
                            }}
                            onClick={() => setIsFiltersVisible(true)}
                        >
                            Filtern
                        </button>
                        <button
                            style={{
                                borderRadius: '1.5rem',
                                border: '1px solid black',
                                width: '30%',
                                padding: '0.5rem',
                                backgroundColor: '#E5E7EB',
                                color: 'var(--red-primary)',
                                display: isFiltersVisible ? 'block' : 'none'
                            }}
                            onClick={() => setIsFiltersVisible(false)}
                        >
                            Close
                        </button>

                    </div>
                    {isFiltersVisible && (
                        <div className="bg-white p-4 border rounded mb-4 md:hidden">
                            <div className="block p-2" style={{display: 'flex', justifyContent: 'center'}}>
                                <select
                                    value={selectedFilters[0] || ""}
                                    onChange={(e) => setSelectedFilters([e.target.value])}
                                    className="p-2 mr-2 block w-4/5 border-black border rounded-2xl"
                                >
                                    <option value="" disabled>Schulabschluss</option>
                                    {filters.map(({key, label}) => (
                                        <option key={key} value={key} className="p-2">
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className={styles.resetButton}
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                    )}

                    <div className="job-list grid-cols-1 md:grid-cols-2"
                         style={{
                             display: 'grid',
                             gap: '2rem',
                             paddingLeft: '2.5rem',
                             paddingRight: '2.5rem',
                             flexGrow: '1'
                         }}>
                        {filteredJobs.map(({id, name, slug, shortDesc}) => (
                            <div
                                key={id}
                                className="job-card flex flex-col md:flex-row md:items-center mt-8
                                             group"
                                style={{
                                    marginTop: '2rem',
                                    flexDirection: 'column',
                                    borderWidth: '1px',
                                    borderRadius: '1rem',
                                    position: 'relative'
                                }} // always in column
                            >
                                <img
                                    src={`./assets/jobs/${slug}.png`}
                                    alt={name}
                                    className={styles.jobImage}
                                    onClick={() => window.location.href = `/jobs/${slug}`}
                                />

                                <div className={styles.jobHoverInfo}
                                >
                                    <p className={styles.jobShortDesc}>{shortDesc}</p>
                                    <span
                                        className={styles.jobShortDesc}
                                        onClick={() => window.location.href = `/jobs/${slug}`}
                                        style={{
                                            color: 'var(--red-primary)',
                                            textDecorationLine: 'underline',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Mehr Infos
                                    </span>
                                </div>

                                <div className="flex flex-col justify-between flex-grow relative"
                                >
                                    <h3 className={styles.jobName}
                                        onClick={() => window.location.href = `/jobs/${slug}`}>
                                        {name}
                                    </h3>

                                    <div className="md:hidden"
                                         style={{
                                             padding: '0.5rem',
                                             paddingBottom: '1rem',
                                             position: 'absolute',
                                             top: '0px',
                                             right: '0px'
                                         }}>
                                        <button
                                            style={{padding: '0.5rem'}}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                document.getElementById(`desc-${id}`)?.classList.toggle('hidden');
                                            }}
                                        >
                                            ▼
                                        </button>
                                    </div>
                                </div>

                                <div id={`desc-${id}`} className="hidden transition-all rounded-lg"
                                     style={{
                                         width: '85%',
                                         marginLeft: '1rem',
                                         marginBottom: '1rem',
                                     }}>
                                    <p className={styles.jobShortDesc}>{shortDesc}</p>
                                    <span
                                        className={styles.jobShortDesc}
                                        onClick={() => window.location.href = `/jobs/${slug}`}
                                        style={{
                                            color: 'var(--red-primary)',
                                            textDecorationLine: 'underline',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Mehr Infos
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div>
                <div className={styles.undecidedDiv}>
                    <div className="md:grid-cols-2"
                         style={{
                             display: 'grid',
                             gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                             gap: '1rem',
                             width: '100%', // Ensure it uses full width available
                         }}>
                        <div style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '100%', // Full width for stacking vertically
                            marginBottom: '1rem'
                        }}>
                            <img
                                src={`./assets/jobs/undecided-1.png`}
                                alt="Noch unsicher 1"
                                className={styles.undecidedImage}
                            />
                            <div className={styles.undecidedText}>
                                Noch unsicher?<br/>
                                Probiere es mit dem Quiz!
                            </div>
                            <button
                                onClick={() => window.location.href = '/quiz'}
                                className={styles.startButton}
                            >
                                Starten!
                            </button>
                        </div>

                        <div style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '100%', // Full width for stacking vertically
                            marginBottom: '1rem'
                        }}>
                            <img
                                src={`./assets/jobs/undecided-2.png`}
                                alt="Noch unsicher 2"
                                className={styles.undecidedImage}
                            />
                            <div className={styles.undecidedText}>
                                Stell dich der Gefahr und<br/>
                                prüfe dein Können!
                            </div>
                            <button
                                onClick={() => window.location.href = '/quiz'}
                                className={styles.startButton}
                            >
                                Starten!
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
