import { type MetroTheme, type ThemeName } from "./theme";
import { metroTheme } from "@/app/themes/metro";
import { neonTheme } from "@/app/themes/neon";
import { pastelTheme } from "@/app/themes/pastel";
import { retroTheme } from "@/app/themes/retro";
import { solarTheme } from "@/app/themes/solar";
import { glassTheme } from "@/app/themes/glass";
import { orchidTheme } from "@/app/themes/orchid";

export const THEMES: Record<ThemeName, MetroTheme> = {
  pastel: pastelTheme,
  metro: metroTheme,
  neon: neonTheme,
  solar: solarTheme,
  retro: retroTheme,
  glass: glassTheme,
  orchid: orchidTheme,
};

export function applyTheme(theme: MetroTheme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--metro-background", theme.background);
  root.style.setProperty("--metro-backdrop", theme.backdrop);
  root.style.setProperty("--metro-foreground", theme.foreground);
  root.style.setProperty("--metro-chrome", theme.chrome);
  root.style.setProperty("--metro-accent", theme.accent);
  root.style.setProperty("--metro-neutral", theme.neutral);

  Object.entries(theme.tilePalette).forEach(([key, color]) => {
    root.style.setProperty(`--metro-tile-${key}`, color);
  });

  Object.entries(theme.tileContrasts).forEach(([key, contrast]) => {
    root.style.setProperty(`--metro-tile-contrast-${key}`, contrast);
  });

  root.style.setProperty("--metro-tile-light-text", theme.tileLightText);
  root.style.setProperty("--metro-tile-dark-text", theme.tileDarkText);
  root.style.setProperty("--metro-font-family", theme.fontFamily);
  root.style.setProperty("--metro-heading-font-family", theme.headingFontFamily);
  root.dataset.theme = theme.name;
}
