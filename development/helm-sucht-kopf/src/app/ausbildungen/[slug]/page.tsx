import {fetchJobs} from '@/app/api/jobs/fetchJobs';
import BackButton from '@/app/components/button/backbutton';
type JobProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function JobPage({params}: JobProps) {
    // Do NOT remove await
    const {slug} = await params;
    const jobs = await fetchJobs();
    const job = jobs[slug];

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div style={{
            fontFamily: 'var(--font-berlin-type-regular)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <div style={{width: '100%', maxWidth: '600px'}}>
                <BackButton />

                <h1 style={{
                    fontFamily: 'var(--font-berlin-type-bold)',
                    marginBottom: '20px',
                    wordBreak: 'break-word'
                }}>{job.name}</h1>
                <img src={`/assets/jobs/${slug}.png`} alt={job.name}
                     style={{
                         marginBottom: '20px',
                         borderRadius: '1.5rem',
                         width: '100%'
                     }}
                />
                <h2>Das bringen Sie mit:</h2>
                <p style={{marginBottom: '20px', whiteSpace: 'pre-line'}}>{job.requirements}</p>
                <h2>Das bieten wir Ihnen:</h2>
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
        </div>
    );
}