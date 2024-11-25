// src/pages/Admin/Events.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminEvents = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, name: 'Event 1', status: 'completed', image: '/images/event1.jpg' },
    { id: 2, name: 'Event 2', status: 'progressing', image: '/images/event2.jpg' },
    { id: 3, name: 'Event 3', status: 'upcoming', image: '/images/event3.jpg' },
  ]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventStatus, setNewEventStatus] = useState('upcoming');
  const userRole = 'admin';
  const navigate = useNavigate();

  const handleStatusChange = (id, status) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, status } : event
      )
    );
  };

  const handleAddEvent = () => {
    if (newEventName.trim()) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: prevEvents.length + 1,
          name: newEventName,
          status: newEventStatus,
          image: '/images/default.jpg',
        },
      ]);
      setNewEventName('');
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
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
        userRole={userRole}
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Dashboard Navigation */}
      <div className="flex-1 flex flex-col">
        <DashboardNav
          userRole={userRole}
          openSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

          {/* Add New Event */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-2">Add New Event</h2>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Event Name"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                className="flex-1 border p-2 rounded-lg"
              />
              <select
                value={newEventStatus}
                onChange={(e) => setNewEventStatus(e.target.value)}
                className="border p-2 rounded-lg"
              >
                <option value="completed">Completed</option>
                <option value="progressing">Progressing</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <button
                onClick={handleAddEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-transform transform hover:scale-105"
              >
                <FaPlus /> Add
              </button>
            </div>
          </div>

          {/* Event Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['completed', 'progressing', 'upcoming'].map((status) => (
              <div
                key={status}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold capitalize mb-3">
                  {status} Events
                </h2>
                <ul className="space-y-4">
                  {events
                    .filter((event) => event.status === status)
                    .map((event) => (
                      <li
                        key={event.id}
                        className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
                      >
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{event.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaCheckCircle
                              className={`${
                                status === 'completed'
                                  ? 'text-green-500'
                                  : 'text-gray-300'
                              }`}
                            />
                            <span className="text-sm capitalize">{status}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => navigate(`/edit-event/${event.id}`)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
