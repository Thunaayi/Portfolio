"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type GridLayoutProps = PropsWithChildren<{
  className?: string;
}>;

export function GridLayout({ children, className }: GridLayoutProps) {
  return (
    <div
      className={cn(
        "grid flex-1 gap-1 sm:gap-1 lg:gap-2",
        "grid-cols-2 sm:grid-cols-6 lg:grid-cols-12",
        "[grid-auto-rows:140px] sm:[grid-auto-rows:150px] lg:[grid-auto-rows:160px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
