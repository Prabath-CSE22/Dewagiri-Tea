import React, {useState, useEffect, Fragment} from 'react'
import StatCard from '../component/ui/statcard'
import { LineChart } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts'
import { Link } from 'react-router-dom'
import LogOut from '../component/ui/dropdown'
import { UsersRound } from 'lucide-react';
import axios from 'axios'
const admin = () => {
    const[showMenu, setShowMenu] = useState(false)
    const [count, setCount] = useState(0);
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);
    const [orders, setOrders] = useState([]);
    window.addEventListener('resize', () => {
        setChartWidth(window.innerWidth * 0.9);
    });
    const[clicked, setClicked] = useState(false)
    useEffect(() => {
            document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
            const fetchData = async () => {
              const response = await axios.get('http://localhost:3001/count');
              setCount(response.data);
              const responseOrders = await axios.get('http://localhost:3001/allorders');
              setOrders(responseOrders.data);
            }
            fetchData();
          }, [])
return (
    <main className="bg-gray-100 font-serif mt-5">
            <body className=' w-full  mx-auto bg-gray-200 mt-5 '>
            <div id="top"></div>
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
                                  <UsersRound  class='bx bx-user text-xs sm:text-xl lg:text-xl'/>
                                    <Link to='/users' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Users </Link>
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
                <div className='flex flex-col md:flex-row gap-4 md:gap-4 justify-center items-center md:p-2 p-1/2 mt-1'>
                    <StatCard title='Users' value={count.count} change='3%' positive={true}/>
                    <StatCard title='Products' value={count.countProducts} change='3%' positive={true} />
                    <StatCard title='Orders' value={count.countOrders} change='3%' positive={false} />
                    <StatCard title='Revenue' value={`$${Number(count.revenue).toFixed(2)}`} change='3%' positive={true} />
                </div>

                <div className="bg-white rounded-xl shadow-sm w-[99%] m-auto mt-1">
                  {/* <div className="flex flex-col justify-center items-center mt-1 bg-white p-6 rounded-lg border border-gray-200 w-full m-auto">
                    <h3 className="text-lg font-semibold">Recent Orders</h3>
                  </div> */}
                  <div className="overflow-x-auto w-full bg-white rounded-lg shadow-md mt-1 mb-4">
                  <table className="w-full table-auto whitespace-nowrap text-center">
                  <thead>
                    <tr className='bg-slate-300 border-b border-gray-200'>
                    <th className="text-lg font-semibold h-16" colSpan={8}>Recent Orders</th>
                    </tr>
                  <tr className="bg-gray-100 border-b border-gray-200">
                          <th className="px-6 py-4 font-semibold text-gray-700 " rowSpan={2}>Invoice</th>
                          <th className="px-6 py-4 font-semibold text-gray-700 border-l-2" rowSpan={2}>Customer ID</th>
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
                            {index === 0 && <td className="px-6 py-4 border-r-2 text-gray-900" rowSpan={order.products.length}>{order.user_id}</td>}
                            {index === 0 && <td className="px-6 py-4 border-r-2 text-gray-900" rowSpan={order.products.length}>{order.date}</td>}
                            <td className="px-6 py-4 border-r-2 text-gray-500">{product.product_name}</td>
                            <td className="px-6 py-4 border-r-2 text-gray-500">{product.quantity}</td>
                            <td className="px-6 py-4 border-r-2 text-gray-500">{`$${product.total_price.toFixed(2)}`}</td>
                            {index === 0 && <td className="px-6 py-4 border-r-2 font-medium text-gray-900" rowSpan={order.products.length}>{`$${order.total_price.toFixed(2)}`}</td>}
                            {index === 0 && <td className={`px-6 py-4 border-r-2 ${order.status === "Pending" ? "text-blue-600":order.status === "Processing" ? "text-yellow-600":"text-green-600"}`} rowSpan={order.products.length}>
                                    <span className={`bg-gray-200 px-5 py-1 rounded-3xl ${order.status === "Pending" ? "bg-blue-200":order.status === "Processing" ? "bg-yellow-200":"bg-green-200"}`}>{order.status}</span>
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

                <div className="flex flex-col justify-center items-center mt-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-[99%] m-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Monthly Sales Performance Overview</h1>
                    <p className="text-sm text-gray-500 mb-6">Track sales data over the past months to identify trends and patterns.</p>

                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]} // Example X-axis data (e.g., months)
                        series={[
                        {
                            data: [2, 5.5, 1, 8.5, 1.5, 5], // Example sales data
                        },
                        ]}
                        width={chartWidth}
                        height={300}
                    />
                </div>

                <div className="flex flex-col justify-center items-center mt-1 bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-[99%] m-auto">
                    
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Popular Products Comparison</h1>
                    <p className="text-sm text-gray-500 mb-6">Analyze the performance of different product groups over time.</p>

                
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Group A', 'Group B', 'Group C'] }]} // Example X-axis labels
                        series={[
                        { data: [4, 3, 5] }, // Example data for series 1
                        { data: [1, 6, 3] }, // Example data for series 2
                        { data: [2, 5, 6] }, // Example data for series 3
                        ]}
                        width={chartWidth}
                        height={300}
                    />
                    </div>
                    
              
            
            </body>
    </main>
)
}

export default admin

const OrderRow = ({ id, customer, product, amount, status }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-200">
    <td className="px-6 py-4 text-sm text-gray-900 font-medium border-b" rowSpan={product.length()}>{id}</td>
    <td className="px-6 py-4 text-sm text-gray-600 border-b">{customer}</td>
    <td className="px-6 py-4 text-sm text-gray-600 border-b">{product}</td>
    <td className="px-6 py-4 text-sm text-gray-600 border-b">{amount}</td>
    <td className="px-6 py-4">
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${
          status === "Delivered"
            ? "bg-green-100 text-green-800"
            : status === "Processing"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {status}
      </span>
    </td>
  </tr>
);
