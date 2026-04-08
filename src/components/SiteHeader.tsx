import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavLink = {
  to: string;
  label: string;
  highlight?: boolean;
};

type Props = {
  logoText: string;
  logoTo: string;
  links: NavLink[];
  mobileAriaLabel?: string;
};

const SiteHeader = ({ logoText, logoTo, links, mobileAriaLabel = "Open menu" }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to={logoTo} className="flex-shrink-0" onClick={closeMenu}>
            <h1 className="text-xl sm:text-2xl font-light tracking-wide text-neutral-900">
              {logoText}
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  link.highlight
                    ? `text-neutral-600 hover:text-black text-base font-medium tracking-wide transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900${
                        pathname.startsWith(link.to.split("#")[0]) && link.to !== "/" ? " text-black" : ""
                      }`
                    : "text-neutral-600 hover:text-black text-base font-medium tracking-wide transition-colors"
                }
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-neutral-600 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={mobileAriaLabel}
            type="button"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100">
            <nav className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={
                    link.highlight
                      ? "text-lg font-medium text-neutral-800 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900"
                      : "text-lg font-medium text-neutral-800"
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
