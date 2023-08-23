import groq from 'groq'

export const episodesQuery = groq`*[_type == "episode" && defined(slug.current)] | order(_createdAt desc)`

export async function getEpisodes(client) {
  return await client.fetch(episodesQuery)
}

export const episodeBySlugQuery = groq`*[_type == "episode" && slug.current == $slug][0]`

export async function getEpisode(client, slug) {
  return await client.fetch(episodeBySlugQuery, {
    slug,
  })
}

export const episodeSlugsQuery = groq`
*[_type == "episodes" && defined(slug.current)][].slug.current
`
