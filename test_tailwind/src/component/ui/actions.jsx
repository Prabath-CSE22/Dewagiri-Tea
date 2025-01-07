import React, { useState } from 'react';

const Actions = () => {
  const [selectedAction, setSelectedAction] = useState('');

  const handleSelectChange = (e) => {
    setSelectedAction(e.target.value);
    // Optionally, handle specific actions here
    if (e.target.value === '1') {
      console.log('Suspend action selected');
    } else if (e.target.value === '2') {
      console.log('Remove action selected');
    }
  };

  return (
    <div className="absolute inline-block text-left">
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <select
              value={selectedAction}
              onChange={handleSelectChange}
              className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Good</option>
              <option value="1">Suspend</option>
              <option value="2">Remove</option>
            </select>
          </div>
        </div>
 
    </div>
  );
};

export default Actions;

