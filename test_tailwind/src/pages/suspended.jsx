import React from "react";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const suspended = () => {
  const navigate = useNavigate();
  const handleNavigate = async () => {
    await axios.get("http://localhost:3001/logout", { withCredentials: true });
    navigate("/");
    setTimeout(() => {
      window.location.hash = "contact";
    }, 100);
    };
  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
    <AlertCircle className="text-amber-500 w-16 h-16 mx-auto mb-4" />
    <h1 className="text-2xl font-bold text-gray-800">Account Suspended</h1>
    <p className="text-gray-600 mt-2">
      Your account has been temporarily suspended due to policy violations.
      If you believe this is a mistake, please contact support.
    </p>
    <button className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      onClick={() => handleNavigate()}
    >
      Contact Support
    </button>
    </div>
  </div>
  );
};

export default suspended;
