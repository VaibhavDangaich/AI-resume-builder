import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  return (
    <Link to={`/dashboard/resume/${resume.id}/edit`}>
    <div className='p-14 bg-secondary flex justify-center items-center h-[280px] border-purple-800 border-2 rounded-lg hover:scale-105 transition-all hover:shadow-xl shadow-purple-900 duration-200 cursor-pointer '>
    <Notebook></Notebook>

    </div>
    <h2 className='text-center my-1'>{resume.title}</h2>
        
    </Link>
  )
}

export default ResumeCardItem