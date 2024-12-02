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
                {filteredJobs.map(({id, imageUrl, name, slug}) => (
                    <div
                        key={id}
                        className="job-card flex flex-col md:flex-row items-center space-x-4 cursor-pointer border"
                        onClick={() => router?.push(`/jobs/${slug}`)}
                    >
                        <img src={imageUrl} alt={name} className="job-image w-full md:w-1/2"/>
                        <h3 className="text-xl font-bold mt-4 md:mt-0" style={{fontSize: '1.5rem'}}>{name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}