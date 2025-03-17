import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Asterisk, AsteriskIcon, LucideLoader, PhoneCallIcon } from 'lucide-react'
import React, { useContext, useEffect,useState } from 'react'
import { SiMinutemailer } from "react-icons/si";
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../Service/GlobalApi'
import {toast } from 'react-hot-toast';




function PersonalDetail({enableNext}) {
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [formData,setFormData]=useState({});
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
   useEffect(()=>{
    console.log(params.resumeId)
   },[])
 

    const handleInputChange = (e) => {
        const {name,value}=e.target;
        enableNext(false);
        setFormData({...formData,[name]:value});
        setResumeInfo({...resumeInfo,[name]:value});

    }
    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        enableNext(true);
    
        const data = { 
            firstName: formData.firstName,
            lastName: formData.lastName,
            jobTitle: formData.jobTitle,
            address: formData.address,
            phone: formData.phone,
            email: formData.email
        };
    
        console.log("Final data before sending:", JSON.stringify({ data }, null, 2));
    
        GlobalApi.updateResumeDetail(params.resumeId, { data })  // ✅ Ensure correct format
            .then((resp) => {
                setLoading(false);
                console.log("Update successful:", resp.data);
                enableNext(true);
                toast.success("Details Updated")
             
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Error updating resume")
                console.error("Error updating resume:", error.response?.data || error);
              
            });
    
        console.log("Form submitted");
    };
    
    return (
        <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Kickstart your journey with the essential details</p>

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label htmlFor='firstName' className='text-sm flex'>First Name<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='firstName' className='border-2 rounded-lg' onChange={handleInputChange} required defaultValue={resumeInfo?.firstName}></input>
                  </div>
                    <div>
                        <label htmlFor='lastName' className='text-sm flex'>Last Name<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='lastName' className='border-2 rounded-lg' onChange={handleInputChange} required defaultValue={resumeInfo?.lastName}></input>
                  </div>
                    <div className='col-span-2'>
                        <label htmlFor='jobTitle' className='text-sm flex'>Job Title<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='jobTitle'  className='w-full border-2 rounded-lg' onChange={handleInputChange} required defaultValue={resumeInfo?.jobTitle}></input>
                  </div>
                    <div className='col-span-2'>
                        <label htmlFor='address' className='text-sm flex'>Address<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='address' className='w-full border-2 rounded-lg' onChange={handleInputChange} required defaultValue={resumeInfo?.address}></input>
                  </div>
                    <div>
                        <label htmlFor='phone' className='text-sm flex'><PhoneCallIcon size={15} className='mt-1 mr-2'></PhoneCallIcon>Phone<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='phone' className="border-2 rounded-lg" onChange={handleInputChange} required defaultValue={resumeInfo?.phone}></input>
                  </div>
                    <div>
                        <label htmlFor='email' className='text-sm flex'><SiMinutemailer className='mt-[0.5px] mr-2' size={20} />Email<sup className='mt-2'><Asterisk color='red' size={10}></Asterisk></sup></label>
                        <input name='email' className='border-2 rounded-lg' onChange={handleInputChange} required defaultValue={resumeInfo?.email}></input>
                  </div>

                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>{
                        loading ? (<LucideLoader className=' animate-spin'></LucideLoader>):("Save")
                    }</Button>
                </div>
            </form>
        </div>
    )
}

export default PersonalDetail