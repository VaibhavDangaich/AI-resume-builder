import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in'
const router=createBrowserRouter([
  {
    element:<App></App>,
    children:[
      {
        
      }
    ]

  },
  {
    path:'/auth/sign-in' ,
    element:<SignInPage></SignInPage>
  }
]

)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </StrictMode>,
)
