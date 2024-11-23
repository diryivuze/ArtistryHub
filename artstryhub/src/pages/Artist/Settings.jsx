// src/pages/Artist/Settings.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle, ChevronDown } from 'lucide-react';
import DashboardNav from '../../components/DashboardNav';

const ArtistSettings = () => {
   const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  return (
    <div>
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />
      <DashboardNav userRole={"artist"}/>
      <h1 className="text-2xl font-bold">Settings</h1>
      <div>Modify profile and professionalism.</div>
    </div>
  );
};

export default ArtistSettings;
