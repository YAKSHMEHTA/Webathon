import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Clock,
  MapPin,
  Bookmark,
  ArrowRight,
  User,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  EventInfoCard - reusable, self-contained event/blog card.         */
/*  GSAP handles: title text-reveal on mount, cursor-tilt parallax    */
/*  on the media, and scroll-triggered entrance.                      */
/*  Framer Motion handles: hover lift, bookmark micro-interaction,    */
/*  tag stagger, and the expand/collapse read-more transition.        */
/* ------------------------------------------------------------------ */
export default function EventInfoCard({ event, defaultExpanded = false }) {
  const {
    image,
    category = "Event",
    title,
    excerpt,
    content,
    date,
    time,
    venue,
    author,
    tags = [],
  } = event;

  const cardRef = useRef(null);
  const mediaRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);

  const [expanded, setExpanded] = useState(defaultExpanded);
  const [saved, setSaved] = useState(false);

  /* ---- GSAP: entrance + title reveal (runs once on mount) ---- */
  useLayoutEffect(() => {
    const el = cardRef.current;
    const ctx = gsap.context(() => {
      const words = titleRef.current.querySelectorAll("span.word");
      gsap.set(el, { opacity: 0, y: 40 });
      gsap.set(words, { opacity: 0, y: "0.6em" });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onStart: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.1,
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* ---- GSAP: cursor-tilt parallax on the media block ---- */
  useEffect(() => {
    const mediaEl = mediaRef.current;
    const glowEl = glowRef.current;
    if (!mediaEl) return;

    const xTo = gsap.quickTo(mediaEl, "rotateY", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(mediaEl, "rotateX", { duration: 0.5, ease: "power3.out" });
    const glowX = gsap.quickTo(glowEl, "x", { duration: 0.4, ease: "power3.out" });
    const glowY = gsap.quickTo(glowEl, "y", { duration: 0.4, ease: "power3.out" });

    const handleMove = (e) => {
      const rect = mediaEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 14);
      yTo(-relY * 14);
      glowX(e.clientX - rect.left);
      glowY(e.clientY - rect.top);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    mediaEl.addEventListener("mousemove", handleMove);
    mediaEl.addEventListener("mouseleave", handleLeave);
    return () => {
      mediaEl.removeEventListener("mousemove", handleMove);
      mediaEl.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111114] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      {/* ---- media / tilt zone ---- */}
      <div
        ref={mediaRef}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
        className="relative h-52 w-full overflow-hidden"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
          style={{ background: "radial-gradient(circle, #cdfb4a 0%, transparent 70%)" }}
        />
        {image ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full scale-110 object-cover"
            style={{ transform: "translateZ(0)" }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b15] via-[#141511] to-[#0a0a0c]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />

        <span className="absolute left-4 top-4 z-20 rounded-full border border-[#cdfb4a]/30 bg-[#cdfb4a]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#cdfb4a]">
          {category}
        </span>

        <motion.button
          onClick={() => setSaved((s) => !s)}
          whileTap={{ scale: 0.8 }}
          aria-label="Save event"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur"
        >
          <motion.span
            animate={{ scale: saved ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Bookmark
              size={16}
              className={saved ? "fill-[#cdfb4a] text-[#cdfb4a]" : "text-white/70"}
            />
          </motion.span>
        </motion.button>
      </div>

      {/* ---- body ---- */}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {date}
            </span>
          )}
          {time && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {time}
            </span>
          )}
          {venue && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> {venue}
            </span>
          )}
        </div>

        <h3 ref={titleRef} className="mt-3 text-xl font-bold leading-snug text-white">
          {title.split(" ").map((w, i) => (
            <span key={i} className="word mr-[0.3em] inline-block">
              {w}
            </span>
          ))}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{excerpt}</p>

        <AnimatePresence initial={false}>
          {expanded && content && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{content}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {tags.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  show: { opacity: 1, y: 0 },
                }}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-neutral-400"
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          {author && (
            <span className="flex items-center gap-2 text-xs text-neutral-500">
              <User size={13} />
              {author}
            </span>
          )}

          {content && (
            <motion.button
              onClick={() => setExpanded((e) => !e)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-sm font-medium text-[#cdfb4a]"
            >
              {expanded ? "Show less" : "Read more"}
              <motion.span
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  EventInfoGrid - demo wrapper showing the card used as a reusable  */
/*  unit inside a responsive grid, with sample data.                  */
/* ------------------------------------------------------------------ */
export const SAMPLE_EVENTS = [
  {
    id: 1,
    category: "Hackathon",
    title: "Hackathon: Build the Future",
    excerpt: "24 hours of rapid prototyping — teams build, ship, and demo.",
    content:
      "Bring your laptop and your ideas. Mentors will be available across tracks including AI, web, and climate tech. Prizes for best impact and technical achievement.",
    date: "Sep 12, 2026",
    time: "10:00 AM",
    venue: "Innovation Hub",
    author: "Nirvana Team",
    tags: ["hackathon", "team", "build"],
  },
  {
    id: 2,
    category: "Treasure Hunt",
    title: "Treasure Hunt: Campus Quest",
    excerpt: "Solve clues, race the clock, and find hidden prizes across campus.",
    content:
      "Form a small squad and follow cryptic clues across landmarks. Winners get gift vouchers and exclusive swag. Suitable for all experience levels.",
    date: "Sep 13, 2026",
    time: "3:00 PM",
    venue: "Campus Grounds",
    author: "Events Desk",
    tags: ["treasurehunt", "team", "outdoor"],
  },
  {
    id: 3,
    category: "Free Fire",
    title: "Free Fire Tournament",
    excerpt: "Solo and squad matches with cash prizes for top teams.",
    content:
      "Register your squad for elimination-style matches. Live casting and leaderboards. Equipment provided for on-site players.",
    date: "Sep 14, 2026",
    time: "6:00 PM",
    venue: "Esports Arena",
    author: "Gaming Club",
    tags: ["freefire", "esports", "tournament"],
  },
  {
    id: 4,
    category: "CTF",
    title: "CTF: Capture The Flag — Cyber Challenge",
    excerpt: "Test your security skills across real-world inspired challenges.",
    content:
      "Jeopardy-style CTF with challenges in cryptography, web, and reverse engineering. Prizes for top solvers and recruitment opportunities with sponsors.",
    date: "Sep 15, 2026",
    time: "9:00 AM",
    venue: "Computer Lab",
    author: "Security Team",
    tags: ["ctf", "security", "cyber"],
  },
  {
    id: 5,
    category: "Workshop",
    title: "Workshop: Intro to ML",
    excerpt: "Hands-on workshop covering the basics of machine learning.",
    content:
      "A practical introduction to ML workflows, model training, and deployment. Bring your laptop; we'll provide datasets and starter notebooks.",
    date: "Sep 16, 2026",
    time: "11:00 AM",
    venue: "Workshop Room A",
    author: "Education Team",
    tags: ["workshop", "ml", "hands-on"],
  },
];

export function EventInfoGrid({ events = SAMPLE_EVENTS }) {
  return (
    <section className="min-h-screen bg-[#0a0a0c] px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#cdfb4a]">
            From the blog
          </span>
          <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
            Event Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventInfoCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}