import React, { useContext, useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader, Trash2Icon } from 'lucide-react';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../Service/GlobalApi';
import { toast } from 'react-hot-toast';

function EducationForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    // ✅ Initialize from context
    const [educationalList, setEducationalList] = useState(
        resumeInfo.education || [
            {
                institution: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ]
    );

    // ✅ Sync state with context
    useEffect(() => {
        setEducationalList(resumeInfo.education || [
            {
                institution: '',
                degree: '',
                major: '',
                startDate: '',
                endDate: '',
                description: ''
            }
        ]);
    }, [resumeInfo.education]);

    const addNewEducation = () => {
        setEducationalList([...educationalList, {
            institution: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }]);
    };

    const removeEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.slice(0, -1));
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedList = educationalList.map((edu, i) =>
            i === index ? { ...edu, [name]: value } : edu
        );
        setEducationalList(updatedList);
    };

    useEffect(() => {
        setResumeInfo((prev) => ({ ...prev, education: educationalList }));
    }, [educationalList]);

    const onSave = async () => {
        setLoading(true);
        const data = { data: { education: educationalList } };

        try {
            await GlobalApi.updateResumeDetail(params.resumeId, data);
            toast.success('Education details updated');
        } catch (error) {
            toast.error('Error updating education details');
            console.error(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='text-[#b967ff] font-bold text-xl -mt-3'>Education</h2>
            <p className='text-[#c4a2ff] text-sm mt-2'>Add your educational details</p>
            <div className='mt-5'>
                {educationalList.map((edu, index) => (
                    <div key={index}>
                        <div className='form-container grid grid-cols-2 gap-3 p-3 my-5 rounded-lg'>

                            <div className='col-span-2 flex flex-col gap-1'>
                                <label className="text-sm font-medium text-purple-300">University Name</label>
                                <input
                                    name='institution'
                                    type='text'
                                    value={edu.institution}
                                    onChange={(e) => handleChange(e, index)}
                                    className="p-2 bg-black border border-purple-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-purple-300">Degree</label>
                                <input
                                    name='degree'
                                    type='text'
                                    value={edu.degree}
                                    onChange={(e) => handleChange(e, index)}
                                    className="p-2 bg-black border border-purple-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-purple-300">Major</label>
                                <input
                                    name='major'
                                    type='text'
                                    value={edu.major}
                                    onChange={(e) => handleChange(e, index)}
                                    className="p-2 bg-black border border-purple-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-purple-300">Start Date</label>
                                <input
                                    name='startDate'
                                    type='date'
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(e, index)}
                                    className="custom-date-input p-2 bg-black border border-purple-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-purple-300">End Date</label>
                                <input
                                    name='endDate'
                                    type='date'
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(e, index)}
                                    className="custom-date-input p-2 bg-black border border-purple-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1">
                                <label className="text-sm font-medium text-purple-300">Description</label>
                                <Textarea
                                    name='description'
                                    value={edu.description}
                                    onChange={(e) => handleChange(e, index)}
                                    className="p-2 bg-black border border-purple-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button
                        className="hover:text-purple-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200"
                        variant="outline"
                        onClick={addNewEducation}
                    >
                        + Add More Education
                    </Button>
                    <Button
                        className="hover:text-red-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200"
                        variant="outline"
                        onClick={removeEducation}
                    >
                        <Trash2Icon /> Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <Loader className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default EducationForm;
