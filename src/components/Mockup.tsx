import { FC, useMemo, useState, useEffect } from "react";
import { FaTimes, FaExpand } from "react-icons/fa";
import { DownloadButton } from "./DownloadButton";
import { DeviceType } from "./DeviceSelector";
import { BrowserTheme } from "./ThemeSelector";

interface MockUpProps {
  bgColor: string;
  scale?: number;
  input?: string;
  showInput?: boolean;
  withBorder?: boolean;
  deviceType?: DeviceType;
  browserTheme?: BrowserTheme;
}

const MockUp: FC<MockUpProps> = ({
  input,
  bgColor,
  showInput = true,
  withBorder = true,
  scale = 75,
  deviceType = "desktop",
  browserTheme = "light",
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handle Escape key and click outside to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isFullscreen && target.classList.contains("fullscreen-overlay")) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setTimeout(() => {
          setIsUploading(false);
        }, 1000);
      };

      reader.onerror = () => {
        throw new Error("Something went wrong!");
      };
    } catch (error) {
      // handle error
      setError((error as Error)?.message ?? "");
      setIsUploading(false);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const scaleClass = useMemo(() => {
    if (scale === 75) return "scale-75";
    if (scale === 50) return "scale-50";
    if (scale === 25) return "scale-[0.25]";
    if (scale === 100) return "scale-100";
    return "";
  }, [scale]);

  // Container classes are now handled within getBrowserThemeClasses

  const getActualTheme = useMemo(() => {
    if (browserTheme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return browserTheme;
  }, [browserTheme]);

  const getBrowserThemeClasses = useMemo(() => {
    const baseClasses = "mockup-browser";
    const themeClass =
      getActualTheme === "dark" ? "mockup-browser-dark" : "bg-base-300";
    const borderClass = withBorder ? "border" : "";
    const scaleClassName = scaleClass;

    switch (deviceType) {
      case "phone":
        return `${baseClasses} ${themeClass} ${borderClass} ${scaleClassName} max-w-sm`;
      case "tablet":
        return `${baseClasses} ${themeClass} ${borderClass} ${scaleClassName} max-w-md`;
      case "laptop":
        return `${baseClasses} ${themeClass} ${borderClass} ${scaleClassName} max-w-2xl`;
      case "desktop":
      default:
        return `${baseClasses} ${themeClass} ${borderClass} ${scaleClassName} max-w-4xl`;
    }
  }, [deviceType, getActualTheme, withBorder, scaleClass]);

  return (
    <>
      {imageUrl && (
        <div className="flex justify-end gap-3 mb-6">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-brand-700 bg-white border border-brand-300 hover:bg-brand-50 focus-ring transition-all duration-200"
            onClick={() => setImageUrl("")}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-brand-700 bg-white border border-brand-300 hover:bg-brand-50 focus-ring transition-all duration-200"
            onClick={() => setIsFullscreen(true)}
          >
            <FaExpand className="w-4 h-4 mr-2" />
            Fullscreen
          </button>
          <DownloadButton />
        </div>
      )}
      <div
        id="mockup-screen"
        className={`p-5 ${bgColor} ${
          imageUrl ? "" : "flex justify-center items-center h-[550px]"
        }`}
      >
        {imageUrl ? (
          <div className={getBrowserThemeClasses}>
            {/* macOS-style browser header */}
            <div className="flex items-center h-10 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 px-4">
              {/* Traffic light buttons */}
              <div className="flex items-center space-x-2 mr-4">
                <div className="w-3 h-3 bg-red-500 rounded-full border border-red-600"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600"></div>
              </div>

              {/* URL bar */}
              {showInput && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center bg-white rounded-md px-3 py-1 shadow-sm border border-gray-300 max-w-md w-full">
                    <svg
                      className="w-4 h-4 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600 truncate">
                      {input || "https://example.com"}
                    </span>
                  </div>
                </div>
              )}

              {/* Spacer for balance */}
              <div className="w-16"></div>
            </div>
            <img
              src={imageUrl}
              alt="custom-mockup-screen"
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-72 border-2 border-brand-200 border-dashed rounded-2xl cursor-pointer bg-gradient-to-br from-white to-brand-50/50 hover:from-primary-25 hover:to-primary-50/50 hover:border-primary-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                  {isUploading ? (
                    <div className="flex flex-col items-center text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-primary-600 mb-4"></div>
                      <p className="text-lg font-medium text-brand-900 mb-2">
                        Processing your screenshot...
                      </p>
                      <p className="text-sm text-brand-600">
                        This will only take a moment
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 p-6 mb-6 group-hover:from-primary-200 group-hover:to-secondary-200 transition-all duration-300">
                        <svg
                          className="w-12 h-12 text-primary-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="mb-3 text-lg font-semibold text-brand-900">
                          Upload Your Screenshot
                        </p>
                        <p className="mb-4 text-sm text-brand-600 max-w-sm">
                          Drag and drop your image here, or click to browse.
                          We'll transform it into a beautiful mockup instantly.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-brand-500">
                          <span className="bg-brand-100 px-2 py-1 rounded-full">
                            PNG
                          </span>
                          <span className="bg-brand-100 px-2 py-1 rounded-full">
                            JPG
                          </span>
                          <span className="bg-brand-100 px-2 py-1 rounded-full">
                            WebP
                          </span>
                          <span className="bg-brand-100 px-2 py-1 rounded-full">
                            Max 10MB
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  multiple={false}
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Toast messages here */}
      {error && (
        <div className="toast toast-top toast-end">
          <div className="alert bg-red-500 text-white rounded-md px-2 py-3">
            <span className="flex justify-between items-center gap-4">
              <span>{error}</span>
              <button className="cursor-pointer" onClick={() => setError("")}>
                <FaTimes />
              </button>
            </span>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && imageUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 fullscreen-overlay">
          <div className="relative max-w-full max-h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Fullscreen Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-brand-200">
              <div>
                <h3 className="text-lg font-semibold text-brand-900">
                  Fullscreen Preview
                </h3>
                <p className="text-sm text-brand-600">
                  {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} •{" "}
                  {browserTheme === "auto"
                    ? "System Theme"
                    : browserTheme.charAt(0).toUpperCase() +
                      browserTheme.slice(1)}
                </p>
              </div>
              <button
                className="p-2 text-brand-600 hover:text-brand-900 hover:bg-brand-100 rounded-lg transition-colors focus-ring"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close fullscreen"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Fullscreen Content */}
            <div
              className={`p-8 ${bgColor} max-h-[calc(100vh-200px)] overflow-auto`}
            >
              <div className="flex justify-center">
                <div className={getBrowserThemeClasses}>
                  {/* macOS-style browser header */}
                  <div className="flex items-center h-10 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-300 px-4">
                    {/* Traffic light buttons */}
                    <div className="flex items-center space-x-2 mr-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full border border-red-600"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600"></div>
                    </div>

                    {/* URL bar */}
                    {showInput && (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex items-center bg-white rounded-md px-3 py-1 shadow-sm border border-gray-300 max-w-md w-full">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <span className="text-sm text-gray-600 truncate">
                            {input || "https://example.com"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Spacer for balance */}
                    <div className="w-16"></div>
                  </div>
                  <img
                    src={imageUrl}
                    alt="fullscreen-mockup-screen"
                    className="w-full h-auto object-cover max-h-[calc(100vh-300px)]"
                  />
                </div>
              </div>
            </div>

            {/* Fullscreen Footer with actions */}
            <div className="flex justify-center gap-4 p-4 bg-white border-t border-brand-200">
              <DownloadButton />
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 focus-ring transition-all duration-200"
                onClick={() => setIsFullscreen(false)}
              >
                Close Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { MockUp };
