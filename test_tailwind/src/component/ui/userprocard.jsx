import React, {useState, useEffect} from 'react'
import { ShoppingCart, Heart } from 'lucide-react';
import ViewProduct from '../viewproduct';
import MsgBox from './msgBox';
import axios from 'axios';

const userprocard = ({ 
    product_id,
    name = "Product Name",
    category = "Category",
    status = "In Stock",
    price = "99.99",
    stock = "10",
    image = "./OIP.jpg",
    user_id,
  }) => {
    const [isFav, setIsFav] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [nstock, setStock] = useState(stock);
    const [isViewClicked, setIsViewClicked] = useState(false);
    const [nstatus, setStatus] = useState(status);
    const [cart, setCart] = useState({
      product_id: product_id,
      user_id: user_id,
      name: name,
      quantity: quantity,
      price: price*quantity,
      image: image,
    });

    const [showMsg, setShowMsg] = useState(false);  // Changed to false initially
    const [msgConfig, setMsgConfig] = useState({ message: '', type: 'success' });

    const setpriqun = async () => {
      setStock(nstock-quantity);
      setQuantity(0);
      const addToCart = await axios.post('http://localhost:3001/addtocart', {...cart});
      setMsgConfig({ message: addToCart.data, type: 'success' });
      setShowMsg(true);
      if(addToCart.status === 200){
        const updateProduct = await axios.post('http://localhost:3001/updateproduct', {
          product_id: product_id, 
          stock: nstock-quantity, 
          status: (nstock-quantity) === 0 ? 'Out of Stock' : (nstock-quantity) >= 5 ? 'In Stock' : 'Low Stock'
        });
        console.log(updateProduct.data);
        setMsgConfig({message: addToCart.data, type: 'success'});
        setShowMsg(true)
      }
    }
    useEffect(() => {     
      
      const checkWhishlist = async () => {
        const getauth = await axios.get('http://localhost:3001/checkauth');
        const checkFav = await axios.post('http://localhost:3001/checkwhishlist', {product_id: product_id, user_id: getauth.data.user.user_id});
        setIsFav(checkFav.status === 200 ? true : false);
      }
      
      setCart({
        product_id: product_id,
        user_id: user_id,
        name: name,
        quantity: quantity,
        price: price*quantity,
        image: image,
      }); 
      checkWhishlist();
      
    }, [quantity]);

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-full h-[480px]">
      <div className="h-[200px] aspect-video w-full relative">
        <img 
          src={image || "./OIP.jpg"} 
          alt={name} 
          className="w-full h-full object-cover rounded-md"
          onClick={() => {
            setIsViewClicked(!isViewClicked);
          }}
        />
      </div>
      
      <div className="flex flex-col flex-1 gap-2 mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg truncate">{name}</h3>
            <p className="text-sm text-gray-500 truncate">{category}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            nstock>=5 
            ? 'bg-green-100 text-green-800'
            : nstock===0
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
          }`}>
            {nstock===0 ? 'Out of Stock' : nstock>=5 ? 'In Stock' : 'Low Stock'}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-lg">${quantity>0 ? price*quantity : price}</p>
          <p className="text-sm text-gray-500">{nstock} in stock</p>
        </div>
        </div>
        <div className='flex gap-2 mt-auto pt-2 border-t border-gray-200 justify-between items-center'>
            <h1>Quantity :</h1>
            <div className='flex gap-4 justify-center items-center'>
                <button className='px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors active:scale-95'
                onClick={() => {
                  quantity>0 && setQuantity(quantity - 1);
                }}
                ><i class='bx bx-minus align-middle text-xl font-bold' ></i></button>
                <span>{quantity}</span>
                <button className='px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors active:scale-95'
                onClick={() => {
                  quantity<nstock && setQuantity(quantity + 1);
                }}
                ><i class='bx bx-plus align-middle text-xl font-bold'></i></button>
            </div>
        </div>
        <div className="flex gap-2 mt-2 pt-4 border-t border-gray-200 justify-between items-center">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors active:scale-95 disabled:opacity-50 disabled:active:scale-100" 
            onClick={async () => {
                setpriqun();
              }}
              disabled={quantity === 0 || nstock === 0}>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
            </button>
            <button className="p-2 text-gray-500  transition-colors active:scale-95" onClick={() => setIsFav(!isFav)}>
                {!isFav ? <i class='bx bx-heart text-3xl text-gray-500 hover:text-red-500' onClick={
                  async () => {
                    const addFav = await axios.post('http://localhost:3001/addwhishlist', {product_id: product_id, user_id: user_id, name: name, price: price, stock: stock, availability: stock>0 ? 'Available' : 'Out of Stock'});
                    setMsgConfig({message: addFav.data, type: 'success'});
                    setShowMsg(true);
                  }
                }></i> : <i class='bx bxs-heart text-3xl text-red-500 hover:text-red-400' onClick={
                  async () => {
                    const removeFav = await axios.post('http://localhost:3001/removefromwhishlist', {product_id: product_id, user_id: user_id});
                    setMsgConfig({message: removeFav.data, type: 'error'});
                    setShowMsg(true);
                  }
                }></i>}
            </button>
        </div>
        {isViewClicked && <ViewProduct product_id={product_id} isViewClicked={isViewClicked} setIsViewClicked={setIsViewClicked}/>}
        {showMsg && <MsgBox message={msgConfig.message} type={msgConfig.type} onClose={() => setShowMsg(false)}/>}
    </div>
  )
}

export default userprocard
