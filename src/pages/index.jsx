import React from 'react'
import NewFooter from '@/components/NewFooter'
import lifestyleImage from '@/images/lifestyle.png'
import Navbar from '@/components/Home/Navbar'
import Image from 'next/image'
import Link from 'next/link'

function NewDashboard() {
  return (
    <div>
      <div className={'min-h-[60vh] bg-pricing bg-cover'}>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center px-4 py-10 pb-14">
        <h1 className="mb-4 text-center font-roadrage text-3xl font-[800] uppercase">
          What is the skvnklifestyle membership all about?
        </h1>
        <iframe
          width={650}
          height={350}
          src="https://www.youtube.com/embed/3edyyAsA3s4"
          title="YouTube video player"
          frameborder="0"
          className="w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-10 bg-ready bg-cover px-4 py-24">
        <h1 className="text-center font-roadrage text-[4rem] font-[800] uppercase">
          Ready to be a member?
        </h1>
        <Link
          href="/register"
          className="rounded-full bg-lime px-4 py-2 font-roadrage text-[1.4rem] font-bold"
        >
          Join DI Club
        </Link>
      </div>
      <NewFooter />
    </div>
  )
}

export default NewDashboard
