import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import VideoGenerator from '../components/VideoGenerator';

const GalleryPage = () => {
  const [images, setImages] = useState([]);


  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-10 mt-12">
      <h2 className="text-4xl font-extrabold text-center text-white mb-6">Image to Video Generator</h2>

      {/* Image Upload Section */}
      <ImageUploader images={images} setImages={setImages} />



      {/* Video Generation */}
      {images.length > 0 && <VideoGenerator imageUrls={images} />}
    </div>
  );
};

export default GalleryPage;
