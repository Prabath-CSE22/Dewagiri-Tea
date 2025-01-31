
import React, {useState} from 'react';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import axios from 'axios';
import ViewProduct from '../viewproduct';
import EditProduct from '../editproduct';

const AdminProductCard = ({ 
  product_id = 10,
  name = "Product Name",
  category = "Category",
  status = "In Stock",
  price = "49.99",
  stock = "10",
  image = "./OIP.jpg"
}) => {

  const [isViewClicked, setIsviewClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
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
        
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
          <button className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors active:scale-95"
            onClick={() => {
              setIsEditClicked(!isEditClicked);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors active:scale-95 text-red-600 hover:border-red-200"
            onClick={async () => {
                try {
                  const responce = await axios.delete(`http://localhost:3001/delproduct/${product_id}`);
                  console.log(responce.data);
                } catch (error) {
                  console.log(error);
                }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
          <button className="flex items-center px-3 py-2 text-sm border border-green-200 rounded-lg hover:bg-green-50 transition-colors active:scale-95 ml-auto"
            onClick={() =>{
                setIsviewClicked(!isViewClicked);
            }}
          >
            <ExternalLink className="w-4 h-4 mr-2 text-green-500" />
            <span className='text-green-500'>View</span>
          </button>
        </div>
      </div>
      {isViewClicked && <ViewProduct product_id={product_id} isViewClicked={isViewClicked} setIsViewClicked={setIsviewClicked}/>}
      {isEditClicked && <EditProduct product_id={product_id} isEditClicked={isEditClicked} setIsEditClicked={setIsEditClicked}/>}
    </div>
  );
};

export default AdminProductCard;