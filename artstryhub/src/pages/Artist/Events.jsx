// src/pages/Artist/Events.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle, ChevronDown } from 'lucide-react';
import DashboardNav from '../../components/DashboardNav';

const ArtistEvents = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
 
  return (
    <div>
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />
      <DashboardNav userRole={"artist"}/>
      <h1 className="text-2xl font-bold">View Events</h1>
      <div>View and join events.</div>
    </div>
  );
};

export default ArtistEvents;
