// src/pages/Artist/Projects.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { UserCircle, ChevronDown } from 'lucide-react';
import DashboardNav from '../../components/DashboardNav';

const ArtistProjects = () => {
   const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  return (
    <div>
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />
      <DashboardNav userRole={"artist"}/>
      <h1 className="text-2xl font-bold">Manage Projects</h1>
      <div>Upload and view artworks.</div>
    </div>
  );
};

export default ArtistProjects;
