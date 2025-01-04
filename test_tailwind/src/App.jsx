import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Defaulthome from './pages/defaulthome'
import Forgotpassword from './pages/forgotpassword'
import Login from './pages/login'
import Register from './pages/register'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Defaulthome />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
