"use client";

import Link from "next/link";
import { useMemo, type CSSProperties, type ReactNode } from "react";

import { useTheme } from "@/app/components/ThemeProvider";
import type { TileKey } from "@/lib/theme";
import { MetroIcon } from "./MetroIcon";

export type SectionLayoutProps = {
  title: string;
  description?: string;
  kicker?: string;
  aside?: ReactNode;
  children: ReactNode;
  tileKey?: TileKey;
};

function hexToRgbChannels(color: string): string | null {
  const hex = color.trim().replace(/^#/, "");
  if (hex.length !== 3 && hex.length !== 6) {
    return null;
  }
  const normalized = hex.length === 3 ? hex.split("").map((ch) => ch + ch).join("") : hex;
  const int = Number.parseInt(normalized, 16);
  if (Number.isNaN(int)) {
    return null;
  }
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r}, ${g}, ${b}`;
}

export function SectionLayout({ title, description, kicker, aside, children, tileKey }: SectionLayoutProps) {
  const { themeName, theme } = useTheme();
  const hasRailContent = Boolean(kicker || aside);
  const tileColor = tileKey ? theme.tilePalette[tileKey] : theme.accent;
  const tileContrast = tileKey ? theme.tileContrasts[tileKey] : "dark";
  const tileColorRgb = useMemo(() => hexToRgbChannels(tileColor) ?? "255, 255, 255", [tileColor]);
  const backTextColor = tileContrast === "dark" ? theme.tileDarkText : theme.tileLightText;
  const backBackground = tileContrast === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(12, 16, 32, 0.46)";
  const backBackgroundHover = tileContrast === "dark" ? "rgba(255, 255, 255, 0.22)" : "rgba(12, 16, 32, 0.58)";
  const backBorder = tileContrast === "dark" ? "rgba(255, 255, 255, 0.45)" : "rgba(12, 16, 32, 0.6)";
  const routeIcon = tileKey ? theme.tileIcons[tileKey] : null;

  const sectionStyle = useMemo<CSSProperties>(() => {
    const overlay = tileContrast === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(14, 20, 42, 0.2)";
    return {
      color: theme.foreground,
      "--route-accent-color": theme.accent,
      "--route-anim-color": tileColor,
      "--route-anim-color-rgb": tileColorRgb,
      "--route-anim-overlay": overlay,
      "--route-back-fg": backTextColor,
      "--route-back-bg": backBackground,
      "--route-back-bg-hover": backBackgroundHover,
      "--route-back-border": backBorder,
    } as CSSProperties;
  }, [theme.foreground, theme.accent, tileColor, tileContrast, tileColorRgb, backTextColor, backBackground, backBackgroundHover, backBorder]);

  return (
    <section className={`route-section route-section--${themeName}`} style={sectionStyle}>
      <Link href="/" className="route-back" prefetch={false} aria-label="Back to home">
        <span className="route-back__icon" aria-hidden="true">
          ←
        </span>
        <span className="route-back__label">Back</span>
      </Link>
      <div className="route-section__animation" aria-hidden="true" />
      <div className="route-section__backdrop" aria-hidden="true" />
      <div className={`route-section__inner${hasRailContent ? " route-section__inner--with-rail" : ""}`}>
        <div
          className="route-section__rail"
          data-empty={(!hasRailContent).toString()}
          aria-hidden={!hasRailContent}
        >
          {kicker ? <span className="route-section__kicker">{kicker}</span> : null}
          {aside ? <div className="route-section__rail-content">{aside}</div> : null}
        </div>
        <div className="route-section__main">
          <header className="route-section__header">
            <div className="route-section__title-row">
              {routeIcon ? (
                <span className="route-section__title-icon" aria-hidden="true">
                  <MetroIcon name={routeIcon} className="h-6 w-6" />
                </span>
              ) : null}
              <h1 className="route-section__title">{title}</h1>
            </div>
            {description ? <p className="route-section__description">{description}</p> : null}
            <p className="route-section__tip">
              Tip: Use the Back button in the top-left corner to return to the tile home.
            </p>
          </header>
          <div className="route-section__content">{children}</div>
        </div>
      </div>
      <div className="route-section__ornament" aria-hidden="true" />
    </section>
  );
}
