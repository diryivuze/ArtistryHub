import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaPaintBrush, FaUsers } from 'react-icons/fa';

const Homepage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Navbar/>
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to ArtistryHub</h1>
        <p className="mt-4 text-xl">
          Discover events, give feedback on art, seek mentorship, and join challenges!
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full shadow-lg hover:bg-gray-200">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="text-center p-6 border rounded-lg shadow hover:shadow-lg transition">
          <FaCalendarAlt className="text-blue-500 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Explore Events</h2>
          <p className="mt-2 text-gray-600">
            Find upcoming events and exhibitions to attend.
          </p>
        </div>
        <div className="text-center p-6 border rounded-lg shadow hover:shadow-lg transition">
          <FaPaintBrush className="text-green-500 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Give Feedback</h2>
          <p className="mt-2 text-gray-600">
            Review and provide feedback on creative works.
          </p>
        </div>
        <div className="text-center p-6 border rounded-lg shadow hover:shadow-lg transition">
          <FaUsers className="text-purple-500 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Join Challenges</h2>
          <p className="mt-2 text-gray-600">
            Compete and showcase your skills with others.
          </p>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center">Featured Gallery</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
          <img
            src="https://via.placeholder.com/300"
            alt="Art 1"
            className="rounded-lg shadow-lg hover:scale-105 transform transition"
          />
          <img
            src="https://via.placeholder.com/300"
            alt="Art 2"
            className="rounded-lg shadow-lg hover:scale-105 transform transition"
          />
          <img
            src="https://via.placeholder.com/300"
            alt="Art 3"
            className="rounded-lg shadow-lg hover:scale-105 transform transition"
          />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Homepage;
