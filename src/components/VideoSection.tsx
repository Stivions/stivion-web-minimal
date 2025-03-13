
import React from 'react';
import VideoCard from './VideoCard';
import FeaturedVideo from './FeaturedVideo';
import LoadingSpinner from './LoadingSpinner';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
  description: string;
}

interface VideoSectionProps {
  videos: VideoItem[];
  featuredVideo: VideoItem | null;
  isLoading: boolean;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos, featuredVideo, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (videos.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-muted-foreground">No se encontraron videos</p>
      </div>
    );
  }

  return (
    <section id="videos" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl font-medium">Videos destacados</h2>
          <a 
            href="https://www.youtube.com/@Stiviion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todos →
          </a>
        </div>

        {featuredVideo && (
          <div className="mb-16 animate-scale-in">
            <FeaturedVideo 
              id={featuredVideo.id}
              title={featuredVideo.title}
              thumbnail={featuredVideo.thumbnail}
              viewCount={featuredVideo.viewCount}
              publishedAt={featuredVideo.publishedAt}
              description={featuredVideo.description}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              viewCount={video.viewCount}
              publishedAt={video.publishedAt}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
