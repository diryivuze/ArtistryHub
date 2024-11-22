import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Users, 
  Search, 
  Filter,
  MessageCircle, 
  Star,
  Tags,
  ChevronDown,
  UserPlus,
  Clock,
  Palette,
  Heart,
  Share2
} from 'lucide-react';

const Collaborations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('find');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const collaborations = [
    {
      id: 1,
      title: "Comic Book Series",
      creator: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/40/40",
        rating: 4.8
      },
      description: "Looking for illustrators and writers to create a 5-issue sci-fi comic series",
      category: "Illustration",
      status: "open",
      requiredRoles: ["Illustrator", "Writer", "Colorist"],
      skillsNeeded: ["Digital Art", "Storytelling", "Comic Design"],
      timeline: "6 months",
      compensation: "Revenue share",
      image: "/api/placeholder/400/250",
      participants: 3,
      maxParticipants: 5
    },
    {
      id: 2,
      title: "Animation Short Film",
      creator: {
        name: "Mike Ross",
        avatar: "/api/placeholder/40/40",
        rating: 4.5
      },
      description: "Seeking animators and sound designers for a 3-minute animated short",
      category: "Animation",
      status: "open",
      requiredRoles: ["Animator", "Sound Designer", "Character Artist"],
      skillsNeeded: ["2D Animation", "Sound Design", "Character Design"],
      timeline: "4 months",
      compensation: "Fixed pay",
      image: "/api/placeholder/400/250",
      participants: 2,
      maxParticipants: 4
    },
    // Add more collaboration projects as needed
  ];

  const categories = ["All", "Illustration", "Animation", "Game Art", "Concept Art", "Comics", "Fine Art"];
  const statuses = ["All", "Open", "In Progress", "Completed"];

  const filteredCollaborations = collaborations.filter(collab => {
    const matchesSearch = collab.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || collab.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || collab.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const CollaborationCard = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInterested, setIsInterested] = useState(false);

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'open' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              <div className="flex items-center mt-2 space-x-2">
                <img 
                  src={project.creator.avatar} 
                  alt={project.creator.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600">{project.creator.name}</span>
                <div className="flex items-center text-yellow-500">
                  <Star size={14} className="fill-current" />
                  <span className="text-sm ml-1">{project.creator.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {project.participants}/{project.maxParticipants} members
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-4">{project.description}</p>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.requiredRoles.map((role, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${
              isExpanded ? 'max-h-96' : 'max-h-0'
            }`}>
              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.skillsNeeded.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Compensation</h4>
                    <div className="flex items-center text-gray-600">
                      <Star size={16} className="mr-2" />
                      <span>{project.compensation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsInterested(!isInterested)}
                className={`flex items-center space-x-1 ${
                  isInterested ? 'text-blue-600' : 'text-gray-600'
                } hover:text-blue-600 transition-colors duration-300`}
              >
                <UserPlus size={18} />
                <span className="text-sm font-medium">
                  {isInterested ? 'Interested' : 'Join'}
                </span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <MessageCircle size={18} />
                <span className="text-sm">Contact</span>
              </button>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
            >
              <span className="text-sm font-medium">
                {isExpanded ? 'Show Less' : 'Show More'}
              </span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Together
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connect with talented artists, join exciting projects, and bring creative visions to life through collaboration.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search collaborations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value.toLowerCase())}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value.toLowerCase())}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map((status, index) => (
                  <option key={index} value={status.toLowerCase()}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {['find', 'my projects', 'saved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollaborations.map((collab) => (
            <CollaborationCard key={collab.id} project={collab} />
          ))}
        </div>

        {filteredCollaborations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No collaborations found matching your criteria</p>
          </div>
        )}

        {/* Create New Project CTA */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
            Start a New Project
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Collaborations;