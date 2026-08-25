import { useRef, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Registration from "./Registration";
import { Clock, MapPin, Mail, Phone, Calendar, ArrowUpRight, Check, Sparkle, Terminal } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1. InfiniteTextSlider (Reused from your reference style)          */
/* ------------------------------------------------------------------ */
function InfiniteTextSlider({
  items,
  speed = 90,
  direction = "left",
  pauseOnHover = true,
  separator = <Sparkle size={14} className="text-neutral-600" />,
  className = "",
  textClass = "text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-neutral-800 transition-colors hover:text-white"
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const setWidth = track.scrollWidth / 2;
      const duration = setWidth / speed;

      gsap.set(track, { xPercent: 0 });
      tweenRef.current = gsap.to(track, {
        xPercent: direction === "left" ? -50 : 50,
        duration,
        ease: "none",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items, speed, direction]);

  const handleEnter = () => {
    if (pauseOnHover) tweenRef.current?.timeScale(0.15);
  };
  const handleLeave = () => {
    if (pauseOnHover) tweenRef.current?.timeScale(1);
  };

  const renderSet = (keyPrefix) => (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((text, i) => (
        <div
          key={`${keyPrefix}-${i}`}
          className="flex shrink-0 items-center gap-12 cursor-default"
        >
          <span className={`whitespace-nowrap ${textClass}`}>
            {text}
          </span>
          {separator}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative w-full overflow-hidden bg-black py-4 sm:py-6"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div ref={trackRef} className={`flex w-max ${className}`}>
        {renderSet("a")}
        {renderSet("b")}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Main Component: Schedule & Contact (Stealth Monochrome Theme)   */
/* ------------------------------------------------------------------ */
export default function ScheduleAndContact() {
  const [activeDay, setActiveDay] = useState(1);
  const [copied, setCopied] = useState(false);

  // Horizontal Timeline Data for NIRVAN '26 (2 Days)
  const scheduleData = {
    1: [
      { time: "09:00 AM", title: "Opening Ceremony", venue: "Main Auditorium", desc: "Keynote speeches and welcome address by GEHU faculty." },
      { time: "10:30 AM", title: "Hackathon Kickoff", venue: "Lab Complex", desc: "24-hour coding sprint begins. Problem statements unveiled." },
      { time: "01:00 PM", title: "Lunch & Networking", venue: "Campus Cafeteria", desc: "Interact with sponsors, mentors, and fellow developers." },
      { time: "03:00 PM", title: "CTF Arena Opens", venue: "Cyber Security Lab", desc: "Jeopardy-style cybersecurity and cryptography battles." },
      { time: "06:00 PM", title: "E-Sports Heats", venue: "Gaming Zone", desc: "Valorant & BGMI preliminary rounds." },
    ],
    2: [
      { time: "10:00 AM", title: "Tech Workshop", venue: "Seminar Hall 1", desc: "Hands-on AI and Web3 session led by industry experts." },
      { time: "11:30 AM", title: "Treasure Hunt", venue: "Campus Grounds", desc: "Logic, teamwork, and riddle-solving adventure across campus." },
      { time: "02:00 PM", title: "Hackathon Submission", venue: "Lab Complex", desc: "Code freeze and final project uploads to GitHub." },
      { time: "04:00 PM", title: "Project Judging & Demos", venue: "Exhibition Hall", desc: "Teams pitch their solutions to the judging panel." },
      { time: "06:30 PM", title: "Closing & Prize Ceremony", venue: "Main Auditorium", desc: "Winner announcements and closing remarks." },
    ]
  };

  const tickerItems = [
    "NIRVAN '26", 
    "GEHU HALDWANI", 
    "2 DAYS OF INNOVATION", 
    "WEB-A-THON 4.0", 
    "REGISTER NOW"
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nirvan@gehu.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="schedule" className="relative min-h-screen bg-black text-white pt-24 pb-32">
      
      {/* Top Ticker Marquee */}
      <div className="mb-24 border-t border-b border-neutral-900">
        <InfiniteTextSlider
          items={tickerItems}
          speed={50}
          direction="left"
          textClass="text-2xl sm:text-4xl font-mono uppercase tracking-wider text-neutral-700 hover:text-white transition-colors"
          separator={<span className="h-2 w-2 rounded-full bg-neutral-700" />}
        />
      </div>

      {/* --- SCHEDULE SECTION (Horizontal Timeline) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Timeline of Events
            </h2>
            <h3 className="text-4xl sm:text-5xl font-sentient font-bold tracking-tight">
              Event <i className="font-light text-neutral-400">Schedule</i>
            </h3>
          </div>

          {/* Day Toggle Switch */}
          <div className="mt-6 md:mt-0 flex items-center gap-2 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeDay === 1 
                  ? "bg-white text-black font-bold shadow-sm" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Day 01 (Apr 15)
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                activeDay === 2 
                  ? "bg-white text-black font-bold shadow-sm" 
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Day 02 (Apr 16)
            </button>
          </div>
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative overflow-x-auto pb-6 custom-scrollbar">
          <div className="flex gap-6 min-w-[1000px]">
            {scheduleData[activeDay].map((item, idx) => (
              <motion.div
                key={`${activeDay}-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative flex-1 flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900 transition-all duration-300 min-h-[240px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-neutral-800 text-xs font-mono text-neutral-300">
                      <Clock size={12} className="text-neutral-400" /> {item.time}
                    </span>
                    <span className="text-xs font-mono text-neutral-600">
                      // 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h4>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-500">
                  <MapPin size={12} className="text-neutral-400 shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTACT & REGISTRATION DETAILS SECTION --- */}
      <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-neutral-800 pb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Get In Touch
          </h2>
          <h3 className="text-4xl sm:text-5xl font-sentient font-bold tracking-tight">
            Contact & <i className="font-light text-neutral-400">Location</i>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Block: Direct Contact Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email Card with Copy Interaction */}
            <div 
              onClick={handleCopyEmail}
              className="group relative p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-neutral-800 text-neutral-300 mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-1">Official Email</h4>
                <p className="text-base font-bold text-white font-mono">nirvan@gehu.in</p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                <span>{copied ? "Copied to clipboard!" : "Click to copy"}</span>
                {copied ? <Check size={14} className="text-white" /> : <ArrowUpRight size={14} />}
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900 transition-all flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-neutral-800 text-neutral-300 mb-4 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <h4 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-1">Helpline Desk</h4>
                <p className="text-base font-bold text-white font-mono">+91 1256489632</p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                <span>Available 10 AM - 5 PM</span>
                <a href="tel:+911256489632" className="hover:text-white transition-colors">
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Block: Venue & Campus Details */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black border border-neutral-800 text-neutral-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Graphic Era Hill University</h4>
                  <span className="text-xs font-mono text-neutral-500">Haldwani Campus, Uttarakhand</span>
                </div>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                The campus features state-of-the-art computer labs, high-speed fiber internet infrastructure, auditoriums, and dedicated arenas designed to host competitive technical fests seamlessly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Calendar size={14} className="text-neutral-500" /> April 15–16, 2026
              </div>
              <a
                href="#register"
                className="px-6 py-2.5 bg-white text-black font-bold text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors"
              >
                Register For Fest
              </a>
            </div>
          </div>

        </div>
        <Registration></Registration>
      </div>

    </section>
  );
}