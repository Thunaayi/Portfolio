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
        "space-y-3 rounded-xl border border-white/15 bg-(--metro-chrome)/55 px-6 py-4 text-(--metro-foreground) shadow-[0_18px_42px_rgba(2,31,61,0.45)] backdrop-blur-md",
        className,
      )}
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-(--metro-accent)/90">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="relative text-2xl font-semibold uppercase tracking-[0.22em] sm:text-3xl">
            {title}
            <span className="mt-1.5 block h-[3px] w-16 bg-(--metro-accent)" aria-hidden="true" />
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
