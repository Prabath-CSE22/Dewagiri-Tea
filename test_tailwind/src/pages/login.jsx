import React from 'react'
import {Link} from 'react-router-dom'

const login = () => {
  return (
    <main className="bg-gray-100 h-screen font-serif">
      <body className="w-[90%] h-screen mx-auto bg-gray-200">
        <div className="sm:w-[35%] md:w-[35%] mx-1 bg-white my-auto sm:mx-auto p-5 rounded-md shadow-lg shadow-green-100 relative top-1/2 transform -translate-y-1/2 text-center">
          <i class='bx bx-user text-8xl mx-auto relative top-1/2 transform translate-y-1/3 text-green-500'></i>
          <h1 className="font-semibold xl:text-4xl text-center pt-10 sm:text-2xl">Welcome Back</h1>
          <p className='text-xs text-gray-400 '>Please enter your login details</p>
          <form className="flex flex-col justify-center items-center -mt-1" onSubmit={(e) => e.preventDefault()}>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center -mb-5'>
              <label htmlFor="username" className='text-[10px] self-start ml-2 font-semibold'>*User name</label>
              <input
                type="text"
                id='username'
                placeholder="Username | email"
                className="p-2 m-2 border border-gray-400 rounded-md w-full"
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
    </main>
  )
}

export default login
