import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { YouTubeService } from '../src/youtube/youtube.service';
import { SearchQueryDto } from '../src/youtube/dto/search-query.dto';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('YouTubeService', () => {
  let service: YouTubeService;
  const mockConfigService = {
    get: vi.fn((key: string) => {
      const config = {
        'youtube.apiKey': 'test-api-key',
        'youtube.baseUrl': 'https://www.googleapis.com/youtube/v3',
        'youtube.maxResults': 10,
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        YouTubeService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = moduleRef.get<YouTubeService>(YouTubeService);
  });

  it('should transform YouTube API response correctly', async () => {
    const mockApiResponse = {
      data: {
        items: [
          {
            id: { videoId: 'test-id' },
            snippet: {
              title: 'Test Video',
              description: 'Test Description',
              thumbnails: {
                medium: { url: 'test-thumbnail.jpg' },
              },
              publishedAt: '2024-02-14T00:00:00Z',
            },
          },
        ],
        pageInfo: { totalResults: 1 },
        nextPageToken: 'next-token',
      },
    };

    (axios.get as any).mockResolvedValue(mockApiResponse);

    const query: SearchQueryDto = { q: 'test' };
    const result = await service.search(query);

    expect(result.results).toHaveLength(1);
    expect(result.results[0]).toEqual({
      videoId: 'test-id',
      title: 'Test Video',
      description: 'Test Description',
      thumbnailUrl: 'test-thumbnail.jpg',
      publishedAt: '2024-02-14T00:00:00Z',
    });
  });
});