import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Filter, 
  Calendar,
  MessageSquare,
  ThumbsUp,
  Eye,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ArtistProjects = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  const [projects, setProjects] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Sample project data
  const sampleProjects = [
    {
      id: 1,
      title: "Abstract Landscape",
      image: "https://i.etsystatic.com/7895875/r/il/5c39cb/2193045070/il_570xN.2193045070_3b2c.jpg",
      category: "Painting",
      likes: 245,
      views: 1200,
      comments: 45,
      date: "2024-03-15",
      status: "completed"
    },
    {
      id: 2,
      title: "Digital Portrait",
      image: "https://cdn-0.shelleyhannafineart.com/wp-content/uploads/2020/03/face3.jpg",
      category: "Digital Art",
      likes: 189,
      views: 890,
      comments: 32,
      date: "2024-03-20",
      status: "in-progress"
    }
  ];

  useEffect(() => {
    setProjects(sampleProjects);
  }, []);

  const ProjectCard = ({ project }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative group">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="p-2 bg-white rounded-full m-1 hover:bg-gray-100">
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 bg-white rounded-full m-1 hover:bg-gray-100">
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{project.category}</p>
        
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{project.views}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>{project.comments}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const UploadModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Upload New Project</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title</label>
            <input type="text" className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
              <option>Painting</option>
              <option>Digital Art</option>
              <option>Sculpture</option>
              <option>Photography</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Upload
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Dashboard Navigation */}
        <DashboardNav userRole={"artist"} />

        <div className="flex-grow p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Projects</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </motion.button>
          </div>

          <div className="mb-6 flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow hidden md:flex">
              <Filter className="w-5 h-5 text-gray-500" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-sm"
              >
                <option value="all">All Projects</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 bg-white rounded-full">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => filter === 'all' || project.status === filter)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>{showUploadModal && <UploadModal />}</AnimatePresence>
    </div>
  );
};

export default ArtistProjects;
