import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Collaborations = () => {
  return (
    <div className="bg-gray-100">
      <Navbar/>
      <h1 className="text-4xl font-bold text-center">Collaborations</h1>
      <p className="mt-8 text-lg text-center">
        Collaborate with other artists and mentors to create amazing projects.
      </p>
      <Footer/>
    </div>
  );
};

export default Collaborations;
