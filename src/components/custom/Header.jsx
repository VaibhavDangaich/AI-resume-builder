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
                    <p className='bruno-ace-sc-regular text-xl'><span className='iceberg-regular text-3xl font-extrabold'>AI</span> Resume</p>
                    <p className='bruno-ace-sc-regular text-xl'>Builder</p>
                </div>


            </div>

            {
                isSignedIn ?
                    (
                        <div className='flex gap-10 items-center'>
                            <NavLink to='/dashboard'>
                                <Button variant='outline' className="w-[130px] h-full">Dashboard</Button>
                            </NavLink>
                            <div style={{ transform: "scale(1.6)" }}>
                                <UserButton />
                            </div>

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