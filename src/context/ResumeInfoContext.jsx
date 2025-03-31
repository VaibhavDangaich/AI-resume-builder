import { createContext, useState } from "react";

export const ResumeInfoContext = createContext(null);

export const ResumeInfoProvider = ({ children }) => {
    const [resumeInfo, setResumeInfo] = useState({
        experience: [], // Stores experience data
        education: [],  // Stores education data
        skills: [],     // Stores skills data
        contact: {},    // Stores contact details
    });

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};
