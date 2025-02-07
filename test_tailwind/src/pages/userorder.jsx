import React, {useState, useEffect, Fragment} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, ShoppingBag } from 'lucide-react';
import LogOut from '../component/ui/dropdown'
import Footer from '../component/ui/footer';
import ViewProduct from '../component/viewproduct';
import axios from 'axios';

const userorder = () => {
        const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [auth, setAuth] = useState([]);
    const [orders, setOrders] = useState([]);
    const [whishList, setWhishList] = useState([]);
    const [isViewClicked, setIsViewClicked] = useState(false);
        const [product_id, setProduct_id] = useState(0);
    useEffect(() => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        const fetchData = async () => {
        try {
                const responce = await axios.get('http://localhost:3001/checkauth');
                setAuth(responce.data.user);                
                if(responce.data.user){
                        const response2 = await axios.post('http://localhost:3001/orders', { user_id: responce.data.user.user_id });
                        setOrders(response2.data);         
                        const response3 = await axios.post('http://localhost:3001/getWhishlist', { user_id: responce.data.user.user_id });
                        setWhishList(response3.data);               
                }
        } catch (error) {
                console.error(error);                        
        }
        }
        fetchData();
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
                                <th className="px-6 py-4 font-semibold text-gray-700 border-r-2 border-l-2">Product</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 border-r-2">Quantity</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">                       
                        {
                                orders.map((order) => (
                                       <Fragment key={order.invoice_num}>
                                        {order.products.map((product, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                        {index === 0 && <td className="px-6 py-4 border-r-2 text-gray-900" rowSpan={order.products.length}>{order.invoice_num}</td>}
                                                        {index === 0 && <td className="px-6 py-4 border-r-2 text-gray-900" rowSpan={order.products.length}>{order.date}</td>}
                                                        <td className="px-6 py-4 border-r-2 text-gray-500">{product.product_name}</td>
                                                        <td className="px-6 py-4 border-r-2 text-gray-500">{product.quantity}</td>
                                                        <td className="px-6 py-4 border-r-2 text-gray-500">{`$${product.total_price.toFixed(2)}`}</td>
                                                        {index === 0 && <td className="px-6 py-4 border-r-2 font-medium text-gray-900" rowSpan={order.products.length}>{`$${order.total_price.toFixed(2)}`}</td>}
                                                        {index === 0 && <td className={`px-6 py-4 border-r-2 ${order.status === "Pending" ? "text-blue-600":order.status === "Processing" ? "text-yellow-600":"text-green-600"}`} rowSpan={order.products.length}>
                                                                <span className={`bg-gray-200 px-5 py-1 rounded-md ${order.status === "Pending" ? "bg-blue-200":order.status === "Processing" ? "bg-yellow-200":"bg-green-200"}`}>{order.status}</span>
                                                                </td>}
                                                </tr>
                                        ))}
                                       </Fragment>
                                ))
                        }
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
                                <th className="px-6 py-4 font-semibold text-gray-700 border-l-2">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {
                                whishList.map((product) => (
                                        <tr key={product.product_id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-gray-900">{product.date}</td>
                                                <td className="px-6 py-4 text-gray-900">{product.name}</td>
                                                <td className="px-6 py-4 text-gray-900">{`$${product.price.toFixed(2)}`}</td>
                                                <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                                                <td className={`px-6 py-4 ${product.stock > 0 ? "text-green-700":"text-red-700"}`}>{product.stock > 0 ? "Available":"Out of Stock"}</td>
                                                <td className="px-6 py-4 text-gray-900">
                                                        <select 
                                                                className="px-3 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-200 transition-all duration-200"
                                                                onClick={async (e) => {
                                                                        if(e.target.value === 'view'){
                                                                                setIsViewClicked(true);
                                                                                setProduct_id(product.product_id);
                                                                        }else if(e.target.value === 'remove'){
                                                                                try {
                                                                                        await axios.post('http://localhost:3001/removefromwhishlist', { product_id: product.product_id, user_id: auth.user_id });
                                                                                        const response = await axios.post('http://localhost:3001/getWhishlist', { user_id: auth.user_id });
                                                                                        setWhishList(response.data);
                                                                                } catch (error) {
                                                                                        console.error(error);
                                                                                }
                                                                        }
                                                                        
                                                                }
                                                                }
                                                        >
                                                                <option value="select" className="bg-white text-gray-900 px-3 py-2 hover:bg-gray-200">
                                                                Select
                                                                </option>
                                                                <option value="view" className="bg-white text-blue-900 px-3 py-2 hover:bg-blue-200">
                                                                View
                                                                </option>
                                                                <option value="remove" className="bg-white text-red-600 px-3 py-2 hover:bg-red-100">
                                                                Remove
                                                                </option>
                                                        </select>
                                                </td>

                                        </tr>
                                ))
                        }
                        </tbody>
                        </table>
                        </div>

                    
                </div>

                {isViewClicked && <ViewProduct product_id={product_id} isViewClicked={isViewClicked} setIsViewClicked={setIsViewClicked} />}     
            </body>
            <Footer />
        </main>
    </div>
  )
}

export default userorder
