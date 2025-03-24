import React, { useContext, useState, useEffect } from 'react';
import {
    BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList,
    BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider,
    HtmlButton, Separator, Toolbar
} from 'react-simple-wysiwyg';
import { Button } from '@/components/ui/button';
import { ImMagicWand } from 'react-icons/im';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIChatSession } from '../../../../Service/AIModel';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const PROMPT = "position title: {position}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in HTML format";

const RichTextEditor = ({ onChangeTextEditor, index }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load existing experience description if available
        if (resumeInfo.experience[index]?.description) {
            setValue(resumeInfo.experience[index].description);
        }
    }, [resumeInfo, index]);

    const generateSummaryFromAI = async () => {
        setLoading(true);
    
        if (!resumeInfo.experience[index]?.position) {
            toast('Please add position title');
            setLoading(false);
            return;
        }
    
        const prompt = PROMPT.replace('{position}', resumeInfo.experience[index].position);
        console.log("Prompt:", prompt);
    
        try {
            const result = await AIChatSession.sendMessage(prompt);
            const resp = await result.response.text();
    
            console.log("Raw AI Response:", resp);
    
            let experienceBullets = "";
    
            try {
                const parsedResp = JSON.parse(resp);
                if (Array.isArray(parsedResp) && parsedResp.length > 0) {
                    if (parsedResp[0]?.resume_bullets) {
                        experienceBullets = `<ul>${parsedResp[0].resume_bullets.map(point => `<li>${point}</li>`).join('')}</ul>`;
                    }
                }
            } catch (error) {
                console.warn("Response is not JSON, using raw text.");
                experienceBullets = `<p>${resp.replace(/\n/g, '<br>')}</p>`; // Convert newlines to <br> for better formatting
            }

            console.log("Setting Editor Value:", experienceBullets);

            // Update WYSIWYG Editor
            setValue(experienceBullets);

            // Ensure onChangeTextEditor updates the parent state
            onChangeTextEditor({ target: { value: experienceBullets } });

            // Update Resume Preview
            const updatedExperience = [...resumeInfo.experience];
            updatedExperience[index].description = experienceBullets;
            setResumeInfo({ ...resumeInfo, experience: updatedExperience });

            setLoading(false);
        } catch (err) {
            toast.error('Failed to generate summary from AI');
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center my-3'>
                <label className='text-xs'>Summary</label>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-500 text-purple-500" 
                    onClick={generateSummaryFromAI}
                >
                    {loading ? <Loader className='animate-spin' /> : <>Generate from AI <ImMagicWand /></>}
                </Button>
            </div>
            <EditorProvider>
                <Editor 
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChangeTextEditor(e);
                    }}
                >
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <Separator />
                        <BtnStyles />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
};

export default RichTextEditor;
