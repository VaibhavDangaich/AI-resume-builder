import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../../Service/GlobalApi';




function AddResume() {
  const [openDialog,setOpenDialog]=useState(false);
  const [resumeTitle,setResumeTitle]=useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  function clickHandler(){
    openDialog ? (setOpenDialog(false)):(setOpenDialog(true))
  }
  const onCreate = async () => {
    try {
      setLoading(true);
      const uuid = uuidv4();
      const data = {
        data: {
          title: resumeTitle,
          resumeId: uuid, // Correct UUID assignment
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        }
      };
  
      const resp = await GlobalApi.createNewResume(data);
      console.log(resp);
      setLoading(false);
      setOpenDialog(false); // Close dialog after success
    } catch (error) {
      console.error("Error creating resume:", error);
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className='p-14 py-24 flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-xl shadow-black duration-200 cursor-pointer border-dashed border-black border-2' onClick={clickHandler}>
        <PlusSquare></PlusSquare>
      </div>
      <Dialog open={openDialog}>
      
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Craft Your Next Resume</DialogTitle>
            <DialogDescription>
            <p>Add a title for your new resume</p>
             <Input className="my-2" placeholder="Ex.Full Stack resume" onChange={(e)=>{setResumeTitle(e.target.value)}}></Input>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button variant="ghost" onClick={clickHandler}>Cancel</Button>
              <Button
              disabled={!resumeTitle || loading} 
              onClick={onCreate}>
              {
                loading?
                (<Loader2 className='animate-spin'></Loader2>):('Create')
              }
              </Button>
            </div>

          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddResume