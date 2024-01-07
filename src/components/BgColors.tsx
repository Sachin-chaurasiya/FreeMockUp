import { FC } from 'react';
import { BG_GRADIENT_COLOR_LIST } from '../constants';

interface BgColorsProps {
  onChangingBgColor: (color: string) => void;
  selectedBgColor: string;
}

const BgColors: FC<BgColorsProps> = ({
  onChangingBgColor,
  selectedBgColor,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white">Background</h3>
      <div className="grid flex-wrap grid-cols-8 gap-[1px] relative overflow-hidden rounded-md shadow">
        {BG_GRADIENT_COLOR_LIST.map((color) => (
          <div
            onClick={() => onChangingBgColor(color)}
            key={color}
            className={`cursor-pointer group flex items-center justify-center shadow shadow-gray-500/20 w-full aspect-square ${color}`}
          >
            {selectedBgColor === color && (
              <div className="text-black font-semibold">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BgColors;
