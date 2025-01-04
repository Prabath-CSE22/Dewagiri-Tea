import React from 'react'

const login = () => {
  return (
    <main className="bg-gray-100 h-screen font-serif">
      <body className="w-[90%] h-screen mx-auto bg-gray-200">
        <div className="bg-white w-[35%] my-auto mx-auto p-5 rounded-md shadow-lg shadow-blue-100 relative top-1/2 transform -translate-y-1/2 text-center">
          <i class='bx bx-user text-8xl mx-auto relative top-1/2 transform translate-y-1/3 text-blue-500'></i>
          <h3 className="text-4xl text-center pt-10">Welcome Back</h3>
          <p className='text-xs text-gray-400 '>Please enter your login details</p>
          <form className="flex flex-col justify-center items-center mt-10" onSubmit={(e) => e.preventDefault()}>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5'>
              <label htmlFor="username" className='text-[10px] self-start ml-2 font-semibold'>*User name</label>
              <input
                type="text"
                id='username'
                placeholder="Username"
                className="p-2 m-2 border border-gray-400 rounded-md w-full"
              />
            </div>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center '>
              <label htmlFor="password" className='text-[10px] self-start ml-2 font-semibold'>*Password</label>
              <input
                type="password"
                id='password'
                placeholder="Password"
                 className="p-2 m-2 border border-gray-400 rounded-md w-full"
              />
            </div>
            <div className='flex w-full mx-auto p-2 content-center items-center justify-between'>
              <div className='flex items-center text-gray-400'>
                <input type="checkbox" id="remember" className="m-2" />
                <label htmlFor="remember" className="text-xs">Remember me</label>
              </div>
              <a href="#" className="text-xs text-blue-500">Forgot password?</a>
            </div>
            <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
              <button className="bg-blue-500 text-white p-2 m-2 rounded-md w-full mx-auto hover:bg-blue-600 active:bg-blue-700 active:scale-95 transform transition duration-150">
                Login
              </button>
            </div>
          </form>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
            <p className="text-xs text-gray-400">Don't have an account? <a href="#" className="text-blue-500">Sign up</a></p>
          </div>
        </div>
      </body>
    </main>
  )
}

export default login
