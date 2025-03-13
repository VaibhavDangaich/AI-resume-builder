
import { Navigate,Outlet } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header';

function App() {
  console.log("app is loading");
  const {user,isLoaded,isSignedIn}=useUser();
  
  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/auth/sign-in'}></Navigate>
  }

  return (
  <div>
  <Header></Header>
    <Outlet></Outlet> 
  </div>
  )
}
console.log("App is loaded successfully");

export default App
