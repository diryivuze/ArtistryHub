// src/pages/Artist/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle, ChevronDown } from 'lucide-react';
import DashboardNav from '../../components/DashboardNav';

const ArtistDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
 

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />
<DashboardNav userRole={"artist"}/>
      {/* Main Content Area */}
      <div className="flex-grow bg-gray-100">
        {/* Dashboard Content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold">Artist Dashboard</h1>
          <div>Progress graphs and analytics go here.</div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
