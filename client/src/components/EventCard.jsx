import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Star, 
  ChevronRight, 
  CheckCircle,
  Clock,
  Tag,
  Share2
} from 'lucide-react';

const EventCard = ({ event, onJoinEvent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    setIsSharing(true);
    setTimeout(() => setIsSharing(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative group">
        <img
          src={event.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPJdzjyGSfHI3Da02AXR5LuJvyrXdzMOVQ3R94z8MFPsv9DwOFeVX7fh4fSpkRxFjyuH4&usqp=CAU"}
          alt={event.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </motion.button>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.status === 'Upcoming'
                ? 'bg-green-100 text-green-600'
                : event.status === 'In Progress'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {event.status}
          </span>
        </div>
        {isSharing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm"
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{event.rating}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.participants} participants</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.duration}</span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm flex items-center"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              {event.requirements && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-red-600 text-sm font-medium flex items-center hover:text-red-700"
            whileHover={{ x: 5 }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronRight
              className={`w-4 h-4 ml-1 transform transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
              event.isJoined
                ? 'bg-gray-100 text-gray-600'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            onClick={() => onJoinEvent(event.id)}
          >
            {event.isJoined && <CheckCircle className="w-4 h-4 mr-2" />}
            {event.isJoined ? 'Joined' : 'Join Event'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
