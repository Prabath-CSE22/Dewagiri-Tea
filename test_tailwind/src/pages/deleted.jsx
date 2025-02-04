import React from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deleted = () => {
    const navigate = useNavigate();
    const handleNavigate = async () => {
        await axios.get("http://localhost:3001/logout", { withCredentials: true });
        navigate("/");
        setTimeout(() => {
          window.location.hash = "contact";
        }, 100);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-50 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center border-2 border-red-200">
                <Trash2 className="text-red-500 w-16 h-16 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-red-800">Account Deleted</h1>
                <p className="text-red-600 mt-2">
                    Your account has been permanently deleted from our system.
                    If you believe this was done in error, please contact our support team.
                </p>
                <button 
                    className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleNavigate()}
                >
                    Contact Support
                </button>
            </div>
        </div>
    );
};

export default Deleted;