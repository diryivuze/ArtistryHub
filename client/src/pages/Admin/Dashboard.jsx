
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  UserCircle, Users, DollarSign, Music2,  Activity,  Bell,RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state (collapsed or expanded)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const userRole = 'admin'; 
  const navigate = useNavigate();
  // Sample data for charts
const revenueData = [
  { month: 'Sept', revenue: 400, users: 4 },
  { month: 'Oct', revenue: 500, users: 10 },
  { month: 'Nov', revenue: 600, users: 16 }
];

const genreData = [
  { genre: 'Painting', count: 40 },
  { genre: 'Digital Art', count: 80 },
  { genre: 'Photograhy', count: 30 },
  { genre: 'Sclupture', count: 50 }
];
const [isLoading, setIsLoading] = useState(false);
const [notifications, setNotifications] = useState([]);
const StatCard = ({ icon, label, value, trend }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-full bg-blue-100">{icon}</div>
        <span className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-700">{value}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};
const refreshData = () => {
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
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

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Dashboard Nav */}
        <DashboardNav userRole={userRole} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded"
              >
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
            </div>

          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users size={24} className="text-blue-600" />}
              label="Total Users"
              value="200"
              trend={12.5}
            />
            <StatCard
              icon={<Music2 size={24} className="text-purple-600" />}
              label="Active Artists"
              value="193"
              trend={8.2}
            />
            <StatCard
              icon={<DollarSign size={24} className="text-green-600" />}
              label="Total Revenue"
              value="$1,000"
              trend={15.8}
            />
            <StatCard
              icon={<Activity size={24} className="text-orange-600" />}
              label="Active Sessions"
              value="4"
              trend={-3.2}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Revenue & User Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="users"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Popular Music Genres</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="genre" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <button className="text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
              {[1].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Activity size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New artist registration</p>
                    <p className="text-sm text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
       </div>
          </div>
         
  );
};

export default AdminDashboard;