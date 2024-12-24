import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { YouTubeService } from './youtube.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResponse } from './interfaces/youtube-response.interface';

@Controller('search')
export class YouTubeController {
  constructor(private readonly youtubeService: YouTubeService) {}

  @Get()
  async search(
    @Query(new ValidationPipe({ transform: true })) query: SearchQueryDto,
  ): Promise<SearchResponse> {
    return this.youtubeService.search(query);
  }
}