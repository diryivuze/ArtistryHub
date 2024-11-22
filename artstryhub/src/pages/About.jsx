import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Palette, Trophy, Heart, Mail, ArrowRight, Github, Linkedin } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { number: "10K+", label: "Artists", icon: Users },
    { number: "50K+", label: "Artworks", icon: Palette },
    { number: "100+", label: "Events", icon: Trophy },
    { number: "25K+", label: "Community", icon: Heart },
  ];

  const team = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "/api/placeholder/200/200",
      bio: "Visionary leader with 15 years in the art industry",
      socials: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Jane Smith",
      role: "Creative Director",
      image: "/api/placeholder/200/200",
      bio: "Award-winning artist and curator",
      socials: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead",
      image: "/api/placeholder/200/200",
      bio: "Full-stack developer and art enthusiast",
      socials: {
        linkedin: "#",
        github: "#"
      }
    }
  ];

  const tabContent = {
    story: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h3>
        <p className="text-gray-600 leading-relaxed">
          Founded in 2020, ArtistryHub emerged from a simple vision: to create a vibrant, 
          inclusive space where artists and art enthusiasts could connect, collaborate, and grow together.
        </p>
        <p className="text-gray-600 leading-relaxed">
          What started as a small community has blossomed into a global platform, 
          hosting virtual exhibitions, workshops, and creative challenges that bring together 
          talented artists from every corner of the world.
        </p>
      </div>
    ),
    mission: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
        <p className="text-gray-600 leading-relaxed">
          We're on a mission to democratize art by providing tools, opportunities, and 
          platforms for artists to showcase their work, connect with peers, and reach 
          art lovers globally.
        </p>
        <ul className="space-y-3">
          {["Empower artists to reach global audiences", 
            "Foster creativity and artistic growth",
            "Build meaningful connections in the art community",
            "Make art accessible to everyone"].map((item, index) => (
            <li key={index} className="flex items-center space-x-2 text-gray-600">
              <ArrowRight size={16} className="text-blue-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
    values: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Creativity", desc: "Encouraging innovative artistic expression" },
            { title: "Community", desc: "Building meaningful connections" },
            { title: "Inclusivity", desc: "Welcoming artists from all backgrounds" },
            { title: "Excellence", desc: "Striving for the highest quality" }
          ].map((value, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800">{value.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">
            Empowering Artists Worldwide
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-blue-100">
            At ArtistryHub, we are dedicated to connecting artists and art enthusiasts
            through events, challenges, and collaborations. Join us in celebrating
            creativity!
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon size={32} className="text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg">
            {['story', 'mission', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {tabContent[activeTab]}
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href={member.socials.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={member.socials.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
          <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-blue-100 mb-6">
              Have questions or want to learn more? We'd love to hear from you!
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300 flex items-center mx-auto">
              <Mail size={20} className="mr-2" />
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;