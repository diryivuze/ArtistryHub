import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  ChevronLeft,
  Image,
  UserCircle,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const adminMenuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { title: 'Events', icon: Calendar, path: '/admin/events' },
  { title: 'Artists', icon: Users, path: '/admin/artists' },
  { title: 'Feedback', icon: MessageSquare, path: '/admin/feedback' },
  { title: 'Mentorship', icon: User, path: '/admin/mentorship' },
];

const artistMenuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/artist/dashboard' },
  { title: 'Events', icon: Calendar, path: '/artist/events' },
  { title: 'Projects', icon: Image, path: '/artist/projects' },
  { title: 'Settings', icon: Settings, path: '/artist/settings' },
];

const Sidebar = ({userRole}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const menuItems = userRole == 'Admin' ? adminMenuItems : artistMenuItems;
 

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovered(false);
    }
  };

  return (
    <motion.div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 relative`}
      animate={{ width: isCollapsed ? '80px' : '256px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-red-600 rounded-full p-1 text-white hover:bg-red-700 transition-colors"
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft size={20} />
        </motion.div>
      </button>

      {/* Profile Section */}
      <div className={`p-4 ${isCollapsed ? 'items-center' : ''} flex flex-col gap-2`}>
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
            <UserCircle size={32} />
          </div>
        </div>
        {!isCollapsed && (
          <div className="text-center">
            <h3 className="font-semibold">Patrick Nayituriki</h3>
            <p className="text-xs text-gray-400">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {!isCollapsed && (
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-grow overflow-y-auto">
        <ul className="py-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.li
                key={item.path}
                whileHover={{ x: 4 }}
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 space-x-3 ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  } transition-colors relative group`}
                >
                  <item.icon size={20} />
                  {(!isCollapsed || isHovered) && (
                    <span className="transition-opacity duration-200">
                      {item.title}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 w-1 h-full bg-red-400"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>


      {/* Logout Section */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors">
          <LogOut size={20} />
          {(!isCollapsed || isHovered) && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;