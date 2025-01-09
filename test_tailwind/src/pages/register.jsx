import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const register = () => {
  const navigate = useNavigate()
  const [usernames, setUsernames] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [password, setPassword] = useState('')
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const [user, setUser] = useState({
    user_id: '',
    profile_pic: '',
    fullname: '',
    email: '',
    phone_number: 12345678,
    Address: {
      street_line1: '',
      street_line2: '',
      city: '',
      state: '',
      country: '',
      ZIP_Number: ''
    },
    user_name: '',
    password: '',
    role: 'user',
    first_vist: true,
    active: true,
    status: 'active',
    delete_request: ''
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch usernames
        const response = await axios.get('http://localhost:3001/usernames');
        setUsernames(response.data);
  
        // Fetch user IDs if usernames are loaded
        if (response.data.length > 0) {
          const respond = await axios.get('http://localhost:3001/user_ids');
          setUserIds(respond.data);
  
          // Generate a unique user ID
          let userId;
          do {
            userId = Math.floor(100000 + Math.random() * 900000).toString();
          } while (respond.data.includes(userId));
  
          // Update the user state with the unique ID
          setUser((prevUser) => ({ ...prevUser, user_id: userId }));
          console.log('User ID generated:', userId);
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [user.user_name]);// Empty dependency array ensures this runs once on mount


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(usernames.includes(user.user_name)){
      alert('Username already exists');
      document.getElementById('username').value = '';
      return;
    }
    try{
      const response = await axios.post('http://localhost:3001/register', user);
      if(response.status === 200){
        navigate('/login');
        console.log('Registration successful:', response.data);
      }
    }
    catch(error){
      console.error('Error in register:', error);
    }
  }

  return (
    <main className="bg-gray-100 h-screen font-serif">
      <body className='w-[90%] h-screen mx-auto bg-gray-200'>
      <form className="sm:w-[35%] md:w-[35%] mx-0 relative  top-1/2 transform -translate-y-1/2 bg-white text-center p-5 rounded-md shadow-lg shadow-green-100 sm:mx-auto" onSubmit={handleSubmit}>
        <div className='flex items-center justify-between px-4 py-6'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900'>
            Create Account
          </h1>
          <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full'>
            <i className='bx bx-user-plus text-3xl text-green-600'></i>
          </div>
        </div>
        <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="username" className='text-[10px] self-start ml-2 font-semibold'>*Username</label>
            <input
              type="text"
              id='username'
              placeholder="Username"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
              onChange={(e) => setUser({...user, user_name: e.target.value})}
            />
            <i class='bx bx-user relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9'></i>
          </div>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="email" className='text-[10px] self-start ml-2 font-semibold'>*Email</label>
            <input
              type="email"
              id='email'
              placeholder="you@example.com"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          <i class='bx bxl-gmail relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9' ></i>
          </div>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5 -mb-5'>
            <label htmlFor="password" className='text-[10px] self-start ml-2 font-semibold'>*Password</label>
            <input
              type="password"
              id='password'
              placeholder="Password"
              className="p-2 m-2 border border-gray-400 rounded-md w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
              <i class='bx bx-lock-alt relative text-gray-400 left-[45%] top-1/2 transform -translate-y-9 z-1' ></i>
            </div>
            {password && (() => {
                if (!hasMinLength) return <p className="text-[10px] md:text-xs  absolute text-red-500 mb-2 -mt-2 text-left mx-3 transition-all duration-300">Password must be at least 8 characters</p>;
                if (!hasUpperCase) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 -mt-2 text-left mx-3 transition-all duration-300">Password must contain at least one uppercase letter</p>;
                if (!hasLowerCase) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 -mt-2 text-left mx-3 transition-all duration-300">Password must contain at least one lowercase letter</p>;
                if (!hasNumber) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 -mt-2 text-left mx-3 transition-all duration-300">Password must contain at least one number</p>;
                if (!hasSpecialChar) return <p className="text-[10px] text-xs absolute text-red-500 mb-2 -mt-2 text-left mx-3 transition-all duration-300">Password must contain at least one special character</p>;
                if(hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) return <p className="text-[10px] text-xs absolute text-green-500 mb-2 -mt-2 text-left mx-3 transition-all duration-300">Password is secure</p>;
                return null;
            })()}

            <div className='flex w-full mx-auto content-center items-center mt-2'>
              <input type="checkbox" id="checkbox" className='m-2'/>
              <label htmlFor="checkbox" className='text-xs text-gray-700'>I agree to the <Link to="" className="text-green-500">terms</Link> and <Link to="" className="text-green-500">conditions</Link> </label>
            </div>
          <div className='flex flex-col w-full mx-auto p-2 content-center items-center -gap-0.5'>
            <button className="bg-green-500 text-white p-2 m-2 rounded-md w-full mx-auto hover:bg-green-600 active:bg-green-700 active:scale-95 transform transition duration-150">
              Register
            </button>
          </div>
          <div className="-mt-1 mx-auto p-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
        </div>
        <div className="mt-1 grid lg:grid-cols-2 gap-3 text-center p-2 ">
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-95 transform transition duration-150">
            <i class='bx bxl-gmail h-5 w-5 text-gray-700' ></i>
            <span className="ml-2">Google</span>
          </button>
          <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 active:scale-95 transform transition duration-150">
            <i class='bx bxl-facebook h-5 w-5 text-gray-700' ></i>
            <span className="ml-2">Facebook</span>
          </button>
        </div>
        <div className='flex flex-col w-full mx-auto p-2 content-center items-center'>
          <p className="text-xs text-gray-400">Already have an account? <Link to='/login' className="text-green-500">Sign in</Link></p>
        </div>
        </form>
        
      </body>
    </main>
  )
}

export default register
