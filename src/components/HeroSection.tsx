export const HeroSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 text-center lg:pt-32 h-screen">
      <h1 className="mx-auto max-w-5xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Transform Your Screenshots into Stunning Mockups with Ease
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Elevate Your Design Process with Our FreeMockup Tool – Effortlessly
        Create Professional Mockups from Your Screenshots
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <a
          className="items-center inline-flex font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed rounded px-4 py-2 text-lg focus:ring-brand-500 border-transparent shadow-sm bg-gradient-to-br from-brand-600 to-brand-400 text-white"
          href="#create-mockup-section"
        >
          Get started today
        </a>
      </div>
    </div>
  );
};
