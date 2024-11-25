import React, { useState } from 'react';
import { Calendar, MapPin, Users, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    imageUrl: 'https://joelartista.com/wp-content/uploads/2022/12/uganda-bidibidi-low-res-32.jpg',
  },
  {
    id: 3,
    title: 'Urban Sketching Expedition',
    date: 'Feb 10, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'ArtistryHub Main Office',
    description: 'Explore the city through art. Bring your sketchbooks and capture urban landscapes.',
    attendees: 30,
    type: 'In-Person',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThse4El92lDy0Uh-esVUE4cZLuwoUGL3ptmg&s',
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
    imageUrl: 'https://richlyafrican.org/wp-content/uploads/2023/11/Why-AI-Must-Begin-to-Learn-About-Africa.png',
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleRegister = () => {
    alert(`Thank you, ${form.name || 'Guest'}! You have successfully registered for ${selectedEvent?.title || 'the event'}.`);
    setForm({ name: '', email: '' });
    setSelectedEvent(null);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-500 min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mt-10 mb-6">
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
              className="transition-transform"
            >
              <div
                className="cursor-pointer bg-red-500 shadow-lg hover:shadow-lg transition-shadow transform hover:scale-105 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg overflow-hidden"
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
                      className={`text-xs font-semibold ${event.type === 'Online' ? 'text-blue-600' : event.type === 'In-Person' ? 'text-green-600' : 'text-purple-600'}`}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <h2 className="flex items-center text-lg font-semibold">
                    <Calendar className="mr-2 text-blue-500" />
                    {event.title}
                  </h2>
                  <p className="flex items-center text-sm text-gray-300">
                    <MapPin className="mr-2 text-red-500" size={16} />
                    {event.location}
                  </p>
                </div>
                <div className="px-4 py-2 flex justify-between items-center text-sm text-gray-200">
                  <div className="flex items-center">
                    <Users className="mr-2 text-green-500" />
                    {event.attendees} Attending
                  </div>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center text-purple-500 hover:text-purple-700"
                  >
                    <PlusCircle className="mr-1" />
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Events;
