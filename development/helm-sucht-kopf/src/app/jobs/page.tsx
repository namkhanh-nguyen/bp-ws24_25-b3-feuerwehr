'use client';
import React, {useEffect, useState} from 'react';
import {fetchJobs} from '../services/fetchJobs';
import {useRouter} from 'next/compat/router';
import styles from './jobs.module.css';
import Loading from "@/app/jobs/loading";

const filters = [
    // Filter by qualification type
    {key: 'msa', label: 'MSA'},
    {key: 'bbr', label: 'BBR'},
    {key: 'bachelor', label: 'Bachelor'},
    {key: 'master', label: 'Master'},
    {key: 'hsa2j', label: 'Hauptschulabschluss und 2 Jahre Berufsausbildung'},
    {key: 'aghr', label: 'Allgemeine Hochschulreife'},
    {key: 'arb', label: 'Abgeschlossener Rettungsdienstberuf'}

    // TODO: Filter by misc factors
];

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useRouter();
    useEffect(() => {
        const getJobs = async () => {
            const data = await fetchJobs();
            setJobs(data);
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

    const filteredJobs = jobs.filter((job: { tags: string[] }) =>
        selectedFilters.every(filter => job.tags.includes(filter))
    );

    return (
        <div className={styles.pageMasterDiv}
             style={{fontFamily: 'var(--font-berlin-type-regular)'}}>

            <div style={{width: '100%', padding: '1.5rem'}}>
                <h1 className={styles.deinWeg} style={{fontFamily: 'var(--font-berlin-type-bold)'}}>
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
                        style={{fontFamily: 'var(--font-berlin-type-bold)'}}
                    >
                        Zum Navigator
                    </button>
                </div>

            </div>

            <div className={styles.jobSection}>
                <div className={styles.filterContainer}>
                    <div style={{
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-berlin-type-bold)',
                        marginBottom: '1rem'
                    }}>
                        Ergebnisse: {filteredJobs.length}
                    </div>

                    {/*<div className="block p-2"*/}
                    {/*>*/}
                    {/*    <select*/}
                    {/*        value={selectedFilters[0] || ""}*/}
                    {/*        onChange={(e) => setSelectedFilters([e.target.value])}*/}
                    {/*        className="p-2 mr-2 block w-full rounded-2xl border-black border"*/}
                    {/*    >*/}
                    {/*        <option value="" disabled>Stichwort</option>*/}
                    {/*        {filters.map(({key, label}) => (*/}
                    {/*            <option key={key} value={key} className="p-2">*/}
                    {/*                {label}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}
                    {/*</div>*/}

                    {/*<div className="block p-2"*/}
                    {/*>*/}
                    {/*    <select*/}
                    {/*        value={selectedFilters[0] || ""}*/}
                    {/*        onChange={(e) => setSelectedFilters([e.target.value])}*/}
                    {/*        className="p-2 mr-2 block w-full rounded-2xl border-black border"*/}
                    {/*    >*/}
                    {/*        <option value="" disabled>Einstiegsmöglichkeiten</option>*/}
                    {/*        {filters.map(({key, label}) => (*/}
                    {/*            <option key={key} value={key} className="p-2">*/}
                    {/*                {label}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}
                    {/*</div>*/}

                    {/*<div className="block p-2"*/}
                    {/*>*/}
                    {/*    <select*/}
                    {/*        value={selectedFilters[0] || ""}*/}
                    {/*        onChange={(e) => setSelectedFilters([e.target.value])}*/}
                    {/*        className="p-2 mr-2 block w-full rounded-2xl border-black border"*/}
                    {/*    >*/}
                    {/*        <option value="" disabled>Interessen</option>*/}
                    {/*        {filters.map(({key, label}) => (*/}
                    {/*            <option key={key} value={key} className="p-2">*/}
                    {/*                {label}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}
                    {/*</div>*/}

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
                        <div
                            style={{
                                fontSize: '1.2rem',
                                padding: '0.5rem',
                                fontWeight: 'bold',
                                fontFamily: 'var(--font-berlin-type-bold)'
                            }}
                        >
                            Ergebnisse: {filteredJobs.length}
                        </div>
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

                            {/*<div className="block p-2" style={{display: 'flex', justifyContent: 'center'}}>*/}
                            {/*    <select*/}
                            {/*        value={selectedFilters[0] || ""}*/}
                            {/*        onChange={(e) => setSelectedFilters([e.target.value])}*/}
                            {/*        className="p-2 mr-2 block w-4/5 border-black border rounded-2xl"*/}
                            {/*    >*/}
                            {/*        <option value="" disabled>Stichwort</option>*/}
                            {/*        {filters.map(({key, label}) => (*/}
                            {/*            <option key={key} value={key} className="p-2">*/}
                            {/*                {label}*/}
                            {/*            </option>*/}
                            {/*        ))}*/}
                            {/*    </select>*/}
                            {/*</div>*/}

                            {/*<div className="block p-2" style={{display: 'flex', justifyContent: 'center'}}>*/}
                            {/*    <select*/}
                            {/*        value={selectedFilters[0] || ""}*/}
                            {/*        onChange={(e) => setSelectedFilters([e.target.value])}*/}
                            {/*        className="p-2 mr-2 block w-4/5 border-black border rounded-2xl"*/}
                            {/*    >*/}
                            {/*        <option value="" disabled>Einstiegsmöglichkeiten</option>*/}
                            {/*        {filters.map(({key, label}) => (*/}
                            {/*            <option key={key} value={key} className="p-2">*/}
                            {/*                {label}*/}
                            {/*            </option>*/}
                            {/*        ))}*/}
                            {/*    </select>*/}
                            {/*</div>*/}

                            {/*<div className="block p-2" style={{display: 'flex', justifyContent: 'center'}}>*/}
                            {/*    <select*/}
                            {/*        value={selectedFilters[0] || ""}*/}
                            {/*        onChange={(e) => setSelectedFilters([e.target.value])}*/}
                            {/*        className="p-2 mr-2 block w-4/5 border-black border rounded-2xl"*/}
                            {/*    >*/}
                            {/*        <option value="" disabled>Interessen</option>*/}
                            {/*        {filters.map(({key, label}) => (*/}
                            {/*            <option key={key} value={key} className="p-2">*/}
                            {/*                {label}*/}
                            {/*            </option>*/}
                            {/*        ))}*/}
                            {/*    </select>*/}
                            {/*</div>*/}

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

                            <button
                                style={{
                                    backgroundColor: 'var(--red-primary)',
                                    marginTop: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '1rem',
                                    color: 'white',
                                    width: '50%',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
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
                        {filteredJobs.map(({id, imageUrl, name, slug, shortDesc}) => (
                            <div
                                key={id}
                                className="job-card flex flex-col md:flex-row md:items-center mt-8
                                space-x-4 border rounded-lg relative hover:border-transparent"
                                style={{
                                    flexDirection: 'column'
                                }} // always in column
                            >
                                <img
                                    onClick={() => window.location.href = `/jobs/${slug}`}
                                    src={imageUrl}
                                    alt={name}
                                    className="job-image w-full rounded-t-lg rounded-bl-none"
                                    style={{
                                        cursor: 'pointer',
                                        alignSelf: 'center' // center image
                                    }}
                                />

                                <div className="flex flex-col justify-between flex-grow relative">
                                    <h3 className={styles.jobName} style={{fontFamily: 'var(--font-berlin-type-bold)'}}>
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

                                {/*<div*/}
                                {/*    className="hidden md:block opacity-0 hover:opacity-100 transition-opacity"*/}
                                {/*    style={{*/}
                                {/*        position: 'absolute',*/}
                                {/*        top: '0px',*/}
                                {/*        right: '50%',*/}
                                {/*        width: '50%',*/}
                                {/*        height: '85%',*/}
                                {/*        padding: '1rem',*/}
                                {/*        fontSize: '1.25rem',*/}
                                {/*        lineHeight: '1.5rem',*/}
                                {/*        backgroundColor: 'rgba(255, 255, 255, 0.9)' // Added slight transparency*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <p>{shortDesc}</p>*/}
                                {/*    <span*/}
                                {/*        onClick={() => window.location.href = `/jobs/${slug}`}*/}
                                {/*        style={{*/}
                                {/*            marginTop: '0.5rem',*/}
                                {/*            paddingBottom: '0.5rem',*/}
                                {/*            color: 'var(--red-primary)',*/}
                                {/*            textDecorationLine: 'underline',*/}
                                {/*            cursor: 'pointer'*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        Mehr Infos*/}
                                {/*    </span>*/}
                                {/*</div>*/}

                                <div id={`desc-${id}`} className="hidden md:hidden transition-all rounded-lg"
                                     style={{
                                         width: '85%',
                                         marginTop: '0.5rem',
                                     }}>
                                    <p style={{fontSize: '85%'}}>{shortDesc}</p>
                                    <span
                                        onClick={() => window.location.href = `/jobs/${slug}`}
                                        style={{
                                            fontSize: '85%',
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
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '2rem',
                    padding: '1rem',
                }}>
                    <div className="grid grid-rows-2 md:grid-cols-2 gap-4"
                         style={{
                             width: '100%', // Ensure it uses full width available
                         }}>
                        <div style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '100%', // Full width for stacking vertically
                            marginBottom: '1rem'
                        }}>
                            <img
                                src="https://res.cloudinary.com/dassgyrzu/image/upload/v1733530199/d14a273e59a9f0c6352bb926e8946ca9_n8mtll.jpg"
                                alt="Sample Image"
                                style={{
                                    borderRadius: '2rem',
                                    filter: 'brightness(0.7)',
                                    width: '100%',
                                    objectFit: 'cover',
                                    height: '200px' // Set height for uniformity
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    padding: '5px',
                                    fontFamily: 'var(--font-berlin-type-bold)',
                                    borderRadius: '5px',
                                }}
                            >
                                Noch unsicher?<br/>
                                Probiere es mit dem Quiz!
                            </div>
                            <button
                                onClick={() => window.location.href = '/quiz'}
                                style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    transform: 'translateX(10%)',
                                    backgroundColor: 'var(--red-primary)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    fontSize: '1.5rem',
                                    border: 'none',
                                    borderRadius: '2rem',
                                    fontFamily: 'var(--font-berlin-type-bold)',
                                    cursor: 'pointer'
                                }}
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
                                src="https://res.cloudinary.com/dassgyrzu/image/upload/v1733531246/abb74d33b1680a5bcf5d732576107128_jxdtg5.png"
                                alt="Sample Image"
                                style={{
                                    borderRadius: '2rem',
                                    filter: 'brightness(0.4)',
                                    width: '100%',
                                    objectFit: 'cover',
                                    height: '200px' // Set height for uniformity
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    padding: '5px',
                                    fontFamily: 'var(--font-berlin-type-bold)',
                                    borderRadius: '5px',
                                }}
                            >
                                Stell dich der Gefahr und<br/>
                                prüfe dein Können!
                            </div>
                            <button
                                onClick={() => window.location.href = '/quiz'}
                                style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    transform: 'translateX(10%)',
                                    backgroundColor: 'var(--red-primary)',
                                    color: 'white',
                                    padding: '0.5rem 1rem',
                                    fontSize: '1.5rem',
                                    border: 'none',
                                    borderRadius: '2rem',
                                    fontFamily: 'var(--font-berlin-type-bold)',
                                    cursor: 'pointer'
                                }}
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