/**
 * Fetch job data from a local JSON file
 */

export async function fetchJobs() {
  try {
    // Import the jobData.json file dynamically
    const response = await import('./jobData.json');

    const data = response.default || [];

    // Map data to include the correct structure for the table
    return data.map((job) => ({
      id: job.id,
      name: job.name,
      slug: job.slug,
      requirements: job.requirements,
      shortDesc: job.shortDesc,
      longDesc: job.longDesc,
      tags: job.tags,
      imageUrl: job.imageUrl,
      jobUrl: job.jobUrl
    })) || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
