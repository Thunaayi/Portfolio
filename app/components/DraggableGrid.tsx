"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  HOME_TILES,
  descriptionClasses,
  tileSizeClasses,
  titleClasses,
  type TileData,
  type TileSize,
  useTiles,
} from "@/lib/constants";
import type { TileKey, ThemeName } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { MetroIcon } from "./MetroIcon";
import { useTileFlyover } from "./TileFlyoverProvider";
import { useTheme } from "./ThemeProvider";

const TEXT_COLOR = {
  light: "text-[var(--metro-tile-light-text)]",
  dark: "text-[var(--metro-tile-dark-text)]",
} as const;

const DESCRIPTION_COLOR = {
  light: "text-[var(--metro-tile-light-text)] opacity-80",
  dark: "text-[var(--metro-tile-dark-text)] opacity-80",
} as const;

const TILE_KEYS = HOME_TILES.map((tile) => tile.key) as TileKey[];
const TILE_SIZES: TileSize[] = ["medium", "wide", "large"];
const TILE_SPANS: Record<TileSize, { cols: number; rows: number }> = {
  medium: { cols: 1, rows: 1 },
  wide: { cols: 2, rows: 1 },
  large: { cols: 2, rows: 2 },
};

const MAX_ESTIMATED_INSTANCES = 48;

const TILE_THEME_CLASSES: Record<ThemeName, string> = {
  pastel: "tile-theme-pastel",
  metro: "tile-theme-metro",
  neon: "tile-theme-neon",
  solar: "tile-theme-solar",
  retro: "tile-theme-retro",
  glass: "tile-theme-glass",
  orchid: "tile-theme-orchid",
};

type ResolvedTile = {
  instanceId: string;
  baseKey: TileKey;
  tile: TileData;
  size: TileSize;
};

type TileInstance = {
  id: string;
  key: TileKey;
  size: TileSize;
};

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function estimateInstanceCount(width: number, height: number) {
  const baseTileWidth = 160;
  const baseTileHeight = 160;
  const cols = Math.max(1, Math.ceil(width / baseTileWidth));
  const rows = Math.max(1, Math.ceil(height / baseTileHeight));
  const estimated = cols * rows * 1.4;
  const capped = Math.min(estimated, MAX_ESTIMATED_INSTANCES);
  return Math.max(Math.round(capped), TILE_KEYS.length * 3);
}

function createTileInstances(): TileInstance[] {
  const width = typeof window !== "undefined" ? window.innerWidth : 1280;
  const height = typeof window !== "undefined" ? window.innerHeight : 720;
  const total = estimateInstanceCount(width, height);
  const timestamp = Date.now();

  const ensureCoverage = TILE_KEYS.map((key, index) => ({
    id: `${key}-${timestamp}-base-${index}`,
    key,
    size: randomItem(TILE_SIZES),
  }));

  const instances: TileInstance[] = [...ensureCoverage];
  for (let index = ensureCoverage.length; index < total; index += 1) {
    const key = randomItem(TILE_KEYS);
    instances.push({
      id: `${key}-${timestamp}-extra-${index}-${Math.random().toString(36).slice(2, 6)}`,
      key,
      size: randomItem(TILE_SIZES),
    });
  }

  return shuffle(instances);
}

type TileContextMenuProps = {
  anchor: { x: number; y: number };
  tileId: string;
  tileTitle: string;
  activeSize: TileSize;
  onSelect: (tileId: string, size: TileSize) => void;
  onClose: () => void;
};

