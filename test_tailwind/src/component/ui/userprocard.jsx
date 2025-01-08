import React, {useState} from 'react'
import { ShoppingCart, Heart } from 'lucide-react';

const userprocard = ({ 
    name = "Product Name",
    category = "Category",
    status = "In Stock",
    price = "99.99",
    stock = "10",
    image = "./OIP.jpg"
  }) => {
    const [isFav, setIsFav] = useState(false);
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-full">
      <div className="aspect-video w-full relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            status === 'In Stock' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-lg">${price}</p>
          <p className="text-sm text-gray-500">{stock} in stock</p>
        </div>
        </div>
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 justify-between items-center">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors active:scale-95">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
            </button>
            <button className="p-2 text-gray-500  transition-colors active:scale-95" onClick={() => setIsFav(!isFav)}>
                {isFav ? <i class='bx bx-heart text-3xl text-gray-500 hover:text-red-500' ></i> : <i class='bx bxs-heart text-3xl text-red-500 hover:text-red-400'></i>}
            </button>
        </div>
    </div>
  )
}

export default userprocard
