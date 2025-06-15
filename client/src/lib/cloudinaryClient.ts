// Client-side Cloudinary service with enhanced error handling
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload`;

if (!CLOUD_NAME) console.error('Missing VITE_CLOUDINARY_CLOUD_NAME in environment variables');
if (!API_KEY) console.error('Missing VITE_CLOUDINARY_API_KEY in environment variables');

interface CloudinaryAsset {
  public_id: string;
  format: string;
  width: number;
  height: number;
  url: string;
  folder: string;
}

// Helper function to build Cloudinary URLs
const buildCloudinaryUrl = (
  publicId: string,
  options: Record<string, string | number> = {}
): string => {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  // Remove leading slash if present
  const cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;
  
  const transforms = Object.entries(options)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');
  
  return transforms 
    ? `${baseUrl}/${transforms}/${cleanPublicId}`
    : `${baseUrl}/${cleanPublicId}`;
};

// Cloudinary service with type-safe methods
const cloudinaryService = {
  // Note: This is a client-side only implementation
  // For production, you should implement an API endpoint to fetch assets
  async getAssetsByFolder(folder: string): Promise<CloudinaryAsset[]> {
    console.log(`[Cloudinary] Fetching assets from folder: ${folder}`);
    
    try {
      if (!CLOUD_NAME || !API_KEY) {
        throw new Error('Cloudinary credentials not configured');
      }
      
      const response = await fetch(
        `${API_URL}?prefix=${encodeURIComponent(folder)}&max_results=50`,
        {
          headers: {
            'Authorization': `Basic ${btoa(API_KEY + ':')}`
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Cloudinary] API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Failed to fetch assets: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.resources || !Array.isArray(data.resources)) {
        console.warn('[Cloudinary] Unexpected response format:', data);
        return [];
      }

      return data.resources.map((asset: any) => ({
        public_id: asset.public_id,
        format: asset.format,
        width: asset.width,
        height: asset.height,
        url: asset.secure_url,
        folder: asset.folder
      }));
    } catch (error) {
      console.error('[Cloudinary] Error in getAssetsByFolder:', error);
      return [];
    }
  },

  async getSlideBannerImages(): Promise<CloudinaryAsset[]> {
    return this.getAssetsByFolder('slide-banners');
  },

  async getEventImages(eventFolder: string): Promise<CloudinaryAsset[]> {
    return this.getAssetsByFolder(`events/${eventFolder}`);
  },

  getFormattedImageUrl(publicId: string, options: Record<string, string | number> = {}): string {
    return buildCloudinaryUrl(publicId, options);
  },

  // Helper methods for common transformations
  getBannerImageUrl(publicId: string): string {
    return buildCloudinaryUrl(publicId, {
      w: 1920,
      h: 1080,
      c: 'fill',
      q: 'auto',
      f: 'auto',
      dpr: 'auto',
      crop: 'fill',
      gravity: 'auto:center',
      fetch_format: 'auto',
      quality: 'auto:best'
    });
  }
};

export default cloudinaryService;
