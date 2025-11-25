import type { JSX } from "react";

type IconProps = {
  name: "user" | "sun" | "moon" | "spark";
  className?: string;
};

const paths: Record<IconProps["name"], JSX.Element> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.3137 3.134-6 7-6s7 2.6863 7 6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m10-10h-2M6 12H4m15.07 5.07-1.41-1.41M7.34 7.34 5.93 5.93m12.73 0-1.41 1.41M7.34 16.66 5.93 18.07" />
    </>
  ),
  moon: (
    <path d="M20 12.35A8 8 0 0 1 11.65 4 6 6 0 1 0 18 12.35z" />
  ),
  spark: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="m17.657 6.343-2.828 2.828" />
      <path d="m9.172 14.828-2.829 2.828" />
      <path d="M21 12h-4" />
      <path d="M7 12H3" />
      <path d="m17.657 17.657-2.828-2.829" />
      <path d="m9.172 9.172-2.829-2.829" />
    </>
  ),
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
