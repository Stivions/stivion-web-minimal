
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
    // For a real implementation, uncomment and use the API code at the bottom of this file
    // For now, using mock data but with your channel name

    const mockFeaturedVideo: VideoItem = {
      id: 'dQw4w9WgXcQ',
      title: 'Video destacado de Stiviion',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: '2023-05-15T14:30:00Z',
      channelTitle: 'Stiviion',
      viewCount: '1.5M',
      description: 'Este es el video destacado de mi canal Stiviion, con contenido increíble que te va a encantar.'
    };
    
    const mockVideos: VideoItem[] = [
      {
        id: 'abc123',
        title: 'Tutorial de Stiviion - Parte 1',
        thumbnail: 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg',
        publishedAt: '2023-06-10T10:15:00Z',
        channelTitle: 'Stiviion',
        viewCount: '250K',
        description: 'Aprende los fundamentos de Stiviion en este completo tutorial.'
      },
      {
        id: 'def456',
        title: 'Novedades de Stiviion 2023',
        thumbnail: 'https://i.ytimg.com/vi/def456/maxresdefault.jpg',
        publishedAt: '2023-07-20T16:45:00Z',
        channelTitle: 'Stiviion',
        viewCount: '180K',
        description: 'Te presento todas las novedades de Stiviion para este año.'
      },
      {
        id: 'ghi789',
        title: 'Stiviion - Guía avanzada',
        thumbnail: 'https://i.ytimg.com/vi/ghi789/maxresdefault.jpg',
        publishedAt: '2023-08-05T09:30:00Z',
        channelTitle: 'Stiviion',
        viewCount: '320K',
        description: 'Domina todas las técnicas avanzadas de Stiviion con esta guía.'
      },
      {
        id: 'jkl012',
        title: 'Stiviion vs. la competencia',
        thumbnail: 'https://i.ytimg.com/vi/jkl012/maxresdefault.jpg',
        publishedAt: '2023-09-18T13:20:00Z',
        channelTitle: 'Stiviion',
        viewCount: '450K',
        description: 'Comparación detallada entre Stiviion y otras alternativas del mercado.'
      },
      {
        id: 'mno345',
        title: 'Entrevista con el creador de Stiviion',
        thumbnail: 'https://i.ytimg.com/vi/mno345/maxresdefault.jpg',
        publishedAt: '2023-10-25T11:10:00Z',
        channelTitle: 'Stiviion',
        viewCount: '280K',
        description: 'Entrevista exclusiva con el fundador de Stiviion.'
      },
      {
        id: 'pqr678',
        title: 'El futuro de Stiviion',
        thumbnail: 'https://i.ytimg.com/vi/pqr678/maxresdefault.jpg',
        publishedAt: '2023-11-30T15:40:00Z',
        channelTitle: 'Stiviion',
        viewCount: '520K',
        description: 'Descubre lo que nos depara el futuro para Stiviion.'
      }
    ];

    const mockChannelInfo = {
      title: 'Stiviion',
      description: 'Canal oficial de Stiviion. Tutoriales, guías y novedades sobre todo lo relacionado con Stiviion.',
      thumbnailUrl: 'https://yt3.googleusercontent.com/ytc/APkrFKaHleEg5-1J1eKaGDkQ_1lrJCRf=s176-c-k-c0x00ffffff-no-rj',
      subscriberCount: '1.2M'
    };

    return {
      videos: mockVideos,
      featuredVideo: mockFeaturedVideo,
      channelInfo: mockChannelInfo
    };

    /* 
    // Real implementation with actual API would look like this:
    
    // Change this to your actual channel ID for Stiviion, either by:
    // 1. Finding it in the URL of your channel page
    // 2. Or using username approach: /c/Stiviion or /user/Stiviion
    // For the second approach, use forUsername parameter instead of id
    
    // 1. Get channel uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    // If using username instead of ID, use this:
    // const channelResponse = await fetch(
    //   `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&forUsername=Stiviion&key=${YOUTUBE_API_KEY}`
    // );
    
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
