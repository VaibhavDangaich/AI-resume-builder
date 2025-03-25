import React, { useState } from 'react'

function EducationForm() {
    const [educationalList, setEducationalList] = useState([{
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
    }])

    const handleChange = (e, index) => {

    }
    return (

        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your educational details</p>
            <div>
                {
                    educationalList.map((edu, index) => (
                        <div>
                            <div>
                                <div>
                                    <label>University Name</label>
                                    <input name='universityName' type='text' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div>
                                    <label>Degree</label>
                                    <input name='universityName' type='text' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div>
                                    <label>University Name</label>
                                    <input name='universityName' type='text' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                            </div>


                        </div>

                    ))
                }
            </div>
        </div>

    )
}

export default EducationForm