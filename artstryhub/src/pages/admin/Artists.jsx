// src/pages/Admin/Artists.jsx
import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminArtists = () => {
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
      
      <DashboardNav userRole={userRole} /> {/* Pass 'userRole' consistently */}
      
      <h1 className="text-2xl font-bold">Manage Artists</h1>
      <div>Manage user profiles and artworks.</div>
    </div>
  );
};

export default AdminArtists;
