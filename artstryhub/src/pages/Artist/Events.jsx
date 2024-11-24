import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { Filter, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import EventCard from '../../components/EventCard';

const Events = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Digital Art Exhibition 2024',
      description: 'Join us for an immersive digital art experience...',
      date: '2024-12-01',
      location: 'Virtual Reality Gallery',
      status: 'Upcoming',
      isJoined: false,
      participants: 156,
      rating: 4.8,
      duration: '3 hours',
      tags: ['Digital Art', 'VR', 'Interactive'],
      requirements: [
        'VR headset (optional)',
        'High-speed internet connection',
        'Basic knowledge of virtual gallery navigation',
      ],
    },
    {
      id: 2,
      title: 'Traditional Painting Workshop',
      description: 'Learn classical oil painting techniques...',
      date: '2024-11-29',
      location: 'Art Studio Central',
      status: 'In Progress',
      isJoined: true,
      participants: 28,
      rating: 4.9,
      duration: '4 hours',
      tags: ['Oil Painting', 'Traditional Art', 'Workshop'],
      requirements: [
        'Basic painting supplies',
        'Easel',
        'Protective clothing',
      ],
    },
    {
      id: 3,
      title: 'Photography Masterclass',
      description: 'Master the art of photography...',
      date: '2024-11-10',
      location: 'Online',
      status: 'Completed',
      isJoined: false,
      participants: 42,
      rating: 4.7,
      duration: '2 hours',
      tags: ['Photography', 'Digital', 'Editing'],
      requirements: [
        'DSLR Camera',
        'Basic photography knowledge',
        'Photo editing software',
      ],
    },
  ]);

  const handleStatusFilter = (status) => setFilterStatus(status);
  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredEvents = events.filter(
    (event) =>
      (filterStatus === 'all' || event.status.toLowerCase() === filterStatus) &&
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 overflow-auto">
        <DashboardNav userRole={"artist"} />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-3xl font-bold text-gray-800">Events</span>
            <div className="flex gap-2 hidden sm:flex"> {/* Hide on mobile */}
              <button
                onClick={() => handleStatusFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleStatusFilter('upcoming')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'upcoming' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => handleStatusFilter('in progress')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'in progress' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filterStatus === 'completed' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onJoinEvent={(id) => {
                    setEvents((prev) =>
                      prev.map((event) =>
                        event.id === id ? { ...event, isJoined: !event.isJoined } : event
                      )
                    );
                  }}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Events;
