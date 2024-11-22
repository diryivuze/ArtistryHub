import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Events = () => {
  return (
    <div className="bg-gray-100">
      <Navbar/>
      <h1 className="text-4xl font-bold text-center">Events</h1>
      <p className="mt-8 text-lg text-center">
        Discover and attend upcoming events to connect with fellow artists and enthusiasts.
      </p>
      <Footer/>
    </div>
  );
};

export default Events;
