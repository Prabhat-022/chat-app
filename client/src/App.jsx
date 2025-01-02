import Dashboard from './component/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Profile from './component/Profile';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const loginUser = useSelector((store) => store?.user?.loginUser);


  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Dashboard />} />
          <Route path='/' element={<Register />} />
          <Route path='/profile' element={<Profile darkMode={darkMode} user={loginUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
