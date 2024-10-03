import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import GalleryPage from './pages/GalleryPage';
import ImageUploader, { action as imageUploadAction } from './components/ImageUploader';
import VideoGenerator, { videoGenerateAction } from './components/VideoGenerator';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ImageUploader />,
    action: imageUploadAction,
  },
  {
    path: '/',
    element: <VideoGenerator />,
    action: videoGenerateAction,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
