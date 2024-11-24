import React, { useState } from 'react';
import { UserCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardNav = ({ userRole, isSidebarOpen, setIsSidebarOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  // Event Handlers for Dropdown Items
  const handleSwitchRole = () => {
    if (userRole === 'admin') {
      // Simulating role switch
      alert('Switching to Artist role!');
    } else {
      alert('Switching to Admin role!');
    }
  };

  const handleManageUsers = () => {
    navigate('/admin/artists'); 
  };

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Mobile Menu Button */}

      {/* Dashboard Title */}
      {!isCollapsed && (
        <h1 className="text-lg font-bold hidden md:block">
          {userRole ? (userRole.charAt(0).toUpperCase() + userRole.slice(1)) : 'Dashboard'}
        </h1>
      )}

      {/* Profile Dropdown */}
      <div className="relative">
        {/* Add the `group` class to the parent div for dropdown hover functionality */}
        <button 
          className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 group"
        >
          <UserCircle size={20} />
          {!isCollapsed && <span>{userRole ? (userRole.charAt(0).toUpperCase() + userRole.slice(1)) : 'User'}</span>}
          {!isCollapsed && <ChevronDown size={16} />}
        </button>

        {/* Dropdown Menu */}
        <div 
          className={`absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-10 ${isCollapsed ? 'hidden' : ''}`}
        >
          <ul className="text-sm">
            {userRole === 'artist' ? (
              <>
                {/* Artist-specific dropdown items */}
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                {/* Admin-specific dropdown items */}
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={handleManageUsers}
                >
                  Manage Users
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
