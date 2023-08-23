import Head from 'next/head'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { getEpisodes, episodesQuery } from '~/lib/sanity.queries'
import { Layout } from '@/components/Layout'
import { useUserContext } from '@/components/UserProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getClient } from '@/lib/sanity.client'

function EpisodeEntry({ episode }) {
  let date = new Date(episode._createdAt)

  return (
    <Layout>
      <article
        aria-labelledby={`episode-${episode._id}-title`}
        className="py-10 sm:py-12"
      >
        <Container>
          <div className="flex flex-col items-start">
            <h2
              id={`episode-${episode._id}-title`}
              className="mt-2 text-lg font-bold text-slate-900"
            >
              <Link href={`/${episode.slug.current}`}>{episode.title}</Link>
            </h2>

            <FormattedDate
              date={date}
              className="order-first font-mono text-sm leading-7 text-slate-500"
            />
            <p className="mt-1 text-base leading-7 text-slate-700">
              {episode.description}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <Link
                href={`/${episode.slug.current}`}
                className="flex items-center text-sm font-bold leading-6 text-altGreen hover:text-brandGreen active:text-brandGreen"
                aria-label={`Show notes for episode ${episode.title}`}
              >
                Watch Episode: #{episode.title}
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </Layout>
  )
}

export default function Home(props) {
  const [episodes] = useLiveQuery(props.episodes, episodesQuery)
  const { user } = useUserContext()
  const router = useRouter()
  useEffect(() => {
    if (!user || user.metadata.plan === null) {
      router.push('/pricing')
    }
  }, [])
  return (
    <>
      <Head>
        <title>
          #SKVNKNATION - Conversations with the most tragically misunderstood
          people of our time
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-3xl font-bold leading-7 text-slate-900">
            Episodes
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode._id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ draftMode = false }) {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const episodes = await getEpisodes(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      episodes,
    },
    revalidate: 10,
  }
}
