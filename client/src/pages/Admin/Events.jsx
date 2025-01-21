import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, Edit, Plus, Check, AlertCircle, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminEvents = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, name: 'AI in Creative Arts Symposium', status: 'completed', image: 'https://richlyafrican.org/wp-content/uploads/2023/11/Why-AI-Must-Begin-to-Learn-About-Africa.png' },
    { id: 2, name: 'Urban Sketching Expedition', status: 'progressing', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThse4El92lDy0Uh-esVUE4cZLuwoUGL3ptmg&s' },
    { id: 3, name: 'Digital Art Workshop', status: 'upcoming', image: 'https://joelartista.com/wp-content/uploads/2022/12/uganda-bidibidi-low-res-32.jpg' },
  ]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventStatus, setNewEventStatus] = useState('upcoming');
  const [showAlert, setShowAlert] = useState(false);
  const userRole = 'admin';
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'progressing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleAddEvent = () => {
    if (newEventName.trim()) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: prevEvents.length + 1,
          name: newEventName,
          status: newEventStatus,
          image: '/api/placeholder/400/320',
        },
      ]);
      setNewEventName('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100">
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

      <Sidebar
        userRole={userRole}
        isCollapsed={isCollapsed}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardNav
          userRole={userRole}
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="p-4 md:p-8 overflow-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6 text-gray-800"
          >
            Manage Events
          </motion.h1>

          <AnimatePresence>
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4"
              >
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Event added successfully!
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <input
                type="text"
                placeholder="Event Name"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                className="flex-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <select
                value={newEventStatus}
                onChange={(e) => setNewEventStatus(e.target.value)}
                className="w-full md:w-auto border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="completed">Completed</option>
                <option value="progressing">In Progress</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddEvent}
                className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" /> Add Event
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {['completed', 'progressing', 'upcoming'].map((status) => (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold capitalize mb-4 flex items-center gap-2">
                  {getStatusIcon(status)}
                  <span>{status} Events</span>
                </h2>
                <AnimatePresence>
                  {events
                    .filter((event) => event.status === status)
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="mb-4 last:mb-0"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium truncate">{event.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              {getStatusIcon(status)}
                              <span className="text-sm capitalize text-gray-600">{status}</span>
                            </div>
                          </div>
                          <div className="flex gap-3">

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-500 hover:text-red-700 p-2"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;