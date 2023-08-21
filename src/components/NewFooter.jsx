import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import VisaImage from '@/images/visa.png'
import MasterCardImage from '@/images/mastercard.png'
import AmexImage from '@/images/amex.png'
import Discover from '@/images/discover.png'

const NewFooter = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-4 bg-black/70 py-4">
        <Link href="#" className="rounded-full border border-gray-300 p-2">
          <AiOutlineInstagram fill="#4ade80" size={24} />
        </Link>
        <Link href="#" className="rounded-full border border-gray-300 p-2">
          <AiOutlineTwitter fill="#4ade80" size={24} />
        </Link>
        <Link href="#" className="rounded-full border border-gray-300 p-2">
          <FaFacebookF fill="#4ade80" size={20} />
        </Link>
        <Link href="#" className="rounded-full border border-gray-300 p-2">
          <AiFillYoutube fill="#4ade80" size={24} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-black/80 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-white/80">
          <Link href="/terms">Terms & Condition</Link>
          <div className="hidden md:block">|</div>
          <Link href="/privacy">Privacy Policy</Link>
          <div className="hidden md:block">|</div>
          <Link href="/support">Contact Support</Link>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <Image src={VisaImage} alt="" height={50} width={50} />
          <div className="h-9 rounded-md bg-white px-2">
            <Image src={MasterCardImage} alt="" height={35} width={40} />
          </div>
          <Image src={AmexImage} alt="" height={50} width={50} />
          <Image src={Discover} alt="" height={50} width={50} />
        </div>
      </div>
    </div>
  )
}

export default NewFooter
