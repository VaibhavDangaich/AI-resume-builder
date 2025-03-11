
import { Navigate,Outlet } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import { useUser } from '@clerk/clerk-react'

function App() {
  const {user,isLoaded,isSignIn}=useUser();

  return (
  <div>
    <Outlet></Outlet> 
  </div>
  )
}

export default App
