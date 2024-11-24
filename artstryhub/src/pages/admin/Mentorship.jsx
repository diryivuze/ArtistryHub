import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { 
  UserCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronDown,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminMentorship = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const userRole = 'admin';
  const navigate = useNavigate();

  // Simulated mentorship data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      const mockData = [
        {
          id: 1,
          artistName: "John Doe",
          projectTitle: "Digital Art Portfolio",
          status: "pending",
          submittedDate: "2024-03-20",
          description: "Looking for guidance in digital art techniques",
          expertise: ["Digital Art", "Illustration"],
          timeline: "3 months"
        },
        {
          id: 2,
          artistName: "Jane Smith",
          projectTitle: "Animation Series",
          status: "approved",
          submittedDate: "2024-03-18",
          description: "Need mentorship for character animation",
          expertise: ["Animation", "Character Design"],
          timeline: "6 months"
        },
        // Add more mock data as needed
      ];

      setTimeout(() => {
        setMentorshipRequests(mockData);
        setFilteredRequests(mockData);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let results = mentorshipRequests;
    
    if (searchQuery) {
      results = results.filter(request => 
        request.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      results = results.filter(request => request.status === filterStatus);
    }
    
    setFilteredRequests(results);
  }, [searchQuery, filterStatus, mentorshipRequests]);

  const handleStatusChange = async (requestId, newStatus) => {
    setMentorshipRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
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
            <h1 className="text-2xl font-bold">Manage Mentorship Requests</h1>
            
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white w-full md:w-48"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">{request.artistName}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-full">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(request.id, 'approved')}
                          className="text-green-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(request.id, 'rejected')}
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Project</p>
                        <p className="text-sm">{request.projectTitle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Timeline</p>
                        <p className="text-sm">{request.timeline}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Expertise Needed</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {request.expertise.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className={`flex items-center text-sm ${getStatusColor(request.status)}`}>
                          {request.status === 'approved' && <UserCheck className="mr-1 h-4 w-4" />}
                          {request.status === 'pending' && <Clock className="mr-1 h-4 w-4" />}
                          {request.status === 'rejected' && <XCircle className="mr-1 h-4 w-4" />}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMentorship;