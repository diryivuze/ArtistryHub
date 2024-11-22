import React, { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg flex overflow-hidden">
        {/* Left Section */}
        <div
          className={`w-1/2 p-8 flex flex-col justify-center items-center text-white ${
            isLogin ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </h1>
          <p className="text-lg">
            {isLogin
              ? "Login to access your account and explore more!"
              : "Sign up to create a new account and start your journey!"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-current transition"
          >
            {isLogin ? "Go to Signup" : "Go to Login"}
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")} 
            className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <form className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            )}

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white transition-transform transform hover:scale-105 ${
                isLogin ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
