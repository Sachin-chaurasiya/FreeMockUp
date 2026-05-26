import { FC, ReactNode } from "react";
import { DeviceType } from "./DeviceSelector";
import { BrowserChrome } from "./BrowserChrome";

interface DeviceFrameProps {
  deviceType: DeviceType;
  url?: string;
  showInput?: boolean;
  withBorder?: boolean;
  isDark?: boolean;
  cornerRadius?: number;
  children: ReactNode;
}

const FRAME_WIDTH: Record<DeviceType, string> = {
  phone: "max-w-[320px]",
  tablet: "max-w-md",
  laptop: "max-w-2xl",
  desktop: "max-w-4xl",
};

export const DeviceFrame: FC<DeviceFrameProps> = ({
  deviceType,
  url,
  showInput = true,
  withBorder = true,
  isDark = false,
  cornerRadius = 8,
  children,
}) => {
  const outerBorder = withBorder ? "ring-1 ring-black/10" : "";
  const screenRadius = { borderRadius: `${cornerRadius}px` };

  if (deviceType === "phone") {
    return (
      <div
        className={`relative ${FRAME_WIDTH.phone} ${outerBorder} bg-gray-900 rounded-[2.5rem] p-3 shadow-xl`}
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <div className="h-1.5 w-12 bg-gray-700 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-700 rounded-full"></div>
        </div>
        <div
          className="overflow-hidden bg-white"
          style={{ borderRadius: `${Math.max(cornerRadius + 12, 24)}px` }}
        >
          <div className="pt-6">{children}</div>
        </div>
      </div>
    );
  }

  if (deviceType === "tablet") {
    return (
      <div
        className={`relative ${FRAME_WIDTH.tablet} ${outerBorder} bg-gray-900 rounded-[1.75rem] p-3 shadow-xl`}
      >
        <div
          className="overflow-hidden bg-white"
          style={{ borderRadius: `${Math.max(cornerRadius + 6, 14)}px` }}
        >
          {children}
        </div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-16 bg-gray-700 rounded-full"></div>
      </div>
    );
  }

  if (deviceType === "laptop") {
    return (
      <div className={`${FRAME_WIDTH.laptop} flex flex-col items-center`}>
        <div
          className={`w-full overflow-hidden ${outerBorder} ${
            isDark ? "bg-gray-900" : "bg-white"
          } shadow-xl`}
          style={screenRadius}
        >
          <BrowserChrome url={url} showInput={showInput} />
          {children}
        </div>
        <div
          className="h-2 w-[110%] bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl"
          aria-hidden="true"
        ></div>
        <div
          className="h-1 w-8 bg-gray-400 rounded-b-md"
          aria-hidden="true"
        ></div>
      </div>
    );
  }

  // desktop
  return (
    <div
      className={`${FRAME_WIDTH.desktop} ${outerBorder} overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-white"
      } shadow-xl`}
      style={screenRadius}
    >
      <BrowserChrome url={url} showInput={showInput} />
      {children}
    </div>
  );
};
