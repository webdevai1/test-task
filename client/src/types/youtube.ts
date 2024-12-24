export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export interface SearchResponse {
  results: YouTubeVideo[];
  totalResults: number;
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface SearchParams {
  q: string;
  pageToken?: string;
  maxResults?: number;
}