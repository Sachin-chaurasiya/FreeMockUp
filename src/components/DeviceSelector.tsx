import { FC } from 'react';
import { FaMobileAlt, FaTabletAlt, FaDesktop, FaLaptop } from 'react-icons/fa';

export type DeviceType = 'phone' | 'tablet' | 'laptop' | 'desktop';

interface DeviceSelectorProps {
  selectedDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

const devices = [
  {
    type: 'phone' as DeviceType,
    label: 'Phone',
    icon: FaMobileAlt,
    description: 'Mobile view'
  },
  {
    type: 'tablet' as DeviceType,
    label: 'Tablet',
    icon: FaTabletAlt,
    description: 'Tablet view'
  },
  {
    type: 'laptop' as DeviceType,
    label: 'Laptop',
    icon: FaLaptop,
    description: 'Laptop view'
  },
  {
    type: 'desktop' as DeviceType,
    label: 'Desktop',
    icon: FaDesktop,
    description: 'Desktop view'
  }
];

export const DeviceSelector: FC<DeviceSelectorProps> = ({
  selectedDevice,
  onDeviceChange
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-brand-700 mb-3">
        Device Type
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {devices.map((device) => {
          const Icon = device.icon;
          const isSelected = selectedDevice === device.type;

          return (
            <button
              key={device.type}
              onClick={() => onDeviceChange(device.type)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-lg transform scale-105'
                  : 'border-brand-200 bg-white hover:border-primary-300 hover:bg-primary-25 hover:shadow-md hover:transform hover:scale-102'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon
                  className={`text-2xl transition-colors duration-200 ${
                    isSelected ? 'text-primary-600' : 'text-brand-500 group-hover:text-primary-500'
                  }`}
                />
                <div className="text-center">
                  <div
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isSelected ? 'text-primary-700' : 'text-brand-700 group-hover:text-primary-600'
                    }`}
                  >
                    {device.label}
                  </div>
                  <div className="text-xs text-brand-500 mt-1 group-hover:text-brand-600 transition-colors duration-200">
                    {device.description}
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
