import { FC } from "react";
import BgColors from "./BgColors";
import { DeviceSelector } from "./DeviceSelector";
import { PresetTemplates } from "./PresetTemplates";
import { ThemeSelector } from "./ThemeSelector";
import { ExportFormat, ExportScale } from "./DownloadButton";
import { ShadowSize } from "./Mockup";
import { useMockupState } from "../context/MockupStateContext";

const SHADOW_OPTIONS: ShadowSize[] = ["none", "sm", "md", "lg", "xl"];
const FORMAT_OPTIONS: ExportFormat[] = ["png", "jpeg", "webp"];
const SCALE_OPTIONS: ExportScale[] = [1, 2, 3];

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <section className="px-6 py-5 border-b border-brand-100 last:border-b-0">
    <h4 className="text-xs font-semibold text-brand-500 mb-4 uppercase tracking-wider">
      {title}
    </h4>
    {children}
  </section>
);

export const EditorControls: FC = () => {
  const { state, update, applyPreset } = useMockupState();
  const {
    showInput,
    showBorder,
    input,
    bgColor,
    scale,
    deviceType,
    browserTheme,
    padding,
    shadow,
    cornerRadius,
    exportFormat,
    exportScale,
    activePresetId,
  } = state;

  const hasChrome = deviceType === "desktop" || deviceType === "laptop";

  return (
    <div className="divide-y divide-brand-100">
      <Section title="Quick Templates">
        <PresetTemplates
          selectedId={activePresetId}
          onSelectPreset={applyPreset}
        />
      </Section>

      <Section title={hasChrome ? "Device & Theme" : "Device"}>
        <div className="space-y-4">
          <DeviceSelector
            selectedDevice={deviceType}
            onDeviceChange={(d) => update({ deviceType: d })}
          />
          {hasChrome && (
            <ThemeSelector
              selectedTheme={browserTheme}
              onThemeChange={(t) => update({ browserTheme: t })}
            />
          )}
        </div>
      </Section>

      <Section title="Display">
        {hasChrome && showInput && (
          <div className="mb-4">
            <label
              htmlFor="website-url"
              className="block text-sm font-medium text-brand-700 mb-2"
            >
              Browser URL
            </label>
            <input
              id="website-url"
              className="w-full rounded-lg border-brand-200 bg-brand-50 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-400 focus:border-primary-500 focus:ring-primary-500 transition-colors"
              type="url"
              placeholder="https://example.com"
              value={input}
              onChange={(e) => update({ input: e.target.value })}
            />
          </div>
        )}

        <div className="space-y-2 mb-4">
          {hasChrome && (
            <label className="flex items-center justify-between p-3 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors cursor-pointer">
              <span className="text-sm font-medium text-brand-700">
                Show URL Bar
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary bg-brand-200 border-brand-200 checked:bg-primary-500 checked:border-primary-500"
                onChange={(e) => update({ showInput: e.target.checked })}
                checked={showInput}
              />
            </label>
          )}

          <label className="flex items-center justify-between p-3 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors cursor-pointer">
            <span className="text-sm font-medium text-brand-700">
              Show Border
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary bg-brand-200 border-brand-200 checked:bg-primary-500 checked:border-primary-500"
              onChange={(e) => update({ showBorder: e.target.checked })}
              checked={showBorder}
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="scale"
            className="block text-sm font-medium text-brand-700 mb-2"
          >
            Scale:{" "}
            <span className="font-semibold text-primary-600">{scale}%</span>
          </label>
          <input
            id="scale"
            type="range"
            min={25}
            max={100}
            value={scale}
            step={5}
            className="range range-primary w-full h-2"
            aria-valuetext={`${scale} percent`}
            onChange={(e) => update({ scale: Number(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-brand-500 mt-1">
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </Section>

      <Section title="Frame">
        <div className="mb-4">
          <label
            htmlFor="padding"
            className="block text-sm font-medium text-brand-700 mb-2"
          >
            Padding:{" "}
            <span className="font-semibold text-primary-600">{padding}px</span>
          </label>
          <input
            id="padding"
            type="range"
            min={0}
            max={96}
            step={4}
            value={padding}
            className="range range-primary w-full h-2"
            onChange={(e) => update({ padding: Number(e.target.value) })}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="corner-radius"
            className="block text-sm font-medium text-brand-700 mb-2"
          >
            Corner Radius:{" "}
            <span className="font-semibold text-primary-600">
              {cornerRadius}px
            </span>
          </label>
          <input
            id="corner-radius"
            type="range"
            min={0}
            max={32}
            step={1}
            value={cornerRadius}
            className="range range-primary w-full h-2"
            onChange={(e) => update({ cornerRadius: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Shadow
          </label>
          <div className="grid grid-cols-5 gap-2">
            {SHADOW_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => update({ shadow: s })}
                className={`px-2 py-2 text-xs font-medium rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                  shadow === s
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-brand-200 bg-white text-brand-700 hover:border-primary-300"
                }`}
                aria-pressed={shadow === s}
              >
                {s === "none" ? "None" : s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Export">
        <div className="mb-4">
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {FORMAT_OPTIONS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => update({ exportFormat: f })}
                className={`px-2 py-2 text-xs font-medium rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                  exportFormat === f
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-brand-200 bg-white text-brand-700 hover:border-primary-300"
                }`}
                aria-pressed={exportFormat === f}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Resolution
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SCALE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => update({ exportScale: s })}
                className={`px-2 py-2 text-xs font-medium rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                  exportScale === s
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-brand-200 bg-white text-brand-700 hover:border-primary-300"
                }`}
                aria-pressed={exportScale === s}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Background">
        <BgColors
          selectedBgColor={bgColor}
          onChangingBgColor={(c) => update({ bgColor: c })}
        />
      </Section>
    </div>
  );
};
