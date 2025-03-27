import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

import '@smastrom/react-rating/style.css'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../Service/GlobalApi'
import { useParams } from 'react-router-dom'

function SkillsForm() {
  const [loading,setLoading]=useState(false);
  const  {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  const {resumeId}=useParams();

  const addNewSkill=()=>{
    setSkillsList([...skillsList,
      {
        name:'',
        rating:0
      }
    ])

  }
  
  const removeSkill=()=>{
    setSkillsList(skillsList=>skillsList.slice(0,-1))

  }

  const [skillsList, setSkillsList] = useState([{
    name: '',
    rating: 0
  }])

  const handleChange = (index, name, val) => {
    const newSkillsList = skillsList.slice();
    newSkillsList[index][name] = val;
    setSkillsList(newSkillsList);


  }
  const onSave = () => {
    setLoading(true);
    // TODO: Save skills to the backend
    const data={
      data:{
        skills: skillsList
      }
    }
    GlobalApi.updateResumeDetail(resumeId,data).then(resp=>{
      console.log(resp)
      setLoading(false);
      toast.success("Skills Updated")
    },error=>{
      console.error('Error saving skills:', error.response?.data || error)
      toast.error("Server Error,Try again!!")
      setLoading(false);
    })
  
  }

  useEffect(()=>{
    setResumeInfo({...resumeInfo, skills: skillsList });


  },[skillsList])

  return (
    <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your top professional skills</p>
      <div>
        {
          skillsList.map((skill, index) => (
            <div key={index} className='flex justify-between mb-2 p-3 border rounded-lg'>
              <div>
                <label className='text-xs'>Name</label>
                <Input className="w-full" onChange={(e) => handleChange(index, 'name', e.target.value)}></Input>
              </div>
              <Rating style={{ maxWidth: 120 }} value={skill.rating} onChange={(v) => handleChange(index, "rating", v)} />

            </div>
          ))
        }
      </div>

      <div className=' flex justify-between mt-4'>
        <div className='flex gap-2'>
          <Button className=" cursor-pointer hover:text-purple-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200" variant="outline" onClick={addNewSkill}>+ Add More Skills</Button>
          <Button className="cursor-pointer hover:text-red-500 hover:scale-105 hover:shadow-2xl shadow-black transiti-all duration-200" variant="outline" onClick={removeSkill}><Trash2Icon></Trash2Icon>Remove</Button>

        </div>

        <Button disabled={loading} onClick={() => onSave()}>
          {
            loading ? (<Loader className='animate-spin'></Loader>) : ('Save')
          }
        </Button>
      </div>
    </div>
  )
}

export default SkillsForm