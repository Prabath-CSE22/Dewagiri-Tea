import React from 'react'
import { useNavigate } from 'react-router-dom'
const dropdown = () => {
    const navigate = useNavigate()
  return (
    <div className="absolute left-[85%] mt-2 origin-top-right p-5 bg-gray-300 rounded-xl z-50">
    <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mx-auto my-auto" 
    onClick={() => {
        navigate('/');
    }}>
        Logout
    </button>
</div>

  )
}

export default dropdown
