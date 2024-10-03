export default async function VideoGeneratorAction({ request }) {
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