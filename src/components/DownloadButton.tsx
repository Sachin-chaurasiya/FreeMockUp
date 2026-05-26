import { FC, useEffect, useState } from "react";
import { toBlob, toJpeg, toPng } from "html-to-image";
import { FaDownload, FaCopy, FaCheck } from "react-icons/fa";

export type ExportFormat = "png" | "jpeg" | "webp";
export type ExportScale = 1 | 2 | 3;

interface DownloadButtonProps {
  format?: ExportFormat;
  pixelRatio?: ExportScale;
}

const getMockupNode = () =>
  document.getElementById("mockup-screen") as HTMLElement | null;

const renderToDataUrl = async (
  node: HTMLElement,
  format: ExportFormat,
  pixelRatio: ExportScale
) => {
  const options = { quality: 1, pixelRatio };
  if (format === "jpeg" || format === "webp") {
    // html-to-image doesn't ship a toWebp helper, so we fall back to a canvas
    // re-encode for webp. JPEG has a native helper.
    if (format === "jpeg") return toJpeg(node, options);
    const pngUrl = await toPng(node, options);
    return reEncode(pngUrl, "image/webp");
  }
  return toPng(node, options);
};

const reEncode = (dataUrl: string, mime: string) =>
  new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL(mime, 1));
    };
    img.onerror = () => reject(new Error("Re-encode failed"));
    img.src = dataUrl;
  });

export const DownloadButton: FC<DownloadButtonProps> = ({
  format = "png",
  pixelRatio = 2,
}) => {
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

  const handleExport = async () => {
    const node = getMockupNode();
    if (!node) return;
    try {
      setIsDownLoading(true);
      const url = await renderToDataUrl(node, format, pixelRatio);
      downloadImage(url, format === "jpeg" ? "jpg" : format);
    } finally {
      setIsDownLoading(false);
    }
  };

  const handleClipboardExport = async () => {
    const node = getMockupNode();
    if (!node) return;
    try {
      setIsCopying(true);
      const blob = await toBlob(node, { quality: 1, pixelRatio });
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
        onClick={handleExport}
        disabled={isDownLoading}
      >
        <FaDownload className="mr-2" />
        {isDownLoading
          ? "Exporting..."
          : `Download ${format.toUpperCase()} ${pixelRatio}×`}
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
