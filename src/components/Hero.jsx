import Image from 'next/future/image'

import { Button } from '@/components/Button'
import { GridPattern } from '@/components/GridPattern'
import { StarRating } from '@/components/StarRating'
import coverImage from '@/images/cover.png'
import ReactPlayer from 'react-player'

function Testimonial() {
  return (
    <figure className="relative mx-auto max-w-md text-center lg:mx-0 lg:text-left">
      <div className="flex justify-center text-altGreen lg:justify-start">
        <StarRating />
      </div>
      <blockquote className="mt-2">
        <p className="font-display text-xl font-medium text-slate-900">
          “Area for a testimonial for the membership would be perfect here.”
        </p>
      </blockquote>
      <figcaption className="mt-2 text-sm text-slate-500">
        <strong className="font-semibold text-altGreen before:content-['—_']">
          Andre
        </strong>
        , Founder @ Cordia
      </figcaption>
    </figure>
  )
}

export function Hero() {
  return (
    <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pb-36 lg:pt-20 xl:py-32">
        <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
          <div className="rounded-br-4xl absolute -top-20 -bottom-12 left-0 right-1/2 z-10 bg-altGreen text-white/10 md:bottom-8 lg:-inset-y-32 lg:right-full lg:left-[-100vw] lg:-mr-40">
            <GridPattern
              x="100%"
              y="100%"
              patternTransform="translate(112 64)"
            />
          </div>
          <div className="relative z-10 mx-auto flex w-64 rounded-xl bg-slate-600 shadow-xl md:w-80 lg:w-auto">
            <Image className="w-full" src={coverImage} alt="" priority />
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:col-span-7 lg:pr-0 lg:pb-14 lg:pl-16 xl:pl-20">
          <div className="hidden lg:absolute lg:bottom-0 lg:-top-32 lg:right-[-100vw] lg:left-[-100vw] lg:block lg:bg-slate-100" />
          <Testimonial />
        </div>
        <div className="bg-white pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20">
          <div className="mx-auto mb-10 px-4 sm:px-6 md:max-w-2xl md:px-4 lg:mb-0 lg:px-0">
            <h1 className="font-display text-center text-5xl font-extrabold text-slate-900 sm:text-6xl lg:text-left">
              Welcome to #SKVNKNATION
            </h1>
            <p className="mt-4 text-center text-3xl text-slate-600 lg:text-left">
              A catchy tagline.
            </p>
            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
              <Button href="/login" color="blue">
                Join the Club
              </Button>
              <Button href="/logim" variant="outline" color="slate">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
