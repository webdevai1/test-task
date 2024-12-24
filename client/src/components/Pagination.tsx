import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  isLoading: boolean;
}

export function Pagination({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  isLoading,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={!hasPrev || isLoading}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext || isLoading}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
