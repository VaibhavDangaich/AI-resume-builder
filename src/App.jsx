
import { Navigate,Outlet } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header';
import toast, { Toaster } from 'react-hot-toast';
import { ResumeInfoContext } from './context/ResumeInfoContext';

import { useState } from 'react';


function App() {


  console.log("app is loading");
  const {user,isLoaded,isSignedIn}=useUser();
 
  
  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/auth/sign-in'}></Navigate>
  }

  return (
  <div className='min-h-screen bg-[#202123]'>

      <Header />
      <Outlet />
      <Toaster />
  

  </div>
  )
}
console.log("App is loaded successfully");

export default App
