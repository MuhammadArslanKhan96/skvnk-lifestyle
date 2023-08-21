import React from 'react'
import { LiaIdCardSolid } from 'react-icons/lia'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import Link from 'next/link'
import { useSignInEmailPassword } from '@nhost/nextjs'
import { useRouter } from 'next/router'

function LoginForm() {
  const [showPasswords, setShowPasswords] = React.useState({
    pass: false,
  })

  const router = useRouter()

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData)
    const { email, password } = formValues

    if (!email || !password) {
      console.error('Fill the required fields!')
      return
    }
    await signInEmailPassword(email, password)
  }
  if (isSuccess) {
    router.push(router.query.redirect || '/')
    return null
  }

  const disableForm = isLoading || needsEmailVerification

  return (
    <div className="flex justify-center">
      <div className="bg-white p-6  lg:min-w-[300px]">
        <p className="text-sm font-bold">
          {needsEmailVerification ? 'VERIFY ACCOUNT' : 'SIGN IN'}
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
                type={showPasswords.pass ? 'text' : 'password'}
                name="password"
                disabled={disableForm}
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
            <button
              type="submit"
              disabled={disableForm}
              className="bg-lime rounded-full py-2 text-sm font-bold"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            {isError ? (
              <p className={'text-xs text-red-400'}>{error?.message}</p>
            ) : null}
            <div className="flex justify-between">
              <div className="relative flex items-center gap-2 text-xs">
                Don't have an account?
              </div>
              <Link
                href={'/register'}
                className="relative flex items-center gap-2 text-xs font-bold text-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginForm
