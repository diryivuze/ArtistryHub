import React, { useState } from 'react';
import { ImageIcon, SearchIcon, FilterIcon, HeartIcon, MessageCircleIcon, StarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const artworkCollections = {
    Photography: [
      { id: 1, title: 'Urban Landscape', artist: 'Sheilla Igiraneza', category: 'Photography', image: 'https://lightandlandscape.co/wp-content/uploads/2024/04/urban-landscape-photography-in-passing.jpg', likes: 42, comments: [] },
      { id: 2, title: 'Cityscape Nights', artist: 'Chancelline Niyotugendana', category: 'Photography', image: 'https://img.freepik.com/premium-photo/cityscape-with-bridge-building-with-sign-that-says-bank-america_976492-37875.jpg', likes: 37, comments: [] },
    ],
    'Digital Art': [
      { id: 3, title: 'Abstract Emotion', artist: 'Loue Christian', category: 'Digital Art', image: 'https://img.freepik.com/premium-photo/abstract-digital-female-face-illustration-colorful-design-flat-style-art-head-futuristic-emotion-profile-network-mood-psychology-information-patterns-idea-creativity-concept-ai_783618-375.jpg', likes: 55, comments: [] },
      { id: 4, title: 'Cyber Dreams', artist: 'Alain Michael', category: 'Digital Art', image: 'https://thumbs.dreamstime.com/b/illustration-cyber-punk-dream-graphic-representation-digital-art-lucid-style-330366090.jpg', likes: 48, comments: [] },
    ],
    Painting: [
      { id: 5, title: 'Sunset Serenity', artist: 'Patrick Nayituriki', category: 'Painting', image: 'https://lagunaart.com/cdn/shop/files/BASHAR2IMG_0966_a74eeab5-91ad-4c1b-b77d-3fe410f6f993_1024x1024@2x.jpg?v=1714180645', likes: 61, comments: [] },
   ],
    Sculpture: [
      { id: 6, title: 'Metamorphosis', artist: 'Daniel Iryivuze', category: 'Sculpture', image: 'https://siudmak-official.com/wp-content/uploads/2023/09/metamorphosis-gold-1.jpg', likes: 39, comments: [] },
    ]
  };

  const artworks = Object.values(artworkCollections).flat();
  const filters = ['All', ...Object.keys(artworkCollections)];

  const filteredArtworks = artworks.filter(
    (artwork) =>
      (activeFilter === 'All' || artwork.category === activeFilter) &&
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || artworks.find(a => a.id === id).likes) + 1
    }));
  };

  const handleComment = (id, commentText) => {
    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), commentText]
    }));
  };

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-500 '>
      <Navbar />
      <div className="p-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl text-gray-800 flex items-center mt-20 font-bold justify-center gap-4">
            Artworks Gallery
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Explore stunning artworks and creations from our diverse artist community.
          </p>
        </motion.div>

        <div className="flex items-center mb-8 space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg pl-10"
            />
            <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={artwork.image} alt={artwork.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{artwork.title}</h3>
                    <p className="text-gray-600">{artwork.artist}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => handleLike(artwork.id)}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center text-red-500 hover:text-red-700"
                    >
                      <HeartIcon size={24} />
                      <span className="ml-1 text-sm">{likes[artwork.id] || artwork.likes}</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      <MessageCircleIcon size={24} />
                      <span className="ml-1 text-sm">{comments[artwork.id]?.length || 0}</span>
                    </motion.button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleComment(artwork.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
