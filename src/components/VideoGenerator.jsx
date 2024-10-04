import React, { useEffect, useState } from 'react';
import { Form, useActionData, useNavigation, json } from 'react-router-dom';


const VideoGenerator = ({ imageUrls }) => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [public_id, setPublic_id] = useState(null);


  useEffect(() => {
    if (actionData?.videoUrl) {
      setVideoUrl(actionData.videoUrl); // Set the video URL after the video is generated.
    }
    setLoading(false);
  }, [actionData]);


  const handleGenerateVideo = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const backendApiUrl = "http://localhost:3000/api/create-slideshow"; // Video generation API

      const response = await fetch(backendApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "imageUrls": imageUrls, "public_id": "public_id_123" }), // Send image URLs as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      const result = await response.json();

      setVideoUrl(result.videoUrl);

      setLoading(false);


      //   return { videoUrl: result.videoUrl }; // Return the generated video URL
    } catch (error) {
      setLoading(false);
      return json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 pt-9 pb-10 m-auto mt-8 bg-slate-50 shadow-lg rounded-lg">


      <Form onSubmit={handleGenerateVideo}>
        <div className="flex justify-center items-center mb-3">
          <button
            type="submit"
            disabled={loading || navigation.state === 'submitting'}
            className={`w-full max-w-sm py-3 px-6 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 active:bg-green-700'}
        ${loading || navigation.state === 'submitting' ? 'cursor-not-allowed' : 'hover:shadow-lg'}
      `}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Generating Video...</span>
              </div>
            ) : (
              'Generate Video'
            )}
          </button>
        </div>
      </Form>


      {videoUrl && (
        <div className="relative flex justify-center items-center p-4 bg-gray-900 rounded-lg shadow-lg w-full max-w-[540px] mx-auto">
          <video
            controls
            className="w-[500px] h-[500px] object-cover rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>


  );
};

export default VideoGenerator;
