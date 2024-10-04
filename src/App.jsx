import React from 'react';
import RootLayout from './pages/Root';    // Ensure this path is correct
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'gallery',
        element: <GalleryPage />,
      },
      {
        path: 'generate-video',
      },
    ],
  },
]);



function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
