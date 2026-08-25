import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import {Link} from "react-router-dom";

export function ParallaxHeroImagesDemo() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <ParallaxHeroImages images={images} />
      <div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
        <h1
          className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          Explore Our Multiple Events
        </h1>
        <p
          className="max-w-md text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:text-neutral-400 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          Compete your journey through our diverse range of events, each designed to challenge and inspire. From tech workshops to interactive sessions, there's something for everyone. Dive in and discover the experiences that await you!
        </p>
        <Link to="/events">
          <button
            className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-800 dark:hover:bg-neutral-200">
            Explore Events
          </button>
        </Link>
      </div>
    </div>
  );
}

const images = [
  "FREE FIRE X 9th ANNIVERSARY.jpeg",
  "Ten Lesser-Known Lost Treasures of the World - Historic Mysteries.jpeg",
  "Sembilan tim juara di Free Fire Master League Season III.jpeg",
  "Hiromi Higuruma - 4k pc wallpaper.jpeg",
  "FONDO DE HACKING PROGRAM.jpeg",
  "_.jpeg",
];
