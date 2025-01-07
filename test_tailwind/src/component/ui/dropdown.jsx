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

    {/* Dropdown menu (optional)
    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
        <div className="py-1">
            <a href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                Profile
            </a>
            <a href="/settings" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100">
                Settings
            </a>
            <a href="/logout" className="text-red-600 block px-4 py-2 text-sm hover:bg-gray-100">
                Logout
            </a>
        </div>
    </div> */}
</div>

  )
}

export default dropdown
