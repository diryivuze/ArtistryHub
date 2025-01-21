import React, { useState } from 'react';
import { UserCircle, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardNav = ({ userRole, isSidebarOpen, setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate();

  // Event Handlers for Dropdown Items
  const handleManageUsers = () => {
    navigate('/admin/artists');
  };

  const handleLogout = () => {
    navigate('/login');
  };
  const handleSettings = () => {
    navigate('/artist/settings');
  };
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden flex items-center space-x-2"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="text-white">Menu</span>
      </motion.button>

      {/* Dashboard Title */}
      <h1 className="text-lg font-bold hidden md:block">
        {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Dashboard'}
      </h1>

      {/* Profile Dropdown */}
      <div className="relative">
        <motion.button
          className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 group"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <UserCircle size={20} />
          <span>{userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}</span>
          <ChevronDown size={16} />
        </motion.button>

        {/* Dropdown Menu */}
        {isDropdownOpen && ( // Show only when open
          <motion.div
            className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="text-sm">
              {userRole === 'artist' ? (
                <>

                  <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={handleSettings}>
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardNav;
