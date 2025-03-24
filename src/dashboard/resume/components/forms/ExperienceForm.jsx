import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { Trash2Icon } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';


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
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

    const handleEditor=(e,name,index)=>{
        const newEnteries=experienceList.slice();
        newEnteries[index][name]=e.target.value;
        setExperienceList(newEnteries);
    }
    const handleChange = (event, index) => {
        const newEnteries=experienceList.slice();
        const {name,value}=event.target;
        newEnteries[index][name]=value;
        setExperienceList(newEnteries);
    }

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            experience: experienceList
        }));
    }, [experienceList, setResumeInfo]);
    

    const addNewExperience = () => {
        setExperienceList([...experienceList, { formField }]);
    }
    const removeExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

   
    return (

        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Showcase your past roles and achievements to highlight your expertise and career growth</p>
            <div>
                {
                    experienceList.map((exp, index) => (<div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label htmlFor='position' className='text-xs'>Position Title</label>
                                <Input name="position" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='company' className='text-xs'>Company Name</label>
                                <Input name="company" onChange={(event) => handleChange(event, index)}></Input>
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
                                <Input type="date" name="startDate" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div>
                                <label htmlFor='endDate' className='text-xs'>End Date</label>
                                <Input type="date" name="endDate" onChange={(event) => handleChange(event, index)}></Input>
                            </div>
                            <div className='col-span-2'>
                                {/*Work Summary*/}
                                <RichTextEditor index={index}onChangeTextEditor={(event)=>handleEditor(event,'description',index)}></RichTextEditor>
                            </div>

                        </div>
                        <div className=' flex justify-between'>
                            <div className='flex gap-2'>
                                <Button className="hover:text-purple-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200" variant="outline" onClick={addNewExperience}>+ Add More Experience</Button>
                                <Button className="hover:text-red-500 hover:scale-105 hover:shadow-2xl shadow-black transiti-all duration-200" variant="outline" onClick={removeExperience}><Trash2Icon></Trash2Icon>Remove</Button>

                            </div>

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