function TileContextMenu({ anchor, tileId, tileTitle, activeSize, onSelect, onClose }: TileContextMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    menuRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!menuRef.current || (target && menuRef.current.contains(target))) {
        return;
      }
      onClose();
    };

    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!menuRef.current || (target && menuRef.current.contains(target))) {
        return;
      }
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" aria-hidden>
      <div className="absolute inset-0" onClick={onClose} onContextMenu={onClose} />
      <div
        ref={menuRef}
        tabIndex={-1}
        role="menu"
        aria-label={`Resize tile ${tileTitle}`}
        className="absolute min-w-[160px] rounded-sm border border-white/15 bg-(--metro-chrome)/95 backdrop-blur-sm text-[11px] font-medium uppercase tracking-[0.32em] text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] focus:outline-none"
        style={{ top: anchor.y, left: anchor.x, transform: "translate(-50%, -50%)" }}
      >
        <button
          type="button"
          role="menuitemradio"
          aria-checked={activeSize === "medium"}
          className={cn(
            "flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-white focus-visible:-outline-offset-2",
            activeSize === "medium" ? "bg-white/10" : "",
          )}
          onClick={() => onSelect(tileId, "medium")}
        >
          <span>Medium</span>
          {activeSize === "medium" ? <span className="text-[0.6rem]">●</span> : null}
        </button>
        <button
          type="button"
          role="menuitemradio"
          aria-checked={activeSize === "wide"}
          className={cn(
            "flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-white focus-visible:-outline-offset-2",
            activeSize === "wide" ? "bg-white/10" : "",
          )}
          onClick={() => onSelect(tileId, "wide")}
        >
          <span>Wide</span>
          {activeSize === "wide" ? <span className="text-[0.6rem]">●</span> : null}
        </button>
        <button
          type="button"
          role="menuitemradio"
          aria-checked={activeSize === "large"}
          className={cn(
            "flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-white focus-visible:-outline-offset-2",
            activeSize === "large" ? "bg-white/10" : "",
          )}
          onClick={() => onSelect(tileId, "large")}
        >
          <span>Large</span>
          {activeSize === "large" ? <span className="text-[0.6rem]">●</span> : null}
        </button>
      </div>
    </div>
  );
}

const HOVER_REORDER_DELAY = 220;

type ContextMenuState = {
  tileId: string;
  tileTitle: string;
  size: TileSize;
  anchor: { x: number; y: number };
} | null;

