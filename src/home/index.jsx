import Header from '@/components/custom/Header'
import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import DecryptedText from '@/components/ui/DecryptedText'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import TrueFocus from '@/components/ui/TrueFocus'

export default function Home() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='h-[1080px] w-full bg-[#0d0d0d] flex flex-col'>
      <Header />

      <div className='flex justify-center items-center'>
        <DecryptedText
          text="< AI RESUME BUILDER />"
          animateOn="view"
          revealDirection="start"
          speed={100}
          maxIterations={10}
          sequential={true}
          className='decrypt text-bold text-[5rem] uppercase font-extrabold text-[#f8f9fa]'
          encryptedClassName='text-xl text-[#0d0d0d]'
        />
      
       


      </div>
     
      <div className=' mt-10'>
        <TrueFocus
          sentence="Build Your Resume Now!!"
          manualMode={false}
          blurAmount={5}
          borderColor={'#ff00ff'}
          animationDuration={1}
          pauseBetweenAnimations={0.1}
        
        />

      </div>
      <div className='flex justify-center items-center mt-10'>
          <h1 className='text-[#d580ff] bytesized-regular text-[30px] font-bold'>Hiii {user?.firstName} , Get Started with your Resume </h1>
        </div>


      <div className='flex justify-center items-center mt-10'>
        <Button className='bg-[#6200ea] hover:bg-[#3700b3] text-white font-bold py-2 px-6 rounded-lg'>
          {isSignedIn ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/auth/sign-in">Get Started</Link>
          )}
        </Button>
      </div>
    </div>
  )
}
