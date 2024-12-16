/**
 * Define the structure of each job
 */
interface Job {
  id: number;
  name: string;
  slug: string;
  requirements: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  jobUrl: string;
}

/**
 * Fetch job data from jobData.json as a dictionary
 */
export async function fetchJobs(): Promise<Record<string, Job>> {
  try {
    const response = await import('./jobData.json');
    // Return the data as a dictionary
    return response.default || {};
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {};
  }
}