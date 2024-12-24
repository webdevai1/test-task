import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { SearchBar } from './components/SearchBar';
import { VideoList } from './components/VideoList';
import { Pagination } from './components/Pagination';
import { searchVideos } from './services/youtube';
import { Youtube } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageToken, setPageToken] = useState<string | undefined>();

  const { data, isLoading, error } = useQuery(
    ['videos', searchTerm, pageToken],
    () => searchVideos({ q: searchTerm, pageToken }),
    {
      enabled: !!searchTerm,
      keepPreviousData: true,
    }
  );

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setPageToken(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Youtube className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">YouTube Video Search</h1>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error ? (
          <div className="text-center text-red-600 mb-4">
            An error occurred while fetching videos. Please try again.
          </div>
        ) : (
          <>
            <VideoList
              videos={data?.results || []}
              isLoading={isLoading}
            />
            {data && (
              <Pagination
                onNext={() => setPageToken(data.nextPageToken)}
                onPrev={() => setPageToken(data.prevPageToken)}
                hasNext={!!data.nextPageToken}
                hasPrev={!!data.prevPageToken}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;