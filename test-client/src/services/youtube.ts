import axios from 'axios';
import type { SearchParams, SearchResponse } from '../types/youtube';

const API_URL = 'http://localhost:3000';

export const searchVideos = async ({
  q,
  pageToken,
  maxResults = 10,
}: SearchParams): Promise<SearchResponse> => {
  const params = new URLSearchParams({
    q,
    ...(pageToken && { pageToken }),
    maxResults: maxResults.toString(),
  });

  const { data } = await axios.get<SearchResponse>(`${API_URL}/search?${params}`);
  return data;
};