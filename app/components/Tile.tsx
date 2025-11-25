"use client";

import Link from "next/link";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

import {
  tileSizeClasses,
  titleClasses,
  type TileData,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MetroIcon } from "./MetroIcon";
import { useTileFlyover } from "./TileFlyoverProvider";

export type TileProps = {
  tile: TileData;
  href?: string;
  className?: string;
  footerSlot?: ReactNode;
};

export function Tile({ tile, href, className, footerSlot }: TileProps) {
  const textClass = "text-white";
  const isExternal = href ? /^https?:\/\//.test(href) : false;
  const { openTile } = useTileFlyover();

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    openTile(tile);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (href) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTile(tile);
    }
  };

  const article = (
    <motion.article
      layoutId={`tile-${tile.key}`}
      style={{ backgroundColor: tile.color }}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-none border border-transparent px-1 py-1 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.8)] hover:border-white/25",
        tileSizeClasses[tile.size],
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role={href ? undefined : "button"}
      tabIndex={href ? undefined : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-1 items-center justify-center">
        <MetroIcon
          name={tile.icon}
          className={cn(
            "h-16 w-16 text-white drop-shadow-[0_12px_18px_rgba(0,0,0,0.25)]",
          )}
        />
      </div>
      <div className="mt-2 flex items-end justify-between gap-2 pl-0.5 pr-0.5">
        <h2 className={`${titleClasses[tile.size]} ${textClass}`}>{tile.title}</h2>
        {footerSlot ? <div className="text-right leading-none">{footerSlot}</div> : null}
      </div>
      {isExternal ? (
        <span
          className="sr-only"
          id={`tile-${tile.key}-external-note`}
        >
          Opens in a new tab
        </span>
      ) : null}
    </motion.article>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className="contents"
          target="_blank"
          rel="noreferrer"
          aria-describedby={`tile-${tile.key}-external-note`}
          onClick={handleClick}
        >
          {article}
        </a>
      );
    }

    return (
      <Link href={href} className="contents" onClick={handleClick}>
        {article}
      </Link>
    );
  }

  return article;
}
