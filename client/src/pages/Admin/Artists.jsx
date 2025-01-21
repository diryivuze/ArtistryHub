// src/pages/Admin/Artists.jsx
import React, { useState } from 'react';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminArtists = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editArtist, setEditArtist] = useState(null); // Artist being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const artistsPerPage = 5; // Pagination limit
  const userRole = 'admin';

  const [artists, setArtists] = useState([
    {
      id: 1,
      username: 'pendovestine',
      fullName: 'Pendo Vestine',
      career: 'Painter',
      image: '/images/woman.png',
      location: 'Kigali - Rwanda',
      telephone: '+250 780 934 989',
    },
    {
      id: 2,
      username: 'diryivuze',
      fullName: 'Daniel Iryivuze',
      career: 'Sculptor',
      image: '/images/man.jpg',
      location: 'Los Angeles, USA',
      telephone: '+1 987 654 3210',
    },
    {
      id: 3,
      username: 'louechristian',
      fullName: 'Loue Sauveur Christian',
      career: 'Digital Artist',
      image: '/images/man.jpg',
      location: 'San Francisco, USA',
      telephone: '+1 555 666 7777',
    },
    {
      id: 4,
      username: 'vanessa',
      fullName: 'Vanessa Uwonkunda',
      career: 'Digital Artist',
      image: '/images/woman.png',
      location: 'Biryogo, Rwanda',
      telephone: '+250 783 683 927',
    },
  ]);

  const navigateToPage = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (artist) => {
    setEditArtist(artist);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setArtists((prevArtists) => prevArtists.filter((artist) => artist.id !== id));
  };

  const handleCloseModal = () => {
    setEditArtist(null);
    setIsModalOpen(false);
  };

  // Pagination logic
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

  const totalPages = Math.ceil(artists.length / artistsPerPage);

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
          <h1 className="text-2xl font-bold mb-4">Manage Artists</h1>

          {/* Artists Table */}
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-500 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Career</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentArtists.map((artist) => (
                  <tr key={artist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={artist.image}
                        alt={artist.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{artist.username}</td>
                    <td className="px-6 py-4">{artist.fullName}</td>
                    <td className="px-6 py-4">{artist.career}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(artist)}
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(artist.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Artist Modal */}
      {isModalOpen && editArtist && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Artist</h2>
            <div className="flex flex-col gap-3">
              <img
                src={editArtist.image}
                alt={editArtist.username}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={editArtist.fullName}
                  className="w-full border p-2 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  value={editArtist.username}
                  className="w-full border p-2 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={editArtist.location}
                  className="w-full border p-2 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Telephone</label>
                <input
                  type="text"
                  value={editArtist.telephone}
                  className="w-full border p-2 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Career</label>
                <input
                  type="text"
                  value={editArtist.career}
                  className="w-full border p-2 rounded"
                  readOnly
                />
              </div>
              <button
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArtists;
