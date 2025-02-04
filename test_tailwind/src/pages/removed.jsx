import React from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Removed = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
                <Trash2 className="text-gray-500 w-16 h-16 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">Account Removed</h1>
                <p className="text-gray-600 mt-2">
                    Your account has been permanently removed from our system.
                    All associated data has been deleted according to our privacy policy.
                </p>
                <button className="mt-6 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                    onClick={async () => {
                        await axios.get("http://localhost:3001/logout", { withCredentials: true });
                        navigate("/");
                    }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Removed;