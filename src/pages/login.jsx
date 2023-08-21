import { Container } from '@/components/Container'
import LoginForm from '@/components/LoginForm'
import NewFooter from '@/components/NewFooter'
import brandLogo from '@/images/skvnk_logo.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()
  return (
    <div className="min-h-screen">
      <Container
        subclass={'flex flex-col items-center justify-center gap-4'}
        className={'relative min-h-[80vh] bg-auth bg-cover pb-10'}
      >
        <div onClick={() => router.push('/')} className="md:-mt-14 cursor-pointer">
          <Image src={brandLogo} alt="" />
        </div>
        <h1 className="-mt-16 mb-8 font-roadrage text-3xl font-bold uppercase text-yellow-400 md:-mt-20 md:text-[3rem]">
          MemberShip
        </h1>
        <LoginForm />
      </Container>
      <NewFooter />
    </div>
  )
}

export default Login
