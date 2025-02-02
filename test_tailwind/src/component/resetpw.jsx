import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MsgBox from './ui/msgBox'
import axios from 'axios'
const resetpw = ({user_id}) => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const passwordsMatch = password === confirmPassword && password !== '';
    const [showMsg, setShowMsg] = useState(false);  // Changed to false initially
    const [msgConfig, setMsgConfig] = useState({ message: '', type: 'success' });

  return (
    <main className="bg-gray-100 h-screen font-serif">
        <body className='w-[90%] h-screen mx-auto bg-gray-200'>
            <div className="sm:w-[35%] md:w-[35%] mx-0 relative  top-1/2 transform -translate-y-1/2 bg-white text-center p-5 rounded-md shadow-lg shadow-green-100 sm:mx-auto" >
            <div className='flex flex-col items-center justify-between px-4 py-6'>
                <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full'>
                  <i className='bx bx-lock-alt text-3xl text-green-600'></i>
                </div>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>
                    Reset Password
                </h1>
                <p className='text-gray-400'>Please create a new secure password for your account</p>
              </div>
              <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="password" className='text-[10px] self-start ml-2 font-semibold'>*New Password</label>
            <input
              type="password"
              id='password'
              placeholder="Enter new password"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
              <i class='bx bx-lock-alt relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9 z-1' ></i>
            </div>
            <div className='relative left-0 -top-2'> 
                {password && (() => {
                if (!hasMinLength) return <p className="text-xs absolute  text-red-500 mb-2 text-left mx-3 transition-all duration-300">Password must be at least 8 characters</p>;
                if (!hasUpperCase) return <p className="text-xs absolute text-red-500 mb-2 text-left mx-3 transition-all duration-300">Password must contain at least one uppercase letter</p>;
                if (!hasLowerCase) return <p className="text-xs absolute text-red-500 mb-2 text-left mx-3 transition-all duration-300">Password must contain at least one lowercase letter</p>;
                if (!hasNumber) return <p className="text-xs absolute text-red-500 mb-2 text-left mx-3 transition-all duration-300">Password must contain at least one number</p>;
                if (!hasSpecialChar) return <p className="text-xs absolute text-red-500 mb-2 text-left mx-3 transition-all duration-300">Password must contain at least one special character</p>;
                if(hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) return <p className="text-xs absolute text-green-500 mb-2 text-left mx-3 transition-all duration-300">Password is secure</p>;
                return null;
            })()}
            </div>
            <div className='mt-1 flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
                <label htmlFor="password" className='text-[10px] self-start ml-2 font-semibold'>*Password</label>
                <input
                type="password"
                id='c_password'
                placeholder="Confirm new password"
                className="p-2 m-2 border border-gray-400 rounded-md w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <i class='bx bx-lock-alt relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9 z-1' ></i>
                </div>
                <div className='relative left-0 -top-2'> 
                {password && confirmPassword && (
                    <p className={`text-xs mb-2 absolute text-left mx-3 transition-all duration-300 ${
                        passwordsMatch 
                            ? 'text-green-500 opacity-100' 
                            : 'text-red-500 opacity-100'
                    }`}>
                        {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                    </p>
                )}
                </div>
                <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5'>
                <button className="bg-green-500 text-white p-2 m-2 rounded-md w-full mx-auto hover:bg-green-600 active:bg-green-700 active:scale-95 transform transition duration-150"
                disabled={!passwordsMatch || !hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar} onClick={async () => {
                    if(passwordsMatch && hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
                        const resetPassword = await axios.post('http://localhost:3001/changePassword', {user_id: user_id, password: confirmPassword});
                        if(resetPassword.status === 200) {
                            setMsgConfig({ message: resetPassword.data, type: 'success' });
                            setShowMsg(true);
                        } else {
                            setMsgConfig({ message: resetPassword.data, type: 'error' });
                            setShowMsg(true);
                        }
                    }
                    navigate('/login'); 
                }}>
                Reset Password
                </button>
            </div>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
                <p className="mt-0 text-xs text-gray-400">
                    Need help?{' '}
                    <Link to="/" className="text-green-500"> Contact Support </Link>
                </p>            </div>    
            </div>           
        </body>
        {showMsg && <MsgBox message={msgConfig.message} type={msgConfig.type} onClose={() => setShowMsg(false)}/>}
    </main>
  )
}

export default resetpw
