import React from 'react'
import { Link } from 'react-router-dom'

const register = () => {
  return (
    <main className="bg-gray-100 h-screen font-serif">
      <body className='w-[90%] h-screen mx-auto bg-gray-200'>
        <form className="w-[35%] mx-auto relative  top-1/2 transform -translate-y-1/2 bg-white text-center p-5 rounded-md shadow-lg shadow-blue-100">
        <div className='flex items-center justify-between px-4 py-6'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>
            Create Account
          </h1>
          <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full'>
            <i className='bx bx-user-plus text-3xl text-blue-600'></i>
          </div>
        </div>
        <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="username" className='text-[10px] self-start ml-2 font-semibold'>*Full name</label>
            <input
              type="text"
              id='username'
              placeholder="Prabath Samarasinghe"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
            />
            <i class='bx bx-user relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9'></i>
          </div>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="email" className='text-[10px] self-start ml-2 font-semibold'>*Email</label>
            <input
              type="email"
              id='email'
              placeholder="you@example.com"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
            />
          <i class='bx bxl-gmail relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9' ></i>
          </div>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="password" className='text-[10px] self-start ml-2 font-semibold'>*Password</label>
            <input
              type="password"
              id='password'
              placeholder="Password"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
            />
              <i class='bx bx-lock-alt relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9 z-1' ></i>
            </div>
            <div className='flex w-full mx-auto content-center items-center'>
              <input type="checkbox" id="checkbox" className='m-2'/>
              <label htmlFor="checkbox" className='text-xs text-gray-700'>I agree to the <Link to="" className="text-blue-500">terms</Link> and <Link to="" className="text-blue-500">conditions</Link> </label>
            </div>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5'>
            <button className="bg-blue-500 text-white p-2 m-2 rounded-md w-full mx-auto hover:bg-blue-600 active:bg-blue-700 active:scale-95 transform transition duration-150">
              Register
            </button>
          </div>
          <div className="-mt-1 mx-auto p-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
        </div>
        <div className="mt-1 grid lg:grid-cols-2 gap-3 text-center p-2 ">
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-95 transform transition duration-150">
            <i class='bx bxl-gmail h-5 w-5 text-gray-700' ></i>
            <span className="ml-2">Google</span>
          </button>
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-95 transform transition duration-150">
            <i class='bx bxl-facebook h-5 w-5 text-gray-700' ></i>
            <span className="ml-2">Facebook</span>
          </button>
        </div>
        <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
          <p className="text-xs text-gray-400">Already have an account? <Link to='/' className="text-blue-500">Sign in</Link></p>
        </div>
        </form>
        
      </body>
    </main>
  )
}

export default register
