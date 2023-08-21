import Image from 'next/image'
import React from 'react'
import brandLogo from '@/images/skvnk_logo.png'
import Link from 'next/link'
import { useUserContext } from '../UserProvider'
import { useSignOut } from '@nhost/nextjs'

const Navbar = () => {
  const { user } = useUserContext()
  const { signOut } = useSignOut()

  return (
    <div className="flex items-center justify-between px-4">
      <Link href="/">
        <Image src={brandLogo} alt="" width={300} height={100} />
      </Link>
      {user ? (
        <div
          onClick={signOut}
          className="bg-lime cursor-pointer font-roadrage rounded-full px-4 py-2 font-bold"
        >
          Log Out
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-lime rounded-full font-roadrage px-4 py-2 font-bold"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="bg-lime rounded-full font-roadrage px-4 py-2 font-bold"
          >
            Join DI Club
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
