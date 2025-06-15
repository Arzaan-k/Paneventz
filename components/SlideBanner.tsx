import { useSlideBannerImages } from '../hooks/useCloudinaryAssets';
import { cloudinaryService } from '../lib/cloudinaryService';

interface SlideBannerProps {
  autoPlay?: boolean;
  interval?: number;
}

export const SlideBanner = ({ autoPlay = true, interval = 5000 }: SlideBannerProps) => {
  const { assets, loading, error } = useSlideBannerImages();

  if (loading) return <div className="h-[500px] w-full bg-gray-200 animate-pulse" />;
  if (error) return <div className="text-red-500">Error loading banners: {error}</div>;

  return (
    <div className="relative w-full h-[500px]">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {assets.map((asset) => (
            <div key={asset.public_id} className="swiper-slide">
              <img
                src={cloudinaryService.getBannerImageUrl(asset.public_id)}
                alt="Slide Banner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {autoPlay && (
          <div className="swiper-pagination"></div>
        )}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    </div>
  );
};
