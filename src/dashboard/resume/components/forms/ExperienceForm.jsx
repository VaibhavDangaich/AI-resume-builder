import React from 'react'
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    endDate: '',
    startDate: '',
    endDate: '',
    workSummary: ''
}

function ExperienceForm() {
    const [experienceList, setExperienceList] = useState([{
        formField
    }]);

    const handleChange = (event, index) => {



    }

    return (

        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Showcase your past roles and achievements to highlight your expertise and career growth</p>
            <div>
                {
                    experienceList.map((exp, index) => (<div>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label htmlFor='title' className='text-xs'>Position Title</label>
                                <Input name="title" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='companyName' className='text-xs'>Company Name</label>
                                <Input name="companyName" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='city' className='text-xs'>City</label>
                                <Input name="city" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='state' className='text-xs'>State</label>
                                <Input name="state" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='startDate' className='text-xs'>Start Date</label>
                                <Input name="startDate" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='endDate' className='text-xs'>End Date</label>
                                <Input name="endState" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='workSummary' className='text-xs'>Work Summary</label>
                                <Input name="workSummary" onChange={(event) => handleChange(event, index)}></Input>
                            </div>

                        </div>
                        <div>
                            <Button variant="outline">+ Add More Experience</Button>
                            <Button>Save</Button>
                        </div>
                    </div>)

                    )
                }
            </div>
        </div>
    )
}

export default ExperienceForm