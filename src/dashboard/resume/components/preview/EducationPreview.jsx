import React from 'react'

function EducationPreview({resumeInfo}) {
    return (
        <div className='my-6 '>
            <h2 className='text-center font-bold text-sm mb-2' style={{
                color: resumeInfo?.themeColor
            }}>Education</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor,

            }}></hr>
            {
                resumeInfo?.education.map((edu,index)=>(
                    <div key={index} className='my-5'>
                        <h2 className='text-sm font-bold ' style={{
                            color: resumeInfo?.themeColor
                        }}>{edu?.institution}</h2>
                        <h2  className='text-xs flex justify-between'>{edu?.degree} in {edu?.major}
                        <span>{edu?.startDate} - {edu?.endDate}</span></h2>
                        <p className='text-xs my-2'>
                            {edu?.description}
                        </p>
                       
                    </div>
                ))

                
            }
        </div>
    )
}

export default EducationPreview