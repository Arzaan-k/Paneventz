import { useEffect } from 'react';

const CloudinaryDebug = () => {
  useEffect(() => {
    console.log('Cloudinary Debug Info:', {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY ? '***' : 'Not set',
      nodeEnv: import.meta.env.MODE,
      isProd: import.meta.env.PROD
    });
  }, []);

  return null; // This is a debug component, it doesn't render anything
};

export default CloudinaryDebug;
