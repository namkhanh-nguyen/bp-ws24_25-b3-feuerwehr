'use client';
import React, {useEffect, useState} from 'react';
import {fetchJobs} from '@/app/api/jobs/fetchJobs';
import {useRouter} from 'next/compat/router';
import styles from '../styles/jobs.module.css';
import JobCard from "@/app/components/jobs/JobCard";
import Loading from "@/app/components/Loading";

const filters = [
    { key: 'msa', label: 'MSA' },
    { key: 'bbr', label: 'BBR' },
    { key: 'bachelor', label: 'Bachelor' },
    { key: 'master', label: 'Master' },
    { key: 'hsa2j', label: 'Hauptschulabschluss und 2 Jahre Berufsausbildung' },
    { key: 'aghr', label: 'Allgemeine Hochschulreife' },
    { key: 'arb', label: 'Abgeschlossener Rettungsdienstberuf' },
];

const ausbildungFilters = [
    { key: 'ausbildung', label: 'Ausbildung' },
    { key: 'studium', label: 'Studium' },
    { key: 'master', label: 'Master' },
];

const dienstFilters = [
    { key: 'hoher', label: 'Hoher' },
    { key: 'gehobener', label: 'Gehobener' },
    { key: 'mittlerer', label: 'Mittlerer' },
];

export default function JobsPage() {
    const [jobs, setJobs] = useState<{
        [key: string]: {
            tags: string[],
            id: string,
            name: string,
            slug: string,
            shortDesc: string,
        };
    }>({});
    const [selectedSchool, setSelectedSchool] = useState<string>('');
    const [selectedAusbildung, setSelectedAusbildung] = useState<string>('');
    const [selectedDienst, setSelectedDienst] = useState<string>('');
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
        setSelectedSchool('');
        setSelectedAusbildung('');
        setSelectedDienst('');
    };

    const filteredJobs = Object.values(jobs).filter((job) => {
        const { tags } = job;

        return (
            (!selectedSchool || tags.includes(selectedSchool)) &&
            (!selectedAusbildung || tags.includes(selectedAusbildung)) &&
            (!selectedDienst || tags.includes(selectedDienst))
        );
    });

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
                            value={selectedSchool}
                            onChange={(e) => setSelectedSchool(e.target.value)}
                            className={styles.filterDropdown}
                        >
                            <option value="" disabled>
                                Schulabschluss
                            </option>
                            {filters.map(({key, label}) => (
                                <option key={key} value={key} className="p-2">
                                    {label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedAusbildung}
                            onChange={(e) => setSelectedAusbildung(e.target.value)}
                            className={styles.filterDropdown}
                        >
                            <option value="" disabled>
                                Ausbildung
                            </option>
                            {ausbildungFilters.map(({key, label}) => (
                                <option key={key} value={key} className="p-2">
                                    {label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedDienst}
                            onChange={(e) => setSelectedDienst(e.target.value)}
                            className={styles.filterDropdown}
                        >
                            <option value="" disabled>
                                Dienst
                            </option>
                            {dienstFilters.map(({key, label}) => (
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
                        Zurücksetzen
                    </button>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', flexGrow: '1'}}>

                    <div className={styles.mobileFilterButton}>
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
                            Schließen
                        </button>

                    </div>
                    {isFiltersVisible && (
                        <div className={styles.mobileFilterContainer}>
                            <div className="block p-2">
                                <select
                                    value={selectedSchool}
                                    onChange={(e) => setSelectedSchool(e.target.value)}
                                    className={styles.filterDropdown}
                                >
                                    <option value="" disabled>
                                        Schulabschluss
                                    </option>
                                    {filters.map(({key, label}) => (
                                        <option key={key} value={key} className="p-2">
                                            {label}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedAusbildung}
                                    onChange={(e) => setSelectedAusbildung(e.target.value)}
                                    className={styles.filterDropdown}
                                >
                                    <option value="" disabled>
                                        Ausbildung
                                    </option>
                                    {ausbildungFilters.map(({key, label}) => (
                                        <option key={key} value={key} className="p-2">
                                            {label}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={selectedDienst}
                                    onChange={(e) => setSelectedDienst(e.target.value)}
                                    className={styles.filterDropdown}
                                >
                                    <option value="" disabled>
                                        Dienst
                                    </option>
                                    {dienstFilters.map(({key, label}) => (
                                        <option key={key} value={key} className="p-2">
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button className={styles.resetButton}
                                    onClick={handleReset}
                            >
                                Zurücksetzen
                            </button>
                        </div>
                    )}

                    <div className={styles.jobsList}>
                        {filteredJobs.map(({id, name, slug, shortDesc}) => (
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
