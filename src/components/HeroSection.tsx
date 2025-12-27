export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32 lg:pb-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-96 w-96 rounded-full bg-gradient-to-r from-primary-200 to-primary-300 opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-200 mb-8">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Free forever
        </div>

        {/* Main headline */}
        <h1 className="mx-auto max-w-5xl font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-brand-900 mb-8">
          Transform screenshots into
          <span className="block gradient-text">professional mockups</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-3xl text-lg sm:text-xl leading-relaxed text-brand-600 mb-10">
          Create stunning browser mockups in seconds. Perfect for portfolios,
          presentations, social media, and client pitches. Free forever, no
          design skills required.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <a
            href="#create-mockup-section"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Creating Free
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
