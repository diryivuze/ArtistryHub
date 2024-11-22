import React from 'react';

const EventCard = ({ title, date, location }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{date}</p>
      <p className="text-gray-600">{location}</p>
    </div>
  );
};

export default EventCard;
