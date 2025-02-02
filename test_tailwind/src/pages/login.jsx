import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import MsgBox from '../component/ui/msgBox'

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMsg, setShowMsg] = useState(false);  // Changed to false initially
  const [msgConfig, setMsgConfig] = useState({ message: '', type: 'success' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (email.length === 0 || password.length === 0) {
            // alert('Please fill all fields');
            setMsgConfig({ message: 'Please fill all fields', type: 'error' });
            setShowMsg(true);
            return;
        }

        const response = await axios.post(
            'http://localhost:3001/login', 
            { email, password },
            { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Response:', response);
        
        if (response.data.message === 'Login successful') {
            console.log('Login successful:', response.data);
            response.data.role === 'admin' ? navigate('/admin') : response.data.first_vist ? navigate('/profile') : navigate('/home');
        } else {
            // alert('Login failed');
            setMsgConfig({ message: 'Login failed', type: 'error' });
            setShowMsg(true);            
        }

    } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
            if (error.response.status === 404) {
                // alert('User not found');
                setMsgConfig({ message: 'User not found', type: 'error' });
                setShowMsg(true);
              } else if (error.response.status === 401) {
                // alert('Invalid email or password');
                setMsgConfig({ message: 'Invalid email or password', type: 'error' });
                setShowMsg(true);
              } else {
                // alert('Login failed: ' + error.response.data.message);
                setMsgConfig({ message: 'Login failed: ' + error.response.data.message, type: 'error' });
                setShowMsg(true);
              }
        } else if (error.request) {
            // Request was made but no response
            // alert('No response from server. Please try again.');
            setMsgConfig({ message: 'No response from server. Please try again.', type: 'error' });
            setShowMsg(true);
        } else {
            // Something else went wrong
            // alert('Error: ' + error.message);
            setMsgConfig({ message: 'Error: ' + error.message, type: 'error' });
            setShowMsg(true);
        }
    }
}
  

  return (
    <main className="bg-gray-100 h-screen font-serif">
      <body className="w-[90%] h-screen mx-auto bg-gray-200">
        <div className="sm:w-[35%] md:w-[35%] mx-1 bg-white my-auto sm:mx-auto p-5 rounded-md shadow-lg shadow-green-100 relative top-1/2 transform -translate-y-1/2 text-center">
          <i class='bx bx-user text-8xl mx-auto relative top-1/2 transform translate-y-1/3 text-green-500'></i>
          <h1 className="font-semibold xl:text-4xl text-center pt-10 sm:text-2xl">Welcome Back</h1>
          <p className='text-xs text-gray-400 '>Please enter your login details</p>
          <form className="flex flex-col justify-center items-center -mt-1" onSubmit={handleSubmit}>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center -mb-5'>
              <label htmlFor="email" className='text-[10px] self-start ml-2 font-semibold'>*Email</label>
              <input
                type="email"
                id='email'
                placeholder="you@example.com"
                className="p-2 m-2 border border-gray-400 rounded-md w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i class='bx bx-user relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9'></i>
            </div>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center -mb-5'>
              <label htmlFor="password" className='text-[10px] self-start ml-2 font-semibold'>*Password</label>
              <input
                type="password"
                id='password'
                placeholder="Password"
                 className="p-2 m-2 border border-gray-400 rounded-md w-full"
                  onChange={(e) => setPassword(e.target.value.toString())}
              />
              <i class='bx bx-lock-alt relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9' ></i>
            </div>
            <div className='flex w-full mx-auto p-2 content-center items-center justify-between'>
              <div className='flex items-center text-gray-400'>
                <input type="checkbox" id="remember" className="m-2" />
                <label htmlFor="remember" className="text-xs">Remember me</label>
              </div>
              <Link to='/forgot' className="text-xs text-green-500">Forgot password?</Link>
            </div>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
              <button className="bg-green-500 text-white p-2 m-2 rounded-md w-full mx-auto hover:bg-green-600 active:bg-green-700 active:scale-95 transform transition duration-150">
                Login
              </button>
            </div>
          </form>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
            <p className="text-xs text-gray-400">Don't have an account? <Link to='/register' className="text-green-500">Sign up</Link></p>
          </div>
        </div>
      </body>
      {showMsg && (
                <MsgBox 
                    message={msgConfig.message}
                    type={msgConfig.type}
                    onClose={() => setShowMsg(false)}
                />
        )}
    </main>
  )
}

export default login
