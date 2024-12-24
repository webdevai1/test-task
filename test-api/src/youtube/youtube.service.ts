import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResponse, YouTubeVideo } from './interfaces/youtube-response.interface';

@Injectable()
export class YouTubeService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly defaultMaxResults: number;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('youtube.apiKey');
    this.baseUrl = this.configService.get<string>('youtube.baseUrl');
    this.defaultMaxResults = this.configService.get<number>('youtube.maxResults');
  }

  async search(query: SearchQueryDto): Promise<SearchResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          part: 'snippet',
          q: query.q,
          maxResults: query.maxResults || this.defaultMaxResults,
          pageToken: query.pageToken,
          type: 'video',
          key: this.apiKey,
        },
      });

      const { items, pageInfo, nextPageToken, prevPageToken } = response.data;

      const results: YouTubeVideo[] = items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
      }));

      return {
        results,
        totalResults: pageInfo.totalResults,
        nextPageToken,
        prevPageToken,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(
          error.response?.data?.error?.message || 'YouTube API error',
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}