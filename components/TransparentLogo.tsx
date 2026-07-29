import React from 'react';

export const TransparentLogo: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  return <img src={src} alt={alt} className={className} />;
};
