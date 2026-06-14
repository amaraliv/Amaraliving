import { useState } from 'react';
import { IMG } from '../../data/content';

export default function SurfaceImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      draggable={false}
      className={className}
      onError={() => setImgSrc(IMG.granite)}
    />
  );
}
