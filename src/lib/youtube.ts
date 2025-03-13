
interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount: string;
  description: string;
}

interface YouTubeResponse {
  videos: VideoItem[];
  featuredVideo: VideoItem | null;
  channelInfo: {
    title: string;
    description: string;
    thumbnailUrl: string;
    subscriberCount: string;
  } | null;
}

export const YOUTUBE_API_KEY = 'YOUR_API_KEY'; // Normally would be an environment variable

export async function fetchYouTubeData(channelId: string): Promise<YouTubeResponse> {
  try {
    // Mock data for demonstration - in a real app, these would be API calls
    const mockFeaturedVideo: VideoItem = {
      id: 'dQw4w9WgXcQ',
      title: 'Video destacado increíble',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: '2023-05-15T14:30:00Z',
      channelTitle: 'Mi Canal de YouTube',
      viewCount: '1.5M',
      description: 'Este es el video destacado de mi canal, con contenido increíble que te va a encantar.'
    };
    
    const mockVideos: VideoItem[] = [
      {
        id: 'abc123',
        title: 'Cómo crear diseños minimalistas',
        thumbnail: 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg',
        publishedAt: '2023-06-10T10:15:00Z',
        channelTitle: 'Mi Canal de YouTube',
        viewCount: '250K',
        description: 'Aprende a crear diseños limpios y minimalistas como un profesional.'
      },
      {
        id: 'def456',
        title: 'Tutorial de fotografía para principiantes',
        thumbnail: 'https://i.ytimg.com/vi/def456/maxresdefault.jpg',
        publishedAt: '2023-07-20T16:45:00Z',
        channelTitle: 'Mi Canal de YouTube',
        viewCount: '180K',
        description: 'Todo lo que necesitas saber para empezar en el mundo de la fotografía.'
      },
      {
        id: 'ghi789',
        title: 'Los mejores trucos de productividad',
        thumbnail: 'https://i.ytimg.com/vi/ghi789/maxresdefault.jpg',
        publishedAt: '2023-08-05T09:30:00Z',
        channelTitle: 'Mi Canal de YouTube',
        viewCount: '320K',
        description: 'Optimiza tu tiempo y mejora tu productividad con estos consejos.'
      },
      {
        id: 'jkl012',
        title: 'Viaje a Japón: experiencias únicas',
        thumbnail: 'https://i.ytimg.com/vi/jkl012/maxresdefault.jpg',
        publishedAt: '2023-09-18T13:20:00Z',
        channelTitle: 'Mi Canal de YouTube',
        viewCount: '450K',
        description: 'Mi increíble viaje a Japón y todas las experiencias que viví.'
      },
      {
        id: 'mno345',
        title: 'Cómo empezar tu propio negocio online',
        thumbnail: 'https://i.ytimg.com/vi/mno345/maxresdefault.jpg',
        publishedAt: '2023-10-25T11:10:00Z',
        channelTitle: 'Mi Canal de YouTube',
        viewCount: '280K',
        description: 'Guía completa para comenzar tu negocio en internet desde cero.'
      },
      {
        id: 'pqr678',
        title: 'La historia detrás de mi éxito',
        thumbnail: 'https://i.ytimg.com/vi/pqr678/maxresdefault.jpg',
        publishedAt: '2023-11-30T15:40:00Z',
        channelTitle: 'Mi Canal de YouTube',
        viewCount: '520K',
        description: 'Te cuento todo sobre mi trayectoria y cómo llegué hasta donde estoy.'
      }
    ];

    const mockChannelInfo = {
      title: 'Mi Canal de YouTube',
      description: 'Contenido premium sobre diseño, fotografía, viajes y estilo de vida.',
      thumbnailUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKaHleEg5-1J1eKaGDkQ_1lrJCRf=s176-c-k-c0x00ffffff-no-rj',
      subscriberCount: '1.2M'
    };

    return {
      videos: mockVideos,
      featuredVideo: mockFeaturedVideo,
      channelInfo: mockChannelInfo
    };

    /* 
    // Real implementation would look like this:
    
    // 1. Get channel uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    const channelInfo = {
      title: channelData.items[0].snippet.title,
      description: channelData.items[0].snippet.description,
      thumbnailUrl: channelData.items[0].snippet.thumbnails.high.url,
      subscriberCount: parseInt(channelData.items[0].statistics.subscriberCount).toLocaleString()
    };
    
    // 2. Get videos from uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    );
    const playlistData = await playlistResponse.json();
    
    if (!playlistData.items) {
      throw new Error('No videos found');
    }
    
    // 3. Get video IDs
    const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');
    
    // 4. Get video details including statistics
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const videosData = await videosResponse.json();
    
    if (!videosData.items) {
      throw new Error('Error fetching video details');
    }
    
    // 5. Format the response
    const videos: VideoItem[] = videosData.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url || item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      viewCount: parseInt(item.statistics.viewCount).toLocaleString(),
      description: item.snippet.description
    }));
    
    // 6. Select featured video (most views)
    const featuredVideo = [...videos].sort((a, b) => 
      parseInt(b.viewCount.replace(/,/g, '')) - parseInt(a.viewCount.replace(/,/g, ''))
    )[0] || null;
    
    return {
      videos,
      featuredVideo,
      channelInfo
    };
    */
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return {
      videos: [],
      featuredVideo: null,
      channelInfo: null
    };
  }
}

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
