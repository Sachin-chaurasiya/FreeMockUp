import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUndoableState, UndoableState } from "../hooks/useUndoableState";
import { DeviceType } from "../components/DeviceSelector";
import { BrowserTheme } from "../components/ThemeSelector";
import { ExportFormat, ExportScale } from "../components/DownloadButton";
import { ShadowSize } from "../components/Mockup";
import { PresetTemplate } from "../components/PresetTemplates";
import { BG_GRADIENT_COLOR_LIST } from "../constants";

export interface MockupState {
  showInput: boolean;
  showBorder: boolean;
  input: string;
  bgColor: string;
  scale: number;
  deviceType: DeviceType;
  browserTheme: BrowserTheme;
  padding: number;
  shadow: ShadowSize;
  cornerRadius: number;
  exportFormat: ExportFormat;
  exportScale: ExportScale;
  activePresetId: string | null;
}

export const DEFAULT_STATE: MockupState = {
  showInput: true,
  showBorder: true,
  input: "",
  bgColor: BG_GRADIENT_COLOR_LIST[25],
  scale: 100,
  deviceType: "desktop",
  browserTheme: "light",
  padding: 48,
  shadow: "xl",
  cornerRadius: 8,
  exportFormat: "png",
  exportScale: 2,
  activePresetId: null,
};

const STORAGE_KEY = "freemockup:state:v1";

/**
 * Fields that are part of a PresetTemplate. Editing any of them invalidates
 * the active preset selection; editing others (padding, shadow, theme, etc.)
 * does not.
 */
const PRESET_TRACKED_FIELDS: (keyof MockupState)[] = [
  "deviceType",
  "scale",
  "showInput",
  "showBorder",
  "bgColor",
  "input",
];

type Value = UndoableState<MockupState> & {
  /** Patches state and clears the active preset if a preset-tracked field changed. */
  update: (patch: Partial<MockupState>) => void;
  /** Apply a preset template to state. */
  applyPreset: (preset: PresetTemplate) => void;
  /**
   * Uploaded screenshot data URL. Lives outside the persisted/undoable state:
   * data URLs are too large for localStorage, and the image is independent
   * of the customization settings.
   */
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

const MockupContext = createContext<Value | null>(null);

export const useMockupState = (): Value => {
  const ctx = useContext(MockupContext);
  if (!ctx)
    throw new Error("useMockupState must be used within MockupStateProvider");
  return ctx;
};

export const MockupStateProvider = ({ children }: { children: ReactNode }) => {
  const undoable = useUndoableState(DEFAULT_STATE, STORAGE_KEY);
  const { set, undo, redo } = undoable;
  const [imageUrl, setImageUrl] = useState("");

  const value: Value = {
    ...undoable,
    update: (patch) => {
      const touchesPresetField = PRESET_TRACKED_FIELDS.some((f) => f in patch);
      set(touchesPresetField ? { ...patch, activePresetId: null } : patch);
    },
    applyPreset: (preset) =>
      set({
        activePresetId: preset.id,
        deviceType: preset.deviceType,
        scale: preset.scale,
        showInput: preset.showInput,
        showBorder: preset.showBorder,
        bgColor: preset.bgColor,
        input: preset.url,
      }),
    imageUrl,
    setImageUrl,
  };

  // Global Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z, yielding to text inputs.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.key === "z" && e.shiftKey) || e.key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  return (
    <MockupContext.Provider value={value}>{children}</MockupContext.Provider>
  );
};
