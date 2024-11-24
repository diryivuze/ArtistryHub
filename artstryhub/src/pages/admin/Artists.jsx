import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Mail
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AdminArtists = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const userRole = 'admin';
  const navigate = useNavigate();

  // Mock data - Replace with actual API call
  const mockArtists = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      artworks: 15,
      status: 'active',
      joinDate: '2024-01-15',
      avatar: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      artworks: 23,
      status: 'pending',
      joinDate: '2024-02-20',
      avatar: '/api/placeholder/100/100'
    },
    // Add more mock data as needed
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArtists(mockArtists);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || artist.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (artistId) => {
    // Add confirmation dialog and API call
    setArtists(artists.filter(artist => artist.id !== artistId));
  };

  const handleEdit = (artistId) => {
    // Navigate to edit page
    navigate(`/admin/artists/edit/${artistId}`);
  };

  const handleView = (artistId) => {
    // Navigate to view page
    navigate(`/admin/artists/view/${artistId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNav
          onSidebarOpen={() => setIsSidebarOpen(true)}
          userRole={userRole}
        />

        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold flex items-center gap-2 mb-4 md:mb-0">
                <Users className="h-6 w-6" />
                Manage Artists
              </h1>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search artists..."
                    className="pl-10 pr-4 py-2 border rounded-lg w-full"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <Filter className="h-5 w-5" />
                    Filter
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleFilter('all')}>
                      All Artists
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilter('active')}>
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFilter('pending')}>
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Artists Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <Card key={n} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-24 bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <Card 
                    key={artist.id}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{artist.name}</h3>
                            <p className="text-gray-500 text-sm">{artist.email}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleView(artist.id)}
                              className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(artist.id)}
                              className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(artist.id)}
                              className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="text-sm">
                          <p className="text-gray-500">Artworks</p>
                          <p className="font-semibold">{artist.artworks}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Status</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                            ${artist.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {artist.status.charAt(0).toUpperCase() + artist.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => window.location.href = `mailto:${artist.email}`}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-lg
                          hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Mail className="h-4 w-4" />
                        Contact Artist
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminArtists;