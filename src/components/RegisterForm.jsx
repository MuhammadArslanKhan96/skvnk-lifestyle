import { CountryList } from '@/countryList'
import useOutside from '@/hooks/useOutside'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import { parsePhoneNumber } from 'libphonenumber-js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { LiaIdCardSolid } from 'react-icons/lia'

function RegisterForm() {
  const [country, setCountry] = useState('JM')
  const [filter, setFilter] = useState('')
  const [phone, setPhone] = useState('')
  const [top, setTop] = useState(false)
  const [showSelect, setShowSelect] = useState(false)
  const [showPasswords, setShowPasswords] = React.useState({
    pass: false,
    confirm_pass: false,
  })
  const [errors, setErrors] = React.useState('')
  const [passwordErrors, setPasswordErrors] = React.useState({
    validation: null,
    minLength: null,
  })
  const ref = React.useRef()
  useOutside(ref, setShowSelect)
  const router = useRouter()

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData)
    const {
      email,
      confirm_password,
      password,
      confirm_email,
      keep_updated,
      phone,
    } = formValues

    if (!email || !password || !phone) {
      setErrors('Fill the required fields!')
      return
    }

    if (email !== confirm_email) {
      setErrors('Emails are not same!')
      return
    }
    if (password !== confirm_password) {
      setErrors('Password does not match!')
      return
    }

    if (passwordErrors.validation || passwordErrors.minLength) {
      setErrors("Password doesn't meet the requirements!")
      return
    }

    await signUpEmailPassword(email, password, {
      metadata: {
        phone: `${
          countries.filter((i) => i.code === country)[0].dial_code
        }${phone}`,
        keep_updated,
        plan: null,
        isPurchasing: false,
      },
    })
  }

  const formatPhoneNumber = (event) => {
    try {
      setErrors('')
      const phoneNumber = parsePhoneNumber(
        countries.filter((i) => i.code === country)[0].dial_code +
          event.target.value
      )
      const number = phoneNumber.formatInternational();
        setPhone(
          number.slice(
            countries.filter((i) => i.code === country)[0].dial_code.length + 1,
            phoneNumber.formatInternational().length
          )
        )
    } catch (error) {
      if(error.message === 'TOO_SHORT'){
        setPhone(event.target.value)
      }
      if(error.message === 'TOO_LONG') {
        setErrors('Invalid Number')
      }
    }
  }

  if (isSuccess) {
    router.push('/')
    return null
  }
  const validatePassword = (e) => {
    const { value } = e.target
    if (value.length >= 8) {
      setPasswordErrors((pre) => ({ ...pre, minLength: false }))
    } else {
      setPasswordErrors((pre) => ({ ...pre, minLength: true }))
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
    if (regex.test(value)) {
      setPasswordErrors((pre) => ({ ...pre, validation: false }))
    } else {
      setPasswordErrors((pre) => ({ ...pre, validation: true }))
    }
  }

  let countries = CountryList.map((i) => ({
    ...i,
    image: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${i.code}.svg`,
  }))

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 180) {
        setTop(false)
      } else {
        setTop(true)
      }
    })
  }, [])

  let filteredCountries = filter
    ? countries.filter(
        (i) =>
          i.code.toLowerCase().includes(filter.toLowerCase()) ||
          i.name.toLowerCase().includes(filter.toLowerCase()) ||
          i.dial_code.toLowerCase().includes(filter.toLowerCase())
      )
    : countries

  const disableForm = isLoading || needsEmailVerification
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6  lg:min-w-[350px]">
        <p className="text-sm font-bold">
          {needsEmailVerification ? 'VERIFY ACCOUNT' : 'CREATE ACCOUNT'}
        </p>
        {needsEmailVerification ? (
          <p className="text-sm text-green-400">
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
            <div className="relative w-full bg-gray-100">
              <input
                type="email"
                disabled={disableForm}
                name="email"
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2 outline-none"
                placeholder="Email"
              />
              <LiaIdCardSolid
                className="absolute right-3 top-2.5"
                fill="#9ca3af"
                size={24}
              />
            </div>
            <div className="relative w-full bg-gray-100">
              <input
                type="email"
                name="confirm_email"
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2 outline-none"
                placeholder="Confirm Email"
                disabled={disableForm}
              />
            </div>
            <div className="relative flex w-full items-center border border-gray-200 bg-gray-100">
              <div
                className="relative flex h-full min-w-[90px] cursor-pointer items-center gap-2 p-1"
                onClick={() => setShowSelect(!showSelect)}
              >
                <Image
                  src={countries.filter((i) => i.code === country)[0].image}
                  alt={country}
                  width={30}
                  height={50}
                />
                <p>
                  {countries.filter((i) => i.code === country)[0].dial_code}
                </p>
              </div>
              <div>
                {showSelect && (
                  <div
                    ref={ref}
                    className={
                      'absolute left-0 z-30 max-h-[25rem] overflow-y-scroll ' +
                      (top ? 'bottom-9' : 'top-9')
                    }
                  >
                    <input
                      type="text"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      placeholder={'Search'}
                      className="px-4 py-2 "
                    />
                    {filteredCountries.map((i, idx) => (
                      <div
                        onClick={() => {
                          setCountry(i.code)
                          setShowSelect(!showSelect)
                        }}
                        key={idx}
                        className="flex w-full min-w-[130px] cursor-pointer items-center gap-2 bg-gray-200 px-4 py-2 text-xs text-gray-500"
                      >
                        <Image
                          src={i.image}
                          alt={country}
                          width={30}
                          height={50}
                        />{' '}
                        {i.dial_code}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                name="phone"
                className="w-full rounded bg-transparent  py-2 pr-4 outline-none"
                disabled={disableForm}
                value={phone}
                onChange={formatPhoneNumber}
                placeholder="Phone Number"
              />
            </div>
            <p className="text-center text-[10px] text-gray-400">
              We won't disclose or sell your mobile information
            </p>
            <label className="relative flex gap-2 text-xs text-gray-400">
              <input
                type="checkbox"
                name="keep_updated"
                className="rounded border border-gray-200 bg-transparent px-4 py-2"
                disabled={disableForm}
              />{' '}
              Keep me updated with club information
            </label>
            <p className="text-sm font-bold">THINK OF A PASSWORD</p>
            <div className="relative w-full bg-gray-100">
              <input
                type={showPasswords.pass ? 'text' : 'password'}
                name="password"
                disabled={disableForm}
                onChange={validatePassword}
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2 outline-none"
                placeholder="Password"
              />
              <div
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={() =>
                  setShowPasswords((pre) => ({ ...pre, pass: !pre.pass }))
                }
              >
                {showPasswords.pass ? (
                  <AiFillEyeInvisible fill="#9ca3af" size={24} />
                ) : (
                  <AiFillEye fill="#9ca3af" size={24} />
                )}
              </div>
            </div>
            <div className="relative w-full bg-gray-100">
              <input
                type={showPasswords.confirm_pass ? 'text' : 'password'}
                disabled={disableForm}
                name="confirm_password"
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2 outline-none"
                placeholder="Confirm Password"
              />
              <div
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={() =>
                  setShowPasswords((pre) => ({
                    ...pre,
                    confirm_pass: !pre.confirm_pass,
                  }))
                }
              >
                {showPasswords.confirm_pass ? (
                  <AiFillEyeInvisible fill="#9ca3af" size={24} />
                ) : (
                  <AiFillEye fill="#9ca3af" size={24} />
                )}
              </div>
            </div>
            <div
              className={
                'relative flex items-center gap-2 text-xs ' +
                (passwordErrors.minLength === null
                  ? 'text-gray-400'
                  : passwordErrors.minLength
                  ? 'text-red-400'
                  : 'text-green-400')
              }
            >
              <div
                className={
                  'h-2.5 w-2.5 rounded-full p-1 ' +
                  (passwordErrors.minLength === null
                    ? 'bg-gray-300'
                    : passwordErrors.minLength
                    ? 'bg-red-400'
                    : 'bg-lime')
                }
              ></div>
              At least 8 characters
            </div>
            <div
              className={
                'relative flex items-center gap-2 text-xs ' +
                (passwordErrors.validation === null
                  ? 'text-gray-400'
                  : passwordErrors.validation
                  ? 'text-red-400'
                  : 'text-green-400')
              }
            >
              <div
                className={
                  'h-2.5 w-2.5 rounded-full p-1 ' +
                  (passwordErrors.validation === null
                    ? 'bg-gray-300'
                    : passwordErrors.validation
                    ? 'bg-red-400'
                    : 'bg-lime')
                }
              ></div>
              Uppercase, Lowercase and Numeric
            </div>
            <button
              type="submit"
              disabled={disableForm}
              className="rounded-full bg-lime py-2 text-sm font-bold hover:bg-limehover"
            >
              {isLoading ? 'Creating Account...' : 'Create My Account'}
            </button>
            {isError || errors ? (
              <p className={'text-xs text-red-400'}>
                {error?.message || errors}
              </p>
            ) : null}
            <div className="flex justify-between">
              <div className="relative flex items-center gap-2 text-xs">
                Already have an account?
              </div>
              <Link
                href={'/login'}
                className="relative flex items-center gap-2 text-xs font-bold text-blue-700"
              >
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegisterForm
