import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext,useState } from 'react'
import GlobalApi from './../../../../Service/GlobalApi'
import { useParams } from 'react-router-dom'


function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#F5733F",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]
const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
const [selectedColor,setSelectedColor]=useState();
const {resumeId}=useParams();
const onColorSelect=(color)=>{
    setSelectedColor(color);
    setResumeInfo({
        ...resumeInfo,
        themeColor: color
    })
    const data={
        data:{
            themeColor: color
        }
    }
    GlobalApi.updateResumeDetail(resumeId,data).then(resp=>{
        console.log(resp);
        toast.success("Theme color updated");
    })

}
    return (
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" size="sm" className="flex gap-2 cursor-pointer"><LayoutGrid></LayoutGrid>Theme</Button>
            </PopoverTrigger>
            <PopoverContent>
            <h2 className=' font-bold text-sm mb-3 '>Select Your desired Theme Color :</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {
                        colors.map((color, index) => (
                            <div className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border hover:scale-105 ${selectedColor==color&&'border border-black'}`} key={index}
                                style={{
                                    background: color
                                }} onClick={()=>onColorSelect(color)}>

                            </div>
                        ))
                    }

                </div>

            </PopoverContent>
        </Popover>

    )
}

export default ThemeColor
