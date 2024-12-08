/**
 * Endpoint to access job data from API
 */

export async function fetchJobs() {
  try {
    const response = await fetch('http://localhost:4000/jobs')

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`)
      return []
    }

    const data = await response.json()

    // Map data to include the correct structure for the table
    return data.map((job: any) => ({
      id: job.id,
      name: job.name,
      slug: job.slug,
      requirements: job.requirements,
      shortDesc: job.shortDesc,
      longDesc: job.longDesc,
      tags: job.tags,
      imageUrl: job.imageUrl,
      jobUrl: job.jobUrl
    })) || []
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}
