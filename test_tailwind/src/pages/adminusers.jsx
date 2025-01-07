import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Users, Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';
import LogOut from '../component/ui/dropdown'
import Actions from '../component/ui/actions'

const adminusers = () => {
        const[clicked, setClicked] = useState(false);
          const [selectedAction, setSelectedAction] = useState('');
        
          const handleSelectChange = (e) => {
            setSelectedAction(e.target.value);
            if (e.target.value === '1') {
              console.log('Suspend action selected');
            } else if (e.target.value === '2') {
              console.log('Remove action selected');
            }
          };
  const[showMenu, setShowMenu] = useState(false)
  const[actionClicked, setActionClicked] = useState(false)
  const [users] = useState([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '+1 234-567-8901',
          orders: 12,
          spent: 349.99,
          status: 'Active',
          lastOrder: '2024-01-15',
          avatar: '/userf.png'
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael.c@example.com',
          phone: '+1 234-567-8902',
          orders: 8,
          spent: 249.99,
          status: 'Active',
          lastOrder: '2024-01-12',
          avatar: '/user.jpg'
        },
        {
          id: 3,
          name: 'Emma Wilson',
          email: 'emma.w@example.com',
          phone: '+1 234-567-8903',
          orders: 5,
          spent: 159.99,
          status: 'Inactive',
          lastOrder: '2023-12-28',
          avatar: '/userf.png'
        }
      ]);
  return (
    <main className="bg-gray-100 font-serif mt-5 h-screen">
      <body className=' w-full  mx-auto bg-gray-200 mt-5 h-screen'>
      <nav className='bg-white w-[99%] shadow-lg flex items-center justify-between p-2 m-auto rounded-b-lg md:h-fit h-16'>
            <i class='bx bx-menu md:invisible p-4 text-3xl ' onClick={() => {
                    setShowMenu(!showMenu)
            }}></i>
            <div className={`bg-white md:relative md:w-[90%] md:h-16 w-[30%] h-screen fixed top-0 left-0 p-2 justify-between md:flex flex-col md:flex-row m-auto md:visible ${showMenu ? 'visible' : 'invisible'}`}>
                    <div className='border-2 rounded-md border-black-200 flex items-center w-[30%] text-center justify-center md:hidden m-1'>
                            <i class='bx bx-x md:invisible p-1' onClick={() => {
                                    setShowMenu(!showMenu)
                            }}></i>
                    </div>
                    <div className='flex items-center gap-2 text-left justify-start -ml-5'>
                            <img src='./logo.png' alt='logo' className='w-10 h-10 md:visible invisible'/>
                            <h1 className='text-xl sm:text-xl lg:text-xl font-semibold text-gray-900 md:visible invisible'> Admin </h1>
                    </div>
                    
                    <ul className='flex flex-col md:flex-row gap-0 md:gap-2 md:mx-auto md:my-0 md:relative md:top-0 absolute top-10 md:-left-20 left-0 right-0'>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <i class='bx bx-home text-xs sm:text-xl lg:text-xl'></i>
                                    <Link to='/admin' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Dashboard </Link>
                            </li>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <i class='bx bx-package text-xs sm:text-xl lg:text-xl'></i>
                                    <Link to="/products" className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Products </Link>
                            </li> 
                    </ul>
                    </div>
                    <div className='flex items-center gap-2 text-right justify-end md:mr-10 mr-3'>
                    <i class='bx bx-user text-3xl' onClick={() => {
                              setClicked(!clicked)
                            }}></i>
                    </div>
                </nav>
                {clicked && <LogOut  msg={"logout"}/>}

        <div className="flex flex-col justify-center items-center mt-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-[99%] m-auto">
                <h1 className="text-2xl font-bold mb-8 text-center">Users</h1>
                <div className='overflow-x-auto w-full'>
                        <table className="w-full table-auto text-center items-center justify-center">
                        <thead className="bg-gray-50">
                                <tr>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Orders</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Order</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 ">
                                {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                                        <div className="ml-4">
                                        <div className="font-medium text-gray-900">{user.name}</div>
                                        </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                        <Phone className="w-4 h-4" />
                                        {user.phone}
                                        </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.orders}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${user.spent}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                        {user.status}
                                </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {user.lastOrder}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <select
                                value={selectedAction}
                                onChange={handleSelectChange}
                                className="block w-full text-center px-1 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                <option value="">No action taken</option>
                                <option value="1">Suspend</option>
                                <option value="2">Remove</option>
                                </select>
                                </td>
                                </tr>
                                ))}
                        </tbody>
                        </table>

                </div>
        </div>


      </body>
    </main>
  )
}

export default adminusers
