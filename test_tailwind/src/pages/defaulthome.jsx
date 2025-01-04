import React from 'react'

const defaulthome = () => {
  return (
    <main>
        <body className="bg-gray-200 font-mono leading-normal tracking-normal">
            <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome to the Home Page</h1>
                    <p className="text-gray-600">This is the default home page.</p>
                </div>
            </div>
        </body>
    </main>
  )
}

export default defaulthome
