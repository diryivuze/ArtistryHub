import React, { useState } from 'react';
import { Calendar, MapPin, Users, PlusCircle, Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const eventData = [
  {
    id: 2,
    title: 'Digital Art Workshop',
    date: 'Jan 22, 2025',
    time: '10:00 AM - 1:00 PM',
    location: 'Online Platform',
    description: 'Learn advanced digital art techniques from industry professionals. Includes live demonstrations and Q&A.',
    attendees: 100,
    type: 'Online',
    imageUrl: '/api/placeholder/400/250?text=Digital+Art',
  },
  {
    id: 3,
    title: 'Urban Sketching Expedition',
    date: 'Feb 10, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'City Downtown Art District',
    description: 'Explore the city through art. Bring your sketchbooks and capture urban landscapes.',
    attendees: 30,
    type: 'In-Person',
    imageUrl: '/api/placeholder/400/250?text=Urban+Sketching',
  },
  {
    id: 4,
    title: 'AI in Creative Arts Symposium',
    date: 'Mar 5, 2025',
    time: '2:00 PM - 6:00 PM',
    location: 'Tech Innovation Center',
    description: 'Cutting-edge discussions on AI role in artistic creation and design.',
    attendees: 75,
    type: 'Hybrid',
    imageUrl: '/api/placeholder/400/250?text=AI+Arts',
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });

  const handleRegister = () => {
    if (form.name && form.email) {
      alert(`You have successfully registered for ${selectedEvent.title}!`);
      setForm({ name: '', email: '' });
      setSelectedEvent(null);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          Upcoming Events
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg md:text-xl text-center text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Discover and attend inspiring events to connect with fellow artists and creative enthusiasts.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {eventData.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow transform hover:scale-105 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="relative">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded">
                        <span
                          className={`text-xs font-semibold ${
                            event.type === 'Online'
                              ? 'text-blue-600'
                              : event.type === 'In-Person'
                              ? 'text-green-600'
                              : 'text-purple-600'
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Calendar className="mr-2 text-blue-500" />
                        {event.title}
                      </CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="mr-2 text-red-500" size={16} />
                        {event.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="mr-2 text-green-500" />
                        {event.attendees} Attending
                      </div>
                      <PlusCircle className="text-purple-500" />
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>📅 {selectedEvent?.date}</p>
                    <p>🕒 {selectedEvent?.time}</p>
                    <p>📍 {selectedEvent?.location}</p>
                    <p>🌐 Event Type: {selectedEvent?.type}</p>
                    <p className="text-gray-600">{selectedEvent?.description}</p>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-gray-300 px-4 py-2 rounded mb-2"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full border border-gray-300 px-4 py-2 rounded"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <button
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                      onClick={handleRegister}
                    >
                      Register for Event
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Events;
