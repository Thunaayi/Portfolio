import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

import { useMemo } from "react";

import type { MetroTheme, TileKey } from "./theme";
import { useTheme } from "@/app/components/ThemeProvider";

export type TileSize = "medium" | "wide" | "large";

export type MetroIconName =
  | "case-study"
  | "profile"
  | "experience"
  | "stack"
  | "talk"
  | "testimonials"
  | "contact"
  | "github"
  | "linkedin"
  | "sandbox"
  | "case-study-pastel"
  | "profile-pastel"
  | "experience-pastel"
  | "stack-pastel"
  | "talk-pastel"
  | "testimonials-pastel"
  | "contact-pastel"
  | "github-pastel"
  | "linkedin-pastel"
  | "sandbox-pastel"
  | "case-study-neon"
  | "profile-neon"
  | "experience-neon"
  | "stack-neon"
  | "talk-neon"
  | "testimonials-neon"
  | "contact-neon"
  | "github-neon"
  | "linkedin-neon"
  | "sandbox-neon"
  | "case-study-solar"
  | "profile-solar"
  | "experience-solar"
  | "stack-solar"
  | "talk-solar"
  | "testimonials-solar"
  | "contact-solar"
  | "github-solar"
  | "linkedin-solar"
  | "sandbox-solar"
  | "case-study-glass"
  | "profile-glass"
  | "experience-glass"
  | "stack-glass"
  | "talk-glass"
  | "testimonials-glass"
  | "contact-glass"
  | "github-glass"
  | "linkedin-glass"
  | "sandbox-glass"
  | "case-study-orchid"
  | "profile-orchid"
  | "experience-orchid"
  | "stack-orchid"
  | "talk-orchid"
  | "testimonials-orchid"
  | "contact-orchid"
  | "github-orchid"
  | "linkedin-orchid"
  | "sandbox-orchid"
  | "case-study-retro"
  | "profile-retro"
  | "experience-retro"
  | "stack-retro"
  | "talk-retro"
  | "testimonials-retro"
  | "contact-retro"
  | "github-retro"
  | "linkedin-retro"
  | "sandbox-retro"
  | "case-study-metro"
  | "profile-metro"
  | "experience-metro"
  | "stack-metro"
  | "talk-metro"
  | "testimonials-metro"
  | "contact-metro"
  | "github-metro"
  | "linkedin-metro"
  | "sandbox-metro";

export type TileDefinition = {
  key: TileKey;
  title: string;
  description?: string;
  size: TileSize;
  href?: string;
  order?: number;
};

export type TileData = TileDefinition & {
  color: string;
  contrast: "light" | "dark";
  icon: MetroIconName;
};

export function resolveTile(theme: MetroTheme, definition: TileDefinition): TileData {
  const key = definition.key;
  return {
    ...definition,
    color: theme.tilePalette[key],
    contrast: theme.tileContrasts[key],
    icon: theme.tileIcons[key],
  };
}

export function resolveTiles(theme: MetroTheme, definitions: TileDefinition[]): TileData[] {
  return definitions.map((definition) => resolveTile(theme, definition));
}

export function useTiles(): TileData[] {
  const { theme } = useTheme();
  return useMemo(() => resolveTiles(theme, HOME_TILES), [theme]);
}

export const HOME_TILES: TileDefinition[] = [
  {
    key: "lms",
    title: "LMS Case Study",
    description: "Metrics, architecture, lessons",
    size: "large",
    href: "/projects",
    order: 1,
  },
  {
    key: "profile",
    title: "Profile",
    description: "Intro & mission",
    size: "medium",
    href: "/about",
    order: 2,
  },
  {
    key: "experience",
    title: "Experience",
    description: "Roles & impact",
    size: "wide",
    href: "/resume",
    order: 3,
  },
  {
    key: "stack",
    title: "Tech Stack",
    description: "Tools of choice",
    size: "medium",
    href: "/skills",
    order: 4,
  },
  {
    key: "talk",
    title: "Featured Talk",
    description: "Watch recent talk",
    size: "medium",
    href: "/projects",
    order: 5,
  },
  {
    key: "testimonials",
    title: "Testimonials",
    description: "Client feedback",
    size: "medium",
    href: "/about",
    order: 6,
  },
  {
    key: "contact",
    title: "Contact",
    description: "Let’s collaborate",
    size: "medium",
    href: "/contact",
    order: 7,
  },
  {
    key: "github",
    title: "GitHub",
    description: "Latest repos",
    size: "medium",
    href: "https://github.com/",
    order: 8,
  },
  {
    key: "linkedin",
    title: "LinkedIn",
    description: "Connect",
    size: "medium",
    href: "https://www.linkedin.com/",
    order: 9,
  },
  {
    key: "sandbox",
    title: "Sandbox",
    description: "Experiments",
    size: "medium",
    href: "/projects",
    order: 10,
  },
];

export const tileSizeClasses: Record<TileSize, string> = {
  medium: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
};

export const titleClasses: Record<TileSize, string> = {
  medium: "text-[7px] font-semibold uppercase tracking-[0.5em]",
  wide: "text-[7px] font-semibold uppercase tracking-[0.5em]",
  large: "text-[7px] font-semibold uppercase tracking-[0.5em]",
};

export const descriptionClasses: Record<TileSize, string> = {
  medium: "text-[7px] font-medium uppercase tracking-[0.35em]",
  wide: "text-[7px] font-medium uppercase tracking-[0.35em]",
  large: "text-[7px] font-medium uppercase tracking-[0.35em]",
};

export const PROJECTS = projects;
export const SKILLS = skills;
