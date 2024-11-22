import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  return (
    <div className="bg-gray-100">
      <Navbar/>
      <div className="p6">
      <h1 className="text-4xl font-bold text-center">Gallery</h1>
      <p className="mt-8 text-lg text-center">
        Explore stunning artworks and creations from our community of talented artists.
      </p>
      </div>
      <Footer/>
    </div>
  );
};

export default Gallery;
