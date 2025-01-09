import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({OTP, otpRecived, setOtpReceived}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <body className='w-[90%] h-screen mx-auto bg-gray-200'>
      <div className="sm:w-[35%] md:w-[35%] mx-0 relative  top-1/2 transform -translate-y-1/2 bg-white text-center p-5 rounded-md shadow-lg shadow-green-100 sm:mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bx bx-lock-alt text-3xl text-green-600"></i>
          </div>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>Enter OTP</h2>
          <p className="text-gray-500">We sent a code to your email</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-2xl font-bold border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 focus:outline-none transition-all"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button 
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:opacity-50"
          disabled={otp.includes('')}
          onClick={() => {
            if (otp.join('') === OTP.toString()) {
              setOtpReceived(!otpRecived);
            } else {
              setError('Invalid OTP. Please try again.');
            }
          }}
        >
          Verify
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Didn't receive code?{' '}
            <button className="text-green-600 hover:text-green-700 font-medium">
              Resend
            </button>
          </p>
        </div>
      </div>
    </body>
  );
};

export default OTPInput;