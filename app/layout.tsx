import type { Metadata } from "next";
import {
  Exo_2,
  Geist,
  Geist_Mono,
  Inter,
  Montserrat,
  Nunito_Sans,
  Orbitron,
  Playfair_Display,
  Poppins,
  Press_Start_2P,
  Quicksand,
  Rajdhani,
  Raleway,
  Rubik,
  VT323,
} from "next/font/google";
import "./globals.css";

import { MetroPageBackground } from "@/app/components/MetroPageBackground";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  nunitoSans.variable,
  quicksand.variable,
  orbitron.variable,
  rajdhani.variable,
  montserrat.variable,
  poppins.variable,
  rubik.variable,
  exo2.variable,
  raleway.variable,
  playfairDisplay.variable,
  inter.variable,
  vt323.variable,
  pressStart2P.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description:
    "Highlight your experience, flagship projects, and the impact you create as an engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} antialiased font-sans`} style={{ backgroundColor: "var(--metro-background)" }}>
        <ThemeProvider>
          <MetroPageBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
