import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Send,
  ArrowUpRight,
  Mail,
  Check,
  ArrowUp,
  Phone,
  MapPin,
  Copy,
  Sparkles,
  Globe,
  Terminal,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Custom Brand Icons                                                     */
/* ---------------------------------------------------------------------- */
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const eventLinks = [
  { label: "Hackathon", href: "#events" },
  { label: "CTF Challenge", href: "#events" },
  { label: "Treasure Hunt", href: "#events" },
  { label: "E-Sports Arena", href: "#events" },
  { label: "Tech Workshops", href: "#events" },
];

const navigationLinks = [
  { label: "About Fest", href: "#about" },
  { label: "Schedule & Timeline", href: "#schedule" },
  { label: "Keynote Speakers", href: "#speakers" },
  { label: "Sponsor Wall", href: "#sponsors" },
  { label: "Event Gallery", href: "#gallery" },
];

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "https://github.com" },
  { icon: Send, label: "Telegram", href: "#" }, 
  { icon: YoutubeIcon, label: "YouTube", href: "#" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ---------------------------------------------------------------------- */
/* 1. Micro-Interaction Link Component                                    */
/* ---------------------------------------------------------------------- */
function MicroLink({ children, href = "#" }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
      <ArrowUpRight
        size={13}
        className="opacity-0 -translate-x-1 translate-y-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white"
      />
    </a>
  );
}

/* ---------------------------------------------------------------------- */
/* 2. Magnetic Button Component                                          */
/* ---------------------------------------------------------------------- */
function MagneticButton({ children, onClick, type = "button", ariaLabel }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.3 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.4);
    y.set(relY * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black font-bold transition-colors hover:bg-zinc-200 cursor-pointer"
    >
      {children}
    </motion.button>
  );
}

/* ---------------------------------------------------------------------- */
/* 3. Click-to-Copy Micro-Interaction Field                              */
/* ---------------------------------------------------------------------- */
function CopyableContact({ icon: Icon, text, copyValue }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="group relative flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors w-full text-left py-1"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-600 group-hover:bg-zinc-800 group-hover:text-white transition-all">
        <Icon size={14} />
      </div>
      <span className="font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-white transition-colors">
        {text}
      </span>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-white">
            <Check size={12} /> Copied!
          </span>
        ) : (
          <Copy size={12} className="text-zinc-500 hover:text-white" />
        )}
      </div>
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* 4. Main Dark Footer Component                                         */
/* ---------------------------------------------------------------------- */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      className="relative bg-black text-zinc-100 border-t border-zinc-900 overflow-hidden"
    >
      {/* Subtle White Cursor-Follow Ambient Glow */}
      <motion.div
        className="pointer-events-none absolute z-0 h-96 w-96 rounded-full opacity-[0.03] blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,1) 0%, transparent 70%)",
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Newsletter / Announcement Subscription Band */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col gap-6 border-b border-zinc-900 pb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles size={12} /> Live Updates & Alerts
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Stay Synced with <span className="text-white">NIRVAN '26</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black font-bold"
                  >
                    <Check size={14} />
                  </motion.span>
                  <span>You're subscribed! Check inbox for fest announcements.</span>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 border-b border-zinc-800 pb-2 focus-within:border-white transition-colors"
                >
                  <Mail size={18} className="text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your student email..."
                    className="w-full bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
                  />
                  <MagneticButton type="submit" ariaLabel="Subscribe to updates">
                    <ArrowUpRight size={18} />
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand & Fest Overview */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-white">
              <span className="h-3 w-3 rounded-full bg-white" />
              NIRVAN <span className="text-white">'26</span>
            </div>
            
            <p className="text-xs font-semibold italic text-zinc-400">
              "Where Ideas Become Innovation"
            </p>

            <p className="text-sm leading-relaxed text-zinc-500 max-w-sm">
              Annual College Technical Fest organized by Graphic Era Hill University (GEHU), Haldwani Campus. Bringing together coders, creators, and innovators.
            </p>

            {/* Live Registration Status Pulse */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Registration Portal Active
            </div>

            {/* Interactive Social Media Icons */}
            <div className="flex gap-2.5 pt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, rotate: -4, borderColor: "#ffffff", color: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Events Arena */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Terminal size={12} /> Event Arena
            </h4>
            <ul className="mt-4 space-y-2.5">
              {eventLinks.map((item) => (
                <li key={item.label}>
                  <MicroLink href={item.href}>{item.label}</MicroLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Globe size={12} /> Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((item) => (
                <li key={item.label}>
                  <MicroLink href={item.href}>{item.label}</MicroLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Venue
            </h4>

            <div className="space-y-1.5 pt-1">
              <CopyableContact
                icon={Mail}
                text="nirvan@gehu.in"
                copyValue="nirvan@gehu.in"
              />
              <CopyableContact
                icon={Phone}
                text="+91 1256489632"
                copyValue="+911256489632"
              />
            </div>

            <div className="flex items-start gap-3 pt-2 text-zinc-400">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-white">
                <MapPin size={14} />
              </div>
              <div className="text-xs leading-relaxed">
                <span className="font-semibold text-white block">Graphic Era Hill University</span>
                Haldwani Campus, Uttarakhand
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col gap-4 border-t border-zinc-900 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} NIRVAN '26 Technical Fest.</span>
            <span className="hidden sm:inline">•</span>
            <span>Graphic Era Hill University, Haldwani</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Web-a-thon 4.0 Submission
            </span>

            <MagneticButton
              ariaLabel="Back to top"
              onClick={() => window?.scrollTo?.({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp size={16} />
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}