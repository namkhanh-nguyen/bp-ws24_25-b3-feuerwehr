/**
 * Endpoint to access job data from any API
 */

export async function fetchJobs() {
  try {
    const response = await fetch('http://localhost:8080/jobs')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    // Map data to include the correct structure for the table
    return data.map((job: any) => ({
      id: job.id,
      name: job.name,
      slug: job.slug,
      description: job.description,
      tags: job.tags,
      imageUrl: job.imageUrl
    })) || []
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}
