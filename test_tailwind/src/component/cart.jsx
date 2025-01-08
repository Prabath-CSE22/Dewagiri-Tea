import React, { useEffect, useState } from 'react';
import CartItem from './ui/cartItem';

const Cart = ({ id, isConfirm, setIsConfirm }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [random, setRandom] = useState();

  useEffect(() => {
    const fetchCartItems = async () => {
      setRandom(`INV-${new Date().getFullYear()}-${Math.floor(Math.random() * (1000 - 1) + 1)}`);
      try {
        // Mock array for cart items until the API is implemented
        const cartItems = { data: [] }; // Replace with your mock or API data
        setCart(cartItems.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.total_price, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-4 bg-white md:w-[25%] max-h-[65vh] w-[50%] rounded-lg p-4 shadow-lg absolute right-4 top-20">
      <h2 className="text-xl font-bold">Cart</h2>

      <div className="w-full overflow-y-auto">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            id={item._id}
            product_name={item.product_name}
            quantity={item.quantity}
            total={item.total_price}
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
          setCart([]);
          console.log(random);
          setIsConfirm(!isConfirm);
        }}
      >
        Purchase
      </button>
    </div>
  );
};

export default Cart;
