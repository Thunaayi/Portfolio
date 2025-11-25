"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { TILE_COLOR_STORAGE_KEY } from "./TileFlyoverProvider";

export function MetroPageBackground() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let storedColor: string | null = null;

    try {
      storedColor = window.sessionStorage.getItem(TILE_COLOR_STORAGE_KEY);
    } catch (error) {
      console.error("Unable to read tile color from sessionStorage", error);
    }

    if (storedColor) {
      document.documentElement.style.setProperty("--metro-page-bg", storedColor);
    } else {
      document.documentElement.style.removeProperty("--metro-page-bg");
    }

    try {
      window.sessionStorage.removeItem(TILE_COLOR_STORAGE_KEY);
    } catch (error) {
      console.error("Unable to clear tile color from sessionStorage", error);
    }
  }, [pathname]);

  return null;
}
