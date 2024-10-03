import React, { useEffect, useState } from 'react';
import { Form, useActionData, useNavigation, json } from 'react-router-dom';

export async function videoGenerateAction({ request }) {
  const formData = await request.formData();
  const imageUrls = JSON.parse(formData.get('imageUrls'));

  console.log(imageUrls);
  console.log("imageUrls");

//   try {
//     const backendApiUrl = "http://localhost:3000/api/create-slideshow"; // Video generation API

//     const response = await fetch(backendApiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ "imageUrls": imageUrls }), // Send image URLs as JSON
//     });

//     if (!response.ok) {
//       throw new Error('Failed to generate video');
//     }

//     const result = await response.json();

//     return { videoUrl: result.videoUrl }; // Return the generated video URL
//   } catch (error) {
//     return json({ error: error.message || 'Something went wrong' }, { status: 500 });
//   }
}

const VideoGenerator = ({ imageUrls }) => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (actionData?.videoUrl) {
      setVideoUrl(actionData.videoUrl); // Set the video URL after the video is generated.
    }
    setLoading(false);
  }, [actionData]);

  const handleGenerateVideo = () => {
    setLoading(true);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <Form method="post" onSubmit={handleGenerateVideo}>
        <input type="hidden" name="imageUrls" value={imageUrls} />
        <button
          type="submit"
          disabled={loading || navigation.state === 'submitting'}
          className={`w-full py-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Generating Video...' : 'Generate Video'}
        </button>
      </Form>

      {videoUrl && (
        <div className="mt-6">
          <video controls className="w-full h-auto rounded-lg">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
