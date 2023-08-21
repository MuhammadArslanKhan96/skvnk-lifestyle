import React from 'react'
import { LiaIdCardSolid } from 'react-icons/lia'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import Link from 'next/link'
import { useSignUpEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'

function RegisterForm() {
  const [showPasswords, setShowPasswords] = React.useState({
    pass: false,
    confirm_pass: false,
  })
  const [passwordErrors, setPasswordErrors] = React.useState({
    validation: null,
    minLength: null,
  })

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
      console.error('Fill the required fields!')
      return
    }

    if (email !== confirm_email) {
      console.error('Emails are not same!')
      return
    }
    if (password !== confirm_password) {
      console.error('Passwords are not same!')
      return
    }

    if (passwordErrors.validation || passwordErrors.minLength) {
      console.error("Password doesn't meet the requirements!")
      return
    }

    await signUpEmailPassword(email, password, {
      metadata: {
        phone,
        keep_updated,
        plan: null,
        isPurchasing: false,
      },
    })
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
  const disableForm = isLoading || needsEmailVerification
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6  lg:min-w-[300px]">
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
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2"
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
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2"
                placeholder="Confirm Email"
                disabled={disableForm}
              />
            </div>
            <div className="relative w-full bg-gray-100">
              <input
                type="text"
                name="phone"
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2"
                disabled={disableForm}
                placeholder="+1"
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
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2"
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
                className="w-full rounded border border-gray-200 bg-transparent px-4 py-2"
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
              className="bg-lime rounded-full py-2 text-sm font-bold"
            >
              {isLoading ? 'Creating Account...' : 'Create My Account'}
            </button>
            {isError ? (
              <p className={'text-xs text-red-400'}>{error?.message}</p>
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
