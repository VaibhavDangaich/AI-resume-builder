import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Asterisk, AsteriskIcon } from 'lucide-react'
import React, { useContext } from 'react'

function PersonalDetail() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const handleInputChange = (e) => {

    }
    return (
        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Kickstart your journey with the essential details</p>

            <form>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label htmlFor='firstName' className='text-sm flex'>First Name<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='firstName' onChange={handleInputChange} required></input>
                    </div>
                    <div>
                        <label htmlFor='lastName' className='text-sm flex'>Last Name<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='lastName' onChange={handleInputChange} required></input>
                    </div>
                    <div className='col-span-2'>
                        <label htmlFor='jobTitle' className='text-sm flex'>Job Title<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='jobTitle' className='w-full' onChange={handleInputChange} required></input>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default PersonalDetail