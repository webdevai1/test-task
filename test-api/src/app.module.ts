import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YouTubeModule } from './youtube/youtube.module';
import youtubeConfig from './config/youtube.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [youtubeConfig],
    }),
    YouTubeModule,
  ],
})
export class AppModule {}