import { registerAs } from '@nestjs/config';

export default registerAs('youtube', () => ({
  apiKey: process.env.YOUTUBE_API_KEY,
  baseUrl: 'https://www.googleapis.com/youtube/v3',
  maxResults: parseInt(process.env.YOUTUBE_MAX_RESULTS || '10', 10),
}));