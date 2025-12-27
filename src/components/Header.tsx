import { useState } from "react";
import { FaStar, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-brand-200/50">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text cursor-pointer">
                <a
                  href="#top"
                  aria-label="FreeMockUp home"
                  className="focus-ring rounded"
                >
                  FreeMockUp
                </a>
              </h1>
            </div>
          </div>

          {/* GitHub Star & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Sachin-chaurasiya/FreeMockUp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-700 hover:text-primary-600 font-medium transition-colors duration-200 focus-ring rounded px-3 py-2 bg-brand-50 hover:bg-primary-50"
              aria-label="Star FreeMockUp on GitHub"
            >
              <FaStar className="text-yellow-500" aria-hidden="true" />
              <span>Star on GitHub</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-brand-700 hover:text-primary-600 p-2 rounded-md focus-ring"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden bg-white border-t border-brand-200/50 animate-slide-in-right"
            id="mobile-menu"
            role="menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="pt-4 pb-2">
                <a
                  href="https://github.com/Sachin-chaurasiya/FreeMockUp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-lg text-brand-700 bg-brand-50 hover:bg-primary-50 focus-ring transition-all duration-200"
                  onClick={closeMobileMenu}
                  role="menuitem"
                >
                  <FaStar className="text-yellow-500" aria-hidden="true" />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
