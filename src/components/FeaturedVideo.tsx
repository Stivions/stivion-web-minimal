
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { formatDate } from '@/lib/youtube';

interface FeaturedVideoProps {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: string;
  publishedAt: string;
  description: string;
}

const FeaturedVideo: React.FC<FeaturedVideoProps> = ({
  id,
  title,
  thumbnail,
  viewCount,
  publishedAt,
  description
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailLoad = () => {
    setIsLoading(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-white">
      {!isPlaying ? (
        <div className="relative aspect-video overflow-hidden">
          <div className={`absolute inset-0 bg-secondary animate-pulse ${isLoading ? 'block' : 'hidden'}`}></div>
          <img
            src={thumbnail}
            alt={title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleThumbnailLoad}
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handlePlayClick}
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-105 transition-transform duration-200"
              aria-label="Reproducir video"
            >
              <Play size={24} className="text-black" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="px-2 py-1 bg-secondary rounded-full text-xs font-medium">Destacado</span>
          <span className="text-xs text-muted-foreground">{formatDate(publishedAt)}</span>
          <span className="text-xs text-muted-foreground">{viewCount} vistas</span>
        </div>
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default FeaturedVideo;
