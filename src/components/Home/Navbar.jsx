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
      <div className="flex items-center gap-4">
        <Link
          href={user ? '/pricing' : '/register'}
          className="rounded-full uppercase bg-lime px-4 py-2 font-roadrage font-bold"
        >
          Pricing
        </Link>
        {user ? (
          <div
            onClick={signOut}
            className="cursor-pointer rounded-full bg-lime px-4 py-2 font-roadrage font-bold"
          >
            Log Out
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full bg-lime px-4 py-2 font-roadrage font-bold"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-lime px-4 py-2 font-roadrage font-bold"
            >
              Join DI Club
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
