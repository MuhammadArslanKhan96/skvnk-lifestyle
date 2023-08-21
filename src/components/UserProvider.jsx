import React, { useContext } from 'react'
// highlight-next-line
import { useUserData } from '@nhost/nextjs'

const UserContext = React.createContext(null)

export function UserProvider({ children = null }) {
  // highlight-next-line
  const user = useUserData()
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
