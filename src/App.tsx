import { useState } from 'react';
import { MockUp } from './components/Mockup';
import BgColors from './components/BgColors';
import { BG_GRADIENT_COLOR_LIST } from './constants';
import Header from './components/Header';
import { HeroSection } from './components/HeroSection';

function App() {
  const [showInput, setShowInput] = useState(true);
  const [showBorder, setShowBorder] = useState(true);
  const [input, setInput] = useState('');
  const [bgColor, setBgColor] = useState(BG_GRADIENT_COLOR_LIST[25]);
  const [scale, setScale] = useState(75);

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* Header here */}
      <Header />

      {/* Main here */}
      <main>
        <HeroSection />

        <h2 className="text-3xl font-bold mb-8 text-center">
          Turn your screenshots into stunning mockups
        </h2>
        <div
          className="grid lg:grid-cols-3 md:grid-cols-3 xss:grid-cols-1 gap-8 px-8"
          id="create-mockup-section"
        >
          <div className="col-span-2">
            <MockUp
              scale={scale}
              bgColor={bgColor}
              input={input}
              showInput={showInput}
              withBorder={showBorder}
            />
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            {showInput && (
              <>
                <label htmlFor="website-url">Website URL </label>
                <input
                  id="website-url"
                  className="rounded-md p-2 text-black outline-brand-500 border border-brand-500 focus:border-brand-500 focus:ring-brand-500"
                  type="url"
                  placeholder="https://example.com"
                  onChange={(e) => setInput(e.target.value)}
                />
              </>
            )}
            <div className="flex justify-between">
              <label htmlFor="toggle-view" className="cursor-pointer">
                ShowInput
              </label>
              <input
                id="toggle-view"
                type="checkbox"
                className="toggle bg-brand-700 hover:bg-brand-500 border-brand-500 checked:bg-brand-500"
                onChange={(e) => setShowInput(e.target.checked)}
                checked={showInput}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="toggle-view" className="cursor-pointer">
                Border
              </label>
              <input
                id="toggle-view"
                type="checkbox"
                className="toggle bg-brand-700 hover:bg-brand-500 border-brand-500 checked:bg-brand-500"
                onChange={(e) => setShowBorder(e.target.checked)}
                checked={showBorder}
              />
            </div>
            <label htmlFor="scale">Scale</label>
            <input
              type="range"
              min={25}
              max="100"
              value={scale}
              className="range range-brand"
              step="25"
              onChange={(e) => setScale(Number(e.target.value))}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
            <BgColors
              selectedBgColor={bgColor}
              onChangingBgColor={(color) => setBgColor(color)}
            />
          </div>
        </div>
      </main>

      {/* Footer here */}
      <footer>
        <p className="text-center flex gap-2 items-center justify-center">
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
    </div>
  );
}

export default App;
