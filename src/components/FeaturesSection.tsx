import { FC } from "react";
import {
  FaBolt,
  FaImage,
  FaMobileAlt,
  FaPaintBrush,
  FaExpand,
  FaLock,
} from "react-icons/fa";

const FEATURES = [
  {
    icon: FaBolt,
    title: "Instant mockups",
    body: "Drag in a screenshot or paste from your clipboard. The mockup updates as you tweak.",
  },
  {
    icon: FaMobileAlt,
    title: "Four real device frames",
    body: "Phone, tablet, laptop, and desktop — each with its own bezel, notch, or browser chrome.",
  },
  {
    icon: FaPaintBrush,
    title: "Custom frame controls",
    body: "Adjust padding, corner radius, shadow, light/dark chrome, and the background gradient.",
  },
  {
    icon: FaImage,
    title: "High-resolution export",
    body: "PNG, JPEG, or WebP at 1×, 2×, or 3× the preview size — copy or download with one click.",
  },
  {
    icon: FaExpand,
    title: "Fullscreen preview",
    body: "Step back and see the mockup at full size before exporting. Escape to dismiss.",
  },
  {
    icon: FaLock,
    title: "100% local",
    body: "Everything runs in your browser. Your screenshots never leave your machine.",
  },
];

const USE_CASES = [
  "Portfolio showcases",
  "Client presentations",
  "Social media posts",
  "Design proposals",
  "Marketing site hero shots",
  "Product launch announcements",
];

export const FeaturesSection: FC = () => {
  return (
    <section
      id="features"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-100"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-12">
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4"
          >
            Everything you need for great-looking screenshots
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto">
            Free forever, no sign-up, no watermark, no design skills required.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="p-6 rounded-2xl border border-brand-100 bg-gradient-to-br from-white to-brand-50/40 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                <Icon className="text-xl" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-brand-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-brand-900 mb-4">
            Made for
          </h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {USE_CASES.map((label) => (
              <li
                key={label}
                className="px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm border border-brand-100"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
