"use client";

import { Icon } from "./Icon";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { cn } from "@/lib/utils";

type HeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  tip?: string;
  className?: string;
};

export function Header({ title, eyebrow, description, tip, className }: HeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3 px-0 py-4 text-(--metro-foreground) sm:rounded-xl sm:border sm:border-white/15 sm:bg-(--metro-chrome)/55 sm:px-6 sm:shadow-[0_18px_42px_rgba(2,31,61,0.45)] sm:backdrop-blur-md",
        className,
      )}
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          {eyebrow ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-(--metro-accent)/90 sm:text-[11px]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="relative text-3xl font-light uppercase tracking-[0.25em] sm:text-3xl sm:font-semibold">
            {title}
            <span className="mt-2 block h-[4px] w-12 bg-(--metro-accent) sm:h-[3px] sm:w-16" aria-hidden="true" />
          </h1>
        </div>

        <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-(--metro-foreground)/85">
          <ThemeSwitcher />
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold">User</span>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-(--metro-accent)/90 text-(--metro-background)">
              <Icon name="user" className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {description ? (
        <p className="max-w-2xl text-xs leading-relaxed text-(--metro-foreground)/70 sm:text-sm">
          {description}
        </p>
      ) : null}
      {tip ? (
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-(--metro-accent)/85">
          {tip}
        </p>
      ) : null}
    </div>
  );
}
