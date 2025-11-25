import dynamic from "next/dynamic";
import { Header } from "@/app/components/Header";
import { TileFlyoverProvider } from "@/app/components/TileFlyoverProvider";

const DraggableGrid = dynamic(() => import("./components/DraggableGrid"));

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden text-(--metro-foreground)">
      <TileFlyoverProvider>
        <a
          href="#tile-grid"
          className="sr-only fixed left-3 top-3 z-50 rounded bg-(--metro-chrome) px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-(--metro-foreground) shadow focus:not-sr-only"
        >
          Skip to tiles
        </a>
        <div
          className="relative flex flex-1 overflow-hidden"
          role="main"
          aria-describedby="home-navigation-instructions"
        >
          <p id="home-navigation-instructions" className="sr-only">
            Main navigation uses a grid of live tiles. Each tile opens a section of the portfolio. Use your mouse,
            touch, or keyboard (Tab, then Enter) to activate a tile.
          </p>
          <div id="tile-grid" className="flex-1">
            <DraggableGrid />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-8 z-20 flex w-full max-w-4xl -translate-x-1/2 justify-center px-6 sm:px-12">
            <Header
              title="Metro Live Tiles"
              eyebrow="Interactive Workspace"
              description="Arrange your portfolio tiles just like the Windows 8 start screen. Drag, drop, and personalize the layout while keeping the flat Metro charm. Click or tap a tile to open its section."
              tip="Tip: Use the tiles as navigation. Tab to a tile and press Enter to open that section."
              className="pointer-events-auto w-full"
            />
          </div>
        </div>
      </TileFlyoverProvider>
    </div>
  );
}
