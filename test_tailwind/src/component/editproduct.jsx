import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import axios from 'axios';

const EditProduct = ({product_id, isEditClicked, setIsEditClicked}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    product_id: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    status: '',
    image: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({...formData, image:reader.result})
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/editproduct', {
        ...formData
      });
      console.log(response.data);      
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            const viewProduct = await axios.post(`http://localhost:3001/viewproduct`, {product_id: product_id});
            setFormData(viewProduct.data);
            if(viewProduct){
                setImagePreview(viewProduct.data.image);
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchProduct();
  }, []);
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
        <button
        type="button"
        className="absolute top-2 active:scale-95 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
        onClick={() => setIsEditClicked(!isEditClicked)}
        >
        <X className="w-5 h-5" />
        </button>
      <div className="bg-gray-50 rounded-lg shadow-md p-8 h-full">
        <div className="max-w-full mx-auto h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-8 text-center">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 active:scale-95 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-white transition-colors bg-white">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  required
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>

              <div className="flex gap-4 mt-auto pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 transition-all active:scale-95 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit Product
                </button>
                <button
                  type="button"
                  className="px-6 py-2 border active:scale-95 transition-all border-gray-300 rounded-lg hover:bg-white"
                  onClick={() => {
                    setFormData({
                      name: '',
                      category: '',
                      price: '',
                      stock: '',
                      status: ''
                    });
                    setImagePreview(null);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;