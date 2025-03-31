import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import { Button } from '@/components/ui/button';
import { Trash2Icon, Loader } from 'lucide-react';
import '@smastrom/react-rating/style.css';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../Service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function SkillsForm() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  // Initialize state with resumeInfo skills or default value
  const [skillsList, setSkillsList] = useState(resumeInfo.skills || [{ name: '', rating: 0 }]);

  useEffect(() => {
    // Load existing skills from resumeInfo on mount
    if (resumeInfo.skills) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo.skills]);

  const addNewSkill = () => {
    setSkillsList([...skillsList, { name: '', rating: 0 }]);
  };

  const removeSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1));
    }
  };

  const handleChange = (index, name, val) => {
    const newSkillsList = [...skillsList];
    newSkillsList[index][name] = val;
    setSkillsList(newSkillsList);
  };

  const onSave = async () => {
    setLoading(true);
    const data = { data: { skills: skillsList } };

    try {
      await GlobalApi.updateResumeDetail(resumeId, data);
      toast.success("Skills Updated");
    } catch (error) {
      console.error('Error saving skills:', error.response?.data || error);
      toast.error("Server Error, Try again!!");
    } finally {
      setLoading(false);
    }
  };

  // Update resumeInfo whenever skillsList changes
  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
  }, [skillsList, setResumeInfo]);

  return (
    <div className='p-5 shadow-lg rounded-r-4xl border-t-purple-400 border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your top professional skills</p>
      <div>
        {skillsList.map((skill, index) => (
          <div key={index} className='flex justify-between mb-2 p-3 border rounded-lg'>
            <div>
              <label className='text-xs'>Name</label>
              <Input
                className="w-full"
                value={skill.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={skill.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-4'>
        <div className='flex gap-2'>
          <Button
            className="cursor-pointer hover:text-purple-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200"
            variant="outline"
            onClick={addNewSkill}
          >
            + Add More Skills
          </Button>
          <Button
            className="cursor-pointer hover:text-red-500 hover:scale-105 hover:shadow-2xl shadow-black transition-all duration-200"
            variant="outline"
            onClick={removeSkill}
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

export default SkillsForm;
