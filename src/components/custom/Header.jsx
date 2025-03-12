import { Bluetooth, TypeOutline } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-lg'>
            <div className='flex '>
                <img src='https://img.icons8.com/?size=100&id=bLp8jngMI59L&format=png&color=000000' alt='AI resume builder' width={50} height={50}></img>
                <div className=' font-extrabold'>
                    <p>AI Resume</p>
                       <p>Builder</p>
                </div>


            </div>

            {
                isSignedIn ?
                    (
                        <div className='flex gap-2 items-center'>
                            <NavLink to='/dashboard'>
                                <Button variant='outline'>Dashboard</Button>
                            </NavLink>
                            <UserButton></UserButton>
                        </div>
                    ) : (
                        <div>
                            <NavLink to='/auth/sign-in'>
                                <Button>Get Started</Button>
                            </NavLink>
                        </div>
                    )
            }


        </div>
    )
}

export default Header