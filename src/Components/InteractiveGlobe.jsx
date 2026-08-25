import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

// Target Date for NIRVAN '26 Fest
const EVENT_DATE = new Date("2026-04-15T09:00:00").getTime();

// ----------------------------------------------------------------------
// 1. Cobe 3D Globe Component
// ----------------------------------------------------------------------
export function InteractiveGlobe() {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const rRef = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.08, 0.12, 0.22],
      markerColor: [0, 0.85, 1], // Cyan markers
      glowColor: [0.15, 0.25, 0.5],
      markers: [
        { location: [29.2183, 79.513], size: 0.1 }, // GEHU Haldwani
        { location: [28.6139, 77.209], size: 0.05 }, // New Delhi
        { location: [19.076, 72.8777], size: 0.05 }, // Mumbai
        { location: [12.9716, 77.5946], size: 0.05 }, // Bangalore
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.004;
        }
        state.phi = phi + rRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full max-w-[500px] lg:max-w-[600px] aspect-square mx-auto">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rRef.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rRef.current = delta / 200;
          }
        }}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
        className="w-full h-full transition-opacity opacity-95 hover:opacity-100"
      />
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. Countdown Timer Component
// ----------------------------------------------------------------------
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = EVENT_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
      {timeUnits.map((unit, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg shadow-cyan-950/20"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight text-cyan-400 font-mono">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------
// 3. Hero Section Parent Component
// ----------------------------------------------------------------------
export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-hidden flex items-center justify-center pt-20 pb-12">
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Annual Tech Fest • Web-a-thon 4.0
            </div>

            {/* Main Title & Tagline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                NIRVAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">'26</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300 italic">
                "Where Ideas Become Innovation"
              </p>
            </div>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal">
              Join Graphic Era Hill University’s flagship technical fest. 2 days of intense hackathons, competitive gaming, CTF challenges, and expert workshops.
            </p>

            {/* Event Metadata (Date & Venue) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>2 Days of Innovation</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>GEHU Campus, Haldwani</span>
              </div>
            </div>

            {/* Countdown Component */}
            <div className="pt-2 flex flex-col items-center lg:items-start space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Starts In</span>
              <CountdownTimer />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#events"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all flex items-center justify-center gap-2"
              >
                Register Now
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Cobe Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <InteractiveGlobe />
          </motion.div>

        </div>
      </div>
    </section>
  );
}