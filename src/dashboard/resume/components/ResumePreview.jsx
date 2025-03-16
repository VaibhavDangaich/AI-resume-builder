import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  return (
    <div>
        {/*Personal details*/}
        <PersonalDetailPreview resumeInfo={resumeInfo}></PersonalDetailPreview>



        {/*Summary*/}




        {/*professional experience*/}


        {/*education*/}



        {/*skills*/}


    </div>
  )
}

export default ResumePreview