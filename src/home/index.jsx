import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import DecryptedText from '@/components/ui/DecryptedText'


export default function Home() {
  return (
    <div className='h-[1080px] w-full bg-black' >
      <Header></Header>
      
      <div className='flex justify-center'>
        <DecryptedText
          text="<AI RESUME BUILDER/>"
          animateOn="view"
          revealDirection="start"
          speed={100}
          maxIterations={10}
          sequential={true}
          className='text-bold text-[5rem] uppercase font-extrabold text-white '
          encryptedClassName='text-xl text-black'
        />
      </div>

    </div>
  )
}
