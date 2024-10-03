import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiImage } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 py-4 shadow-lg fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center text-2xl  gap-1 font-bold hover:text-gray-200 transition duration-300 ease-in-out"
        >
          <FiHome className="mr-2" /> ImageSlideshow
        </Link>
        
        {/* Gallery Link */}
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/gallery"
              className="flex items-center text-2xl gap-1 font-bold hover:text-gray-200 transition duration-300 ease-in-out"
            >
              <FiImage className="mr-1" /> Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
