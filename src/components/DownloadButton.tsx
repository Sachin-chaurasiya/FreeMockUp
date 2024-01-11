import { FC, useState } from 'react';
import { toBlob, toPng } from 'html-to-image';

export const DownloadButton: FC = () => {
  const [isDownLoading, setIsDownLoading] = useState<boolean>(false);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const exportImageConfig = {
    node: document.getElementById('mockup-screen') as HTMLElement,
    options: {
      quality: 1,
    },
  };

  const downloadImage = (dataUrl: string, extension: string) => {
    const a = document.createElement('a');

    a.setAttribute('download', `freemockup.${extension}`);
    a.setAttribute('href', dataUrl);
    a.click();
  };

  const handlePngExport = async () => {
    try {
      setIsDownLoading(true);
      const url = await toPng(
        exportImageConfig.node,
        exportImageConfig.options
      );
      downloadImage(url, 'png');
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
            [blob?.type ?? 'image/png']: blob,
          }),
        ]);
        setIsCopying(false);
        alert('Image copied successfully');
      }
    } catch (error) {
      // handle error
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="btn btn-sm hover:bg-brand-500 bg-brand-500 rounded-md text-white"
        onClick={handlePngExport}
      >
        {isDownLoading ? 'Exporting' : 'Export'}
      </button>
      <button
        className="btn btn-sm hover:bg-brand-500 bg-brand-500 rounded-md text-white"
        onClick={handleClipboardExport}
      >
        {isCopying ? 'Copying' : 'Copy'}
      </button>
    </div>
  );
};
