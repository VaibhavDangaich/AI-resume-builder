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
const router = createBrowserRouter([
  {
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>

      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      }
    ]

  },
  {
    path: '/auth/sign-in',
    element: <SignInPage></SignInPage>
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
