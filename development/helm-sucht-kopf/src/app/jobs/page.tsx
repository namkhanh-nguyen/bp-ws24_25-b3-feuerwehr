'use client';

import React, {useEffect, useState} from 'react';
import {fetchJobs} from '../services/fetchJobs';
import {useRouter} from 'next/compat/router';

const filters = [
    {key: 'msa', label: 'MSA'},
    {key: 'bbr', label: 'BBR'},
    {key: 'bachelor', label: 'Bachelor'},
    {key: 'master', label: 'Master'},
    {key: 'hsa2j', label: 'Hauptschulabschluss und 2 Jahre Berufsausbildung'},
    {key: 'aghr', label: 'Allgemeine Hochschulreife'},
    {key: 'arb', label: 'Abgeschlossener Rettungsdienstberuf'}
];

export default function jobsPage() {
    const [jobs, setJobs] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getJobs = async () => {
            const data = await fetchJobs();
            setJobs(data);
        };

        getJobs().then(r => console.log(r));
    }, []);

    const handleFilterChange = (filter: string) => {
        setSelectedFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    const filteredJobs = jobs.filter((job: { tags: string[] }) =>
        selectedFilters.every(filter => job.tags.includes(filter))
    );

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 p-10 md:w-1/4 border border-box self-start px-4 py-2">
                <div className="hidden md:block">
                    {filters.map(({key, label}) => (
                        <label key={key} className="block">
                            <input
                                type="checkbox"
                                checked={selectedFilters.includes(key)}
                                onChange={() => handleFilterChange(key)}
                                className="p-2 mr-2"
                            />
                            {label}
                        </label>
                    ))}
                </div>
                <select className="md:hidden block w-full p-2" multiple onChange={e => {
                    const options = e.target.options;
                    let value: string[] = [];
                    for (let i = 0; i < options.length; i++) {
                        if (options[i].selected) {
                            value.push(options[i].value);
                        }
                    }
                    setSelectedFilters(value);
                }}>
                    {filters.map(({key, label}) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="job-list grid grid-cols-1 md:grid-cols-2 gap-8 p-10 flex-grow">
                {filteredJobs.map(({id, imageUrl, name, slug, description}) => (
                    <div
                        key={id}
                        className="job-card flex flex-col md:flex-row md:items-center space-x-4 cursor-pointer border rounded-lg relative"
                        onClick={() => router?.push(`/jobs/${slug}`)}
                    >
                        <img
                            src={imageUrl}
                            alt={name}
                            className="job-image w-full md:w-48 rounded-t-lg md:rounded-l-lg md:rounded-tr-none rounded-bl-none"
                        />
                        <div className="flex flex-col justify-between flex-grow relative">
                            <h3 className="text-xl font-bold mt-4 md:mt-0 break-words break-all text-left md:text-center"
                                style={{fontSize: '1.2rem', paddingBottom: '1rem'}}>{name}</h3>
                            <div className="md:hidden absolute top-0 right-0 p-2" style={{paddingBottom: '1rem'}}>
                                <button
                                    className="p-2"
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
                            className="hidden md:block absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-100 transition-opacity rounded-lg p-4 text-sm">
                            <p>{description}</p>
                        </div>

                        <div id={`desc-${id}`} className="hidden md:hidden transition-all rounded-lg mt-2">
                            <p>{description}</p>
                            <button
                                className="mt-2 p-2 bg-blue-500 text-white rounded"
                                onClick={() => router?.push(`/jobs/${slug}`)}
                            >
                                Go to Job
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
