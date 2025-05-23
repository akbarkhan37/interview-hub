import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
          AK Interview Hub
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link to="/category/React" className="hover:text-gray-300 transition duration-300">
            React
          </Link>
          <Link to="/category/JavaScript" className="hover:text-gray-300 transition duration-300">
            JavaScript
          </Link>
          <Link to="/category/CSS" className="hover:text-gray-300 transition duration-300">
            CSS
          </Link>
          <Link to="/category/HTML" className="hover:text-gray-300 transition duration-300">
            HTML
          </Link>
          <Link to="/category/NodeJs" className="hover:text-gray-300 transition duration-300">
            NodeJS
          </Link>
          <Link to="/admin" className="hover:text-gray-300 transition duration-300">
            Admin Panel
          </Link>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-300 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300 transition duration-300">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
