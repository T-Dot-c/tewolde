import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

interface NavigationProps {
  isScrolled: boolean;
  activeSection: string;
  onBlogClick: () => void;
  isBlogOpen: boolean;
}

export default function Navigation({ isScrolled, activeSection, onBlogClick, isBlogOpen }: NavigationProps) {
  const { isDark, setDark, INK, MUTE, ACCENT, ACCENT_INK, CHIP, NAV_BORDER } = useTheme();
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (textRef.current) {
        setTextWidth(textRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

  const arrowOffset = isArrowHovered ? (textWidth ? textWidth + 24 : 92) : 0;

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-4 transition-all duration-300 ${isScrolled
      ? "glass-nav"
      : "bg-transparent border-b border-transparent"
      }`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Left Side — Brand with gliding arrow animation */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none group"
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Tewolde"
        >
          <div
            className="flex items-center justify-center p-1 -m-1 z-10"
            style={{
              transform: `translateX(${arrowOffset}px)`,
              transition: "transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            aria-label="Brand logo arrow"
          >
            <ArrowRight
              className={`w-3.5 h-3.5 transition-opacity duration-200 ${isArrowHovered ? "" : "animate-pulse"}`}
              style={{ color: ACCENT }}
            />
          </div>
          <span
            ref={textRef}
            className="relative inline-block"
            style={{
              fontFamily: '"Bricolage Grotesque", Figtree, sans-serif',
              fontWeight: 800,
              fontSize: 14,
              color: INK,
              letterSpacing: '-0.01em',
            }}
          >
            Tewolde.
            {/* Animated horizontal strikethrough line pulled by the gliding arrow */}
            <span
              aria-hidden="true"
              className="absolute left-0 pointer-events-none"
              style={{
                top: '52%',
                height: '1.5px',
                width: isArrowHovered ? '100%' : '0%',
                backgroundColor: INK,
                transition: 'width 0.38s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
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

          {/* Separator matching center links */}
          <span style={{ color: NAV_BORDER, fontWeight: 400 }} aria-hidden="true">/</span>

          {/* Theme Switcher — Seamlessly aligned in size & position with nav items */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Switch to light mode"
              aria-pressed={!isDark}
              onClick={(e) => setDark(false, e)}
              className="flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                color: !isDark ? INK : MUTE,
                borderBottom: !isDark ? `1.5px solid ${INK}` : '1.5px solid transparent',
                paddingBottom: 2,
                background: 'transparent',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
              }}
              onMouseEnter={e => { if (isDark) e.currentTarget.style.color = INK; }}
              onMouseLeave={e => { if (isDark) e.currentTarget.style.color = MUTE; }}
              title="Light mode"
            >
              <Sun className={`w-3.5 h-3.5 transition-transform duration-500 ${!isDark ? 'scale-110' : 'scale-95 opacity-50'}`} />
            </button>
            <button
              type="button"
              aria-label="Switch to dark mode"
              aria-pressed={isDark}
              onClick={(e) => setDark(true, e)}
              className="flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                color: isDark ? ACCENT : MUTE,
                borderBottom: isDark ? `1.5px solid ${ACCENT}` : '1.5px solid transparent',
                paddingBottom: 2,
                background: 'transparent',
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                filter: isDark ? 'drop-shadow(0 0 5px rgba(63, 181, 159, 0.65))' : 'none',
              }}
              onMouseEnter={e => { if (!isDark) e.currentTarget.style.color = INK; }}
              onMouseLeave={e => { if (!isDark) e.currentTarget.style.color = MUTE; }}
              title="Dark mode"
            >
              <Moon className={`w-3.5 h-3.5 transition-transform duration-500 ${isDark ? 'scale-110' : 'scale-95 opacity-50'}`} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
