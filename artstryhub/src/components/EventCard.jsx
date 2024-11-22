import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Heart, Share2, ChevronRight } from 'lucide-react';

const EventCard = ({ 
  title, 
  date, 
  location, 
  image = "/api/placeholder/400/250",
  time = "7:00 PM",
  capacity = "150 seats",
  price = "Free",
  category = "Exhibition",
  description = "Join us for an amazing artistic experience"
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log('Sharing event:', title);
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <span className="text-blue-600 font-semibold">{price}</span>
        </div>

        {/* Date and Time */}
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <Calendar size={16} className="text-blue-600" />
          <span className="text-sm">{formatDate(date)}</span>
          <Clock size={16} className="text-blue-600 ml-2" />
          <span className="text-sm">{time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <MapPin size={16} className="text-blue-600" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Capacity */}
        <div className="flex items-center space-x-2 text-gray-600 mb-4">
          <Users size={16} className="text-blue-600" />
          <span className="text-sm">{capacity}</span>
        </div>

        {/* Description - Collapsible */}
        <div className="mb-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            <span className="text-sm font-medium">
              {showDetails ? 'Show Less' : 'Show More'}
            </span>
            <ChevronRight 
              size={16} 
              className={`ml-1 transition-transform duration-300 ${
                showDetails ? 'rotate-90' : ''
              }`}
            />
          </button>
          
          {showDetails && (
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            } hover:text-red-500 transition-colors duration-300`}
          >
            <Heart size={18} className={isLiked ? 'fill-current' : ''} />
            <span className="text-sm font-medium">
              {isLiked ? 'Saved' : 'Save'}
            </span>
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;