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
    <div className="flex flex-col items-center justify-between px-4 md:flex-row">
      <Link href="/">
        <Image src={brandLogo} alt="" width={300} height={100} />
      </Link>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {user ? (
          <>
            {user?.metadata?.plan !== null && (
              <Link
                href="/dashboard"
                className="rounded-full bg-lime px-4 py-2 font-roadrage font-bold hover:bg-limehover"
              >
                Dashboard
              </Link>
            )}
            <div
              onClick={signOut}
              className="cursor-pointer rounded-full bg-lime px-4 py-2 font-roadrage font-bold hover:bg-limehover"
            >
              Log Out
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full bg-lime px-4 py-2 font-roadrage font-bold hover:bg-limehover"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-lime px-4 py-2 font-roadrage font-bold hover:bg-limehover"
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
