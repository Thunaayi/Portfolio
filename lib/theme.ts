import type { MetroIconName } from "./constants";

export type ThemeName = "pastel" | "metro" | "neon" | "solar" | "retro" | "glass" | "orchid";

export type TileKey =
  | "lms"
  | "profile"
  | "experience"
  | "stack"
  | "talk"
  | "testimonials"
  | "contact"
  | "github"
  | "linkedin"
  | "sandbox";

export type MetroTheme = {
  name: ThemeName;
  background: string;
  backdrop: string;
  foreground: string;
  chrome: string;
  accent: string;
  neutral: string;
  fontFamily: string;
  headingFontFamily: string;
  tilePalette: Record<TileKey, string>;
  tileContrasts: Record<TileKey, "light" | "dark">;
  tileLightText: string;
  tileDarkText: string;
  tileIcons: Record<TileKey, MetroIconName>;
};
