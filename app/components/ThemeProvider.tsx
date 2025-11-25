"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { applyTheme, THEMES } from "@/lib/themes";
import type { MetroTheme, ThemeName } from "@/lib/theme";

const STORAGE_KEY = "metro-theme";
const AVAILABLE_THEMES: ThemeName[] = ["metro", "pastel", "neon", "solar", "retro", "glass", "orchid"];

const RIPPLE_DURATION = 2200;

type ThemeTransitionOrigin = {
  x: number;
  y: number;
};

type ThemeTransitionOptions = {
  origin?: ThemeTransitionOrigin;
};

type ThemeContextValue = {
  themeName: ThemeName;
  theme: MetroTheme;
  setTheme: (name: ThemeName, options?: ThemeTransitionOptions) => void;
  cycleTheme: (options?: ThemeTransitionOptions) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeName, setThemeName] = useState<ThemeName>("metro");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasInitialized = useRef(false);
  const [transitionOrigin, setTransitionOrigin] = useState<ThemeTransitionOrigin>(() => {
    if (typeof window !== "undefined") {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
    return { x: 0, y: 0 };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    const initial = stored && AVAILABLE_THEMES.includes(stored) ? stored : "metro";
    if (initial !== "metro") {
      window.requestAnimationFrame(() => {
        setThemeName(initial);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    applyTheme(THEMES[themeName]);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, themeName);
    }
  }, [themeName]);

  const transitionTimeoutRef = useRef<number | null>(null);
  const [transitionRadius, setTransitionRadius] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return Math.hypot(width, height);
    }
    return 0;
  });
  const [overlayColor, setOverlayColor] = useState<string | null>(null);
  const [transitionIteration, setTransitionIteration] = useState(0);

  const updateTransitionOrigin = useCallback((origin?: ThemeTransitionOrigin) => {
    if (origin) {
      setTransitionOrigin(origin);
      return;
    }
    if (typeof window !== "undefined") {
      setTransitionOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, []);

  const setTheme = useCallback(
    (name: ThemeName, options?: ThemeTransitionOptions) => {
      if (name === themeName) {
        return;
      }
      if (!hasInitialized.current) {
        hasInitialized.current = true;
      }
      const nextOrigin = options?.origin;
      updateTransitionOrigin(nextOrigin);
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const originX = nextOrigin?.x ?? width / 2;
        const originY = nextOrigin?.y ?? height / 2;
        const distances = [
          Math.hypot(originX, originY),
          Math.hypot(width - originX, originY),
          Math.hypot(originX, height - originY),
          Math.hypot(width - originX, height - originY),
        ];
        const radius = Math.max(...distances);
        setTransitionRadius(radius);
      }
      const currentTheme = THEMES[themeName];
      setOverlayColor(currentTheme.background);
      setTransitionIteration((iteration) => iteration + 1);
      setIsTransitioning(true);
      setThemeName(name);

      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        setOverlayColor(null);
        transitionTimeoutRef.current = null;
      }, RIPPLE_DURATION);
    },
    [themeName, updateTransitionOrigin],
  );

  const cycleTheme = useCallback(
    (options?: ThemeTransitionOptions) => {
      const currentIndex = AVAILABLE_THEMES.indexOf(themeName);
      const nextTheme = AVAILABLE_THEMES[(currentIndex + 1) % AVAILABLE_THEMES.length];
      setTheme(nextTheme as ThemeName, options);
    },
    [setTheme, themeName],
  );

  const value = useMemo<ThemeContextValue>(() => {
    return {
      themeName,
      theme: THEMES[themeName],
      setTheme,
      cycleTheme,
    };
  }, [themeName, setTheme, cycleTheme]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {isTransitioning ? (
        <div
          key={transitionIteration}
          className="theme-ripple-overlay fixed inset-0 z-50"
          style={{
            "--theme-ripple-x": `${transitionOrigin.x}px`,
            "--theme-ripple-y": `${transitionOrigin.y}px`,
            "--theme-ripple-radius": `${transitionRadius}px`,
            "--theme-ripple-duration": `${RIPPLE_DURATION}ms`,
            "--theme-ripple-color": overlayColor ?? THEMES[themeName].background,
          } as React.CSSProperties}
        />
      ) : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
