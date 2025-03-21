import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { ImMagicWand } from "react-icons/im";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../Service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AIChatSession } from '../../../../../Service/AIModel';

function SummaryForm({ enableNext }) {  // ✅ Added enableNext as a prop
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [summaryList, setSummaryList] = useState();
    const params = useParams();  // ✅ Added useParams()
    const prompt = `Generate multiple resume summaries (4-5 lines each) for the job title: {jobTitle}. 
    Provide at least 3 variations. Format the response as an array of JSON objects with "job_title" and "resume_summary" fields.`;


    const generateSummaryFromAI = async () => {
        setLoading(true);
        const Prompt = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log("Prompt:", Prompt);
    
        try {
            const result = await AIChatSession.sendMessage(Prompt);
            const responseText = await result.response.text();  // ✅ Ensure we await response
            console.log("Raw Response:", responseText);
    
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(responseText);
            } catch (error) {
                // If JSON parsing fails, try splitting by new lines
                parsedResponse = responseText.split("\n").filter(line => line.trim() !== "");
            }
    
            console.log("Parsed Response:", parsedResponse);
    
            // Ensure it's an array before setting state
            if (Array.isArray(parsedResponse)) {
                setSummaryList(parsedResponse);
            } else {
                setSummaryList([parsedResponse]);  // Wrap in array if it's a single object
            }
        } catch (error) {
            console.error("Error generating summary:", error);
            toast.error("Error generating summary");
        } finally {
            setLoading(false);
        }
    };
    


    useEffect(() => {
        if (summary) {
            setResumeInfo({ ...resumeInfo, summary });
        }
    }, [summary]);

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        if (enableNext) enableNext(true);  // ✅ Ensure enableNext is defined before calling

        const data = { summary };

        GlobalApi.updateResumeDetail(params.resumeId, { data })
            .then((resp) => {
                setLoading(false);
                console.log("Update successful:", resp.data);
                if (enableNext) enableNext(true);
                toast.success("Details Updated");
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Error updating resume");
                console.error("Error updating resume:", error.response?.data || error);
            }); // ✅ Properly closed .catch()
    };

    return (
        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Craft a standout summary for your job title</p>
            <form className='mt-7' onSubmit={submitHandler}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button type="button" variant="outline" size="sm" className="border-purple-500 text-purple-500" onClick={() => generateSummaryFromAI()}>
                        Generate from AI <ImMagicWand />
                    </Button>
                </div>
                <Textarea className="mt-5" onChange={(e) => setSummary(e.target.value)} required></Textarea>
                <div className='mt-2 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
            {summaryList && <div>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {
                    summaryList.map((suggestion, index) => (
                        <div key={index} className='text-sm mt-2'>
                           <h2 className='font-bold my-1'>{suggestion.job_title}</h2>
                            <p>{suggestion?.resume_summary}</p>
                        </div>
                    ))
                }
            </div>}
        </div>
    );
}

export default SummaryForm;
