import '@/styles/tailwind.css'
import 'focus-visible'
import { NhostProvider, NhostClient } from '@nhost/nextjs'
import { UserProvider } from '@/components/UserProvider'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { Toaster } from 'react-hot-toast'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || '',
  region: process.env.NEXT_PUBLIC_NHOST_REGION || '',
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <NhostProvider nhost={nhost} initial={pageProps.nhostSession}>
        <UserProvider>
          <NhostApolloProvider nhost={nhost}>
            <Toaster />
            <Component {...pageProps} />
          </NhostApolloProvider>
        </UserProvider>
      </NhostProvider>
    </>
  )
}
