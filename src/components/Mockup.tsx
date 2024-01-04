import { FC } from 'react';

interface MockUpProps {
  imageUrl: string;
  input?: string;
}

const MockUp: FC<MockUpProps> = ({ imageUrl, input }) => {
  return (
    <div className="mockup-browser border bg-base-300" id="mockup-screen">
      <div className="mockup-browser-toolbar">
        <div className="input">{input || 'https://example.com'}</div>
      </div>
      <img
        src={imageUrl || '/placeholder-image.avif'}
        alt="custom-mockup-screen"
      />
    </div>
  );
};

export { MockUp };
