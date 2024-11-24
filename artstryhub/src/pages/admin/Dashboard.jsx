import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle,
  Menu,
  X,
  Users,
  Palette,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 7000 },
    { month: 'Mar', revenue: 6500 },
    { month: 'Apr', revenue: 8000 },
    { month: 'May', revenue: 9500 },
    { month: 'Jun', revenue: 11000 },
  ];

  const stats = [
    { title: 'Total Users', value: '12,345', icon: Users, change: '+12%' },
    { title: 'Active Artists', value: '3,456', icon: Palette, change: '+8%' },
    { title: 'Monthly Revenue', value: '$45,678', icon: DollarSign, change: '+15%' },
    { title: 'Artwork Sales', value: '789', icon: TrendingUp, change: '+5%' },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Simulate notifications
      setNotifications([
        { id: 1, message: 'New artist registration needs approval', type: 'warning' },
        { id: 2, message: 'Monthly revenue report is ready', type: 'info' },
      ]);
    }, 1000);
  }, []);

  const StatCard = ({ stat }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <stat.icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {stat.change} from last month
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Nav */}
        <DashboardNav
          onMenuClick={() => setIsSidebarOpen(true)}
          notifications={notifications}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Alert key={notification.id} variant={notification.type === 'warning' ? 'destructive' : 'default'}>
                      <AlertDescription>{notification.message}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Manage Users' },
              { icon: Settings, label: 'Settings' },
              { icon: Calendar, label: 'Schedule' },
              { icon: HelpCircle, label: 'Help' },
            ].map((action, index) => (
              <Card
                key={index}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => navigate(`/admin/${action.label.toLowerCase()}`)}
              >
                <div className="flex flex-col items-center space-y-2">
                  <action.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;