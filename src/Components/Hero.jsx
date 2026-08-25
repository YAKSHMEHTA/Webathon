import { useState, useEffect, useRef } from "react";
import { GL } from "./gl";
import { Pill } from "./gl/Pill";
import { Link } from "react-router-dom";
import Button from "./gl/Button";

function useCountdown(days = 7) {
  // fixed once per mount, so refreshes don't reset the target
  const target = useRef(Date.now() + days * 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(target.current - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(Math.max(target.current - Date.now(), 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(timeLeft / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl tabular-nums sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  const [hovering, setHovering] = useState(false);
  const { days, hours, minutes, seconds } = useCountdown(7);

  return (
    <section className="relative min-h-screen flex flex-col justify-between">
      <GL hovering={hovering} />
      <div className="relative  mt-auto pb-16 text-center">
        <Pill className="mb-2 py-7">UNLOCK YOUR <br /> FUTURE GROWTH</Pill>
        <br />
        
        <h1 className="font-sentient text-5xl sm:text-6xl md:text-7xl">
          NIRVANA TECHFEST <br />
        </h1>
        <p className="mx-auto mt-8 max-w-[440px] text-balance font-mono text-sm text-foreground/60 sm:text-base">
          Nirvana TechFest brings builders together to solve one problem
          statement that matters.
        </p>
        <p className="mx-auto mt-3 max-w-[480px] text-balance font-mono text-xs text-foreground/40 sm:text-sm">
          Problem Statement: Design scalable solutions that make technology
          more accessible for the next billion users.
        </p>

        <div className="mx-auto mt-8 flex max-w-[320px] items-center justify-center gap-4 sm:gap-6">
          <CountdownBlock value={days} label="Days" />
          <span className="font-mono text-2xl text-foreground/30 sm:text-3xl">:</span>
          <CountdownBlock value={hours} label="Hrs" />
          <span className="font-mono text-2xl text-foreground/30 sm:text-3xl">:</span>
          <CountdownBlock value={minutes} label="Min" />
          <span className="font-mono text-2xl text-foreground/30 sm:text-3xl">:</span>
          <CountdownBlock value={seconds} label="Sec" />
        </div>

        <Link className="contents max-sm:hidden" to="/contact">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contact Us]
          </Button>
        </Link>
        <a className="contents sm:hidden" href="/contact">
        
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Contact Us]
          </Button>
        </a>
      </div>
    </section>
  );
}

export default Hero;