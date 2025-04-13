import { Loader, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TiltedCard from './../../components/ui/TiltedCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../Service/GlobalApi';
import { toast } from 'react-hot-toast';

function ResumeCardItem({ resume, refreshData }) {
  const Navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle clicking the card (Navigate to edit page)
  const handleCardClick = () => {
    Navigation(`/dashboard/resume/${resume.documentId}/edit`);
  };

  // Function to handle menu clicks
  const onMenuClick = (e, url) => {
    e.stopPropagation(); // Prevents navigation when clicking menu items
    Navigation(url);
  };

  // Function to delete resume
  const onDelete = () => {
    setLoading(true); // Show loader
    GlobalApi.deleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      toast.success("Resume Deleted!!");
      refreshData();
      setLoading(false); // Stop loader
      setOpenAlert(false); // Close dialog after deletion
    }).catch(error => {
      setLoading(false); // Stop loader if there's an error
      toast.error("Error Deleting Resume!!");
    });
  };

  return (
    <div className="cursor-pointe r" onClick={handleCardClick}> {/* Wrap the entire card in a div */}
      <TiltedCard
       imageSrc="/resume-icon-png-19036.png"

        altText={resume.title}
        captionText={resume.title}
        containerHeight="280px"
        containerWidth="200px"
        imageHeight="280px"
        imageWidth="200px"
        rotateAmplitude={15}
        scaleOnHover={1.3}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <div className="absolute inset-0 flex items-center justify-center text-black text-lg font-semibold text-center ">
          <div className='  opacity-90 px-3 -mt-1 ml-12 whitespace-nowrap bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-xl hover:shadow-purple-400 transition-all text-[#ccccff]'> {resume.title}</div>
           
            <div className='absolute bottom-2 right-2'>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="absolute top-65 -right-55 flex gap-2 justify-center items-center bg-white px-3 py-1 rounded-md shadow-md"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when menu button is clicked
                >
                  <Menu size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => onMenuClick(e, `/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => onMenuClick(e, `/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => onMenuClick(e, `/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    setOpenAlert(true);
                  }}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Delete Confirmation Dialog */}
              <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Your resume will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => {
                      e.stopPropagation();
                      setLoading(true); // Start loading
                      onDelete(); // Call delete function
                    }} disabled={loading}>
                      {
                        loading ? <Loader className='animate-spin'></Loader> : 'Continue'
                      }
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default ResumeCardItem;
