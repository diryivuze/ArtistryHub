// src/pages/Artist/Settings.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const ArtistSettings = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Dashboard Navigation */}
        <DashboardNav userRole={"artist"} />
  {/* Main Content */}
          <div className="flex-grow p-4">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Modify profile and professionalism.</p>
          </div>
        </div>
        </div>
      </div>
  );
};

export default ArtistSettings;
