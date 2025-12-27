import { FC } from "react";

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  deviceType: "phone" | "tablet" | "laptop" | "desktop";
  scale: number;
  showInput: boolean;
  showBorder: boolean;
  bgColor: string;
  url: string;
}

interface PresetTemplatesProps {
  onSelectPreset: (preset: PresetTemplate) => void;
}

export const PresetTemplates: FC<PresetTemplatesProps> = ({
  onSelectPreset,
}) => {
  const PRESET_TEMPLATES: PresetTemplate[] = [
    {
      id: "portfolio",
      name: "Portfolio",
      description:
        "Clean desktop view perfect for design portfolios and personal websites",
      deviceType: "desktop",
      scale: 75,
      showInput: true,
      showBorder: true,
      bgColor:
        "bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50",
      url: "https://yourportfolio.com",
    },
    {
      id: "social-media",
      name: "Social Media",
      description:
        "Mobile-first design for Instagram, Twitter, and LinkedIn posts",
      deviceType: "phone",
      scale: 100,
      showInput: false,
      showBorder: true,
      bgColor:
        "bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300",
      url: "",
    },
    {
      id: "client-presentation",
      name: "Client Presentation",
      description:
        "Professional laptop mockup for client meetings and proposals",
      deviceType: "laptop",
      scale: 75,
      showInput: true,
      showBorder: true,
      bgColor: "bg-gradient-to-br from-brand-50 to-brand-100",
      url: "https://clientproject.com",
    },
    {
      id: "startup-pitch",
      name: "Startup Pitch",
      description:
        "Modern tablet view ideal for investor presentations and demos",
      deviceType: "tablet",
      scale: 100,
      showInput: false,
      showBorder: false,
      bgColor:
        "bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50",
      url: "",
    },
  ];
  return (
    <div className="mb-6">
      <label
        htmlFor="template-select"
        className="block text-sm font-medium text-brand-700 mb-3"
      >
        Quick Templates
      </label>
      <div className="relative">
        <select
          id="template-select"
          className="w-full rounded-lg border-2 border-brand-300 bg-white px-4 py-3 pr-10 text-brand-900 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200 appearance-none cursor-pointer hover:border-brand-400 hover:shadow-md"
          onChange={(e) => {
            const selectedTemplate = PRESET_TEMPLATES.find(
              (t) => t.id === e.target.value
            );
            if (selectedTemplate) {
              onSelectPreset(selectedTemplate);
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Choose a template...
          </option>
          {PRESET_TEMPLATES.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name} - {preset.description}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-brand-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
