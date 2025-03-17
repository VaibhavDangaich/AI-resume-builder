import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid></LayoutGrid>Theme</Button>
        <div className='flex gap-2'>
          {
            activeFormIndex > 1 && <Button className="flex gap-2" size="sm" onClick={() => { setActiveFormIndex((prev) => prev - 1) }} ><ArrowLeft></ArrowLeft> Previous</Button>

          }
          <Button className="flex gap-2" size="sm" onClick={() => { setActiveFormIndex((prev) => prev + 1) }}>Next <ArrowRight></ArrowRight></Button>
        </div>

      </div>
      {/* Personal details form */}
      {
        activeFormIndex === 1 &&
        <PersonalDetail></PersonalDetail>
      }
      {/* Summary form */}
      {
        activeFormIndex === 2 &&
        <SummaryForm></SummaryForm>
      }


      {/* Professional experience form */}
      {
        activeFormIndex===3 && 
        <ExperienceForm></ExperienceForm>
      }


      {/* Education form */}
      {
        activeFormIndex===4 &&
        <EducationForm></EducationForm>
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