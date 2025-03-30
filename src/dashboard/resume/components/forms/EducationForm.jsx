import React, { useContext, useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader, Trash2Icon } from 'lucide-react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../Service/GlobalApi';
import { toast } from 'react-hot-toast';
function EducationForm() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading,setLoading] = useState(false);
    const  params  = useParams();
    const [educationalList, setEducationalList] = useState([{
        institution: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
    }])
    const addNewEducation = () => {
        setEducationalList([...educationalList, {
            institution: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }])

    }

    const removeEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.filter((_, i) => i !== educationalList.length - 1))
        }

    }

    const handleChange = (e, index) => {
        const newEnteries = educationalList.slice();
        const { name, value } = e.target;
        newEnteries[index][name] = value;
        setEducationalList(newEnteries);

    }

    const onSave = async (e) => {
        setLoading(true);
        console.log("Params:", params);
        const data = {
            data: {
                education: educationalList

            }
        };
        GlobalApi.updateResumeDetail(params.resumeId,data).then((resp) => {
            console.log(resp.data);
            setLoading(false);
            toast.success('Education details updated');
        }, (error) => {
            setLoading(false);
            toast.error('Error updating education details');
            console.error(error.response?.data || error);
        })
      
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo, 
            education: educationalList
        });
    }, [educationalList]);
    return (

        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your educational details</p>
            <div>
                {
                    educationalList.map((edu, index) => (
                        <div>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div className='col-span-2'>
                                    <label>University Name</label>
                                    <input name='institution' type='text' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div>
                                    <label htmlFor='degree'>Degree</label>
                                    <br></br>
                                    <input name='degree' type='text' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div>
                                    <label htmlFor='major'>Major</label>
                                    <br></br>
                                    <input name='major' type='text' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div>
                                    <label>Start Date</label>
                                    <br></br>
                                    <input name='startDate' type='date' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div>
                                    <label>End Date</label>
                                    <br></br>
                                    <input name='endDate' type='date' onChange={(e) => handleChange(e, index)}></input>
                                </div>
                                <div className=' col-span-2'>
                                    <label>Description</label>
                                    <Textarea name='description' type='text' onChange={(e) => handleChange(e, index)}></Textarea>
                                </div>
                            </div>
                            <div>

                            </div>



                        </div>

                    ))
                }
            </div>
            <div className=' flex justify-between'>
                <div className='flex gap-2'>
                    <Button className="hover:text-purple-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200" variant="outline" onClick={addNewEducation}>+ Add More Experience</Button>
                    <Button className="hover:text-red-500 hover:scale-105 hover:shadow-2xl shadow-black transiti-all duration-200" variant="outline" onClick={removeEducation}><Trash2Icon></Trash2Icon>Remove</Button>

                </div>

                <Button disabled={loading} onClick={() => onSave()}>
                    {
                        loading ? (<Loader className='animate-spin'></Loader>) : ('Save')
                    }
                </Button>
            </div>
        </div>

    )
}

export default EducationForm