import { Controller, Get, Query, Req, ValidationPipe } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResponse } from './interfaces/youtube-response.interface';

@Controller('youtube')
export class YoutubeController {
  constructor(private youtubeService: YoutubeService) {}

  @Get('search')
  async search(
    @Query(new ValidationPipe({ transform: true })) query: SearchQueryDto,
  ): Promise<SearchResponse> {
    return this.youtubeService.search(query);
  }
}
