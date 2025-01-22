import React from 'react';

const StatCard = ({ title, value, change, positive }) => (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[99%] border border-gray-200">
      {/* Title */}
      <h3 className="text-xs font-semibold text-gray-600 tracking-wide uppercase">{title}</h3>
      
      {/* Value and Change */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <div className="flex items-center gap-1">
          <i
            className={`bx ${
              positive ? 'bx-trending-up text-green-500' : 'bx-trending-down text-red-500'
            } text-lg`}
          ></i>
          <p className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        </div>
      </div>
    </div>
  );
  

export default StatCard;