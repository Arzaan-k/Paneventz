import { v2 as cloudinary } from 'cloudinary';
import { getImageUrl } from './cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryAsset {
  public_id: string;
  format: string;
  width: number;
  height: number;
  url: string;
  folder: string;
}

export class CloudinaryService {
  private static instance: CloudinaryService;
  private constructor() {}

  static getInstance(): CloudinaryService {
    if (!CloudinaryService.instance) {
      CloudinaryService.instance = new CloudinaryService();
    }
    return CloudinaryService.instance;
  }

  async getAssetsByFolder(folder: string): Promise<CloudinaryAsset[]> {
    try {
      const result = await cloudinary.search
        .expression(`folder:${folder}`)
        .sort_by('created_at', 'desc')
        .max_results(500)
        .execute();

      return result.resources.map(asset => ({
        public_id: asset.public_id,
        format: asset.format,
        width: asset.width,
        height: asset.height,
        url: asset.url,
        folder: asset.folder
      }));
    } catch (error) {
      console.error('Error fetching assets:', error);
      return [];
    }
  }

  async getSlideBannerImages(): Promise<CloudinaryAsset[]> {
    return this.getAssetsByFolder('slide-banners');
  }

  async getEventAssets(eventFolder: string): Promise<CloudinaryAsset[]> {
    return this.getAssetsByFolder(`events/${eventFolder}`);
  }

  getFormattedImageUrl(publicId: string, options = {}): string {
    return getImageUrl(publicId, options);
  }

  // Helper methods for common transformations
  getBannerImageUrl(publicId: string): string {
    return this.getFormattedImageUrl(publicId, {
      width: 1920,
      height: 1080,
      crop: 'fill',
      quality: 'auto'
    });
  }

  getThumbnailImageUrl(publicId: string): string {
    return this.getFormattedImageUrl(publicId, {
      width: 300,
      height: 200,
      crop: 'thumb',
      gravity: 'auto',
      quality: 'auto'
    });
  }

  getEventHeroImageUrl(publicId: string): string {
    return this.getFormattedImageUrl(publicId, {
      width: 1200,
      height: 800,
      crop: 'fill',
      quality: 'auto'
    });
  }
}

export const cloudinaryService = CloudinaryService.getInstance();
