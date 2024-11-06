import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side: Admin Login */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full flex items-center justify-center bg-black p-8 text-white">
        <div className="max-w-md text-center ">
          <h1 className="text-3xl font-bold mb-4">For Admins</h1>
          <p className=" mb-6">
            Login as admin to Add/Update new or existing data. Add new gifts or
            top-up existing gift items
          </p>
          <Link
            to="/register/admin"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-white hover:text-black transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Right Side: User Login */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full flex items-center justify-center bg-white p-8">
        <div className="max-w-md text-center text-black">
          <h1 className="text-3xl font-bold mb-4">For Users</h1>
          <p className="text-gray-700 mb-6">
            Get your free gifts today. Sign up now.
          </p>
          <Link
            to="/register/user"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-black transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
