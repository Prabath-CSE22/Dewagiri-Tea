import React, {useState, useEffect} from 'react'
import Footer from '../component/ui/footer'
import LogOut from '../component/ui/dropdown'
import { ArrowLeftRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { Upload, X } from 'lucide-react';
import FirstVisitMsg from '../component/ui/firstvistmsg';
import axios from 'axios';
const userprofile = () => {
  useEffect(() => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    const getUserData = async () => {
      try {
          const getAuth = await axios.get('http://localhost:3001/checkauth');
          if(getAuth.data.message === "Valid token"){
            console.log(getAuth.data.message);
            
            setUserId(getAuth.data.user.user_id);
            if(getAuth.data.user.user_id) {
              const responce = await axios.post('http://localhost:3001/getaddress', {user_id: getAuth.data.user.user_id});
              
              setAddress(responce.data.Address[0]);
            }
          
            if(getAuth.data.user.user_id) {
              const data = await axios.post('http://localhost:3001/userdata', {user_id: getAuth.data.user.user_id});              
              setUser(data.data);
              
              if(data.data.first_vist){
                setIsFirstVist(true);
              }
              
            }else{
              console.log('User ID not found');
            }
          }
        } catch (error) {
          console.error('Error in /userdata:', error);
        }
      }
      getUserData();
    }, [])
    const navigate = useNavigate()
    const [user_id, setUserId] = useState();
  const[showMenu, setShowMenu] = useState(false);
  const[clicked, setClicked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isFirstVist, setIsFirstVist] = useState(false);
  
  const[user, setUser] = useState({
    fullname:"",
    email:'',
    phone_number:'',
    profile_pic:'',
    first_vist: ''
  });

  const [address, setAddress] = useState({
    street_line1: '',
    street_line2: '',
    city: '',
    state: '',
    country: '',
    ZIP_Number: '',
  });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChecked, setisChecked] = useState(false);
    const [reason, setReason] = useState('');
  
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setUser({ ...user, profile_pic: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };
    

  return (
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
                              <ShoppingBag  class='bx bx-home text-xs sm:text-xl lg:text-xl'/>
                                    <Link to='/home' className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> Shop Now </Link>
                            </li>
                            <li className='flex items-center gap-2 px-2 md:px-3 py-2 md:py-6'>
                                    <ArrowLeftRight class='bx bx-package text-xs sm:text-xl lg:text-xl' />
                                    <Link to="/orders" className='text-xs sm:text-xl lg:text-xl font-semibold text-gray-900'> My orders </Link>
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
                                          {user.profile_pic ? (
                                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white">
                                              <img 
                                                src={user.profile_pic} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                              />
                                              <button
                                                type="button"
                                                onClick={() => setUser({ ...user, profile_pic: '' })}
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
                                        <div className="space-y-2">
                                        <lable className="block text-sm font-medium text-gray-700">User Details</lable>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={user.fullname}
                                            onChange={(e) => setUser({...user, fullname: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                          <input
                                            type="email"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={user.email}
                                            onChange={(e) => setUser({...user, email: e.target.value})}
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
                                            value={user.phone_number}
                                            onChange={(e) => setUser({...user, phone_number: e.target.value})}
                                            required
                                          />
                                        </div>
                                        </div>
                                        <div className="space-y-4">
                                        <button
                                          className="w-full flex-1 active:scale-95  bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:active:scale-100"
                                          onClick={async () => {                                    
                                            try {
                                              const respond = await axios.post('http://localhost:3001/updateuser', {
                                                user_id, 
                                                email: user.email,
                                                fullname: user.fullname,
                                                phone_number: user.phone_number,
                                                first_vist: false,
                                                profile_pic: user.profile_pic
                                              });
                                              console.log(respond.data);
                                            } catch (error) {
                                              console.log(error);
                                            }
                                          }}
                                          disabled={!user.fullname || !user.email || !user.phone_number}
                                          >
                                                Update Profile
                                        </button>
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                        
                                    {/* Right Column */}
                                    <div className="space-y-6">
                                    <div className="space-y-2">
                                    <lable className="block text-sm font-medium text-gray-700">Address</lable>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address Line 1</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.street_line1}
                                            onChange={(e) => setAddress({...address, street_line1: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address Line 2</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.street_line2}
                                            onChange={(e) => setAddress({...address, street_line2: e.target.value})}

                                            
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.city}
                                            onChange={(e) => setAddress({...address, city: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.state}
                                            onChange={(e) => setAddress({...address, state: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.country}
                                            onChange={(e) => setAddress({...address, country: e.target.value})}
                                            required
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                          <input
                                            type="number"
                                            min="0"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            value={address.ZIP_Number}
                                            onChange={(e) => 
                                              setAddress({...address, ZIP_Number: e.target.value})}
                                          />
                                        </div>
                                        
                                      </div>
                        
                                      <div className="space-y-4">
                                        <button
                                          className="flex-1 active:scale-95 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full disabled:opacity-50 disabled:active:scale-100"
                                          disabled = {!address.street_line1 || !address.city || !address.state || !address.country || !address.ZIP_Number}
                                          onClick={async () =>{
                                            try {
                                              const respond = await axios.post('http://localhost:3001/updateaddress', {
                                                user_id, 
                                                street_line1: address.street_line1,
                                                street_line2: address.street_line2,
                                                city: address.city,
                                                state: address.state,
                                                country: address.country,
                                                ZIP_Number: address.ZIP_Number
                                              });
                                              console.log(respond.data);
                                            } catch (error) {
                                              console.log(error);
                                            }
                                          }}
                                        >
                                          Add Address
                                        </button>
                                        
                                      </div>
                                          </div>
                                      <div>
                                        
                                      <div className="space-y-4">
                                      <div className="space-y-2">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                          <input
                                            id='password'
                                            type="password"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            onChange={(e) => setPassword(e.target.value)}
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Re-enter Password</label>
                                          <input
                                            id='confirmPassword'
                                            type="password"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                          />
                                        </div>
                                        </div>
                                        
                                        <button
                                          className="flex-1 active:scale-95 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full disabled:opacity-50 disabled:active:scale-100"
                                          disabled = {!password || !confirmPassword || password !== confirmPassword}
                                          onClick={async () =>{
                                            try {
                                              const respond = await axios.post('http://localhost:3001/changePassword', {
                                                user_id, 
                                                password: password
                                              });
                                              console.log(respond.data);
                                            } catch (error) {
                                              console.log(error);
                                            }
                                            document.getElementById('password').value = '';
                                            document.getElementById('confirmPassword').value = '';
                                          }}
                                        >
                                          Change Password
                                        </button>
                                        
                                      </div>
                                      </div>
                                      {password && (() => {
                                            if (!hasMinLength) return <p className="text-[10px] md:text-xs  absolute text-red-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password must be at least 8 characters</p>;
                                            if (!hasUpperCase) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password must contain at least one uppercase letter</p>;
                                            if (!hasLowerCase) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password must contain at least one lowercase letter</p>;
                                            if (!hasNumber) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password must contain at least one number</p>;
                                            if (!hasSpecialChar) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password must contain at least one special character</p>;
                                            if(hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && !confirmPassword) return <p className="text-[10px] text-xs absolute text-green-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password is secure</p>;
                                            if (password === confirmPassword) return <p className="text-[10px] text-xs absolute text-green-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password Match</p>;
                                            if (password !== confirmPassword) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 mt-1 text-left mx-3 transition-all duration-300">Password do not match</p>;
                                            return null;
                                        })()}
                                      </div>
                                      
                                      <div className="space-y-4">
                                      <div className="space-y-2">
                                        <lable className="block text-sm font-medium text-gray-700">Delete My Account</lable>
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                          <input
                                            type="text"
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                            onChange={(e) => {
                                              setReason(e.target.value);
                                            }}
                                            
                                          />
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                          <input type="checkbox" name="" id="check" className='m-1' disabled={!reason}
                                           onChange={(e) => {
                                            setisChecked(e.target.checked);
                                            console.log(e.target.checked);
                                          }}/>
                                          <label htmlFor='check' className="text-xs">I understand that this action is irreversible</label>
                                        </div>
                                        
                                        <div className="space-y-4">
                                        <button
                                          className="w-full active:scale-95 flex-1 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors  disabled:opacity-50 disabled:active:scale-100"
                                          disabled = {!isChecked || !reason}
                                        >
                                                Delete Account
                                        </button>
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                </div>
            </div>
            {isFirstVist && <FirstVisitMsg isFirstVist={isFirstVist} setIsFirstVist={setIsFirstVist}/>}         
        </body>
        <Footer />
    </main>
  )
}

export default userprofile
