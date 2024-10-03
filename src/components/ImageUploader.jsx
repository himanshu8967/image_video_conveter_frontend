import React, { useState, useEffect } from 'react';
import { Form, useActionData, json } from 'react-router-dom';



// Backend API action function for image upload
export async function action({ request }) {
  const formData = await request.formData();
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
    return { uploadedImage: result.url }; // Return the uploaded image URL
  } catch (error) {
    return json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}

const ImageUploader = ({ images, setImages }) => {
  const actionData = useActionData();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (actionData) {
      if (actionData.uploadedImage) {
        setUploadedImages((prevImages) => [...prevImages, actionData.uploadedImage]);
        setImages((prevImages) => [...prevImages, actionData.uploadedImage]);
      } else if (actionData.error) {
        alert(actionData.error);
      }
      // console.log(uploadedImages);
      setLoading(false); // Ensure loading is reset after any action
    }
  }, [actionData]);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <div className="container mx-auto mt-6 px-4">
      <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Upload Your Image</h3>
        <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            type="file"
            name="image"
            accept="image/*"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="h-40 w-full object-cover rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                />
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
