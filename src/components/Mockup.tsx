import { FC } from 'react';
import { DEFAULT_SCREEN } from '../constants';

interface MockUpProps {
  imageUrl: string;
  input?: string;
  showInput?: boolean;
  withBorder?: boolean;
}

const MockUp: FC<MockUpProps> = ({
  imageUrl,
  input,
  showInput = true,
  withBorder = true,
}) => {
  return (
    <div
      className={`mockup-browser bg-base-300 ${withBorder ? 'border' : ''}`}
      id="mockup-screen"
    >
      <div className="mockup-browser-toolbar">
        {showInput && (
          <div className="input">{input || 'https://example.com'}</div>
        )}
      </div>
      <img src={imageUrl || DEFAULT_SCREEN} alt="custom-mockup-screen" />
    </div>
  );
};

export { MockUp };
