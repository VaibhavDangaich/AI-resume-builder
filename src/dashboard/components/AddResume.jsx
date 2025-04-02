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
import { useNavigate } from 'react-router-dom';
import PixelCard from '@/components/ui/PixelCard';




function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const NavigateTo = useNavigate();

  function clickHandler() {
    setOpenDialog(!openDialog);
  }

  const onCreate = async () => {
    try {
      setLoading(true);
      const uuid = uuidv4();
      const data = {
        title: resumeTitle,
        resumeId: uuidv4(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      };

      const resp = await GlobalApi.createNewResume(data);
      console.log(resp.data.documentId);
      setLoading(false);
      setOpenDialog(false);

      if (resp) {
        NavigateTo('/dashboard/resume/' + resp.data.data.documentId + "/edit");
      }
    } catch (error) {
      console.error("Error creating resume:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="relative flex items-center justify-center rounded-xl
                   hover:scale-110 transition-all duration-300 ease-in-out 
                   border-2 border-dashed shadow-black
                   relative overflow-hidden cursor-pointer group
                   h-[280px] w-[200px] z-20"
        onClick={clickHandler}
      >
        {/* Ensure PixelCard fills the parent div */}
        <PixelCard PixelCard variant="pink" className="relative w-full h-full rounded-xl">
          <div className="absolute flex items-center justify-center">
            <PlusSquare className="text-white group-hover:text-[#b3b3ff] w-10 h-10 transition-all duration-200 z-50 absolute " />
          </div>
        </PixelCard>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Craft Your Next Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={clickHandler}>Cancel</Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume