
import React, { useState } from 'react';
import { formatDate } from '@/lib/youtube';

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: string;
  publishedAt: string;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  thumbnail,
  viewCount,
  publishedAt,
  index
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const delay = index * 0.1;

  const handleThumbnailLoad = () => {
    setIsLoading(false);
  };

  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  };

  return (
    <div 
      className="video-card-hover rounded-lg overflow-hidden bg-white stagger-item cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className={`absolute inset-0 bg-secondary animate-pulse ${isLoading ? 'block' : 'hidden'}`}></div>
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleThumbnailLoad}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center text-xs text-muted-foreground space-x-2">
          <span>{formatDate(publishedAt)}</span>
          <span>•</span>
          <span>{viewCount} vistas</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
