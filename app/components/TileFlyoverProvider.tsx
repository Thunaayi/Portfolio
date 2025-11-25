"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { type TileData } from "@/lib/constants";
import { MetroIcon } from "./MetroIcon";

export const TILE_COLOR_STORAGE_KEY = "metroTileColor";

export type TileFlyoverContextValue = {
  openTile: (tile: TileData) => void;
  closeTile: () => void;
  activeTile: TileData | null;
  isNavigating: boolean;
};

const TileFlyoverContext = createContext<TileFlyoverContextValue | null>(null);

export function TileFlyoverProvider({ children }: PropsWithChildren) {
  const [activeTile, setActiveTile] = useState<TileData | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeout = useRef<number | null>(null);
  const router = useRouter();

  const clearNavigation = useCallback(() => {
    if (navigationTimeout.current !== null) {
      window.clearTimeout(navigationTimeout.current);
      navigationTimeout.current = null;
    }
  }, []);

  const applyTileColor = useCallback((color: string | null) => {
    if (typeof window === "undefined") return;

    if (color) {
      try {
        window.sessionStorage.setItem(TILE_COLOR_STORAGE_KEY, color);
      } catch (error) {
        console.error("Failed to persist tile color", error);
      }
      document.documentElement.style.setProperty("--metro-page-bg", color);
    } else {
      try {
        window.sessionStorage.removeItem(TILE_COLOR_STORAGE_KEY);
      } catch (error) {
        console.error("Failed to clear tile color", error);
      }
      document.documentElement.style.removeProperty("--metro-page-bg");
    }
  }, []);

  const openTile = useCallback(
    (tile: TileData) => {
      setActiveTile(tile);
      clearNavigation();

      if (tile.href) {
        applyTileColor(tile.color);
      } else {
        applyTileColor(null);
      }

      setIsNavigating(true);

      navigationTimeout.current = window.setTimeout(() => {
        if (!tile.href) {
          setIsNavigating(false);
          setActiveTile(null);
          applyTileColor(null);
          return;
        }

        const target = tile.href;
        if (/^https?:\/\//.test(target)) {
          window.location.href = target;
        } else {
          router.push(target);
        }
      }, 420);
    },
    [applyTileColor, clearNavigation, router],
  );

  const closeTile = useCallback(() => {
    clearNavigation();
    setIsNavigating(false);
    setActiveTile(null);
    applyTileColor(null);
  }, [applyTileColor, clearNavigation]);

  useEffect(() => clearNavigation, [clearNavigation]);

  const value = useMemo<TileFlyoverContextValue>(
    () => ({ activeTile, openTile, closeTile, isNavigating }),
    [activeTile, closeTile, openTile, isNavigating],
  );

  return (
    <TileFlyoverContext.Provider value={value}>
      <LayoutGroup>
        {children}
        <TileFlyoverOverlay tile={activeTile} onClose={closeTile} />
      </LayoutGroup>
    </TileFlyoverContext.Provider>
  );
}

export function useTileFlyover() {
  const context = useContext(TileFlyoverContext);
  if (!context) {
    throw new Error("useTileFlyover must be used within a TileFlyoverProvider");
  }
  return context;
}

type TileFlyoverOverlayProps = {
  tile: TileData | null;
  onClose: () => void;
};

function TileFlyoverOverlay({ tile, onClose }: TileFlyoverOverlayProps) {
  const { isNavigating } = useTileFlyover();

  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!tile) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      lastActiveElementRef.current = activeElement;
    }
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
       const lastActive = lastActiveElementRef.current;
       if (lastActive) {
         lastActive.focus();
         lastActiveElementRef.current = null;
       }
      document.body.style.overflow = previousOverflow;
    };
  }, [tile, onClose]);

  return (
    <AnimatePresence>
      {tile ? (
        <motion.div
          key={tile.key}
          className="fixed inset-0 z-50"
        >
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={onClose}
          />

          <motion.article
            layoutId={`tile-${tile.key}`}
            className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden text-center text-white"
            style={{ backgroundColor: tile.color }}
            ref={dialogRef as React.RefObject<HTMLDivElement>}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`tile-flyover-title-${tile.key}`}
            aria-describedby={tile.description ? `tile-flyover-description-${tile.key}` : undefined}
            onClick={(event) => event.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="flex flex-col items-center gap-5 px-6"
            >
              <motion.span
                layoutId={`tile-${tile.key}-icon`}
                className="flex h-24 w-24 items-center justify-center rounded-lg bg-white/10 shadow-inner shadow-black/30"
              >
                <MetroIcon
                  name={tile.icon}
                  className="h-16 w-16 text-white drop-shadow-[0_12px_22px_rgba(0,0,0,0.35)]"
                />
              </motion.span>
              {isNavigating && tile.href ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  <span className="relative inline-flex h-12 w-12 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-60" />
                    <span className="inline-flex h-12 w-12 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span className="sr-only">Loading</span>
                  </span>
                </motion.div>
              ) : null}
              {!isNavigating || !tile.href ? (
                <>
                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.25 }}
                    className="text-3xl font-semibold uppercase tracking-[0.4em] text-white sm:text-4xl"
                    id={`tile-flyover-title-${tile.key}`}
                  >
                    {tile.title}
                  </motion.h2>
                  {tile.description ? (
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.25 }}
                      className="max-w-lg text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm"
                      id={`tile-flyover-description-${tile.key}`}
                    >
                      {tile.description}
                    </motion.p>
                  ) : null}
                </>
              ) : null}
            </motion.div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
