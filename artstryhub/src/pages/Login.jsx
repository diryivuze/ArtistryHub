import React from "react";

const Login = () => {
  return (
    <div className="container mx-auto py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="block w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full mb-4 p-3 border rounded-lg"
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