function SortableTile({
  tile,
  isDraggingGlobal,
  onContextMenu,
}: {
  tile: ResolvedTile;
  isDraggingGlobal: boolean;
  onContextMenu: (event: ReactMouseEvent, tile: ResolvedTile) => void;
}) {
  const isExternal = tile.tile.href ? /^https?:\/\//.test(tile.tile.href) : false;
  const { openTile } = useTileFlyover();
  const { theme } = useTheme();
  const isGlassTheme = theme.name === "glass";
  const supportsPointerGlow =
    isGlassTheme || theme.name === "neon" || theme.name === "orchid" || theme.name === "pastel" || theme.name === "metro";

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tile.instanceId,
    animateLayoutChanges: (args) => {
      if (args.isSorting || args.wasDragging) {
        return true;
      }
      return defaultAnimateLayoutChanges(args);
    },
  });

  const tileRectRef = useRef<DOMRect | null>(null);

  const textClass = TEXT_COLOR[tile.tile.contrast];
  const descriptionClass = DESCRIPTION_COLOR[tile.tile.contrast];
  const iconClass = tile.tile.contrast === "light" ? TEXT_COLOR.light : TEXT_COLOR.dark;

  const handleClick = (event: ReactMouseEvent) => {
    if (isDraggingGlobal) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    openTile(tile.tile);
  };

  const baseColor = tile.tile.color;

  const style: CSSProperties & Record<string, string | number | undefined> = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? 0 : 1,
  };

  if (isGlassTheme) {
    style.background = `linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.06)), ${baseColor}`;
    style.backdropFilter = "blur(18px) saturate(140%)";
    style.backgroundBlendMode = "overlay";
    style.borderColor = "rgba(255,255,255,0.24)";
  } else {
    style.backgroundColor = baseColor;
  }

  if (supportsPointerGlow) {
    style["--hover-x"] = "50%";
    style["--hover-y"] = "50%";
  }

  const handleContextMenu = (event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onContextMenu(event, tile);
  };

  const handlePointerEnter = supportsPointerGlow
    ? (event: React.PointerEvent<HTMLElement>) => {
        tileRectRef.current = event.currentTarget.getBoundingClientRect();
      }
    : undefined;

  const handlePointerMove = supportsPointerGlow
    ? (event: React.PointerEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const rect = tileRectRef.current ?? target.getBoundingClientRect();
        tileRectRef.current = rect;
        const x = rect.width ? ((event.clientX - rect.left) / rect.width) * 100 : 50;
        const y = rect.height ? ((event.clientY - rect.top) / rect.height) * 100 : 50;
        target.style.setProperty("--hover-x", `${x}%`);
        target.style.setProperty("--hover-y", `${y}%`);
        const normalizedX = (x / 100 - 0.5) * 2;
        const normalizedY = (y / 100 - 0.5) * 2;
        target.style.setProperty("--hover-shift-x", normalizedX.toFixed(3));
        target.style.setProperty("--hover-shift-y", normalizedY.toFixed(3));
      }
    : undefined;

  const handlePointerLeave = supportsPointerGlow
    ? (event: React.PointerEvent<HTMLElement>) => {
        const target = event.currentTarget;
        target.style.setProperty("--hover-x", "50%");
        target.style.setProperty("--hover-y", "50%");
        target.style.setProperty("--hover-shift-x", "0");
        target.style.setProperty("--hover-shift-y", "0");
        tileRectRef.current = null;
      }
    : undefined;

  const spans = TILE_SPANS[tile.tile.size];
  const article = (
    <motion.article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative flex h-full overflow-hidden text-left transition-transform duration-150 cursor-default active:cursor-grabbing focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--metro-foreground]",
        isGlassTheme
          ? "rounded-[14px] border bg-white/5 px-3 py-3"
          : "rounded-[2px] border border-transparent px-3 py-3 shadow-none",
        TILE_THEME_CLASSES[theme.name],
        `col-span-${spans.cols} row-span-${spans.rows}`,
      )}
      data-theme-ripple-item
      whileHover={{ scale: isDragging ? 1 : 1.01, y: isDragging ? 0 : -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <TileSurface
        tile={tile.tile}
        iconClassName={iconClass}
        titleClassName={`${titleClasses[tile.tile.size]} ${textClass}`}
        descriptionColorClass={descriptionClass}
      />
      {isExternal ? (
        <span
          className="sr-only"
          id={`tile-${tile.tile.key}-external-note`}
        >
          Opens in a new tab
        </span>
      ) : null}
    </motion.article>
  );

  if (tile.tile.href) {
    if (isExternal) {
      return (
        <a
          href={tile.tile.href}
          className="contents"
          target="_blank"
          rel="noreferrer"
          aria-describedby={`tile-${tile.tile.key}-external-note`}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          style={{ cursor: "default" }}
        >
          {article}
        </a>
      );
    }

    return (
      <Link
        href={tile.tile.href}
        className="contents"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{ cursor: "default" }}
      >
        {article}
      </Link>
    );
  }

  return article;
}

