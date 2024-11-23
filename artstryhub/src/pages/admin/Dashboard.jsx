// src/pages/Admin/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle } from 'lucide-react'; // Only import what's used
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../../components/DashboardNav';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state (collapsed or expanded)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Profile menu toggle
  const userRole = 'Admin'; // Example role
  const navigate = useNavigate(); // Navigation hook

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        <DashboardNav userRole={userRole} /> {/* Ensure consistency with userRole */}

        {/* Main Content */}
        <div className="flex-grow p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            {/* Profile Avatar */}
            <div className="relative">
              <UserCircle
                className="w-8 h-8 text-gray-700 cursor-pointer"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              />
              {/* Profile Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md ring-1 ring-gray-100">
                  <ul>
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer">Settings</li>
                    <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Dashboard Analytics/Graphs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for Analytics Cards */}
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-medium">Total Users</h2>
              <p className="text-3xl font-bold">1,250</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-medium">Sales</h2>
              <p className="text-3xl font-bold">$10,300</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-medium">New Orders</h2>
              <p className="text-3xl font-bold">320</p>
            </div>
          </div>

          {/* Additional Analytics or Progress Graphs */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold">Monthly Performance</h2>
            <div className="mt-4">Graph/Chart Placeholder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
