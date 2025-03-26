import React, { useState } from 'react'

function SkillsForm() {
  
  const [skillsList, setSkillsList] = useState([{
    name: '',
    rating: 0
  } ])

 const handleChange=(index,name,val)=>{
  

 }

  return (
    <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your top professional skills</p>
      <div>
        {
          skillsList.map((skill,index)=>(
            <div key={index}>
            <div>
              <label className='text-xs'>Name</label>
              <Input onChange={(e)=>handleChange(index,'name',e.target.value)}></Input>
            </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default SkillsForm