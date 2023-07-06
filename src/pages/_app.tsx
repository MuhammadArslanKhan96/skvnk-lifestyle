import '~/styles/global.css'
import type { AppProps } from 'next/app'
import { lazy } from 'react'

import { NhostProvider, NhostClient, NhostSession } from '@nhost/nextjs';

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || ''
});

export interface SharedPageProps {
  nhostSession: NhostSession;
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))



export default function App({ Component, pageProps, }: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </NhostProvider>
  )
}
