import { PlusSquare } from 'lucide-react'
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




function AddResume() {
  const [openDialog,setOpenDialog]=useState(false);
  const [resumeTitle,setResumeTitle]=useState('');
  function clickHandler(){
    openDialog ? (setOpenDialog(false)):(setOpenDialog(true))
  }
  const onCreate=()=>{
    const uuid=uuidv4();
    console.log("Resume Title : " ,resumeTitle);
    console.log("Resume ID : ",uuid);
  }
  return (
    <div>
      <div className='p-14 py-24 flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-xl shadow-black duration-200 cursor-pointer border-dashed border-black border-2' onClick={clickHandler}>
        <PlusSquare></PlusSquare>
      </div>
      <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
      
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
              disabled={!resumeTitle} 
              onClick={onCreate}>Create</Button>
            </div>

          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddResume