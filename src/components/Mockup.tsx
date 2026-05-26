import { FC, useMemo, useState, useEffect, useCallback, useRef } from "react";
import { FaTimes, FaExpand } from "react-icons/fa";
import {
  DownloadButton,
  ExportFormat,
  ExportScale,
} from "./DownloadButton";
import { DeviceType } from "./DeviceSelector";
import { BrowserTheme } from "./ThemeSelector";
import { DeviceFrame } from "./DeviceFrame";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];

const SHADOW_CLASSES: Record<string, string> = {
  none: "",
  sm: "drop-shadow-sm",
  md: "drop-shadow-md",
  lg: "drop-shadow-lg",
  xl: "drop-shadow-2xl",
};

export type ShadowSize = keyof typeof SHADOW_CLASSES;

interface MockUpProps {
  bgColor: string;
  scale?: number;
  input?: string;
  showInput?: boolean;
  withBorder?: boolean;
  deviceType?: DeviceType;
  browserTheme?: BrowserTheme;
  padding?: number;
  shadow?: ShadowSize;
  cornerRadius?: number;
  exportFormat?: ExportFormat;
  exportScale?: ExportScale;
}

const MockUp: FC<MockUpProps> = ({
  input,
  bgColor,
  showInput = true,
  withBorder = true,
  scale = 100,
  deviceType = "desktop",
  browserTheme = "light",
  padding = 32,
  shadow = "xl",
  cornerRadius = 8,
  exportFormat = "png",
  exportScale = 2,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Handle Escape key to close fullscreen
  useEffect(() => {
    if (!isFullscreen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  const showError = useCallback((message: string) => {
    setError(message);
    setIsUploading(false);
    setTimeout(() => setError(""), 3000);
  }, []);

  const processFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
        showError("Unsupported file type. Please use PNG, JPG, or WebP.");
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        showError("File is larger than 10MB.");
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        showError("Could not read the file. Please try again.");
      };
      reader.readAsDataURL(file);
    },
    [showError]
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Paste-from-clipboard support (Cmd/Ctrl+V) — only active before an image is uploaded.
  useEffect(() => {
    if (imageUrl) return;
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            processFile(file);
            e.preventDefault();
            return;
          }
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [imageUrl, processFile]);

  const scaleStyle = useMemo(
    () => ({
      transform: `scale(${scale / 100})`,
      transformOrigin: "center top",
    }),
    [scale]
  );

  const resolvedTheme = useMemo(() => {
    if (browserTheme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return browserTheme;
  }, [browserTheme]);

  const renderMockupImage = () => (
    <img
      src={imageUrl}
      alt="custom-mockup-screen"
      className="w-full h-auto object-cover block"
    />
  );

  const renderFrame = (scaled: boolean) => (
    <div
      className={SHADOW_CLASSES[shadow] || ""}
      style={scaled ? scaleStyle : undefined}
    >
      <DeviceFrame
        deviceType={deviceType}
        url={input}
        showInput={showInput}
        withBorder={withBorder}
        isDark={resolvedTheme === "dark"}
        cornerRadius={cornerRadius}
      >
        {renderMockupImage()}
      </DeviceFrame>
    </div>
  );

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
          <DownloadButton format={exportFormat} pixelRatio={exportScale} />
        </div>
      )}
      <div
        id="mockup-screen"
        className={`${bgColor} ${
          imageUrl ? "flex justify-center" : "flex justify-center items-center h-[550px]"
        }`}
        style={imageUrl ? { padding: `${padding}px` } : { padding: "20px" }}
      >
        {imageUrl ? (
          renderFrame(true)
        ) : (
          <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-md">
              <label
                htmlFor="dropzone-file"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group ${
                  isDragOver
                    ? "border-primary-500 bg-primary-50"
                    : "border-brand-200 bg-gradient-to-br from-white to-brand-50/50 hover:from-primary-25 hover:to-primary-50/50 hover:border-primary-300"
                }`}
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
                          {isDragOver
                            ? "Drop to upload"
                            : "Upload Your Screenshot"}
                        </p>
                        <p className="mb-4 text-sm text-brand-600 max-w-sm">
                          Drag and drop, click to browse, or paste from your
                          clipboard (⌘V / Ctrl+V).
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
        <div
          ref={overlayRef}
          onClick={(e) => {
            if (e.target === overlayRef.current) setIsFullscreen(false);
          }}
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
        >
          <div className="relative max-w-full max-h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
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

            <div
              className={`${bgColor} max-h-[calc(100vh-200px)] overflow-auto flex justify-center`}
              style={{ padding: `${padding}px` }}
            >
              {renderFrame(false)}
            </div>

            <div className="flex justify-center gap-4 p-4 bg-white border-t border-brand-200">
              <DownloadButton format={exportFormat} pixelRatio={exportScale} />
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
