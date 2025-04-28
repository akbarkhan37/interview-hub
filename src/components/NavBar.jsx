import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          AK Interview Hub
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/category/React"
            className="hover:text-gray-300 transition duration-300"
          >
            React
          </Link>
          <Link
            to="/category/JavaScript"
            className="hover:text-gray-300 transition duration-300"
          >
            JavaScript
          </Link>
          <Link
            to="/category/CSS"
            className="hover:text-gray-300 transition duration-300"
          >
            CSS
          </Link>
          <Link
            to="/category/HTML"
            className="hover:text-gray-300 transition duration-300"
          >
            HTML
          </Link>
          <Link
            to="/admin"
            className="hover:text-gray-300 transition duration-300"
          >
            Admin Panel
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
