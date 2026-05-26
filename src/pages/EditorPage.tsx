import { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUndo,
  FaRedo,
  FaTrash,
  FaArrowLeft,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";
import { MockUp } from "../components/Mockup";
import { EditorControls } from "../components/EditorControls";
import { useMockupState } from "../context/MockupStateContext";

export const EditorPage: FC = () => {
  const { state, undo, redo, reset, canUndo, canRedo } = useMockupState();
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-brand-50">
      {/* Slim editor header */}
      <header className="flex-shrink-0 h-14 bg-white border-b border-brand-200 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-900 focus-ring rounded px-2 py-1 -ml-2"
          >
            <FaArrowLeft className="text-xs" aria-hidden="true" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <span className="text-brand-200" aria-hidden="true">
            |
          </span>
          <Link
            to="/"
            className="text-lg font-bold gradient-text focus-ring rounded"
            aria-label="FreeMockUp home"
          >
            FreeMockUp
          </Link>
          <span className="hidden md:inline-flex items-center text-xs text-brand-500 bg-brand-50 px-2 py-1 rounded-md ml-2">
            Editor
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center text-xs text-brand-500 mr-3 px-3 py-1 bg-brand-50 rounded-full">
            {state.deviceType.charAt(0).toUpperCase() +
              state.deviceType.slice(1)}{" "}
            ·{" "}
            {state.browserTheme === "auto"
              ? "Auto"
              : state.browserTheme.charAt(0).toUpperCase() +
                state.browserTheme.slice(1)}{" "}
            · {state.scale}%
          </div>
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (⌘Z)"
            aria-label="Undo"
            className="p-2 rounded-lg text-brand-700 hover:bg-brand-100 disabled:opacity-40 disabled:cursor-not-allowed focus-ring transition-colors"
          >
            <FaUndo className="text-sm" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (⌘⇧Z)"
            aria-label="Redo"
            className="p-2 rounded-lg text-brand-700 hover:bg-brand-100 disabled:opacity-40 disabled:cursor-not-allowed focus-ring transition-colors"
          >
            <FaRedo className="text-sm" />
          </button>
          <button
            type="button"
            onClick={reset}
            title="Reset settings (keeps your image)"
            aria-label="Reset settings"
            className="p-2 rounded-lg text-brand-700 hover:bg-red-50 hover:text-red-600 focus-ring transition-colors"
          >
            <FaTrash className="text-sm" />
          </button>
          <button
            type="button"
            onClick={() => setMobileSettingsOpen(true)}
            className="lg:hidden ml-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 focus-ring transition-all"
            aria-label="Open settings"
          >
            <FaSlidersH className="text-xs" aria-hidden="true" />
            Settings
          </button>
        </div>
      </header>

      {/* Split view */}
      <div className="flex-1 flex overflow-hidden">
        {/* Preview pane */}
        <main className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,theme(colors.primary.50),transparent_70%),radial-gradient(circle_at_bottom_left,theme(colors.secondary.50),transparent_70%)]">
          <div className="min-h-full flex flex-col items-center justify-center p-6 lg:p-10">
            <MockUp
              scale={state.scale}
              bgColor={state.bgColor}
              input={state.input}
              showInput={state.showInput}
              withBorder={state.showBorder}
              deviceType={state.deviceType}
              browserTheme={state.browserTheme}
              padding={state.padding}
              shadow={state.shadow}
              cornerRadius={state.cornerRadius}
              exportFormat={state.exportFormat}
              exportScale={state.exportScale}
            />
          </div>
        </main>

        {/* Settings rail (desktop) */}
        <aside className="hidden lg:flex flex-col w-[420px] flex-shrink-0 border-l border-brand-200 bg-white overflow-y-auto">
          <EditorControls />
        </aside>

        {/* Settings drawer (mobile) */}
        {mobileSettingsOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileSettingsOpen(false)}
            role="presentation"
          >
            <aside
              className="absolute right-0 top-0 h-full w-[90vw] max-w-md bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Settings"
            >
              <div className="flex-shrink-0 h-14 border-b border-brand-200 flex items-center justify-between px-4">
                <h2 className="text-base font-semibold text-brand-900">
                  Settings
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileSettingsOpen(false)}
                  className="p-2 rounded-lg text-brand-700 hover:bg-brand-100 focus-ring"
                  aria-label="Close settings"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <EditorControls />
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
