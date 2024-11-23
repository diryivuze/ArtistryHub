// src/pages/Admin/Events.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { useNavigate } from 'react-router-dom'; // Only use if necessary

const AdminEvents = () => {
  // Form state to manage event details
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (example functionality)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Data Submitted:', eventData);
    // Here you can add your form submission logic (API call, etc.)
    // If you want to navigate after form submission, you can use navigate:
    // navigate('/some-path');
  };

  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state (collapsed or expanded)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const userRole = 'Admin'; // Example role

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
      <DashboardNav userRole={userRole} />

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-4">Manage Events</h1>

        {/* Event Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={eventData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Event Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Event Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={eventData.date}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Event
            </button>
          </form>
        </div>

        {/* Events List (Placeholder) */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <p>No events available yet.</p>
            {/* You can dynamically map your events here once you fetch data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
