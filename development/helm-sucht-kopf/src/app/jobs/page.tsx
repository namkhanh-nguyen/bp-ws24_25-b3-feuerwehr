'use client';
import React, {useEffect, useState} from 'react';
import {fetchJobs} from '../services/fetchJobs';
import {useRouter} from 'next/compat/router';

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
    useRouter();
    useEffect(() => {
        const getJobs = async () => {
            const data = await fetchJobs();
            setJobs(data);
        };
        getJobs().then(r => console.log(r));
    }, []);
    
    const handleReset = () => {
        setSelectedFilters([]);
    };

    const filteredJobs = jobs.filter((job: { tags: string[] }) =>
        selectedFilters.every(filter => job.tags.includes(filter))
    );

    return (
        <div className="flex flex-col relative md:pt-[2vh] md:pr-[5vh] md:pb-[5vh] md:pl-[5vh]"
             style={{fontFamily: 'var(--font-berlin-type-regular)'}}>

            <div style={{width: '100%', padding: '1.5rem'}}>
                <h1 style={{
                    maxWidth: '75%',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontFamily: 'var(--font-berlin-type-bold)'
                }}
                >
                    Dein Weg bei der Berliner Feuerwehr</h1>
                <p style={{textAlign: 'left', marginTop: '0.5rem'}}>
                    Finde deinen idealen Karriereweg bei der Feuerwehr Berlin. Der Karriere Navigator zeigt dir
                    alle Optionen, Spezialisierungen und Aufstiegschancen – für eine erfolgreiche und spannende
                    Laufbahn.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                    <button
                        onClick={() => window.location.href = '/quiz'}
                        style={{
                            padding: '0.5rem',
                            backgroundColor: 'var(--red-primary)',
                            color: 'white',
                            borderRadius: '1.5rem',
                            fontFamily: 'var(--font-berlin-type-bold)',
                            fontSize: '1.2rem'
                        }}
                        className="w-full md:w-[20%]"
                    >
                        Zum Navigator
                    </button>
                </div>
            
        </div>

    <div className="flex md:flex-row flex-col">
                <div style={{
                    flexShrink: '0',
                    padding: '20px',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    marginTop: '2rem',
                    alignSelf: 'flex-start'
                }}
                     className="hidden md:block md:w-1/4 md:border md:rounded-lg">

                    <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-berlin-type-bold)',
                        marginBottom: '1rem'
                    }}>
                        Ergebnisse: {filteredJobs.length}
                    </div>
                    <div className="block p-2"
                    >
                        <select
                            value={selectedFilters[0] || ""}
                            onChange={(e) => setSelectedFilters([e.target.value])}
                            className="p-2 mr-2 block w-full rounded-xl border-black border"
                        >
                            <option value="" disabled>Schulabschluss</option>
                            {filters.map(({key, label}) => (
                                <option key={key} value={key} className="p-2" >
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
                            <div className="block p-2" style={{display: 'flex', justifyContent: 'center'}}>
                                <select
                                    value={selectedFilters[0] || ""}
                                    onChange={(e) => setSelectedFilters([e.target.value])}
                                    className="p-2 mr-2 block w-4/5 border-black border rounded-xl"
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
                        {filteredJobs.map(({id, imageUrl, name, slug, description}) => (
                            <div
                                key={id}
                                className="job-card flex flex-col md:flex-row md:items-center mt-8
                                space-x-4 border rounded-lg relative hover:border-transparent"
                            >
                                    <img
                                        onClick={() => window.location.href = `/jobs/${slug}`}
                                        src={imageUrl}
                                        alt={name}
                                        className="job-image w-full md:w-80 rounded-t-lg md:rounded-l-lg md:rounded-tr-none rounded-bl-none"
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    />

                                <div className="flex flex-col justify-between flex-grow relative">
                                    <h3
                                        style={{
                                            fontSize: '1.25rem',
                                            fontFamily: 'var(--font-berlin-type-bold)',
                                            lineHeight: '1.75rem',
                                            fontWeight: 'bold',
                                            textAlign: 'left',
                                            marginTop: '1rem',
                                            overflowWrap: 'break-word',
                                            wordBreak: 'break-all',
                                            paddingBottom: '1rem'
                                        }}
                                    >
                                        {name}</h3>
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
                                <div
                                    className="hidden md:block opacity-0 hover:opacity-100 transition-opacity"
                                    style={{
                                        position: 'absolute',
                                        top: '0px',
                                        left: '50%',
                                        width: '50%',
                                        height: '100%',
                                        padding: '1rem',
                                        fontSize: '0.8rem',
                                        lineHeight: '1.2rem',
                                        backgroundColor: 'rgb(255 255 255 / var(--tw-bg-opacity, 1))'
                                    }}
                                >
                                    <p>{description}</p>
                                        <span
                                            onClick={() => window.location.href = `/jobs/${slug}`}
                                            style={{
                                                marginTop: '0.5rem',
                                                paddingBottom: '0.5rem',
                                                color: 'var(--red-primary)',
                                                textDecorationLine: 'underline',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Mehr Infos
                                        </span>
                                </div>
                                <div id={`desc-${id}`} className="hidden md:hidden transition-all rounded-lg mt-2"
                                     style={{width: '85%'}}>
                                    <p style={{fontSize: '85%'}}>{description}</p>
                                        <span
                                            onClick={() => window.location.href = `/jobs/${slug}`}
                                            style={{
                                                marginTop: '0.5rem',
                                                fontSize: '85%',
                                                paddingBottom: '0.5rem',
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
        </div>
    );
}