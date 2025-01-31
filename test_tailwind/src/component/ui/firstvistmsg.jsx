import React from 'react';

import { AlertCircle } from "lucide-react";

const firstvistmsg = ({isFirstVist, setIsFirstVist}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="p-6 max-w-md text-center bg-white shadow-lg rounded-2xl border border-gray-300">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <h2 className="text-xl font-bold">This is your first visit!</h2>
          <p className="text-gray-600">Please update your details before proceeding.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
            onClick={() => {
                setIsFirstVist(!isFirstVist);
            }}
          >
            Update Details
          </button>
        </div>
      </div>
    </div>

  );
};

export default firstvistmsg;
