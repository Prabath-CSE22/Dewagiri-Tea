import React, {useState} from 'react'
import Footer from '../component/ui/footer'
import LogOut from '../component/ui/dropdown'
import { ArrowLeftRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom'
import { Upload, X } from 'lucide-react';

const userprofile = () => {

  const[showMenu, setShowMenu] = useState(false);
  const[clicked, setClicked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phonenumber: '',
    });
    const [address, setAddress] = useState({
        streetaddress1: '',
        streetaddress2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        });


  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      console.log('Image:', imagePreview);
      
    };

  return (
    <main className="bg-gray-100 font-serif mt-5">
        <body className="bg-gray-200 font-mono leading-normal tracking-normal">
        <nav className='bg-white w-[99%] shadow-lg flex items-center justify-between p-2 m-auto rounded-b-lg md:h-fit h-16'>
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
                            <h1 className='text-xl sm:text-xl lg:text-xl font-semibold text-gray-900 md:visible invisible'> DewTea </h1>
                    </div>
                    
                    <ul className='flex flex-col md:flex-row gap-0 md:gap-2 md:mx-auto md:my-0 md:relative md:top-0 absolute top-10 md:-left-20 left-0 right-0'>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                              <ShoppingBag  class='bx bx-home text-xs sm:text-xl lg:text-xl'/>
                                    <Link to='/home' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Shop Now </Link>
                            </li>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <ArrowLeftRight class='bx bx-package text-xs sm:text-xl lg:text-xl' />
                                    <Link to="/orders" className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> My orders </Link>
                            </li> 
                    </ul>
                    </div>
                    <div className='flex items-center gap-2 text-right justify-end md:mr-10 mr-3'>
                            <i class='bx bx-user text-3xl' onClick={() => {
                              setClicked(!clicked)
                            }}></i>
                    </div>
                </nav>
                {clicked && <LogOut />}
            <div className="flex flex-col items-center justify-center bg-gray-200">
                <div className="w-[99%] m-auto my-1 ">
                        <div className="bg-gray-50 rounded-lg shadow-md p-8 h-full">
                                <div className="max-w-full mx-auto h-full flex flex-col">
                                  <h2 className="text-2xl font-bold mb-8 text-center">User Profile</h2>
                                  
                                  <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                      <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
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
                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
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
                                        <lable className="block text-sm font-medium text-gray-700">User Details</lable>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                          <input
                                            type="email"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                          <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={formData.phonenumber}
                                            onChange={(e) => setFormData({...formData, phonenumber: e.target.value})}
                                            required
                                          />
                                        </div>
                                        </div>
                                        <div className="space-y-4">
                                        <button
                                          type="submit"
                                          className="w-full flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                                Update Profile
                                        </button>
                                        </div>
                                      </div>
                                    </div>
                        
                                    {/* Right Column */}
                                    <div className="space-y-6">
                                    <lable className="block text-sm font-medium text-gray-700">Address</lable>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address Line 1</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.streetaddress1}
                                            onChange={(e) => setFormData({...address, streetaddress1: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address Line 2</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.streetaddress2}
                                            onChange={(e) => setFormData({ ...address, streetaddress2: e.target.value})}
                                            
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.city}
                                            onChange={(e) => setFormData({...address, city: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.state}
                                            onChange={(e) => setFormData({...address, state: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.country}
                                            onChange={(e) => setFormData({...address, country: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                          <input
                                            type="number"
                                            min="0"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.zipcode}
                                            onChange={(e) => setFormData({...address, zipcode: e.target.value})}
                                          />
                                        </div>
                                        
                                      </div>
                        
                                      <div className="space-y-4">
                                        <button
                                          type="submit"
                                          className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
                                        >
                                          Add Address
                                        </button>
                                        
                                      </div>

                                      <div>
                                        
                                      <div className="space-y-4">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                          <input
                                            type="password"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Re-enter Password</label>
                                          <input
                                            type="password"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                          />
                                        </div>
                                        </div>
                                        <button
                                          type="submit"
                                          className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
                                        >
                                          Change Password
                                        </button>
                                        
                                      </div>
                                      </div>
                                      <div className="space-y-4">
                                        <lable className="block text-sm font-medium text-gray-700">Delete My Account</lable>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        
                                            required
                                          />
                                        </div>
                                        
                                        <div className="space-y-4">
                                        <button
                                          type="submit"
                                          className="w-full flex-1 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                                Delete Account
                                        </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                </div>
            </div>         
        </body>
        <Footer />
    </main>
  )
}

export default userprofile
