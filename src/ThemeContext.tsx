import React, { createContext, useContext, useEffect, useState } from "react";

export interface ThemeColors {
  BG: string;
  INK: string;
  MUTE: string;
  ACCENT: string;
  ACCENT_INK: string;
  BORDER: string;
  BORDER_FAINT: string;
  CHIP: string;
  CARD: string;
  NAV_BG: string;
  NAV_BORDER: string;
  isDark: boolean;
  toggle: () => void;
  setDark: (val: boolean) => void;
}

const LIGHT: Omit<ThemeColors, "isDark" | "toggle" | "setDark"> = {
  BG:           "#ffffff",
  INK:          "#050507",
  MUTE:         "#71717a",
  ACCENT:       "#ea580c",
  ACCENT_INK:   "#ffffff",
  BORDER:       "rgba(5,5,7,0.12)",
  BORDER_FAINT: "rgba(5,5,7,0.08)",
  CHIP:         "#f4f4f5",
  CARD:         "#ffffff",
  NAV_BG:       "rgba(255,255,255,0.92)",
  NAV_BORDER:   "rgba(5,5,7,0.08)",
};

const DARK: Omit<ThemeColors, "isDark" | "toggle" | "setDark"> = {
  BG:           "#131816",
  INK:          "#eef1ef",
  MUTE:         "#9aa5a0",
  ACCENT:       "#3fb59f",
  ACCENT_INK:   "#0b1210",
  BORDER:       "#2b3431",
  BORDER_FAINT: "rgba(238,241,239,0.06)",
  CHIP:         "#222a27",
  CARD:         "#1b2320",
  NAV_BG:       "rgba(19,24,22,0.92)",
  NAV_BORDER:   "rgba(238,241,239,0.08)",
};

const ThemeContext = createContext<ThemeColors>({
  ...LIGHT,
  isDark: false,
  toggle: () => {},
  setDark: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((v) => !v);
  const setDark = (val: boolean) => setIsDark(val);
  const colors = isDark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ ...colors, isDark, toggle, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeColors {
  return useContext(ThemeContext);
}
