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
      <div
        role="radiogroup"
        aria-label="Background gradient"
        className="grid grid-cols-8 gap-[1px] relative overflow-hidden rounded-md shadow"
      >
        {BG_GRADIENT_COLOR_LIST.map((color, index) => {
          const isSelected = selectedBgColor === color;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Gradient ${index + 1}`}
              onClick={() => onChangingBgColor(color)}
              key={color}
              className={`cursor-pointer flex items-center justify-center shadow shadow-gray-500/20 w-full aspect-square focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset focus:z-10 ${color}`}
            >
              {isSelected && (
                <span aria-hidden="true" className="text-black font-semibold">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BgColors;
