import { useState } from "react";
import { MockUp } from "./components/Mockup";
import BgColors from "./components/BgColors";
import { DeviceSelector, DeviceType } from "./components/DeviceSelector";
import { PresetTemplates, PresetTemplate } from "./components/PresetTemplates";
import { ThemeSelector, BrowserTheme } from "./components/ThemeSelector";
import { BG_GRADIENT_COLOR_LIST } from "./constants";
import Header from "./components/Header";
import { HeroSection } from "./components/HeroSection";

function App() {
  const [showInput, setShowInput] = useState(true);
  const [showBorder, setShowBorder] = useState(true);
  const [input, setInput] = useState("");
  const [bgColor, setBgColor] = useState(BG_GRADIENT_COLOR_LIST[25]);
  const [scale, setScale] = useState(100);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [browserTheme, setBrowserTheme] = useState<BrowserTheme>("light");

  const handlePresetSelect = (preset: PresetTemplate) => {
    setDeviceType(preset.deviceType);
    setScale(preset.scale);
    setShowInput(preset.showInput);
    setShowBorder(preset.showBorder);
    setBgColor(preset.bgColor);
    setInput(preset.url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-secondary-50">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus-ring"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content">
        {/* SEO-friendly hidden content for search engines */}
        <div className="sr-only">
          <h1>FreeMockUp - Professional Browser Mockup Generator</h1>
          <p>
            Create stunning browser mockups from your screenshots for free.
            Transform any screenshot into a professional mockup for portfolios,
            presentations, and client pitches. Support for desktop, tablet,
            mobile, and laptop devices.
          </p>
          <h2>Features</h2>
          <ul>
            <li>Free browser mockup generator</li>
            <li>Professional screenshot mockups</li>
            <li>Multiple device support - desktop, tablet, mobile, laptop</li>
            <li>Customizable themes and backgrounds</li>
            <li>High-quality PNG export</li>
            <li>Fullscreen preview mode</li>
            <li>Social media sharing</li>
            <li>No design skills required</li>
          </ul>
          <h2>Use Cases</h2>
          <ul>
            <li>Portfolio showcase</li>
            <li>Client presentations</li>
            <li>Social media posts</li>
            <li>Design proposals</li>
            <li>Website mockups</li>
            <li>App screenshots</li>
          </ul>
        </div>
        {/* Hero Section */}
        <HeroSection />

        {/* Create Mockup Section */}
        <section
          id="create-mockup-section"
          className="py-16 px-4 sm:px-6 lg:px-8"
          aria-labelledby="create-heading"
        >
          <div className="mx-auto max-w-7xl">
            <header className="text-center mb-12">
              <h2
                id="create-heading"
                className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4"
              >
                Create Your Professional Mockup
              </h2>
              <p className="text-lg text-brand-600 max-w-2xl mx-auto mb-6">
                Transform any screenshot into a stunning browser mockup in
                seconds. Choose from multiple device types, customize themes,
                and export high-quality images for your portfolio,
                presentations, or client pitches.
              </p>

              {/* Quick tips */}
              <div className="inline-flex items-center gap-6 text-sm text-brand-600 bg-brand-50 rounded-full px-6 py-3">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Upload screenshot</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                  <span>Choose device</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                  <span>Customize & export</span>
                </span>
              </div>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mockup Preview - Left Side */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl border border-brand-100 overflow-hidden">
                  {/* Preview Header */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-4 sm:px-6 lg:px-8 py-4 border-b border-brand-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-brand-900">
                          Live Preview
                        </h4>
                        <p className="text-xs text-brand-600 mt-1">
                          {deviceType.charAt(0).toUpperCase() +
                            deviceType.slice(1)}{" "}
                          •{" "}
                          {browserTheme === "auto"
                            ? "System Theme"
                            : browserTheme.charAt(0).toUpperCase() +
                              browserTheme.slice(1)}{" "}
                          • {scale}% scale
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-brand-600">Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-brand-50/30 to-secondary-50/30">
                    <MockUp
                      scale={scale}
                      bgColor={bgColor}
                      input={input}
                      showInput={showInput}
                      withBorder={showBorder}
                      deviceType={deviceType}
                      browserTheme={browserTheme}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Panel - Right Side (Scrollable) */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-xl border border-brand-100 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
                  {/* Header */}
                  <div className="p-6 pb-4 sticky top-0 bg-white border-b border-brand-100 z-10">
                    <h3 className="text-xl font-bold text-brand-900 mb-2">
                      Customize Your Mockup
                    </h3>
                    <p className="text-sm text-brand-600">
                      Choose from presets or fine-tune every detail
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Quick Templates */}
                    <PresetTemplates onSelectPreset={handlePresetSelect} />

                    {/* Device & Theme */}
                    <div>
                      <h4 className="text-sm font-semibold text-brand-800 mb-4 uppercase tracking-wider">
                        Device & Theme
                      </h4>
                      <div className="space-y-4">
                        <DeviceSelector
                          selectedDevice={deviceType}
                          onDeviceChange={setDeviceType}
                        />
                        <ThemeSelector
                          selectedTheme={browserTheme}
                          onThemeChange={setBrowserTheme}
                        />
                      </div>
                    </div>

                    {/* Display Settings */}
                    <div>
                      <h4 className="text-sm font-semibold text-brand-800 mb-4 uppercase tracking-wider">
                        Display Settings
                      </h4>

                      {/* URL Input */}
                      {showInput && (
                        <div className="mb-4">
                          <label
                            htmlFor="website-url"
                            className="block text-sm font-medium text-brand-700 mb-2"
                          >
                            Browser URL
                          </label>
                          <input
                            id="website-url"
                            className="w-full rounded-lg border-brand-200 bg-brand-50 px-4 py-3 text-brand-900 placeholder-brand-400 focus:border-primary-500 focus:ring-primary-500 transition-colors"
                            type="url"
                            placeholder="https://example.com"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                        </div>
                      )}

                      {/* Toggles */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
                          <label
                            htmlFor="show-url"
                            className="text-sm font-medium text-brand-700 cursor-pointer"
                          >
                            Show URL Bar
                          </label>
                          <input
                            id="show-url"
                            type="checkbox"
                            className="toggle toggle-primary bg-brand-200 border-brand-200 checked:bg-primary-500 checked:border-primary-500"
                            onChange={(e) => setShowInput(e.target.checked)}
                            checked={showInput}
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
                          <label
                            htmlFor="show-border"
                            className="text-sm font-medium text-brand-700 cursor-pointer"
                          >
                            Show Border
                          </label>
                          <input
                            id="show-border"
                            type="checkbox"
                            className="toggle toggle-primary bg-brand-200 border-brand-200 checked:bg-primary-500 checked:border-primary-500"
                            onChange={(e) => setShowBorder(e.target.checked)}
                            checked={showBorder}
                          />
                        </div>
                      </div>

                      {/* Scale Control */}
                      <div className="mb-6">
                        <label
                          htmlFor="scale"
                          className="block text-sm font-medium text-brand-700 mb-3"
                        >
                          Scale:{" "}
                          <span className="font-semibold text-primary-600">
                            {scale}%
                          </span>
                        </label>
                        <input
                          type="range"
                          min={25}
                          max="100"
                          value={scale}
                          className="range range-primary w-full h-2"
                          step="25"
                          onChange={(e) => setScale(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-xs text-brand-500 mt-2">
                          <span>25%</span>
                          <span>50%</span>
                          <span>75%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Background Colors */}
                    <div>
                      <h4 className="text-sm font-semibold text-brand-800 mb-4 uppercase tracking-wider">
                        Background
                      </h4>
                      <BgColors
                        selectedBgColor={bgColor}
                        onChangingBgColor={(color) => setBgColor(color)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">FreeMockUp</h3>
            <p className="text-brand-300 mb-6 max-w-md mx-auto">
              Create professional mockups from your screenshots. Free forever,
              no credit card required.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://github.com/Sachin-chaurasiya/FreeMockUp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
            <p className="text-brand-400 text-sm">
              © {new Date().getFullYear()} FreeMockUp. Made with ❤️ by{" "}
              <a
                href="https://github.com/Sachin-chaurasiya"
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary-300 hover:text-primary-100 transition-colors"
              >
                Sachin Chaurasiya
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
