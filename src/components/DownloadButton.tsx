import { FC, useEffect, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import { FaDownload, FaCopy, FaCheck } from "react-icons/fa";

const EXPORT_OPTIONS = { quality: 1 };

const getMockupNode = () =>
  document.getElementById("mockup-screen") as HTMLElement | null;

export const DownloadButton: FC = () => {
  const [isDownLoading, setIsDownLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const downloadImage = (dataUrl: string, extension: string) => {
    const a = document.createElement("a");
    a.setAttribute("download", `freemockup.${extension}`);
    a.setAttribute("href", dataUrl);
    a.click();
  };

  const handlePngExport = async () => {
    const node = getMockupNode();
    if (!node) return;
    try {
      setIsDownLoading(true);
      const url = await toPng(node, EXPORT_OPTIONS);
      downloadImage(url, "png");
    } finally {
      setIsDownLoading(false);
    }
  };

  const handleClipboardExport = async () => {
    const node = getMockupNode();
    if (!node) return;
    try {
      setIsCopying(true);
      const blob = await toBlob(node, EXPORT_OPTIONS);
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type ?? "image/png"]: blob }),
        ]);
        setCopied(true);
      }
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-sm"
        onClick={handlePngExport}
        disabled={isDownLoading}
      >
        <FaDownload className="mr-2" />
        {isDownLoading ? "Exporting..." : "Download PNG"}
      </button>
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-brand-700 bg-white border border-brand-300 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
        onClick={handleClipboardExport}
        disabled={isCopying}
      >
        {copied ? (
          <>
            <FaCheck className="mr-2 text-green-600" />
            Copied
          </>
        ) : (
          <>
            <FaCopy className="mr-2" />
            {isCopying ? "Copying..." : "Copy Image"}
          </>
        )}
      </button>
    </div>
  );
};
