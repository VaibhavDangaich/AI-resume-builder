import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedHomeButton from '@/components/ui/AnimatedHomeButton';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext]=useState(false);

  return (
    <div>
      <div className='flex justify-between items-center'>
      <div className='flex gap-5'>
      <Link to={"/dashboard"}>
        <Button><Home></Home>Home</Button>
      </Link>
      
      
      <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid></LayoutGrid>Theme</Button>
     

      </div>
      
        <div className='flex gap-2'>
          {
            activeFormIndex > 1 && <Button className="flex gap-2" size="sm" onClick={() => { setActiveFormIndex((prev) => prev - 1) }} ><ArrowLeft></ArrowLeft> Previous</Button>

          }
          <Button disabled={!enableNext} className="flex gap-2" size="sm" onClick={() => { setActiveFormIndex((prev) => prev + 1) }}>Next <ArrowRight></ArrowRight></Button>
        </div>

      </div>
      {/* Personal details form */}
      {
        activeFormIndex === 1 &&
        <PersonalDetail enableNext={(v)=>setEnableNext(v)}></PersonalDetail>
      }
      {/* Summary form */}
      {
        activeFormIndex === 2 &&
        <SummaryForm enableNext={(v)=>setEnableNext(v)}></SummaryForm>
      }


      {/* Professional experience form */}
      {
        activeFormIndex===3 && 
        <ExperienceForm enableNext={(v)=>setEnableNext(v)}></ExperienceForm>
      }


      {/* Education form */}
      {
        activeFormIndex===4 &&
        <EducationForm enableNext={(v)=>setEnableNext(v)}></EducationForm>
      }


      {/* Skills form */}
      {
        activeFormIndex===5 &&
        <SkillsForm></SkillsForm>
      }

    </div>
  )
}

export default FormSection