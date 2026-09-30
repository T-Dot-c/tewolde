import React from "react";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

interface NavigationProps {
  isScrolled: boolean;
  activeSection: string;
  onBlogClick: () => void;
  isBlogOpen: boolean;
}

export default function Navigation({ isScrolled, activeSection, onBlogClick, isBlogOpen }: NavigationProps) {
  const { isDark, setDark, INK, MUTE, ACCENT, ACCENT_INK, CARD, NAV_BORDER } = useTheme();

  const navLinkStyle = (section: string) => ({
    fontFamily: '"Figtree", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: activeSection === section ? INK : MUTE,
    borderBottom: activeSection === section ? `1.5px solid ${INK}` : '1.5px solid transparent',
    paddingBottom: 2,
    transition: 'color 0.15s, border-color 0.15s',
    textDecoration: 'none',
  });

  const midLinkStyle: React.CSSProperties = {
    fontFamily: '"Figtree", system-ui, sans-serif',
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: MUTE,
    textDecoration: 'none',
    transition: 'color 0.15s',
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-4 transition-all duration-300 ${isScrolled
      ? "glass-nav"
      : "bg-transparent border-b border-transparent"
      }`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Left Side — Brand */}
        <div className="flex items-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" style={{ color: ACCENT }} />
          <span style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif', fontWeight: 800, fontSize: 14, color: INK, letterSpacing: '-0.01em' }}>
            Tewolde.
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-5">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            style={midLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = INK)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTE)}
          >
            LinkedIn
          </a>
          <span style={{ color: NAV_BORDER, fontWeight: 400 }}>/</span>
          <a href="https://github.com/T-Dot-c" target="_blank" rel="noopener noreferrer"
            style={midLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = INK)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTE)}
          >
            GitHub
          </a>
          <span style={{ color: NAV_BORDER, fontWeight: 400 }}>/</span>
          <button
            onClick={onBlogClick}
            style={{ ...midLinkStyle, color: isBlogOpen ? INK : MUTE, background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = INK)}
            onMouseLeave={e => { if (!isBlogOpen) e.currentTarget.style.color = MUTE; }}
          >
            Blog
          </button>
        </div>

        {/* Right Side Navigation + Theme Toggle */}
        <div className="flex items-center gap-5 sm:gap-6">
          <a href="#about" style={navLinkStyle("about")}
            onMouseEnter={e => { if (activeSection !== 'about') e.currentTarget.style.color = INK; }}
            onMouseLeave={e => { if (activeSection !== 'about') e.currentTarget.style.color = MUTE; }}
          >Info</a>
          <a href="#demos" style={navLinkStyle("demos")}
            onMouseEnter={e => { if (activeSection !== 'demos') e.currentTarget.style.color = INK; }}
            onMouseLeave={e => { if (activeSection !== 'demos') e.currentTarget.style.color = MUTE; }}
          >Work</a>
          <a href="#contact" style={navLinkStyle("contact")}
            onMouseEnter={e => { if (activeSection !== 'contact') e.currentTarget.style.color = INK; }}
            onMouseLeave={e => { if (activeSection !== 'contact') e.currentTarget.style.color = MUTE; }}
          >Contact</a>

          {/* Theme Switcher — Filter Section Style (Icon Only) */}
          <div
            role="group"
            aria-label="Color theme switcher"
            className="inline-flex items-center rounded-full overflow-hidden"
            style={{
              border: `1.5px solid ${INK}`,
              background: CARD,
              padding: 2,
            }}
          >
            <button
              type="button"
              aria-label="Switch to light mode"
              aria-pressed={!isDark}
              onClick={() => setDark(false)}
              className="p-1.5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer"
              style={{
                background: !isDark ? INK : "transparent",
                color: !isDark ? "#ffffff" : MUTE,
                border: 0,
              }}
              title="Light mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Switch to dark mode"
              aria-pressed={isDark}
              onClick={() => setDark(true)}
              className="p-1.5 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer"
              style={{
                background: isDark ? ACCENT : "transparent",
                color: isDark ? ACCENT_INK : MUTE,
                border: 0,
              }}
              title="Dark mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
