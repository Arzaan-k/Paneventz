import { useState, useEffect } from 'react';
import { cloudinaryService, CloudinaryAsset } from '../lib/cloudinaryService';

export const useCloudinaryAssets = (folder: string) => {
  const [assets, setAssets] = useState<CloudinaryAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assets = await cloudinaryService.getAssetsByFolder(folder);
        setAssets(assets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [folder]);

  return { assets, loading, error };
};

export const useSlideBannerImages = () => {
  return useCloudinaryAssets('slide-banners');
};

export const useEventAssets = (eventFolder: string) => {
  return useCloudinaryAssets(`events/${eventFolder}`);
};
