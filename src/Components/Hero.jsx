
import { useEffect, useState } from "react";

import { GL } from "./gl";
import { Pill } from "./gl/Pill";
import Button from "./gl/Button";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  // 7-day live countdown
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEnd = localStorage.getItem("nirvana-techfest-end");

    if (savedEnd) {
      return Math.max(0, Number(savedEnd) - Date.now());
    }

    const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("nirvana-techfest-end", end.toString());

    return 7 * 24 * 60 * 60 * 1000;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const end = Number(localStorage.getItem("nirvana-techfest-end"));
      setTimeLeft(Math.max(0, end - Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const format = (value) => String(value).padStart(2, "0");

  return (
    <section className="flex h-svh flex-col justify-between">
      <GL hovering={hovering} />

      <div className="relative mt-auto pb-16 text-center">
        <Pill className="mb-6">NIRVANA TECHFEST · 2026</Pill>

        <h1 className="font-sentient text-5xl sm:text-6xl md:text-7xl">
          Build the <br />
          <i className="font-light">future</i> with tech
        </h1>

        <p className="mx-auto mt-8 max-w-[520px] text-balance font-mono text-sm text-foreground/60 sm:text-base">
          Solve real-world problems, build meaningful technology, and turn
          bold ideas into working solutions at Nirvana TechFest.
        </p>

        {/* Problem Statement */}
        <div className="mx-auto mt-8 max-w-[620px] font-mono text-xs text-foreground/50 sm:text-sm">
          <span className="text-foreground/80">PROBLEM STATEMENT</span>
          <br />
          How can technology be used to create scalable, accessible, and
          impactful solutions for real-world challenges?
        </div>

        {/* Countdown */}
        <div className="mx-auto mt-8 flex w-fit items-center gap-3 font-mono">
          <span className="text-xs uppercase tracking-widest text-foreground/40">
            Starts in
          </span>

          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span>{format(days)}d</span>
            <span className="text-foreground/30">:</span>
            <span>{format(hours)}h</span>
            <span className="text-foreground/30">:</span>
            <span>{format(minutes)}m</span>
            <span className="text-foreground/30">:</span>
            <span>{format(seconds)}s</span>
          </div>
        </div>

        <a className="contents max-sm:hidden" href="/#contact">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Participate]
          </Button>
        </a>

        <a className="contents sm:hidden" href="/#contact">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Participate]
          </Button>
        </a>
      </div>
    </section>
  );
}

export default Hero;

