import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronDown, 
  Search,
  Filter,
  CheckCircle,
  Clock,
  CalendarDays
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminEvents = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Art Exhibition 2024',
      status: 'completed',
      date: '2024-03-15',
      participants: 45,
      description: 'Annual art exhibition featuring local artists',
      category: 'Exhibition'
    },
    {
      id: 2,
      title: 'Digital Art Workshop',
      status: 'progressing',
      date: '2024-04-20',
      participants: 30,
      description: 'Learn digital art techniques from experts',
      category: 'Workshop'
    },
    {
      id: 3,
      title: 'Photography Contest',
      status: 'upcoming',
      date: '2024-05-10',
      participants: 0,
      description: 'City-wide photography competition',
      category: 'Contest'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    status: '',
    description: '',
    category: ''
  });
  
  const userRole = 'admin';
  const navigate = useNavigate();

  const filteredEvents = events
    .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(event => filterStatus === 'all' ? true : event.status === filterStatus);

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1, participants: 0 }]);
    setNewEvent({
      title: '',
      date: '',
      status: '',
      description: '',
      category: ''
    });
    setIsAddEventOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'progressing':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'progressing':
        return <Clock className="w-4 h-4" />;
      case 'upcoming':
        return <CalendarDays className="w-4 h-4" />;
      default:
        return null;
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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Manage Events
            </h1>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="progressing">In Progress</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>

              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                      Create a new event for ArtistryHub
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Event Title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                    <Select 
                      value={newEvent.status}
                      onValueChange={(value) => setNewEvent({...newEvent, status: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="progressing">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Category"
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    />
                    <textarea
                      className="w-full p-2 border rounded-md"
                      placeholder="Event Description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddEvent}>Create Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id}
                className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold">{event.title}</CardTitle>
                  <div className="flex gap-2">
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button 
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(event.status)}`}>
                        {getStatusIcon(event.status)}
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{event.category}</span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Event Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Event Title"
                value={selectedEvent.title}
                onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
              />
              <Input
                type="date"
                value={selectedEvent.date}
                onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
              />
              <Select 
                value={selectedEvent.status}
                onValueChange={(value) => setSelectedEvent({...selectedEvent, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="progressing">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Category"
                value={selectedEvent.category}
                onChange={(e) => setSelectedEvent({...selectedEvent, category: e.target.value})}
              />
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Event Description"
                value={selectedEvent.description}
                onChange={(e) => setSelectedEvent({...selectedEvent, description: e.target.value})}
                rows={3}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => {
                setEvents(events.map(e => e.id === selectedEvent.id ? selectedEvent : e));
                setSelectedEvent(null);
              }}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminEvents;