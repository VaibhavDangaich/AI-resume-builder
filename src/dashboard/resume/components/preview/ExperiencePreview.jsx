import React from 'react'

function ExperiencePreview({ resumeInfo }) {
    return (
        <div className='my-6 experience-preview '>
            <h2 className='text-center font-bold text-sm mb-2' style={{
                color: resumeInfo?.themeColor
            }}>Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor,

            }}></hr>
            {
                resumeInfo?.experience?.map((experience, index) => (
                    <div key={index} className='my-5'>
                        <h2 className='text-sm font-bold' style={{
                            color: resumeInfo?.themeColor
                        }}>{experience?.position}</h2>
                        <h2 className='text-xs flex justify-between'>{experience?.company} , {experience?.city} , {experience?.state}
                            <span>{experience?.startDate}
                            <span> - </span>

                                {

                                    experience?.currentlyWorking ? ('Present') : (experience?.endDate)
                                }
                            </span>
                        </h2>
                        <div className='professional-experience' dangerouslySetInnerHTML={{ __html: experience.description }} />


                    </div>
                ))
            }


        </div>
    )
}

export default ExperiencePreview