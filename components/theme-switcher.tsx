"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

export type ColorTheme = "purple" | "blue" | "green" | "red" | "orange";

const themes: Record<ColorTheme, { name: string; color: string }> = {
  purple: { name: "Purple", color: "#c395f4" },
  blue: { name: "Blue", color: "#60a5fa" },
  green: { name: "Green", color: "#4ade80" },
  red: { name: "Red", color: "#f87171" },
  orange: { name: "Orange", color: "#fb923c" },
};

const themeOrder: ColorTheme[] = ["purple", "blue", "green", "red", "orange"];

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>("purple");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load theme from localStorage
    const saved = localStorage.getItem("colorTheme") as ColorTheme | null;
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme: ColorTheme) => {
    document.documentElement.style.setProperty("--color-accent", themes[theme].color);
  };

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];

    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem("colorTheme", nextTheme);
  };

  if (!isClient) return null;

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Change color theme (current: ${themes[currentTheme].name})`}
      className="border-2 border-foreground hover:bg-accent/20 transition-all p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none bg-card"
      title={`Theme: ${themes[currentTheme].name}`}
    >
      <Palette size={20} style={{ color: themes[currentTheme].color }} />
    </button>
  );
}
