import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const dropdown = ({msg}) => {
    const navigate = useNavigate()
  return (
    <div className="fixed right-0 top-24 mt-2 m-auto origin-top-right p-5 bg-gray-300 rounded-xl z-50">
        <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mx-auto my-auto active:scale-95" 
          onClick={async () => {
            const logout = await axios.get('http://localhost:3001/logout', { withCredentials: true });
            navigate('/login')
            console.log(logout.data);
        }}>
            Logout
        </button>
    </div>
  )
}

export default dropdown
