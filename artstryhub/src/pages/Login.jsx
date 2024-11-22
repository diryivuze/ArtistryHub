import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebook, 
  FaGithub 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation logic here
    console.log('Form submitted', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const socialLoginButtons = [
    { 
      icon: FaGoogle, 
      color: 'text-red-600', 
      name: 'Google' 
    },
    { 
      icon: FaFacebook, 
      color: 'text-blue-700', 
      name: 'Facebook' 
    },
    { 
      icon: FaGithub, 
      color: 'text-gray-800', 
      name: 'GitHub' 
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl flex overflow-hidden"
      >
        {/* Left Section */}
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-1/2 p-8 flex flex-col justify-center items-center text-white transition-colors duration-500 ${
            isLogin ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          <h1 className="text-4xl font-bold mb-4 text-center">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </h1>
          <p className="text-lg text-center mb-6">
            {isLogin
              ? "Login to access your account and explore more!"
              : "Sign up to create a new account and start your journey!"}
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-current transition"
          >
            {isLogin ? "Go to Signup" : "Go to Login"}
          </motion.button>
        </motion.div>

        {/* Right Section */}
        <div className="w-1/2 p-8 relative">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </motion.button>

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login" : "Signup"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`w-full py-3 rounded-lg text-white transition-transform transform ${
                isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLogin ? "Login" : "Signup"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">Or continue with</p>
            <div className="flex justify-center space-x-4">
              {socialLoginButtons.map((btn, index) => (
                <motion.button
                  key={btn.name}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full ${btn.color} bg-opacity-10 hover:bg-opacity-20 transition`}
                >
                  <btn.icon size={24} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;