import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] resume-section' style={{
       borderColor:resumeInfo?.themeColor

    }}>
        {/*Personal details*/}
        <PersonalDetailPreview resumeInfo={resumeInfo}></PersonalDetailPreview>



        {/*Summary*/}
        <SummaryPreview resumeInfo={resumeInfo}></SummaryPreview>




        {/*professional experience*/}
        <ExperiencePreview resumeInfo={resumeInfo}></ExperiencePreview>


        {/*education*/}
        <EducationPreview resumeInfo={resumeInfo}></EducationPreview>



        {/*skills*/}
        <SkillsPreview resumeInfo={resumeInfo}></SkillsPreview>

    </div>
  )
}

export default ResumePreview