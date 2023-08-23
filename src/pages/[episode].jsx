import { useState } from 'react'
import Head from 'next/head'
import { FormattedDate } from '@/components/FormattedDate'

import { Container } from '@/components/Container'

import ReactPlayer from 'react-player'
import { getClient } from '@/lib/sanity.client'
import { getEpisode, getEpisodes } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'

export default function Episode({ episode }) {
  let date = new Date(episode._createdAt)

  const [isPlaying, setPlaying] = useState(false)
  return (
    <>
      <Head>
        <title>{`${episode.title} - Their Side`}</title>
        <meta name="description" content={episode.description} />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              =
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {episode.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
            <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
              {episode.description}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          <ReactPlayer
            url="https://www.youtube.com/watch?v=1exZbsYIqX4"
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
            playing={isPlaying}
          />
          <hr className="my-12 border-gray-200" />
          <PortableText value={episode.content} />
        </Container>
      </article>
    </>
  )
}

export async function getStaticProps({ draftMode = false, params = {} }) {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const episode = await getEpisode(client, params.episode)

  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
      draftMode,
      token: draftMode ? readToken : '',
    },
    revalidate: 10,
  }
}

export async function getStaticPaths({ draftMode = false }) {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const episodes = await getEpisodes(client)

  return {
    paths: episodes.map(({ _id }) => ({
      params: {
        episode: _id.toString(),
      },
    })),
    fallback: 'blocking',
  }
}
