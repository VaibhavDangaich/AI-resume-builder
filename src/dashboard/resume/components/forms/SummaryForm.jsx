import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { ImMagicWand } from "react-icons/im";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../../Service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function SummaryForm({ enableNext }) {  // ✅ Added enableNext as a prop
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();  // ✅ Added useParams()

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
                    <Button type="button" variant="outline" size="sm" className="border-purple-500 text-purple-500">
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
        </div>
    );
}

export default SummaryForm;
