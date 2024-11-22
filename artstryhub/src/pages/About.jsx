import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="bg-gray-100">
      <Navbar/>
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <p className="text-gray-700 text-lg text-center">
        At ArtistryHub, we are dedicated to connecting artists and art enthusiasts
        through events, challenges, and collaborations. Join us in celebrating
        creativity!
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Team Member"
            className="mx-auto rounded-full shadow-lg"
          />
          <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
          <p className="text-gray-600">Founder & CEO</p>
        </div>
        {/* Add more team members here */}
      </div>
      <Footer/>
    </div>
  );
};

export default About;
