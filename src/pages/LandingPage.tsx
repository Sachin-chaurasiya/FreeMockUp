import { FC } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { Footer } from "../components/Footer";

export const LandingPage: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-secondary-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus-ring"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <HeroSection />
        <FeaturesSection />

        {/* Closing CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-t border-brand-100">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 mb-4">
              Ready to make your screenshots look professional?
            </h2>
            <p className="text-lg text-brand-600 mb-8">
              No sign-up, no watermark. Just drop in a screenshot.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus-ring transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Open the editor
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
