import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import router from './app.routes'
import "./features/shared/styles/global.scss"
import { ToastContainer } from 'react-toastify';
import { useAuth } from './features/auth/hooks/useAuth';


const App = () => {
  const {getUser} = useAuth()
  
  useEffect(()=>{
    getUser()
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}

export default App