export default async function ImageUploadAction({ request }) {
    const formData = await request.formData();
    const file = formData.get('image');
    console.log(file)
  
    // try {
    //   const response = await fetch("http://localhost:3000/api/upload", {
    //     method: 'POST',
    //     body: formData,
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Failed to upload image to the backend');
    //   }
  
    //   const result = await response.json();
    //   return { uploadedImage: result.url }; // Return the uploaded image URL
    // } catch (error) {
    //   return json({ error: error.message || 'Something went wrong' }, { status: 500 });
    // }
  }