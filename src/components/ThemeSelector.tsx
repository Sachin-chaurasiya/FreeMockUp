import { FC } from 'react';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';

export type BrowserTheme = 'light' | 'dark' | 'auto';

interface ThemeSelectorProps {
  selectedTheme: BrowserTheme;
  onThemeChange: (theme: BrowserTheme) => void;
}

const themes = [
  {
    type: 'light' as BrowserTheme,
    label: 'Light',
    icon: FaSun,
    description: 'Clean white theme'
  },
  {
    type: 'dark' as BrowserTheme,
    label: 'Dark',
    icon: FaMoon,
    description: 'Modern dark theme'
  },
  {
    type: 'auto' as BrowserTheme,
    label: 'Auto',
    icon: FaAdjust,
    description: 'System preference'
  }
];

export const ThemeSelector: FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Browser Theme
      </label>
      <div className="grid grid-cols-3 gap-2">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === theme.type;

          return (
            <button
              key={theme.type}
              onClick={() => onThemeChange(theme.type)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-brand-200 bg-white hover:border-primary-300 hover:bg-primary-25 hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <Icon
                  className={`text-lg transition-colors duration-200 ${
                    isSelected ? 'text-primary-600' : 'text-brand-500 group-hover:text-primary-500'
                  }`}
                />
                <div className="text-center">
                  <div
                    className={`text-xs font-medium transition-colors duration-200 ${
                      isSelected ? 'text-primary-700' : 'text-brand-700 group-hover:text-primary-600'
                    }`}
                  >
                    {theme.label}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
