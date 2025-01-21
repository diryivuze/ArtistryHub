import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { motion } from 'framer-motion'; // For animations
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons

const AdminSchedule = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state (collapsed or expanded)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [page, setPage] = useState(1); // Pagination state
  const [data, setData] = useState([]); // Data state for mentorship schedules
  const [editModalOpen, setEditModalOpen] = useState(false); // Modal state
  const [editSchedule, setEditSchedule] = useState(null); // Selected schedule for editing
  const userRole = 'admin'; // Example role
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Sample data for mentorship schedules
    const sampleData = [
      {
        id: 1,
        name: 'Loue Sauveur Christian',
        subject: 'Digital Art & Illustration',
        date: '2024-12-01',
        time: '10:00',
        status: 'Scheduled',
      },
      {
        id: 2,
        name: 'Daniel Iryivuze',
        subject: 'Sculpture Techniques & Materials',
        date: '2024-12-02',
        time: '11:00',
        status: 'Scheduled',
      },
      {
        id: 3,
        name: 'Pendo Vestine',
        subject: 'Painting Styles & Techniques',
        date: '2024-12-03',
        time: '14:00',
        status: 'Scheduled',
      },
      {
        id: 4,
        name: 'Vanessa Uwonkunda',
        subject: 'Digital Art Creation & Concept Design',
        date: '2024-12-04',
        time: '09:00',
        status: 'Scheduled',
      },
      {
        id: 5,
        name: 'Alain Michael',
        subject: '3D Modeling & Animation',
        date: '2024-12-05',
        time: '16:00',
        status: 'Scheduled',
      },
    ];

    setData(sampleData); // Set state with sample data
  }, []);

  const itemsPerPage = 5; // Items per page for pagination
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total pages

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Paginate the data
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const openEditModal = (schedule) => {
    setEditSchedule(schedule); // Set the schedule to edit
    setEditModalOpen(true); // Open the edit modal
  };

  const closeEditModal = () => {
    setEditModalOpen(false); // Close the edit modal
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id); // Remove the selected item
    setData(updatedData); // Update state with the new data
    closeEditModal(); // Close modal after deletion
  };

  const handleSave = () => {
    const updatedData = data.map(item =>
      item.id === editSchedule.id ? editSchedule : item
    );
    setData(updatedData); // Update state with the new data
    closeEditModal(); // Close modal after saving
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
      
      {/* Dashboard Navigation (Mobile Responsive) */}
      <div className="flex-1 flex flex-col">
        <DashboardNav 
          userRole={userRole} 
          openSidebar={() => setIsSidebarOpen(true)} 
        />

        {/* Main Content Area */}
        <div className="p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4">Manage Schedule</h1>
          
          {/* Table with scheduled mentorship */}
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-md"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.subject}</td>
                    <td className="py-2 px-4 border-b">{item.date}</td>
                    <td className="py-2 px-4 border-b">{item.time}</td>
                    <td className="py-2 px-4 border-b">{item.status}</td>
                    <td className="py-2 px-4 border-b flex space-x-2">
                      <button
                        onClick={() => openEditModal(item)} 
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)} 
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="bg-gray-300 p-2 rounded-md"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="bg-gray-300 p-2 rounded-md"
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit Schedule Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Schedule</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                value={editSchedule.date}
                onChange={(e) => setEditSchedule({ ...editSchedule, date: e.target.value })}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Time</label>
              <input
                type="time"
                value={editSchedule.time}
                onChange={(e) => setEditSchedule({ ...editSchedule, time: e.target.value })}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(editSchedule.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Delete
              </button>
              <div>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
