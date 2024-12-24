import axios from "axios";
import type { SearchParams, SearchResponse } from "../types/youtube";

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

  const apiUrl = import.meta.env.VITE_API_URL;

  const { data } = await axios.get<SearchResponse>(
    `${apiUrl}/youtube/search?${params}`
  );
  return data;
};
