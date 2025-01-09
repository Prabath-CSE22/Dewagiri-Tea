import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, ShoppingBag } from 'lucide-react';
import LogOut from '../component/ui/dropdown'
import Footer from '../component/ui/footer';


const userorder = () => {
        const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      }, [])
  return (
    <div>
    <main className="bg-gray-100 font-serif mt-5">
        <body className="bg-gray-200 font-mono leading-normal tracking-normal">
        <div id="products"></div>
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
                    <div className='flex items-center gap-2 text-left justify-start -ml-5 hover:cursor-pointer'  onClick={() => {
                                navigate('/')
                    }}>
                            <img src='./logo.png' alt='logo' className='w-10 h-10 md:visible invisible'/>
                            <h1 className='text-xl sm:text-xl lg:text-xl font-semibold text-gray-900 md:visible invisible'> DewTea </h1>
                    </div>
                    
                    <ul className='flex flex-col md:flex-row gap-0 md:gap-2 md:mx-auto md:my-0 md:relative md:top-0 absolute top-10 md:-left-20 left-0 right-0'>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <i class='bx bx-home text-xl sm:text-xl lg:text-2xl'></i>
                                    <Link to='/profile' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Dashboard </Link>
                            </li>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                              <ShoppingBag  class='bx bx-home text-xs sm:text-xl lg:text-xl'/>
                                    <Link to='/home' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Shop Now </Link>
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
                
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[99%] m-auto mt-1">
                    <h1 className='text-2xl font-bold text-gray-800 items-center space-x-2 text-center'>My orders</h1>
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full table-auto whitespace-nowrap">
                        <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold text-gray-700 " rowSpan={2}>Invoice</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2" rowSpan={2}>Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2" colSpan={3}>Product</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2" rowSpan={2}>Total Amount</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2" rowSpan={2}>Status</th>
                        </tr>
                        <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold text-gray-700">Product</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Quantity</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {/* Example of one row - repeat for others */}
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">INV-0001</td>
                                <td className="px-6 py-4 text-gray-900">12/12/2021</td>
                                <td className="px-6 py-4 text-gray-900">Product 1</td>
                                <td className="px-6 py-4 text-gray-900">2</td>
                                <td className="px-6 py-4 text-gray-900">2000</td>
                                <td className="px-6 py-4 font-medium text-gray-900">4000</td>
                                <td className="px-6 py-4">
                                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                Delivered
                                </span>
                                </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">INV-0002</td>
                                <td className="px-6 py-4 text-gray-900">12/12/2021</td>
                                <td className="px-6 py-4 text-gray-900">Product 2</td>
                                <td className="px-6 py-4 text-gray-900">1</td>
                                <td className="px-6 py-4 text-gray-900">1000</td>
                                <td className="px-6 py-4 font-medium text-gray-900">1000</td>
                                <td className="px-6 py-4">
                                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                Delivered
                                </span>
                                </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900" rowSpan={3}>INV-0004</td>
                                <td className="px-6 py-4 text-gray-900" rowSpan={3}>01/02/2025</td>
                                <td className="px-6 py-4 text-gray-900">Product X</td>
                                <td className="px-6 py-4 text-gray-900">2</td>
                                <td className="px-6 py-4 text-gray-900">1000</td>
                                <td className="px-6 py-4 font-medium text-gray-900" rowSpan={3}>6000</td>
                                <td className="px-6 py-4" rowSpan={3}>
                                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                Delivered
                                </span>
                                </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">Product Y</td>
                                <td className="px-6 py-4 text-gray-900">1</td>
                                <td className="px-6 py-4 text-gray-900">2000</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">Product Z</td>
                                <td className="px-6 py-4 text-gray-900">2</td>
                                <td className="px-6 py-4 text-gray-900">1500</td>
                        </tr>
                        {/* Add similar styling for other rows */}
                        </tbody>
                        </table>
                        </div>
                </div>

                <div className='bg-white p-6 rounded-lg shadow-lg text-center w-[99%] m-auto mt-1'>
                    <h1 className='text-2xl font-bold text-gray-800 items-center space-x-2 text-center'>Wishlist</h1>
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="w-full table-auto whitespace-nowrap">
                        <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2">Date Added</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2">Product</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2">Current Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2">Stock</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2">Availability</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">12/12/2021</td>
                                <td className="px-6 py-4 text-gray-900">Product 1</td>
                                <td className="px-6 py-4 text-gray-900">2000</td>
                                <td className="px-6 py-4 text-gray-900">2</td>
                                <td className="px-6 py-4 text-green-700">Available</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">12/12/2021</td>
                                <td className="px-6 py-4 text-gray-900">Product 2</td>
                                <td className="px-6 py-4 text-gray-900">1000</td>
                                <td className="px-6 py-4 text-gray-900">1</td>
                                <td className="px-6 py-4 text-green-700">Available</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">01/02/2025</td>
                                <td className="px-6 py-4 text-gray-900">Product X</td>
                                <td className="px-6 py-4 text-gray-900">1000</td>
                                <td className="px-6 py-4 text-gray-900">2</td>
                                <td className="px-6 py-4 text-green-700">Available</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">01/02/2025</td>
                                <td className="px-6 py-4 text-gray-900">Product Y</td>
                                <td className="px-6 py-4 text-gray-900">2000</td>
                                <td className="px-6 py-4 text-gray-900">1</td>
                                <td className="px-6 py-4 text-green-700">Available</td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">01/02/2025</td>
                                <td className="px-6 py-4 text-gray-900">Product Z</td>
                                <td className="px-6 py-4 text-gray-900">1500</td>
                                <td className="px-6 py-4 text-gray-900">2</td>
                                <td className="px-6 py-4 text-green-700">Available</td>
                        </tr>
                        </tbody>
                        </table>
                        </div>

                    
                </div>

                            
            </body>
            <Footer />
        </main>
    </div>
  )
}

export default userorder
