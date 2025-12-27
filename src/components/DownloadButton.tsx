import { FC, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import { FaDownload, FaCopy } from "react-icons/fa";

export const DownloadButton: FC = () => {
  const [isDownLoading, setIsDownLoading] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const exportImageConfig = {
    node: document.getElementById("mockup-screen") as HTMLElement,
    options: {
      quality: 1,
    },
  };

  const downloadImage = (dataUrl: string, extension: string) => {
    const a = document.createElement("a");

    a.setAttribute("download", `freemockup.${extension}`);
    a.setAttribute("href", dataUrl);
    a.click();
  };

  const handlePngExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toPng(
        exportImageConfig.node,
        exportImageConfig.options
      );
      downloadImage(url, "png");
    } catch (error) {
      // handle error
    } finally {
      setIsDownLoading(false);
    }
  };

  const handleClipboardExport = async () => {
    try {
      setIsCopying(true);
      const blob = await toBlob(
        exportImageConfig.node,
        exportImageConfig.options
      );
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob?.type ?? "image/png"]: blob,
          }),
        ]);
        setIsCopying(false);
        alert("Image copied successfully");
      }
    } catch (error) {
      // handle error
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
        <FaCopy className="mr-2" />
        {isCopying ? "Copying..." : "Copy Image"}
      </button>
    </div>
  );
};
