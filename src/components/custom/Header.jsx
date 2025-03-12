import { Bluetooth } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function Header() {
    const {user,isSignedIn}=useUser();
  return (
    <div className='p-3 px-5 flex justify-between shadow-lg'>
        <img src='../public/logo.svg' alt='AI resume builder' width={50} height={50}></img>
        {
            isSignedIn?
            ():()
        }
        <NavLink to='/auth/sign-in'>
        <Button>Get Started</Button>
        </NavLink>
       
    </div>
  )
}

export default Header