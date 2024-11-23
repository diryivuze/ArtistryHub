// src/pages/Artist/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const ArtistDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Dashboard Navigation */}
        <DashboardNav userRole={"artist"} />

        {/* Dashboard Content */}
        <div className="flex-grow p-4">
          <h1 className="text-2xl font-bold mb-4">Artist Dashboard</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Progress graphs and analytics go here.</p>
            {/* Add any additional content or components here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
