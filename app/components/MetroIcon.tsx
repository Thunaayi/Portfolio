"use client";

import type { CSSProperties, JSX } from "react";

import {
  Briefcase,
  ChartLineUp,
  ChartPieSlice,
  ChatsCircle,
  Cpu,
  EnvelopeSimple,
  Flask,
  GithubLogo,
  HandsClapping,
  Handshake,
  Leaf,
  LinkedinLogo,
  ListBullets,
  Megaphone,
  PhoneCall,
  PresentationChart,
  PuzzlePiece,
  RocketLaunch,
  Sparkle,
  Stack,
  Star,
  SunHorizon,
  Tree,
  UsersThree,
  User,
  UserCircleGear,
  type IconProps,
} from "phosphor-react";

import type { MetroIconName } from "@/lib/constants";

type RetroIconName = Extract<MetroIconName, `${string}-retro`>;

type PixelIconProps = {
  pattern: string[];
  className?: string;
  size?: number | string;
  color?: string;
  style?: CSSProperties;
};

const RETRO_PATTERNS: Record<RetroIconName, string[]> = {
  "case-study-retro": [
    "01111110",
    "11111111",
    "11000011",
    "11011011",
    "11011011",
    "11000011",
    "11111111",
    "01111110",
  ],
  "profile-retro": [
    "00111100",
    "01111110",
    "11100111",
    "11000111",
    "11111111",
    "01111110",
    "00111100",
    "00011000",
  ],
  "experience-retro": [
    "00011000",
    "00111100",
    "11111111",
    "01111110",
    "00111100",
    "01111110",
    "11111111",
    "00011000",
  ],
  "stack-retro": [
    "11111111",
    "10000001",
    "11111111",
    "10000001",
    "11111111",
    "10000001",
    "11111111",
    "00000000",
  ],
  "talk-retro": [
    "00111100",
    "01111110",
    "11111111",
    "11111111",
    "11111111",
    "01111110",
    "00111100",
    "00011000",
  ],
  "testimonials-retro": [
    "01100110",
    "11111111",
    "11111111",
    "11111111",
    "01111110",
    "00111100",
    "00011000",
    "00000000",
  ],
  "contact-retro": [
    "11111111",
    "10000001",
    "10111101",
    "11011011",
    "11100111",
    "11111111",
    "10000001",
    "11111111",
  ],
  "github-retro": [
    "00111100",
    "01111110",
    "11111111",
    "11011011",
    "11011011",
    "11111111",
    "01111110",
    "11011011",
  ],
  "linkedin-retro": [
    "11111111",
    "11000000",
    "11011110",
    "11011110",
    "11011110",
    "11011110",
    "11011110",
    "11111111",
  ],
  "sandbox-retro": [
    "11100111",
    "11100111",
    "00111100",
    "00111100",
    "11100111",
    "11100111",
    "00111100",
    "00111100",
  ],
};

function PixelIcon({ pattern, className, size = 48, color = "currentColor", style }: PixelIconProps) {
  const rows = pattern.length;
  const cols = pattern[0]?.length ?? 0;
  const viewBoxWidth = cols > 0 ? cols : 8;
  const viewBoxHeight = rows > 0 ? rows : 8;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", ...style }}
    >
      {pattern.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "1" ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color ?? "currentColor"} /> : null,
        ),
      )}
    </svg>
  );
}

const makePixelIcon = (pattern: string[], name: RetroIconName) => {
  const PixelIconComponent = ({ className, size = 48, color = "currentColor", style, ...props }: IconProps) => (
    <PixelIcon
      pattern={pattern}
      className={className}
      size={size}
      color={color}
      style={style as CSSProperties | undefined}
      {...props}
    />
  );
  PixelIconComponent.displayName = `PixelIcon(${name})`;
  return PixelIconComponent;
};

