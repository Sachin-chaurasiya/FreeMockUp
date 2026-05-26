import { FC } from "react";
import { FaMobileAlt, FaTabletAlt, FaDesktop, FaLaptop } from "react-icons/fa";
import { DeviceType } from "./DeviceSelector";

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  deviceType: DeviceType;
  scale: number;
  showInput: boolean;
  showBorder: boolean;
  bgColor: string;
  url: string;
}

interface PresetTemplatesProps {
  selectedId: string | null;
  onSelectPreset: (preset: PresetTemplate) => void;
}

const DEVICE_ICON: Record<DeviceType, typeof FaDesktop> = {
  phone: FaMobileAlt,
  tablet: FaTabletAlt,
  laptop: FaLaptop,
  desktop: FaDesktop,
};

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Clean desktop view",
    deviceType: "desktop",
    scale: 75,
    showInput: true,
    showBorder: true,
    bgColor: "bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50",
    url: "https://yourportfolio.com",
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Mobile-first post",
    deviceType: "phone",
    scale: 100,
    showInput: false,
    showBorder: true,
    bgColor: "bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300",
    url: "",
  },
  {
    id: "client-presentation",
    name: "Client Presentation",
    description: "Laptop mockup for proposals",
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
    description: "Tablet for investor demos",
    deviceType: "tablet",
    scale: 100,
    showInput: false,
    showBorder: false,
    bgColor: "bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50",
    url: "",
  },
];

export const PresetTemplates: FC<PresetTemplatesProps> = ({
  selectedId,
  onSelectPreset,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {PRESET_TEMPLATES.map((preset) => {
          const Icon = DEVICE_ICON[preset.deviceType];
          const isSelected = selectedId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`relative text-left p-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                isSelected
                  ? "border-primary-500 bg-primary-50 shadow-md"
                  : "border-brand-200 bg-white hover:border-primary-300 hover:shadow-sm"
              }`}
              aria-pressed={isSelected}
            >
              <div
                className={`mb-2 h-12 rounded-md ${preset.bgColor} flex items-center justify-center`}
              >
                <Icon
                  className={`text-lg ${
                    isSelected ? "text-primary-700" : "text-brand-700"
                  }`}
                />
              </div>
              <div className="text-sm font-medium text-brand-900">
                {preset.name}
              </div>
              <div className="text-xs text-brand-500 mt-0.5">
                {preset.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
