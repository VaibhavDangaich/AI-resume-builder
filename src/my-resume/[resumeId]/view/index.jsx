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
        const printArea = document.getElementById("print-area");
        if (printArea) {
            printArea.style.width = "210mm"; // A4 width
            printArea.style.minHeight = "297mm"; // A4 height
            printArea.style.margin = "0"; // Remove margins
            printArea.style.padding = "0"; // Remove padding
            printArea.style.pageBreakAfter = "always"; // Ensure it prints fully
        }
        window.print();
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='bg-[#202123]'>
                <div id='no-print'>
                    <Header></Header>

                </div>

                <div>
                    <h2 id='no-print' className=' text-center'><div style={{ marginTop: '4rem' }}>
                        <DecryptedText
                            text="Your Resume is Readyy!!"
                            animateOn="view"
                            revealDirection="start"
                            speed={100}
                            maxIterations={10}
                            sequential={true}
                            className='decrypt text-bold text-[5rem] uppercase font-extrabold text-[#f8f9fa]'
                            encryptedClassName='text-xl text-black'
                        />
                    </div></h2>
                    <div className=' flex flex-col items-center justify-around mx-auto '>
                        <div id='no-print' className='form-container flex justify-center items-center gap-20 mt-5'>
                            <h2 className='text-[#b967ff] font-bold text-xl -mt-3 flex flex-col'>Download or Share Your Resume!!</h2>
                            <Button
                                onClick={resumeInfo ? handleDownload : () => alert("Resume is still loading...")}
                                disabled={!resumeInfo}
                                className="h-[50px] w-[150px] text-lg"
                            >
                                <Download /> Download
                            </Button>

                            <RWebShare
                                data={{
                                    text: "My Resume,Click the link to view",
                                    url: import.meta.env.VITE_BASE_URL + "/my-resume" + resumeId + "/view",
                                    title: resumeInfo?.firstName + " " + resumeInfo?.lastName,
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <Button className="h-[50px] w-[120px] text-lg"><Share></Share>Share</Button>
                            </RWebShare>


                        </div>
                        <div className='mt-10 flex w-full h-[297mm] max-w-[210mm] mx-auto shadow-lg ' id='print-area'>
                            <ResumePreview></ResumePreview>
                        </div>
                    </div>


                </div>

            </div>

        </ResumeInfoContext.Provider>

    )
}

export default ViewResume