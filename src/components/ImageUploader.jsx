import React, { useState, useEffect, useRef } from 'react';
import { Form, useActionData, json } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';



const ImageUploader = ({ images, setImages }) => {
  const actionData = useActionData();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (actionData) {
      if (actionData.uploadedImage) {
        setUploadedImages((prevImages) => [...prevImages, actionData.uploadedImage]);
        setImages((prevImages) => [...prevImages, actionData.uploadedImage]);
      } else if (actionData.error) {
        alert(actionData.error);
      }
      setLoading(false);
    }
  }, [actionData]);


  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const file = formData.get('image');

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to the backend');
      }

      const result = await response.json();

      setUploadedImages((prevImages) => [...prevImages, result.url]);
      setImages((prevImages) => [...prevImages, result.url]);

      // Reset the input value after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }


      // return { uploadedImage: result.url }; // Return the uploaded image URL
    } catch (error) {
      setLoading(false);
      throw json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
    setLoading(false);
  };


  const handleDeleteImage = (index) => {
    const newImages = uploadedImages.filter((_, imgIndex) => imgIndex !== index);
    setUploadedImages(newImages);
    setImages(newImages); // Also update the parent state
  };


  return (
    <div className="container mx-auto mb-10 mt-12 px-4">

      < div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">

        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Upload Your Image</h3>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={fileInputRef}
            className="block w-full mb-4 file:bg-blue-600 file:text-white file:py-2 file:px-4 file:rounded-lg hover:file:bg-blue-700 transition duration-300"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </Form>

        {uploadedImages.length > 0 && (
          <p className="text-gray-700 mt-4 text-center">
            {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''} uploaded
          </p>
        )}

        {uploadedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 order-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 border-2 border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 p-16">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="h-full w-full object-fill rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 transition duration-300 transform hover:scale-110 hover:shadow-lg"
                  aria-label="Delete Image" // Accessibility improvement
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No images uploaded yet. Start by uploading some images!
          </p>
        )}


        {actionData?.error && (
          <p className="text-red-500 text-center mt-4">{actionData.error}</p>
        )}
      </div>
    </div>


  );
};

export default ImageUploader;
