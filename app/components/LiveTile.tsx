"use client";

import { useEffect, useMemo, useState } from "react";

import { Tile } from "./Tile";
import type { TileData } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type LiveTileProps = {
  tiles: TileData[];
  interval?: number;
  className?: string;
};

export function LiveTile({ tiles, interval = 8000, className }: LiveTileProps) {
  const memoised = useMemo(() => tiles, [tiles]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (memoised.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % memoised.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [memoised, interval]);

  const activeTile = memoised[index];

  return (
    <Tile
      tile={activeTile}
      href={activeTile.href}
      className={cn("overflow-hidden", className)}
      footerSlot={
        <p
          className={`live-tile-cycle text-[0.65rem] uppercase tracking-[0.45em] ${
            activeTile.contrast === "dark" ? "text-[#0E1729]" : "text-white"
          } text-opacity-70`}
        >
          Explore
        </p>
      }
    />
  );
}
