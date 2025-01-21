import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, 
  FaTimes, 
  FaRegClock, 
  FaPalette, 
  FaLightbulb,
  FaComments,
  FaCalendarAlt
} from 'react-icons/fa';

const AdminMentorship = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mentorshipRequests, setMentorshipRequests] = useState([
    {
      id: 1,
      username: "louechristian",
      project: "Digital Art Gallery",
      projectType: "Visual Arts",
      date: "2024-11-27",
      time: "10:00 AM",
      status: "pending",
      description: "Looking for guidance on creating an immersive digital art experience with interactive elements.",
      tags: ["Digital Art", "Interactive", "Web Gallery"]
    },
    {
      id: 2,
      username: "dave_niyo",
      project: "Music Visualization Platform",
      projectType: "Sound Art",
      date: "2024-11-24",
      time: "2:00 PM",
      status: "accepted",
      description: "Need support in developing real-time audio visualization techniques for live performances.",
      tags: ["Audio", "Visualization", "Performance"]
    },
    {
      id: 3,
      username: "pendovestine",
      project: "AR Art Installation",
      projectType: "Mixed Reality",
      date: "2024-11-21",
      time: "11:00 AM",
      status: "denied",
      description: "Seeking mentorship for creating an augmented reality art installation in public spaces.",
      tags: ["AR", "Installation", "Public Art"]
    }
  ]);

  const [filter, setFilter] = useState('all');

  const updateStatus = (id, newStatus) => {
    setMentorshipRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 border-yellow-300';
      case 'accepted':
        return 'bg-green-100 border-green-300';
      case 'denied':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getProjectIcon = (type) => {
    switch (type) {
      case 'Visual Arts':
        return <FaPalette className="text-purple-500" />;
      case 'Sound Art':
        return <FaLightbulb className="text-blue-500" />;
      case 'Mixed Reality':
        return <FaComments className="text-green-500" />;
      default:
        return <FaPalette className="text-gray-500" />;
    }
  };

  const filteredRequests = mentorshipRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        userRole="admin"
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardNav
          userRole="admin"
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gray-950 bg-clip-text text-transparent">
              Artistry Mentorship Requests
            </h1>
            
            {/* Filter Buttons */}
            <div className="flex gap-2 mt-4 md:mt-0">
              {['all', 'pending', 'accepted', 'denied'].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${filter === status 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-white text-gray-600 hover:bg-purple-100'}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mentorship Request Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredRequests.map((request) => (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white p-6 rounded-xl shadow-lg border-2 ${getStatusColor(request.status)}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getProjectIcon(request.projectType)}
                      <h2 className="text-lg font-bold">{request.username}</h2>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium
                      ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        request.status === 'accepted' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaPalette className="text-red-500" />
                      <p className="font-medium">{request.project}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <p className="text-sm text-gray-600">
                        {request.date} at {request.time}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {request.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {request.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateStatus(request.id, 'accepted')}
                      className={`p-2 rounded-lg transition flex-1 ${
                        request.status === 'accepted'
                          ? 'bg-green-500 text-white'
                          : 'bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                      }`}
                    >
                      <FaCheck size={20} className="mx-auto" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateStatus(request.id, 'denied')}
                      className={`p-2 rounded-lg transition flex-1 ${
                        request.status === 'denied'
                          ? 'bg-red-500 text-white'
                          : 'bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <FaTimes size={20} className="mx-auto" />
                    </motion.button>
                    {request.status === 'pending' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg transition flex-1 bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                      >
                        <FaRegClock size={20} className="mx-auto animate-spin" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMentorship;