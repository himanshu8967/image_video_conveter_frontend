import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-4">Welcome to Image Slideshow!</h1>
                <p className="text-gray-200 text-lg mb-8">Upload your images and generate a stunning slideshow video.</p>
                <Link
                    to="/gallery"
                    className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition"
                >
                    Get Started <FiArrowRight className="inline-block ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default Home;
