import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  Filter, 
  Search, 
  Mail, 
  Trash2, 
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const AdminFeedback = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const userRole = 'admin';
  const navigate = useNavigate();

  // Sample feedback data - Replace with actual API call
  useEffect(() => {
    const fetchFeedback = async () => {
      // Simulate API call
      setTimeout(() => {
        setFeedbackList([
          {
            id: 1,
            user: 'John Doe',
            email: 'john@example.com',
            type: 'suggestion',
            subject: 'New Feature Request',
            message: 'It would be great to have a dark mode option.',
            status: 'pending',
            date: '2024-03-20',
            rating: 4
          },
          {
            id: 2,
            user: 'Jane Smith',
            email: 'jane@example.com',
            type: 'bug',
            subject: 'Mobile View Issue',
            message: 'The gallery is not loading properly on mobile devices.',
            status: 'resolved',
            date: '2024-03-19',
            rating: 2
          },
          // Add more sample feedback items
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchFeedback();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleFeedbackAction = (id, action) => {
    setFeedbackList(prevList => 
      prevList.map(item => 
        item.id === id 
          ? { ...item, status: action } 
          : item
      )
    );
  };

  const handleDeleteFeedback = (id) => {
    setFeedbackList(prevList => 
      prevList.filter(item => item.id !== id)
    );
  };

  const filteredFeedback = feedbackList
    .filter(item => 
      (selectedFilter === 'all' || item.status === selectedFilter) &&
      (item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.user.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="flex h-screen bg-gray-50">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

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

        <div className="p-4 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Manage Feedback</h1>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <select
                className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">All Feedback</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeedback.map(feedback => (
                <Card 
                  key={feedback.id}
                  className="transform transition-all duration-200 hover:scale-102 hover:shadow-lg"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {feedback.subject}
                    </CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      feedback.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      feedback.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {feedback.status}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="mr-2 h-4 w-4" />
                        {feedback.email}
                      </div>
                      <p className="text-sm text-gray-700">{feedback.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{feedback.date}</span>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => handleFeedbackAction(feedback.id, 'resolved')}
                          className="p-1 hover:bg-green-100 rounded-full transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </button>
                        <button
                          onClick={() => handleFeedbackAction(feedback.id, 'in-progress')}
                          className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                        >
                          <AlertCircle className="h-5 w-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteFeedback(feedback.id)}
                          className="p-1 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredFeedback.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No feedback found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;