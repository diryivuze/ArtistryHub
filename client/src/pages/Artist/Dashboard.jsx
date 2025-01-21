import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Palette, 
  Calendar, 
  Users, 
  Star,
  TrendingUp,
  Award,
  MessageSquare,
  Bell,
  Menu,
  Home,
  Image,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ArtistDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse

  // Sample data for charts
  const artworkData = [
    { month: 'Jan', uploads: 4, views: 120, likes: 45 },
    { month: 'Feb', uploads: 6, views: 180, likes: 65 },
    { month: 'Mar', uploads: 8, views: 250, likes: 90 },
    { month: 'Apr', uploads: 5, views: 190, likes: 70 },
    { month: 'May', uploads: 9, views: 280, likes: 100 },
    { month: 'Jun', uploads: 7, views: 220, likes: 85 }
  ];

  const statsCards = [
    { title: 'Total Artworks', value: '38', icon: Palette, color: 'bg-red-500' },
    { title: 'Events Joined', value: '12', icon: Calendar, color: 'bg-purple-500' },
    { title: 'Total Views', value: '130', icon: Users, color: 'bg-green-500' },
    { title: 'Average Rating', value: '4.8', icon: Star, color: 'bg-yellow-500' }
  ];

  const recentActivities = [
    { type: 'upload', message: 'New artwork "Digital Art Exhibition 2024" uploaded', time: '4h ago' },
    { type: 'event', message: 'Joined Traditional Painting Workshop', time: '1d ago' },
    { type: 'feedback', message: 'Received feedback on "Abstract Landscape"', time: '2d ago' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar userRole={"artist"} isCollapsed={isCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Dashboard Navigation */}
        <DashboardNav userRole={"artist"} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Artist Overwiew</h1>

          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold mt-2">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">Growth Analytics</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={artworkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" />
                    <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="bg-red-100 p-2 rounded-lg mr-4">
                      {activity.type === 'upload' && <Palette className="w-5 h-5 text-red-600" />}
                      {activity.type === 'event' && <Calendar className="w-5 h-5 text-purple-600" />}
                      {activity.type === 'feedback' && <MessageSquare className="w-5 h-5 text-green-600" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Achievements</h2>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Best Digital Artist', 'Event Winner', '100 Views'].map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-white"
                >
                  <h3 className="font-semibold">{achievement}</h3>
                  <p className="text-sm opacity-80 mt-2">Awarded this month</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
