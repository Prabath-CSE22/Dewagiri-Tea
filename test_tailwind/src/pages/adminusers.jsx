import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FolderArchive, Mail, Phone, Mailbox } from 'lucide-react';
import LogOut from '../component/ui/dropdown'
import Actions from '../component/ui/actions'
import axios from 'axios';

const adminusers = () => {
        const[clicked, setClicked] = useState(false);        
  const[showMenu, setShowMenu] = useState(false)
  const [users, setUsers] = useState([]);
          const [userStatus, setUserStatus] = useState([]);
          const [lastOrder, setLastOrder] = useState([]);
          const [deletedUsers, setDeletedUsers] = useState([]);
        useEffect(() => {
                const fetchUsers = async () => {
                        const response = await axios.get('http://localhost:3001/users');
                        setUsers(response.data);    
                        if (response.data){
                                const status = await axios.get('http://localhost:3001/userStats');
                                setUserStatus(status.data);
                                const lastOrder = await axios.get('http://localhost:3001/lastOrder');
                                setLastOrder(lastOrder.data);
                                const deleted = await axios.get('http://localhost:3001/deleteaccs');
                                setDeletedUsers(deleted.data);
                        }        
                };
                fetchUsers();
        }, [userStatus]);

  return (
    <main className="bg-gray-100 font-serif mt-5 h-screen">
      <body className=' w-full  mx-auto bg-gray-200 mt-5 h-screen'>
      <nav className='bg-white w-[99%] shadow-lg flex items-center justify-between p-2 m-auto rounded-b-lg md:h-fit h-16 sticky top-0 z-30 -mt-5'>
            <i class='bx bx-menu md:invisible p-4 text-3xl ' onClick={() => {
                    setShowMenu(!showMenu)
            }}></i>
            <div className={`bg-white md:relative md:w-[90%] md:h-16 w-[30%] h-screen fixed top-0 left-0 p-2 justify-between md:flex flex-col md:flex-row m-auto md:visible ${showMenu ? 'visible' : 'invisible'}`}>
                    <div className='border-2 rounded-md border-black-200 flex items-center w-[30%] text-center justify-center md:hidden m-1'>
                            <i class='bx bx-x md:invisible p-1' onClick={() => {
                                    setShowMenu(!showMenu)
                            }}></i>
                    </div>
                    <div className='flex items-center gap-2 text-left justify-start -ml-5 hover:cursor-pointer'>
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
                    <div className='flex items-center gap-2 text-right justify-end md:mr-10 mr-3 hover:cursor-pointer'>
                    <i class='bx bx-user text-xl' onClick={() => {
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
                                        <img className="h-10 w-10 rounded-full" src={user.profile_pic || './user.jpg'} alt="" />
                                        <div className="ml-4">
                                        <div className="font-medium text-gray-900">{user.fullname}</div>
                                        </div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap ">
                                <div className="text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                        <Phone className="w-4 h-4" />
                                        {user.phone_number}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                        <Mailbox  className="w-4 h-4" />
                                        <div className="text-sm text-gray-900 text-start">
                                        <div >
                                        {`${user.Address[0].street_line1}
                                         ${user.Address[0].street_line2}`}
                                        </div>
                                         <div >
                                         {`
                                          ${user.Address[0].city},
                                          ${user.Address[0].state},
                                          ${user.Address[0].country}`}
                                         </div>
                                           
                                        </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                        <FolderArchive className="w-4 h-4" />
                                        {`${user.Address[0].ZIP_Number}`}
                                        </div>
                                        
                                </div>
                                </td>
                                {
                                        userStatus.map((userStat) => (
                                                <>
                                                {userStat.user_id === user.user_id ? (
                                                <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {userStat.totalOrders}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                                                        ${(userStat.totalSpent).toFixed(2)}
                                                </td>
                                                </>) : (
                                                <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        No orders yet
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                                                        No orders yet
                                                </td>
                                                </>
                                                )}
                                                </>
                                        ))
                                }
                                <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                        user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                        {`${user.status.toUpperCase()}`}
                                </span>
                                </td>
                                {
                                        lastOrder.map((order) => (
                                                <>
                                                {order.user_id === user.user_id ? (
                                                <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {order.date}
                                                </td>
                                                </>) : (
                                                <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        No orders yet
                                                </td>
                                                </>
                                                )}
                                                </>
                                        ))
                                }
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <select
                                value={user.action}
                                onChange={async (e) => {
                                try {
                                const response = await axios.post('http://localhost:3001/updateAction', {
                                        user_id: user.user_id,
                                        action: e.target.value,
                                });
                                console.log(response.data);
                                } catch (error) {
                                console.error("Error updating action:", error);
                                }
                                }}
                                className={`block w-full text-center px-2 py-2 text-sm rounded-md shadow-sm focus:outline-none sm:text-sm
                                ${
                                user.action === "Suspended"
                                        ? "bg-yellow-100 text-yellow-800 border-yellow-500"
                                        : user.action === "Removed"
                                        ? "bg-blue-100 text-blue-800 border-blue-500"
                                        : user.action ==="Deleted" ? "bg-red-100 text-red-800 border-red-500" : "bg-gray-100 text-gray-800 border-gray-300"
                                }
                                focus:ring-blue-500 focus:border-blue-500`}
                                >
                                {(user.action === "No action taken" || user.action == null) && (
                                <option value={user.action} className="bg-gray-100 text-gray-600">
                                Take an action
                                </option>
                                )}
                                <option value="Suspended" className="bg-yellow-100 text-yellow-800">
                                {user.action === "Suspended" ? "Suspended" : "Suspend"}
                                </option>
                                <option value="Removed" className="bg-red-100 text-red-800">
                                {user.action === "Removed" ? "Removed" : "Remove"}
                                </option>
                                {(user.action === "Deleted") && (
                                        <option value="Deleted" className="bg-red-100 text-red-800">
                                                Deleted
                                        </option>        
                                )
                                }
                                
                                {(user.action === 'Suspended') && (
                                        <option value="No action taken" className='bg-green-100 text-green-800'>
                                                Dissmis
                                        </option>
                                )}

                                {(user.action === 'Deleted') && (
                                        <option value="No action taken" className='bg-lime-100 text-lime-800'>
                                                Recover
                                        </option>
                                )}
                                </select>

                                </td>
                                </tr>
                                ))}
                        </tbody>
                        </table>

                </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-[99%] m-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Deleted User Messages</h1>
        <div className='overflow-x-auto w-full'>
                <table className="w-full table-auto text-center items-center justify-center ">
                        <thead className="bg-gray-50">
                                <tr>
                                <th className="py-1 text-xs font-medium text-gray-500 uppercase">User ID</th>
                                        <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Reason</th>
                                </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-center">
                                {deletedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 ">
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="flex items-center text-center justify-center">
                                        <div className="font-medium text-center text-blue-500">{user.user_id}</div>
                                </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="text-sm text-gray-900 text-center">
                                        <div className="flex items-center gap-2 text-center justify-center text-red-500">
                                        {user.reason}
                                        </div>
                                </div>
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
