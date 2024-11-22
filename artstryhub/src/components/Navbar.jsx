import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          ArtistryHub
        </Link>
        <ul className={`md:flex gap-6 items-center ${isOpen ? "block" : "hidden"} md:block`}>
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/about-us" className="hover:text-gray-400">About</Link></li>
          <li><Link to="/challenges" className="hover:text-gray-400">Challenges</Link></li>
          <li><Link to="/events" className="hover:text-gray-400">Events</Link></li>
          <li><Link to="/collaborations" className="hover:text-gray-400">Collaborations</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-400">Gallery</Link></li>
          <li><Link to="/login" className="hover:text-gray-400 flex items-center gap-1">
            <FaUserCircle /> Login
          </Link></li>
        </ul>
        <button
          className="block md:hidden text-2xl"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