export function DraggableGrid() {
  const { theme } = useTheme();
  const themedTiles = useTiles();
  const [instances, setInstances] = useState<ResolvedTile[]>([]);
  const [instanceOrder, setInstanceOrder] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const initialOrderRef = useRef<string[] | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const pendingOverIdRef = useRef<string | null>(null);
  const [activeTileKey, setActiveTileKey] = useState<TileKey | null>(null);
  const [activeTileRect, setActiveTileRect] = useState<{ width: number; height: number } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement | null>(null);
  const parallaxFrameRef = useRef<number | null>(null);
  const parallaxValuesRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [parallaxEnabled, setParallaxEnabled] = useState<boolean>(true);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    pendingOverIdRef.current = null;
  }, []);

  useEffect(() => () => clearHoverTimer(), [clearHoverTimer]);

  useEffect(() => {
    return () => {
      if (parallaxFrameRef.current !== null) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
        parallaxFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyPreference = (matches: boolean) => {
      window.requestAnimationFrame(() => {
        setParallaxEnabled(!matches);
      });
    };

    applyPreference(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyPreference(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || themedTiles.length === 0) {
      return;
    }

    const baseMap = new Map<TileKey, TileData>(themedTiles.map((tile) => [tile.key, tile]));
    const generated = createTileInstances();
    const resolved: ResolvedTile[] = [];

    for (const instance of generated) {
      const baseTile = baseMap.get(instance.key);
      if (!baseTile) continue;
      const tileWithSize =
        instance.size !== baseTile.size ? { ...baseTile, size: instance.size } : baseTile;
      resolved.push({
        instanceId: instance.id,
        baseKey: instance.key,
        tile: tileWithSize,
        size: instance.size,
      });
    }

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        setInstances(resolved);
        setInstanceOrder(resolved.map((item) => item.instanceId));
        setIsReady(true);
      });
    }
  }, [themedTiles]);

  const activeTile = useMemo(() => {
    if (!activeTileKey) return null;
    const next = themedTiles.find((tile) => tile.key === activeTileKey);
    return next ?? null;
  }, [activeTileKey, themedTiles]);

  const instanceMap = useMemo(() => {
    return new Map(instances.map((item) => [item.instanceId, item]));
  }, [instances]);

  const orderedTiles = useMemo(() => {
    return instanceOrder
      .map((id) => instanceMap.get(id))
      .filter((item): item is ResolvedTile => Boolean(item));
  }, [instanceMap, instanceOrder]);

  const placeholderTiles = useMemo(() => {
    return Array.from({ length: Math.max(16, TILE_KEYS.length * 2) }, (_, index) => ({
      key: `placeholder-${index}`,
      size: TILE_SIZES[index % TILE_SIZES.length],
    }));
  }, []);
  const isGlassTheme = theme.name === "glass";
  const gridTransformStyle = useMemo<CSSProperties>(
    () => ({
      transform: parallaxEnabled
        ? "translate3d(calc(var(--grid-parallax-x) * 20px), calc(var(--grid-parallax-y) * 20px), 0)"
        : "translate3d(0, 0, 0)",
    }),
    [parallaxEnabled],
  );

  const setParallaxValues = useCallback(
    (nextX: number, nextY: number) => {
      if (!parallaxEnabled) return;
      const wrapper = parallaxWrapperRef.current;
      if (!wrapper) return;
      const previous = parallaxValuesRef.current;
      if (Math.abs(previous.x - nextX) < 0.002 && Math.abs(previous.y - nextY) < 0.002) {
        return;
      }
      parallaxValuesRef.current = { x: nextX, y: nextY };
      if (parallaxFrameRef.current !== null) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
      }
      parallaxFrameRef.current = window.requestAnimationFrame(() => {
        wrapper.style.setProperty("--grid-parallax-x", nextX.toFixed(3));
        wrapper.style.setProperty("--grid-parallax-y", nextY.toFixed(3));
        parallaxFrameRef.current = null;
      });
    },
    [parallaxEnabled],
  );

  const handleGridPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!parallaxEnabled) return;
      const target = event.currentTarget;
      if (isDragging || event.pointerType === "touch") {
        return;
      }
      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      const clampedX = Math.max(-0.5, Math.min(0.5, relativeX));
      const clampedY = Math.max(-0.5, Math.min(0.5, relativeY));
      const normalizedX = clampedX * 2;
      const normalizedY = clampedY * 2;
      target.style.setProperty("--hover-shift-x", normalizedX.toFixed(3));
      target.style.setProperty("--hover-shift-y", normalizedY.toFixed(3));
      setParallaxValues(normalizedX, normalizedY);
    },
    [isDragging, parallaxEnabled, setParallaxValues],
  );

  const handleGridPointerLeave = useCallback(() => {
    setParallaxValues(0, 0);
  }, [setParallaxValues]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 12,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setIsDragging(true);
      initialOrderRef.current = [...instanceOrder];
      clearHoverTimer();
      const tile = instanceMap.get(String(event.active.id));
      if (tile) {
        setActiveTileKey(tile.tile.key);
      }
      const rect = event.active.rect.current?.initial;
      if (rect) {
        setActiveTileRect({ width: rect.width, height: rect.height });
      } else {
        setActiveTileRect(null);
      }
    },
    [clearHoverTimer, instanceMap, instanceOrder],
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) {
        clearHoverTimer();
        return;
      }

      const activeId = String(active.id);
      const overId = String(over.id);

      if (activeId === overId) {
        clearHoverTimer();
        return;
      }

      if (pendingOverIdRef.current === overId && hoverTimeoutRef.current !== null) {
        return;
      }

      clearHoverTimer();
      pendingOverIdRef.current = overId;
      hoverTimeoutRef.current = window.setTimeout(() => {
        setInstanceOrder((items) => {
          const current = [...items];
          const oldIndex = current.indexOf(activeId);
          const newIndex = current.indexOf(overId);
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
            return current;
          }
          return arrayMove(current, oldIndex, newIndex);
        });
        hoverTimeoutRef.current = null;
        pendingOverIdRef.current = null;
      }, HOVER_REORDER_DELAY);
    },
    [clearHoverTimer],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      void event;
      setIsDragging(false);
      setActiveTileKey(null);
      setActiveTileRect(null);
      clearHoverTimer();
      initialOrderRef.current = null;
    },
    [clearHoverTimer],
  );

  const handleDragCancel = useCallback(() => {
    setIsDragging(false);
    setActiveTileKey(null);
    setActiveTileRect(null);
    clearHoverTimer();
    if (initialOrderRef.current) {
      setInstanceOrder(initialOrderRef.current);
      initialOrderRef.current = null;
    }
  }, [clearHoverTimer]);

  const handleContextMenu = useCallback((event: ReactMouseEvent, tile: ResolvedTile) => {
    const x = event.clientX;
    const y = event.clientY;
    setContextMenu({ tileId: tile.instanceId, tileTitle: tile.tile.title, size: tile.tile.size, anchor: { x, y } });
  }, []);

  const handleResize = useCallback((tileId: string, size: TileSize) => {
    setInstances((current) =>
      current.map((item) => {
        if (item.instanceId !== tileId) {
          return item;
        }
        if (item.tile.size === size) {
          return item;
        }
        const updatedTile = { ...item.tile, size };
        return { ...item, size, tile: updatedTile };
      }),
    );
    setContextMenu(null);
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  if (!isReady) {
    return (
      <div
        ref={parallaxWrapperRef}
        className="relative flex-1 [--grid-parallax-x:0] [--grid-parallax-y:0]"
        onPointerMove={handleGridPointerMove}
        onPointerLeave={handleGridPointerLeave}
      >
        <div
          className="grid min-h-full grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] auto-rows-[140px] gap-1 sm:gap-1 lg:gap-2 transition-transform duration-500 ease-out will-change-transform"
          style={gridTransformStyle}
        >
          {placeholderTiles.map((tile) => {
            const spans = TILE_SPANS[tile.size];
            return (
              <div
                key={tile.key}
                className={cn(
                  "relative flex h-full overflow-hidden px-3 py-3",
                  `col-span-${spans.cols} row-span-${spans.rows}`,
                  isGlassTheme
                    ? "rounded-[14px] border border-white/15 bg-white/6 backdrop-blur-md"
                    : "rounded-[2px] border border-transparent bg-(--metro-chrome)/60 animate-pulse",
                  TILE_THEME_CLASSES[theme.name],
                )}
              >
                <div
                  className={cn(
                    "m-auto h-10 w-10 rounded-full",
                    isGlassTheme ? "bg-white/15" : "bg-(--metro-neutral)/70",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={instanceOrder} strategy={rectSortingStrategy}>
        <div
          ref={parallaxWrapperRef}
          className="relative flex-1 [--grid-parallax-x:0] [--grid-parallax-y:0]"
          onPointerMove={handleGridPointerMove}
          onPointerLeave={handleGridPointerLeave}
        >
          <div
            className="grid min-h-full grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] auto-rows-[140px] gap-1 sm:gap-1 lg:gap-2 transition-transform duration-300 ease-out will-change-transform"
            style={gridTransformStyle}
          >
            {orderedTiles.map((tile) => (
              <SortableTile key={tile.instanceId} tile={tile} isDraggingGlobal={isDragging} onContextMenu={handleContextMenu} />
            ))}
          </div>
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={{ duration: 180, easing: "ease-out" }}>
        {activeTile ? <DragPreview tile={activeTile} size={activeTileRect} /> : null}
      </DragOverlay>
      {contextMenu ? (
        <TileContextMenu
          anchor={contextMenu.anchor}
          tileId={contextMenu.tileId}
          tileTitle={contextMenu.tileTitle}
          activeSize={contextMenu.size}
          onSelect={handleResize}
          onClose={closeContextMenu}
        />
      ) : null}
    </DndContext>
  );
}

export default DraggableGrid;

type TileSurfaceProps = {
  tile: TileData;
  iconClassName: string;
  titleClassName: string;
  descriptionColorClass: string;
};

function TileSurface({
  tile,
  iconClassName,
  titleClassName,
  descriptionColorClass,
}: TileSurfaceProps) {
  const { theme } = useTheme();
  const isRetro = theme.name === "retro";

  const titleStyle: CSSProperties = {
    fontFamily: "var(--metro-heading-font-family)",
  };

  if (isRetro) {
    titleStyle.fontSize = "6px";
    titleStyle.lineHeight = "1.4";
    titleStyle.letterSpacing = "0.35em";
  }

  const descriptionStyle: CSSProperties = {
    fontFamily: "var(--metro-font-family)",
  };

  if (isRetro) {
    descriptionStyle.fontSize = "6px";
    descriptionStyle.letterSpacing = "0.28em";
    descriptionStyle.lineHeight = "1.4";
  }

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <MetroIcon name={tile.icon} className={cn("h-16 w-16", iconClassName)} />
      </div>
      <div className={cn("absolute bottom-3 left-3", isRetro ? "space-y-1" : "space-y-0.5")}
      >
        <h2 className={cn(titleClassName)} style={titleStyle}>
          {tile.title}
        </h2>
        {tile.description ? (
          <p className={cn(descriptionClasses[tile.size], descriptionColorClass)} style={descriptionStyle}>
            {tile.description}
          </p>
        ) : null}
      </div>
    </>
  );
}

function DragPreview({ tile, size }: { tile: TileData; size: { width: number; height: number } | null }) {
  const textClass = TEXT_COLOR[tile.contrast];
  const descriptionClass = DESCRIPTION_COLOR[tile.contrast];
  const iconClass = tile.contrast === "light" ? "text-white" : "text-[#001B36]";

  const style: CSSProperties = {
    backgroundColor: tile.color,
    pointerEvents: "none",
    width: size?.width,
    height: size?.height,
  };

  return (
    <motion.article
      layoutId={`tile-${tile.key}`}
      className={cn(
        "flex h-full min-w-[160px] flex-col justify-between overflow-hidden rounded-[2px] border border-white/20 px-3 py-3 text-left shadow-[0_24px_48px_rgba(0,0,0,0.35)]",
        tileSizeClasses[tile.size],
      )}
      style={style}
      initial={{ scale: 1.05, opacity: 0.95 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <TileSurface
        tile={tile}
        iconClassName={iconClass}
        titleClassName={`${titleClasses[tile.size]} ${textClass}`}
        descriptionColorClass={descriptionClass}
      />
    </motion.article>
  );
}
