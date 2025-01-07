import React, {useState} from 'react'
import Footer from '../component/ui/footer'
import Userprocard from '../component/ui/userprocard'
import LogOut from '../component/ui/dropdown'
import { ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom'
const defaulthome = () => {
  const[showMenu, setShowMenu] = useState(false);
  const[clicked, setClicked] = useState(false);
  return (
    <main className="bg-gray-100 font-serif mt-5">
        <body className="bg-gray-200 font-mono leading-normal tracking-normal">
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
                            <h1 className='text-xl sm:text-xl lg:text-xl font-semibold text-gray-900 md:visible invisible'> DewTea </h1>
                    </div>
                    
                    <ul className='flex flex-col md:flex-row gap-0 md:gap-2 md:mx-auto md:my-0 md:relative md:top-0 absolute top-10 md:-left-20 left-0 right-0'>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <i class='bx bx-home text-xl sm:text-xl lg:text-2xl'></i>
                                    <Link to='/profile' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Dashboard </Link>
                            </li>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <ArrowLeftRight class='bx bx-package text-xs sm:text-xl lg:text-xl' />
                                    <Link to="/orders" className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> My orders </Link>
                            </li> 
                    </ul>
                    </div>
                    <div className='flex items-center gap-2 text-right justify-end md:mr-10 mr-3'>
                            <i class='bx bx-user text-3xl' onClick={() => {
                              setClicked(!clicked)
                            }}></i>
                    </div>
                </nav>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[99%] m-auto mt-1">
                <div className="flex flex-col items-center justify-center bg-green-200 py-6 rounded-md">
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <span>🛍️</span> {/* Adding a shopping bag emoji */}
                    <span>Available Products Just for You!</span>
                  </h1>
                  <p className="text-gray-600 mt-3">
                    Browse through our collection and find what you love. Don’t miss out!
                  </p>
                  <button className="mt-5 px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600 transition-all duration-300" onClick={() => {
                      window.location.href = '#products';
                  }}>
                    Shop Now
                  </button>
                </div>
              </div>  

                {clicked && <LogOut />}
            <div id='products' className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg shadow-md w-[99%] m-auto mt-1">
                <Userprocard />
                <Userprocard />
                <Userprocard />
                <Userprocard />
                <Userprocard />
                <Userprocard />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[99%] m-auto mt-1">
                  <div className="flex flex-col items-center justify-center bg-gray-200 py-6 rounded-md">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                      <span>😔</span> {/* Adding the emoji */}
                      <span>Ooops! That's all we have for you.</span>
                    </h1>
                    <p className="text-gray-600 mt-3">
                      Check back later for more updates or explore our other sections.
                    </p>
                    <button className="mt-5 px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600 transition-all duration-300"
                      onClick={() => {
                        window.location.href = '#products';
                      }}
                      >
                      Go back to Products
                    </button>
                  </div>
                </div>

        </body>

        <Footer />
    </main>
  )
}

export default defaulthome
