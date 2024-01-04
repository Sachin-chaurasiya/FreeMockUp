import { FC, useState } from 'react';
import { toPng } from 'html-to-image';

export const DownloadButton: FC = () => {
  const [isDownLoading, setIsDownLoading] = useState<boolean>(false);

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

  return (
    <button
      className="px-4 py-2 bg-brand-500 rounded-md text-white"
      onClick={handlePngExport}
    >
      {isDownLoading ? 'Downloading' : 'Download'}
    </button>
  );
};
