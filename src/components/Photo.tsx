import type { ImageAsset } from '../types';

export const Photo = ({ image, priority = false }: { image: ImageAsset; priority?: boolean }) => (
  <img src={image.src} alt={image.alt} width={image.width} height={image.height}
    style={{ objectPosition: image.position ?? '50% 50%' }}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
);
