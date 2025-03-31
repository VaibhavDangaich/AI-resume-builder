import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
import Home from './home/index'
import Dashboard from './dashboard/index'
import {ClerkProvider} from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view'
const router = createBrowserRouter([
  {
    element: <App></App>,
    children: [
     
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path:"/dashboard/resume/:resumeId/edit",
        element:<EditResume></EditResume>
      }
    ]

  },
  {
    path: "/",
    element: <Home></Home>

  },
  {
    path: '/auth/sign-in',
    element: <SignInPage></SignInPage>
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume></ViewResume>
  }
]

)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}>
      </RouterProvider>
    </ClerkProvider>

  </StrictMode>,
)
