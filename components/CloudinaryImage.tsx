import { CloudinaryImage } from 'cloudinary-react';
import { getImageUrl } from '../lib/cloudinary';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  transformations?: Record<string, any>;
}

export const CloudinaryImageComponent = ({
  publicId,
  alt,
  width,
  height,
  className,
  transformations,
}: CloudinaryImageProps) => {
  return (
    <CloudinaryImage
      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      publicId={publicId}
      width={width}
      height={height}
      className={className}
      {...transformations}
      alt={alt}
    />
  );
};
