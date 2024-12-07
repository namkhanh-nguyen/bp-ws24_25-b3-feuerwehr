import {fetchJobs} from '../../services/fetchJobs';

type JobProps = {
    params: {
        slug: string;
    };
};

export default async function JobPage({params}: JobProps) {
    // Do NOT remove await
    const {slug} = await params;
    const jobs = await fetchJobs();
    const job = jobs.find((job: { slug: string; }) => job.slug === slug);

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div style={{fontFamily: 'var(--font-berlin-type-regular)', padding: '2rem'}}>
            <h1 style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-berlin-type-bold)',
                marginBottom: '20px'
            }}>{job.name}</h1>
            <img src={job.imageUrl} alt={job.name}
                 style={{
                     marginBottom: '20px',
                     borderRadius: '1.5rem'
                 }}
            />
            <p style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-berlin-type-bold)',
                marginBottom: '20px'
            }}>Das bringen Sie mit: </p>
            <p style={{marginBottom: '20px', whiteSpace: 'pre-line'}}>{job.requirements}</p>
            <p style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-berlin-type-bold)',
                marginBottom: '20px'
            }}>Das bieten wir Ihnen:
            </p>
            <p style={{marginBottom: '20px', whiteSpace: 'pre-line'}}>{job.longDesc}</p>
            {job.jobUrl ? (
                <a href={job.jobUrl}>
                    <button style={{
                        backgroundColor: 'var(--red-primary)',
                        color: '#fff',
                        padding: '15px 25px',
                        fontFamily: 'var(--font-berlin-type-bold)',
                        borderRadius: '2rem',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Zum Angebot
                    </button>
                </a>
            ) : (
                <p style={{color: 'var(--red-primary)'}}>
                    Das nächste Bewerberverfahren für diesen Zugangsweg wurde noch nicht veröffentlicht.
                </p>
            )}
        </div>
    );
}