import { useState } from 'react';
import { DownloadButton } from './components/DownloadButton';
import { MockUp } from './components/Mockup';
import { FaGithub, FaTimes } from 'react-icons/fa';

function App() {
  const [input, setInput] = useState('');
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

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* Header here */}
      <header className="flex justify-between items-center">
        <h2 className="text-white font-bold cursor-pointer text-xl">
          Free<span className="text-brand-500">Mock</span>
          <span className="italic">Up</span>
        </h2>
        <div className="flex gap-8 items-center">
          <span className="text-3xl cursor-pointer text-white">
            <a
              href="https://github.com/Sachin-chaurasiya/FreeMockUp"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaGithub />
            </a>
          </span>
          <DownloadButton />
        </div>
      </header>

      {/* Main here */}
      <main className="grid lg:grid-cols-3 md:grid-cols-3 xss:grid-cols-1 gap-8 mt-4">
        <div className="col-span-1 flex flex-col gap-4">
          <label className="text-white" htmlFor="website-url">
            Website URL{' '}
          </label>
          <input
            id="website-url"
            className="rounded-md p-2 bg-white text-black outline-brand-500"
            type="url"
            placeholder="https://example.com"
            onChange={(e) => setInput(e.target.value)}
          />

          <p className="text-white">Screen</p>
          <div className="flex items-center justify-center w-full">
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
        </div>
        <div className="col-span-2">
          <MockUp imageUrl={imageUrl} input={input} />
        </div>
      </main>

      {/* Footer here */}
      <footer>
        <p className="text-white text-center flex gap-2 items-center justify-center">
          <span>{new Date().getFullYear()} © FreeMockUp.</span>
          Made with ❤️ by{' '}
          <a
            href="https://github.com/Sachin-chaurasiya"
            target="_blank"
            rel="noreferrer noopener"
            className="text-brand-500"
          >
            Sachin-chaurasiya
          </a>
        </p>
      </footer>

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
    </div>
  );
}

export default App;
