import React from 'react'

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

    return (

        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Showcase your past roles and achievements to highlight your expertise and career growth</p>
            <div>
                
            </div>
        </div>
    )
}

export default ExperienceForm