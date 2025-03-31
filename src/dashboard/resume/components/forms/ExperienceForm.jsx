import React, { useContext, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { Loader2, Trash2Icon } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../Service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const formField = {
    position: '',
    company: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    description: ''
};

function ExperienceForm() {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    // Initialize with existing experiences or default empty form
    const [experienceList, setExperienceList] = useState(
        resumeInfo.experience.length > 0 ? resumeInfo.experience : [{ ...formField }]
    );

    // Ensure state sync with context
    useEffect(() => {
        if (resumeInfo.experience.length > 0) {
            setExperienceList(resumeInfo.experience);
        }
    }, [resumeInfo.experience]);

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            experience: experienceList
        }));
    }, [experienceList, setResumeInfo]);

    const handleEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    const handleChange = (event, index) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const onSave = async () => {
        setLoading(true);

        // Format data before sending
        const formattedExperience = experienceList.map(exp => ({
            position: exp.position || "",
            company: exp.company || "",
            city: exp.city || "",
            state: exp.state || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            description: exp.description || ""
        }));

        const data = { data: { experience: formattedExperience } };
        console.log("Sending Data:", JSON.stringify(data, null, 2));

        try {
            const resp = await GlobalApi.updateResumeDetail(params.resumeId, data);
            console.log("Response:", resp.data);
            setLoading(false);
            toast.success("Experience details updated");
        } catch (error) {
            setLoading(false);
            console.error("Full Error:", error);

            if (error.response) {
                console.error("API Response Error:", error.response.data);
                toast.error(`Error: ${error.response.data.error?.message || "Unknown error"}`);
            } else {
                toast.error("Network error. Check console for details.");
            }
        }
    };

    const addNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]); // Use spread operator for a fresh object
    };

    const removeExperience = () => {
        if (experienceList.length > 1) {
            setExperienceList(experienceList.slice(0, -1));
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Showcase your past roles and achievements to highlight your expertise and career growth</p>
            <div>
                {experienceList.map((exp, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <label htmlFor='position' className='text-xs'>Position Title</label>
                                <Input name="position" defaultValue={exp.position} onChange={(event) => handleChange(event, index)} />
                            </div>
                            <div>
                                <label htmlFor='company' className='text-xs'>Company Name</label>
                                <Input name="company" defaultValue={exp.company} onChange={(event) => handleChange(event, index)} />
                            </div>
                            <div>
                                <label htmlFor='city' className='text-xs'>City</label>
                                <Input name="city" defaultValue={exp.city} onChange={(event) => handleChange(event, index)} />
                            </div>
                            <div>
                                <label htmlFor='state' className='text-xs'>State</label>
                                <Input name="state" defaultValue={exp.state} onChange={(event) => handleChange(event, index)} />
                            </div>
                            <div>
                                <label htmlFor='startDate' className='text-xs'>Start Date</label>
                                <Input type="date" name="startDate" defaultValue={exp.startDate} onChange={(event) => handleChange(event, index)} />
                            </div>
                            <div>
                                <label htmlFor='endDate' className='text-xs'>End Date</label>
                                <Input type="date" name="endDate" defaultValue={exp.endDate} onChange={(event) => handleChange(event, index)} />
                            </div>
                            <div className='col-span-2'>
                                <RichTextEditor index={index} defaultValue={exp.description} onChangeTextEditor={(event) => handleEditor(event, 'description', index)} />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Button className="hover:text-purple-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200" variant="outline" onClick={addNewExperience}>
                                    + Add More Experience
                                </Button>
                                <Button className="hover:text-red-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200" variant="outline" onClick={removeExperience}>
                                    <Trash2Icon /> Remove
                                </Button>
                            </div>
                            <Button onClick={onSave} disabled={loading}>
                                {loading ? <Loader2 className='animate-spin' /> : "Save"}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperienceForm;
