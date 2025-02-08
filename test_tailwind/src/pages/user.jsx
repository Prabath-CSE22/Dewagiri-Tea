import React, {useEffect, useState} from 'react'
import Footer from '../component/ui/footer'
import Userprocard from '../component/ui/userprocard'
import LogOut from '../component/ui/dropdown'
import { ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cart from '../component/cart'
import OrderSum from '../component/ordersum';
import axios from 'axios'
const defaulthome = () => {
  const navigate = useNavigate()
  const[showMenu, setShowMenu] = useState(false);
  const[clicked, setClicked] = useState(false);
  const[showCart, setShowCart] = useState(false);
  const[isConfirm, setIsConfirm] = useState(false);
  const[products, setProduts] = useState([]);
  const[auth, setAuth] = useState([]);
  const [seachedItem, setSearchedItem] = useState('');
  const [search, setSearch] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {

    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

    const fetchProduts = async () => {
      try {
        const response = await axios.post('http://localhost:3001/searchproduct', {searchresult : seachedItem});
        setProduts(response.data);
        if(response.data){
          const getauth = await axios.get('http://localhost:3001/checkauth');
          setAuth(getauth.data.user);
          const getuserdata = await axios.post('http://localhost:3001/userDataforOrder', {user_id: getauth.data.user.user_id});
          setUser(getuserdata.data);
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchProduts();
  }, [seachedItem]);
  return (
    <main className="bg-gray-100 font-sans mt-5">
        <body className="bg-gray-200 font-mono leading-normal tracking-normal">
          <div id="products"></div>
          <nav  className='bg-white w-[99%] shadow-lg flex items-center justify-between p-2 m-auto rounded-b-lg md:h-fit h-16 sticky top-0 z-30 -mt-5'>
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
                                    <ArrowLeftRight class='bx bx-package text-xs sm:text-xl lg:text-xl' />
                                    <Link to="/orders" className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> My orders </Link>
                            </li> 
                    </ul>
                    </div>
                    <div className='flex items-center text-right justify-end '>
                    <div className='flex items-center gap-2 text-right justify-end md:mr-5 mr-3 hover:cursor-pointer'>
                            <i class='bx bx-cart-download text-xl' onClick={() => {
                              setShowCart(!showCart);
                              setClicked(false)
                            }}></i>
                    </div>
                    <div className='flex items-center gap-2 text-right justify-end md:mr-5 mr-3 hover:cursor-pointer'>
                            <i class='bx bx-user text-xl' onClick={() => {
                              setClicked(!clicked)
                              setShowCart(false)
                            }}></i>
                    </div>
                    </div>
                </nav>
                <div></div>
                {clicked && <LogOut  msg={"logout"}/>}
                {showCart && <Cart isConfirm={isConfirm} setIsConfirm={setIsConfirm}/>}
                <div
                  
                  className="bg-white p-6 rounded-lg shadow-lg text-center w-[99%] m-auto mt-1"
                  onClick={() => {
                    setShowCart(false)
                    setClicked(false)

                  }}
                >
                  <div className="sm:flex sm:flex-col sm:items-center justify-center bg-green-200 py-6 rounded-md space-y-2 items-center flex-row">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 sm:space-x-0 sm:space-y-0 sm:items-start">
                      <span>🔍</span> {/* Adding a magnifying glass emoji */}
                      <span>Search for Your Favorite Products</span>
                    </h1>
                    <p className="text-gray-600 mt-3 ">
                      Type a product name below to explore our collection.
                    </p>
                    <div className="mt-5 flex w-full max-w-lg sm:px-4 sm:py-2 px-6 rounded-md">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-[90%] sm:px-4 sm:py-2 border px-6 border-gray-300 rounded-l-md focus:outline-none focus:ring-[0.5px] focus:ring-green-500"
                        onChange={(e) => {
                          setSearchedItem(e.target.value);
                        }}
                        />
                      <button
                        className="px-4 py-2 bg-green-500 active:scale-95 text-white font-medium rounded-r-md shadow-md hover:bg-green-600 transition-all duration-300"
                        onClick={() => {
                          setSearch(!search);
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
  
            <div  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg shadow-md w-[99%] m-auto mt-1">
                {products.length > 0 ? products.map((product) => (
                  <Userprocard 
                    key={product.id}
                    product_id={product.product_id}
                    name={product.name}
                    category={product.category}
                    status={product.status}
                    price={product.price}
                    stock={product.stock}
                    image={product.image}
                    user_id={auth.user_id}
                  />
                )) : (
                <div className="col-span-full flex flex-col items-center justify-center p-8">
                  <div className="sm:text-6xl mb-4 text-4xl">🔍</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">No Items Found</h2>
                  <p className="text-gray-600">
                    We couldn't find any products matching your search criteria.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Try searching with different keywords or browse our categories.
                  </p>
                </div>
                )}
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
                    <button className="mt-5 px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-md active:scale-95 hover:bg-green-600 transition-all duration-300"
                      onClick={() => {
                        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                      }}
                      >
                      Go back to Products
                    </button>
                  </div>
                </div>
                {isConfirm && <OrderSum user_id={auth.user_id} isClicked={isConfirm} setIsClicked={setIsConfirm} orderData={{user}} />}
        </body>

        <Footer />
    </main>
  )
}

export default defaulthome