const ICONS: Record<MetroIconName, (props: IconProps) => JSX.Element> = {
  "case-study": (props: IconProps) => <PresentationChart weight="fill" {...props} />,
  profile: (props: IconProps) => <UserCircleGear weight="fill" {...props} />,
  experience: (props: IconProps) => <Briefcase weight="fill" {...props} />,
  stack: (props: IconProps) => <Stack weight="fill" {...props} />,
  talk: (props: IconProps) => <ChatsCircle weight="fill" {...props} />,
  testimonials: (props: IconProps) => <ListBullets weight="fill" {...props} />,
  contact: (props: IconProps) => <EnvelopeSimple weight="fill" {...props} />,
  github: (props: IconProps) => <GithubLogo weight="fill" {...props} />,
  linkedin: (props: IconProps) => <LinkedinLogo weight="fill" {...props} />,
  sandbox: (props: IconProps) => <PuzzlePiece weight="fill" {...props} />,
  "case-study-pastel": (props: IconProps) => <ChartPieSlice weight="fill" {...props} />,
  "profile-pastel": (props: IconProps) => <UsersThree weight="fill" {...props} />,
  "experience-pastel": (props: IconProps) => <Star weight="fill" {...props} />,
  "stack-pastel": (props: IconProps) => <Stack weight="fill" {...props} />,
  "talk-pastel": (props: IconProps) => <ChatsCircle weight="fill" {...props} />,
  "testimonials-pastel": (props: IconProps) => <ListBullets weight="fill" {...props} />,
  "contact-pastel": (props: IconProps) => <EnvelopeSimple weight="fill" {...props} />,
  "github-pastel": (props: IconProps) => <GithubLogo weight="fill" {...props} />,
  "linkedin-pastel": (props: IconProps) => <LinkedinLogo weight="fill" {...props} />,
  "sandbox-pastel": (props: IconProps) => <PuzzlePiece weight="fill" {...props} />,
  "case-study-neon": (props: IconProps) => <RocketLaunch weight="fill" {...props} />,
  "profile-neon": (props: IconProps) => <User weight="fill" {...props} />,
  "experience-neon": (props: IconProps) => <Cpu weight="fill" {...props} />,
  "stack-neon": (props: IconProps) => <ChartLineUp weight="fill" {...props} />,
  "talk-neon": (props: IconProps) => <Megaphone weight="fill" {...props} />,
  "testimonials-neon": (props: IconProps) => <Sparkle weight="fill" {...props} />,
  "contact-neon": (props: IconProps) => <PhoneCall weight="fill" {...props} />,
  "github-neon": (props: IconProps) => <GithubLogo weight="fill" {...props} />,
  "linkedin-neon": (props: IconProps) => <LinkedinLogo weight="fill" {...props} />,
  "sandbox-neon": (props: IconProps) => <Flask weight="fill" {...props} />,
  "case-study-solar": (props: IconProps) => <SunHorizon weight="fill" {...props} />,
  "profile-solar": (props: IconProps) => <UsersThree weight="fill" {...props} />,
  "experience-solar": (props: IconProps) => <Leaf weight="fill" {...props} />,
  "stack-solar": (props: IconProps) => <Tree weight="fill" {...props} />,
  "talk-solar": (props: IconProps) => <ChatsCircle weight="fill" {...props} />,
  "testimonials-solar": (props: IconProps) => <HandsClapping weight="fill" {...props} />,
  "contact-solar": (props: IconProps) => <EnvelopeSimple weight="fill" {...props} />,
  "github-solar": (props: IconProps) => <GithubLogo weight="fill" {...props} />,
  "linkedin-solar": (props: IconProps) => <LinkedinLogo weight="fill" {...props} />,
  "sandbox-solar": (props: IconProps) => <PuzzlePiece weight="fill" {...props} />,
  "case-study-glass": (props: IconProps) => <PresentationChart weight="duotone" {...props} />,
  "profile-glass": (props: IconProps) => <UserCircleGear weight="duotone" {...props} />,
  "experience-glass": (props: IconProps) => <Briefcase weight="duotone" {...props} />,
  "stack-glass": (props: IconProps) => <Stack weight="duotone" {...props} />,
  "talk-glass": (props: IconProps) => <ChatsCircle weight="duotone" {...props} />,
  "testimonials-glass": (props: IconProps) => <Handshake weight="duotone" {...props} />,
  "contact-glass": (props: IconProps) => <EnvelopeSimple weight="duotone" {...props} />,
  "github-glass": (props: IconProps) => <GithubLogo weight="duotone" {...props} />,
  "linkedin-glass": (props: IconProps) => <LinkedinLogo weight="duotone" {...props} />,
  "sandbox-glass": (props: IconProps) => <PuzzlePiece weight="duotone" {...props} />,
  "case-study-orchid": (props: IconProps) => <PresentationChart weight="duotone" {...props} />,
  "profile-orchid": (props: IconProps) => <UserCircleGear weight="duotone" {...props} />,
  "experience-orchid": (props: IconProps) => <ChartLineUp weight="duotone" {...props} />,
  "stack-orchid": (props: IconProps) => <Stack weight="duotone" {...props} />,
  "talk-orchid": (props: IconProps) => <ChatsCircle weight="duotone" {...props} />,
  "testimonials-orchid": (props: IconProps) => <HandsClapping weight="duotone" {...props} />,
  "contact-orchid": (props: IconProps) => <EnvelopeSimple weight="duotone" {...props} />,
  "github-orchid": (props: IconProps) => <GithubLogo weight="duotone" {...props} />,
  "linkedin-orchid": (props: IconProps) => <LinkedinLogo weight="duotone" {...props} />,
  "sandbox-orchid": (props: IconProps) => <PuzzlePiece weight="duotone" {...props} />,
  "case-study-retro": makePixelIcon(RETRO_PATTERNS["case-study-retro"], "case-study-retro"),
  "profile-retro": makePixelIcon(RETRO_PATTERNS["profile-retro"], "profile-retro"),
  "experience-retro": makePixelIcon(RETRO_PATTERNS["experience-retro"], "experience-retro"),
  "stack-retro": makePixelIcon(RETRO_PATTERNS["stack-retro"], "stack-retro"),
  "talk-retro": makePixelIcon(RETRO_PATTERNS["talk-retro"], "talk-retro"),
  "testimonials-retro": makePixelIcon(RETRO_PATTERNS["testimonials-retro"], "testimonials-retro"),
  "contact-retro": makePixelIcon(RETRO_PATTERNS["contact-retro"], "contact-retro"),
  "github-retro": makePixelIcon(RETRO_PATTERNS["github-retro"], "github-retro"),
  "linkedin-retro": makePixelIcon(RETRO_PATTERNS["linkedin-retro"], "linkedin-retro"),
  "sandbox-retro": makePixelIcon(RETRO_PATTERNS["sandbox-retro"], "sandbox-retro"),
  "case-study-metro": (props: IconProps) => <PresentationChart weight="fill" {...props} />,
  "profile-metro": (props: IconProps) => <UserCircleGear weight="fill" {...props} />,
  "experience-metro": (props: IconProps) => <Briefcase weight="fill" {...props} />,
  "stack-metro": (props: IconProps) => <Stack weight="fill" {...props} />,
  "talk-metro": (props: IconProps) => <ChatsCircle weight="fill" {...props} />,
  "testimonials-metro": (props: IconProps) => <Handshake weight="fill" {...props} />,
  "contact-metro": (props: IconProps) => <EnvelopeSimple weight="fill" {...props} />,
  "github-metro": (props: IconProps) => <GithubLogo weight="fill" {...props} />,
  "linkedin-metro": (props: IconProps) => <LinkedinLogo weight="fill" {...props} />,
  "sandbox-metro": (props: IconProps) => <PuzzlePiece weight="fill" {...props} />,
};

export function MetroIcon({ name, className, size = 48, color = "currentColor", ...props }: { name: MetroIconName } & IconProps) {
  const IconComponent = ICONS[name] ?? PresentationChart;
  return <IconComponent className={className} size={size} color={color} {...props} />;
}
