import React from 'react';

const Slideshow = ({ images }) => {
  if (images.length === 0) {
    return <p className="text-center text-gray-500">No images uploaded yet.</p>;
  }

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg mb-6">
      <div className="w-full h-full flex transition-transform">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
