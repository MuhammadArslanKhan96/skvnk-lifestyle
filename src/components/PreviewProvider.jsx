import { LiveQueryProvider } from 'next-sanity/preview'
import React, { useMemo } from 'react'
import { getClient } from '~/lib/sanity.client'

export default function PreviewProvider({
  children,
  token,
}) {
  const client = useMemo(() => getClient({ token }), [token])
  console.log(client)
  return (
    <LiveQueryProvider client={client} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}
