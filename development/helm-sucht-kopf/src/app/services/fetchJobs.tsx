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
  imageUrl: string;
  jobUrl: string;
}

/**
 * Fetch job data from a local JSON file with reorganized structure
 */
export async function fetchJobs(): Promise<Record<string, Job>> {
  try {
    // Import the jobData.json file dynamically
    const response = await import('./jobData.json');
    const data: Record<string, Job> = response.default || {};

    // Return the data as a dictionary
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {};
  }
}