import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import DecryptedText from '@/components/ui/DecryptedText'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { Download, Share } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../Service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();
    useEffect(() => {
        getResumeInfo();
    }, [])

    const getResumeInfo = () => {
        // fetch resume from server
        GlobalApi.getResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
        // setResumeInfo(resume)
    }

    const handleDownload = () => {
        window.print();
    }
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='no-print'>
                <Header></Header>
                <div>
                    <h2 className='text-center'><div style={{ marginTop: '4rem' }}>
                        <DecryptedText
                            text="Your Resume is Readyy!!"
                            animateOn="view"
                            revealDirection="start"
                            speed={100}
                            maxIterations={10}
                            sequential={true}
                            className='text-bold text-[5rem] uppercase font-extrabold text-gray-700 '
                            encryptedClassName='text-xl text-black'
                        />
                    </div></h2>
                    <div className='flex justify-center items-center gap-5 mt-5'>
                        <Button onClick={handleDownload}><Download></Download>Download</Button>
                        <RWebShare
                            data={{
                                text: "My Resume,Click the link to view",
                                url:import.meta.env.VITE_BASE_URL+"/my-resume"+resumeId+"/view",
                                title: resumeInfo?.firstName+" " +resumeInfo?.lastName,
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button><Share></Share>Share</Button>
                        </RWebShare>
                    </div>

                </div>

            </div>
            <div className='mt-10' id='print-area'>
                <ResumePreview></ResumePreview>
            </div>

        </ResumeInfoContext.Provider>

    )
}

export default ViewResume