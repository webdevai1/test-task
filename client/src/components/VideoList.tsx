import type { YouTubeVideo } from "../types/youtube";

interface VideoListProps {
  videos: YouTubeVideo[];
  isLoading: boolean;
}

const LoadingSkeleton = () => (
  <div className="w-full mx-auto max-w-3xl animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="mb-4 p-4 bg-gray-100 rounded-lg">
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const NoVideosMessage = () => (
  <div className="w-full mx-auto max-w-3xl text-center py-8">
    <p className="text-gray-500">
      No videos found. Try a different search term.
    </p>
  </div>
);

const VideoCard = ({ video }: { video: YouTubeVideo }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:opacity-90 transition-opacity"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full object-cover h-48"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {video.description}
        </p>
        <p className="text-gray-400 text-xs mt-2">
          {new Date(video.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </a>
  </div>
);

export function VideoList({ videos, isLoading }: VideoListProps) {
  if (isLoading) return <LoadingSkeleton />;
  if (videos.length === 0) return <NoVideosMessage />;

  return (
    <div className="w-full mx-auto max-w-3xl space-y-4">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
}
