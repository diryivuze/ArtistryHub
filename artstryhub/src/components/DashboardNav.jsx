import React, { useState } from 'react';
import { Menu, UserCircle, ChevronDown, Bell, Search } from 'lucide-react';
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
      <button
        className="md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Dashboard Title */}
      {!isCollapsed && (
        <h1 className="text-lg font-bold hidden md:block">
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
        </h1>
      )}

      {/* Search Bar (Mobile Responsive) */}
      <div className="md:hidden">
        <Search size={20} />
      </div>

      {/* Profile Dropdown */}
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600">
          <UserCircle size={20} />
          {!isCollapsed && <span>{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>}
          {!isCollapsed && <ChevronDown size={16} />}
        </button>

        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
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
