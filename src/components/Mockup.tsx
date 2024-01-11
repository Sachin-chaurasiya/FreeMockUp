import { FC, useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { DownloadButton } from './DownloadButton';

interface MockUpProps {
  bgColor: string;
  scale?: number;
  input?: string;
  showInput?: boolean;
  withBorder?: boolean;
}

const MockUp: FC<MockUpProps> = ({
  input,
  bgColor,
  showInput = true,
  withBorder = true,
  scale = 75,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

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
        throw new Error('Something went wrong!');
      };
    } catch (error) {
      // handle error
      setError((error as Error)?.message ?? '');
      setIsUploading(false);

      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const scaleClass = useMemo(() => {
    if (scale === 75) return 'scale-75';
    if (scale === 50) return 'scale-50';
    if (scale === 25) return 'scale-[0.25]';
    if (scale === 100) return 'scale-100';
    return '';
  }, [scale]);

  return (
    <>
      {imageUrl && (
        <div className="flex gap-4 mb-4">
          <button
            className="btn btn-sm border-brand-500 bg-brand-500 text-white hover:bg-brand-500 rounded-md"
            onClick={() => setImageUrl('')}
          >
            Clear
          </button>
          <DownloadButton />
        </div>
      )}
      <div
        id="mockup-screen"
        className={`p-5 ${bgColor} ${
          imageUrl ? '' : 'flex justify-center items-center h-[550px]'
        }`}
      >
        {imageUrl ? (
          <div
            className={`mockup-browser bg-base-300 ${
              withBorder ? 'border' : ''
            } ${scaleClass} sca`}
          >
            <div className="mockup-browser-toolbar">
              {showInput && (
                <div className="input">{input || 'https://example.com'}</div>
              )}
            </div>
            <img src={imageUrl} alt="custom-mockup-screen" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-[500px]">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-500 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 hover:bg-gray-100 hover:border-brand-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {isUploading ? (
                  'Uploading...'
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-4 text-[#1D232A]"
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
                    <p className="mb-2 text-sm text-[#1D232A]">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-[#1D232A]">SVG, PNG or JPG.</p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/svg+xml, image/png, image/jpeg"
                multiple={false}
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>

      {/* Toast messages here */}
      {error && (
        <div className="toast toast-top toast-end">
          <div className="alert bg-red-500 text-white rounded-md px-2 py-3">
            <span className="flex justify-between items-center gap-4">
              <span>{error}</span>
              <button className="cursor-pointer" onClick={() => setError('')}>
                <FaTimes />
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export { MockUp };
