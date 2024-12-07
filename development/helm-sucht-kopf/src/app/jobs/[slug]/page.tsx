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

    // TODO: Fill page with job info
    return (
        <div>
            <h1>{job.name}</h1>
            <p>{job.description}</p>
        </div>
    );
}