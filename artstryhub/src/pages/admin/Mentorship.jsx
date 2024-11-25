// src/pages/Admin/Mentorship.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { FaCheck, FaTimes, FaRegClock } from 'react-icons/fa'; // Importing icon libraries

const AdminMentorship = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mentorshipRequests, setMentorshipRequests] = useState([
    {
      id: 1,
      username: 'john_doe',
      project: 'AI-Powered Chatbot',
      date: '2024-11-25',
      time: '10:00 AM',
      status: 'pending',
      description: 'Looking for guidance on implementing AI for natural language processing in the chatbot.',
    },
    {
      id: 2,
      username: 'jane_smith',
      project: 'E-commerce Platform',
      date: '2024-11-26',
      time: '2:00 PM',
      status: 'accepted',
      description: 'Need support in setting up payment gateway integration for the e-commerce platform.',
    },
    {
      id: 3,
      username: 'mark_johnson',
      project: 'Healthcare App',
      date: '2024-11-27',
      time: '11:00 AM',
      status: 'denied',
      description: 'Looking for advice on HIPAA compliance for telemedicine functionality in the healthcare app.',
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setMentorshipRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

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
        userRole="admin"
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Dashboard Navigation */}
      <div className="flex-1 flex flex-col">
        <DashboardNav
          userRole="admin"
          openSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Main Content */}
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">Manage Mentorship Requests</h1>

          {/* Mentorship Request List */}
          <div className="space-y-6">
            {mentorshipRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Request Info */}
                <div className="mb-4">
                  <h2 className="text-lg font-bold">{request.username}</h2>
                  <p className="text-gray-500 text-sm">
                    Project: <span className="font-medium">{request.project}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Date: <span className="font-medium">{request.date}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Time: <span className="font-medium">{request.time}</span>
                  </p>
                  <p
                    className={`text-sm font-medium mt-2 ${
                      request.status === 'pending'
                        ? 'text-yellow-500'
                        : request.status === 'accepted'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    Status: {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </p>
                </div>

                {/* Mentorship Description - Support Needed */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-600">Support Needed:</h3>
                  <p className="text-gray-700 text-sm mt-2">{request.description}</p>
                </div>

                {/* Action Buttons with Icons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => updateStatus(request.id, 'accepted')}
                    className={`p-2 rounded-md transition ${
                      request.status === 'accepted'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white'
                    }`}
                  >
                    <FaCheck size={20} />
                  </button>
                  <button
                    onClick={() => updateStatus(request.id, 'denied')}
                    className={`p-2 rounded-md transition ${
                      request.status === 'denied'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <FaTimes size={20} />
                  </button>
                  {request.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(request.id, 'pending')}
                      className="p-2 rounded-md transition bg-yellow-200 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                    >
                      <FaRegClock size={20} className="animate-spin" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMentorship;
