import React, { useState } from 'react'

function EducationForm() {
    const [educationalList,setEducationalList]=useState([{
        degree: '',
        institution: '',
        startYear: '',
        endYear: ''
    }])
    return (

        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your educational details</p>
        </div>

    )
}

export default EducationForm