import Navbar from '@/components/Home/Navbar'
import NewFooter from '@/components/NewFooter'
import { useUserContext } from '@/components/UserProvider'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-hot-toast'
import { BsCheck } from 'react-icons/bs'

const UPDATE_USER_MUTATION = gql`
  mutation ($id: uuid!, $metadata: jsonb) {
    updateUser(pk_columns: { id: $id }, _set: { metadata: $metadata }) {
      id
      metadata
    }
  }
`

function Pricing() {
  const [mutateUser, { loading: updatingProfile }] =
    useMutation(UPDATE_USER_MUTATION)
  const { user } = useUserContext()
  const router = useRouter()
  const { push } = router
  const handlePlanPurchase = async (plan) => {
    if (user) {
      try {
        await mutateUser({
          variables: {
            id: user.id,
            metadata: {
              ...user.metadata,
              isPurchasing: true,
            },
          },
        })
        const url = await fetch(`/api/create_payment`, {
          method: 'POST',
          body: JSON.stringify({
            plan,
          }),
        }).then((r) => r.text())

        push(url)
      } catch (error) {
        console.log(error)
        toast.error('Unable to purchase package')
      }
    } else {
      push('/login?redirect=/pricing')
    }
  }

  const handleUpdatePlan = async (status, plan) => {
    if (status && status === 'success' && user.metadata.isPurchasing) {
      await mutateUser({
        variables: {
          id: user.id,
          metadata: {
            ...user.metadata,
            isPurchasing: false,
            plan
          },
        },
      })
      toast.success('Purchase successfully!')
      window.location.href = '/'
    } else {
      toast.error('Purchase Canceled!')
    }
  }

  React.useEffect(() => {
    if (router.query.paymentStatus) {
      handleUpdatePlan(router.query.paymentStatus, router.query.plan)
    }
  }, [router, user])

  return (
    <div>
      <div className={'relative min-h-[80vh] bg-pricing bg-cover'}>
        <Navbar />
        <h1 className="font-roadrage text-center mb-16 text-3xl font-bold uppercase text-yellow-400 md:text-[3rem]">
          Pick Your Poizn.
        </h1>
        <div className="flex flex-wrap md:absolute -bottom-10 left-0 w-full z-20 justify-center">
          <div className="h-fit w-full max-w-[16rem] rounded-2xl bg-white p-10 shadow-md">
            <div className="flex items-center text-gray-700">
              <h2 className="text-3xl font-[900]">$10</h2>
              <h2 className="-mb-2 text-xl font-[900]">USD</h2>
            </div>
            <h2 className="text-lg font-bold text-gray-700">Monthly</h2>
            <ul className="my-3 min-h-[68px] text-[10px] text-gray-500">
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Early access content
              </li>
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Free entry to events
              </li>
              <li className="flex items-center gap-3">
                <BsCheck size={16} />{' '}
                <h2 className="whitespace-nowrap text-[10px]">
                  Merch and sponsor discounts
                </h2>
              </li>
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Monthly giveaways
              </li>
            </ul>
            <div
              onClick={() => handlePlanPurchase('monthly')}
              className="mt-7 mb-8 cursor-pointer rounded-full bg-black py-2 text-center text-sm font-bold uppercase text-white"
            >
              Join NOW
            </div>
          </div>
          <div className="relative z-10 -mx-4 -mt-4 h-[370px] sm:h-fit w-full max-w-[18rem] rounded-2xl bg-blue-600 px-8 py-10 pr-10 shadow-md">
            <div className="flex items-center text-yellow-500">
              <h2 className="text-3xl font-[900]">$54</h2>
              <h2 className="-mb-2 text-xl font-[900]">USD</h2>
            </div>
            <h2 className="text-lg font-bold text-white">Semi-Annual</h2>
            <ul className="my-3 min-h-[68px] text-[10px] text-white">
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Monthly subscription +
              </li>
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Car build giveaways
              </li>
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> International travel
              </li>
            </ul>
            <div
              onClick={() => handlePlanPurchase('semi-annual')}
              className="mt-7 cursor-pointer rounded-full sm:mb-14 bg-black py-2 text-center text-sm font-bold uppercase text-white"
            >
              Join NOW
            </div>
          </div>
          <div className="h-fit  w-full max-w-[16rem] rounded-2xl bg-white p-10 shadow-md">
            <div className="flex items-center text-gray-700">
              <h2 className="text-3xl font-[900]">$96</h2>
              <h2 className="-mb-2 text-xl font-[900]">USD</h2>
            </div>
            <h2 className="text-lg font-bold text-gray-700">Annual</h2>
            <ul className="my-3 min-h-[68px] text-[10px] text-gray-500">
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Semi-Annual subscription+
              </li>
              <li className="flex items-center gap-3">
                <BsCheck size={16} /> Nick Personal Car builds
              </li>
            </ul>
            <div
              onClick={() => handlePlanPurchase('annual')}
              className="mt-7 mb-8 cursor-pointer rounded-full bg-black py-2 text-center text-sm font-bold uppercase text-white"
            >
              Join NOW
            </div>
          </div>
        </div>
      </div>
      <div className="h-[20.5vh] -mt-4 relative z-10 w-full bg-white"></div>
      {updatingProfile && (
        <div className="absolute top-0 left-0 z-20 flex h-screen w-[98.6vw] items-center justify-center bg-black/70 font-bold text-white">
          Loading...
        </div>
      )}
      <NewFooter />
    </div>
  )
}

export default Pricing
