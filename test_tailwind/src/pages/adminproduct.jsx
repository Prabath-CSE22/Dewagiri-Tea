import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Adprocard from '../component/ui/adminproductcard'
import AddItem from '../component/additem'
import LogOut from '../component/ui/dropdown'
import { UsersRound, PackagePlus } from 'lucide-react';

const adminproduct = () => {
    const[showMenu, setShowMenu] = useState(false)
    const[clicked, setClicked] = useState(false)
  return (
    <main className="bg-gray-100 font-serif mt-5 h-screen scroll-smooth focus:scroll-auto">
      <body className=' w-full  mx-auto bg-gray-200 mt-5 '>
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
                                <UsersRound  class='bx bx-user text-xs sm:text-xl lg:text-xl'/>
                                    <Link to='/users' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Users </Link>
                            </li>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <PackagePlus  class='bx bx-add-to-queue text-xs sm:text-xl lg:text-xl'/>
                                    <a className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900 hover:cursor-pointer' onClick={() => {
                                        document.getElementById('additem').scrollIntoView({behavior: 'smooth'});
                                    }}> Add Product </a>
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
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg shadow-md w-[99%] m-auto mt-1">
                <Adprocard />
                <Adprocard />
                <Adprocard />
                <Adprocard />
                <Adprocard />
                <Adprocard />
                </div>

                
                <div id='additem'>
                <AddItem />
                </div>
      </body>
    </main>
  )
}

export default adminproduct
