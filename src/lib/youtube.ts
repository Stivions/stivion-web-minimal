
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

export const YOUTUBE_API_KEY = 'AIzaSyCHfwMz2RTjlervILt4kC3gH--9X84e_wQ';

export async function fetchYouTubeData(channelId: string): Promise<YouTubeResponse> {
  try {
    // Get channel info
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&forUsername=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelResponse.json();
    
    // If channel not found by username, try search
    let channelInfo;
    let uploadsPlaylistId;
    
    if (!channelData.items || channelData.items.length === 0) {
      // Try searching for the channel
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelId}&type=channel&key=${YOUTUBE_API_KEY}`
      );
      const searchData = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      const foundChannelId = searchData.items[0].id.channelId;
      
      // Get channel details using the found channel ID
      const foundChannelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet,statistics&id=${foundChannelId}&key=${YOUTUBE_API_KEY}`
      );
      const foundChannelData = await foundChannelResponse.json();
      
      if (!foundChannelData.items || foundChannelData.items.length === 0) {
        throw new Error('Channel details not found');
      }
      
      uploadsPlaylistId = foundChannelData.items[0].contentDetails.relatedPlaylists.uploads;
      channelInfo = {
        title: foundChannelData.items[0].snippet.title,
        description: foundChannelData.items[0].snippet.description || 'No description available',
        thumbnailUrl: foundChannelData.items[0].snippet.thumbnails.high?.url || foundChannelData.items[0].snippet.thumbnails.default?.url,
        subscriberCount: parseInt(foundChannelData.items[0].statistics.subscriberCount || '0').toLocaleString()
      };
    } else {
      // Channel found by username
      uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      channelInfo = {
        title: channelData.items[0].snippet.title,
        description: channelData.items[0].snippet.description || 'No description available',
        thumbnailUrl: channelData.items[0].snippet.thumbnails.high?.url || channelData.items[0].snippet.thumbnails.default?.url,
        subscriberCount: parseInt(channelData.items[0].statistics.subscriberCount || '0').toLocaleString()
      };
    }
    
    // Get videos from uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    );
    const playlistData = await playlistResponse.json();
    
    if (!playlistData.items) {
      throw new Error('No videos found');
    }
    
    // Get video IDs
    const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');
    
    // Get video details including statistics
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const videosData = await videosResponse.json();
    
    if (!videosData.items) {
      throw new Error('Error fetching video details');
    }
    
    // Format the response
    const videos: VideoItem[] = videosData.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      viewCount: parseInt(item.statistics.viewCount || '0').toLocaleString(),
      description: item.snippet.description
    }));
    
    // Select featured video (most views)
    const featuredVideo = [...videos].sort((a, b) => 
      parseInt((b.viewCount || '0').replace(/,/g, '')) - parseInt((a.viewCount || '0').replace(/,/g, ''))
    )[0] || null;
    
    return {
      videos,
      featuredVideo,
      channelInfo
    };

  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    
    // Fallback to mock data if API fails
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
        title: 'Tutorial de Stivion - Parte 1',
        thumbnail: 'https://i.ytimg.com/vi/abc123/maxresdefault.jpg',
        publishedAt: '2023-06-10T10:15:00Z',
        channelTitle: 'Stivion',
        viewCount: '250K',
        description: 'Aprende los fundamentos de Stivion en este completo tutorial.'
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
