import React, { useEffect, useState } from 'react';
import CartItem from './ui/cartItem';
import axios from 'axios';
const Cart = ({ id, isConfirm, setIsConfirm }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [random, setRandom] = useState();
  const [auth, setAuth] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setRandom(`INV-${new Date().getFullYear()}-${Math.floor(Math.random() * (1000 - 1) + 1)}`);
      try {
        const getauth = await axios.get('http://localhost:3001/checkauth');
        setAuth(getauth.data.user);
        console.log(getauth.data.user);
        if(getauth){
          const response = await axios.post('http://localhost:3001/cart', { user_id: getauth.data.user.user_id });
          setCart(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-4 bg-white md:w-[25%] max-h-[65vh] w-[50%] rounded-lg p-4 shadow-lg absolute right-4 top-20">
      <h2 className="text-xl font-bold">Cart</h2>

      <div className="w-full overflow-y-auto">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            id={item.product_id}
            image={item.image}
            product_name={item.name}
            quantity={item.quantity}
            total={item.price}
          />
        ))}
      </div>

      <div className="flex justify-between items-center w-full py-2 border-t border-b border-black">
        <h3 className="text-lg font-medium">Total:</h3>
        <h3 className="text-lg font-bold">${total.toFixed(2)}</h3>
      </div>

      <button
        className="w-full py-2 mt-2 rounded-lg bg-green-500 text-lg font-bold transition-all hover:bg-green-600 text-white active:scale-95"
        onClick={async () => {
          const responce = await axios.delete('http://localhost:3001/removecartitems', { user_id: auth.user_id });
          console.log(responce.data);
          setIsConfirm(!isConfirm);
        }}
      >
        Purchase
      </button>
    </div>
  );
};

export default Cart;
