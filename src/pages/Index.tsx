
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import { fetchYouTubeData } from '@/lib/youtube';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [channelInfo, setChannelInfo] = useState({
    title: 'Stiviion',
    description: 'Canal oficial de Stiviion. Tutoriales, guías y novedades.',
    thumbnailUrl: '',
    subscriberCount: '0'
  });

  useEffect(() => {
    const getYouTubeData = async () => {
      try {
        setIsLoading(true);
        // Using "Stiviion" as the channel identifier
        const channelId = 'Stiviion'; 
        const data = await fetchYouTubeData(channelId);
        
        setVideos(data.videos);
        setFeaturedVideo(data.featuredVideo);
        
        if (data.channelInfo) {
          setChannelInfo(data.channelInfo);
        }
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los videos. Por favor, intenta de nuevo más tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getYouTubeData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        channelName={channelInfo.title} 
        subscriberCount={channelInfo.subscriberCount} 
      />
      
      <main>
        <HeroSection 
          channelTitle={channelInfo.title}
          description={channelInfo.description}
        />
        
        <VideoSection 
          videos={videos}
          featuredVideo={featuredVideo}
          isLoading={isLoading}
        />
      </main>
      
      <footer className="py-10 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {channelInfo.title}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
