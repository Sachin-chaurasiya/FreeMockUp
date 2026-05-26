import { FC } from "react";

interface BrowserChromeProps {
  url?: string;
  showInput?: boolean;
}

export const BrowserChrome: FC<BrowserChromeProps> = ({
  url,
  showInput = true,
}) => {
  return (
    <div className="flex items-center h-10 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 px-4">
      <div className="flex items-center space-x-2 mr-4">
        <div className="w-3 h-3 bg-red-500 rounded-full border border-red-600"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600"></div>
      </div>

      {showInput && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center bg-white rounded-md px-3 py-1 shadow-sm border border-gray-300 max-w-md w-full">
            <svg
              className="w-4 h-4 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-sm text-gray-600 truncate">
              {url || "https://example.com"}
            </span>
          </div>
        </div>
      )}

      <div className="w-16"></div>
    </div>
  );
};
