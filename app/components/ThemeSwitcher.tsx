"use client";

import { useCallback } from "react";

import { Icon } from "./Icon";
import { useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { themeName, cycleTheme } = useTheme();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      cycleTheme({ origin });
    },
    [cycleTheme],
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Switch theme (current: ${themeName})`}
      className="flex items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white/20 hover:bg-white/15"
    >
      <Icon name="spark" className="h-4 w-4" />
      {themeName}
    </button>
  );
}
