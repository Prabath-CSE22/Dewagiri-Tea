import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OTP from '../component/otp'
import Reset from '../component/resetpw'
import axios from 'axios'
const forgotpassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const[otp, setOtp] = useState('')
  const [clicked, setClicked] = useState(false);
  const [otpReceived, setOtpReceived] = useState(false);
  return (
    <main className='bg-gray-100 h-screen font-serif'>
      {!clicked ? (
        <body className='w-[90%] h-screen mx-auto bg-gray-200'>
        <form className="sm:w-[35%] md:w-[35%] mx-0 relative  top-1/2 transform -translate-y-1/2 bg-white text-center p-5 rounded-md shadow-lg shadow-green-100 sm:mx-auto" onSubmit={async (e) => {
          e.preventDefault();
          if(email) {
            setClicked(true);
            const sendOTP = await axios.post('http://localhost:3001/sendemail', {email: email, otp: otp});
            console.log(sendOTP.data);
          }else{
            alert('Please enter your email address');
          }
          }}>
            <div className='flex flex-col items-center justify-between px-4 py-6'>
                <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full'>
                  <i className='bx bx-mail-send text-3xl text-green-600'></i>
                </div>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>
                  Forgot Password?
                </h1>
                <p className='text-gray-400'>No worries, we'll send you reset instructions.</p>
              </div>
              <div className='flex flex-col w-full mx-auto p-2 content-center items-center -mb-5'>
                <label htmlFor="email" className='text-[10px] self-start ml-2 font-semibold'>*Email</label>
                <input type="email" name="" id="email" placeholder='Enter your email' className="p-2 m-2 border border-gray-400 rounded-md w-full"  onChange={(e) => {
                  setEmail(e.target.value);
                  setOtp(Math.floor(1000 + Math.random() * 9000));
                }}/>
                <i className='bx bxl-gmail relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9'></i>
              </div>
              <div className='flex flex-col w-full mx-auto p-2 content-center items-center -mt-5'>         
                <button className="bg-green-500 text-white p-2 m-2 rounded-md w-full mx-auto hover:bg-green-600 active:bg-green-700 active:scale-95 transform transition duration-150" 
                type="submit">
                  Send OTP <i className='bx bx-mail-send ml-1'></i>
                </button>
              </div>
              <div className="mt-1 pt-6 border-t border-gray-200 text-center flex flex-col w-full mx-auto p-2 content-center items-center">
            <p className="text-xs text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-500"> Sign up </Link>
            </p>

            <p className="mt-4 text-xs text-gray-400">
              Need help?{' '}
              <Link to="/" className="text-green-500"> Contact Support </Link>
            </p>
          </div>
            </form>
      </body>
      ):(
        <>
        {!otpReceived ? (
          <OTP OTP={otp} otpReceived={otpReceived} setOtpReceived={setOtpReceived}/>
          ):(
          <Reset />
          )}
        </>
      )
      }
    </main>
  )
}

export default forgotpassword
