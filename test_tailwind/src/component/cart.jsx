import React, { useEffect, useState } from 'react';
import CartItem from './ui/cartItem';
import MsgBox from './ui/msgBox';
import axios from 'axios';
const Cart = ({isConfirm, setIsConfirm }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [auth, setAuth] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [msgConfig, setMsgConfig] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const getauth = await axios.get('http://localhost:3001/checkauth');
        setAuth(getauth.data.user);
        if(getauth){
          const response = await axios.post('http://localhost:3001/cart', { user_id: getauth.data.user.user_id });
          setCart(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartItems();
  }, [cart]);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-4 bg-white md:w-[25%] max-h-[65vh] w-[50%] rounded-lg p-4 shadow-lg fixed right-4 top-20 z-20">
      <h2 className="text-xl font-bold">Cart</h2>

      <div className="w-full overflow-y-auto">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            product_id={item.product_id}
            image={item.image}
            product_name={item.name}
            quantity={item.quantity}
            total={item.price}
            setShowMsg={setShowMsg}
            setMsgConfig={setMsgConfig}
            showMsg={showMsg}
            msgConfig={msgConfig}
          />
        ))}
      </div>

      <div className="flex justify-between items-center w-full py-2 border-t border-b border-black">
        <h3 className="text-lg font-medium">Total:</h3>
        <h3 className="text-lg font-bold">${total.toFixed(2)}</h3>
      </div>

      <button
        className="w-full py-2 mt-2 rounded-lg bg-green-500 text-lg font-bold transition-all hover:bg-green-600 text-white active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        onClick={async () => {
          setIsConfirm(!isConfirm);
        }}
        disabled={cart.length === 0}
      >
        Purchase
      </button>
      {showMsg && <MsgBox message={msgConfig.message} type={msgConfig.type} onClose={() => setShowMsg(false)}/>}
    </div>
  );
};

export default Cart;
