import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Sparkle, Hexagon, Circle } from "lucide-react";

/* ------------------------------------------------------------------ */
/* 1. InfiniteTextSlider - Adapted for Stealth/Monochrome Theme       */
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
        <TextItem key={`${keyPrefix}-${i}`} textClass={textClass} separator={separator}>
          {text}
        </TextItem>
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

function TextItem({ children, textClass, separator }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="flex shrink-0 items-center gap-12 cursor-default"
    >
      <span className={`whitespace-nowrap ${textClass}`}>
        {children}
      </span>
      {separator}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Main Sponsors & Gallery Section                                 */
/* ------------------------------------------------------------------ */
export default function SponsorsAndGallery() {
  
  // Repeating the arrays slightly so the marquee fills the screen before duplicating
  const titleSponsors = ["TechCorp", "Zeopto", "TechCorp", "Zeopto", "TechCorp", "Zeopto"];
  const goldSponsors = ["DevLabs", "CloudNova.xyz", "lovable.Ai", "HackNest", "DevLabs", "CloudNova.xyz"];
  const communitySponsors = ["GitHub Community", "GDG", "GitHub Community", "GDG", "GitHub Community", "GDG"];

  // Placeholder images for Gallery (Use real URLs in production)
  const galleryImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="sponsors" className="relative min-h-screen bg-black text-white pt-24 pb-32">
      
      {/* --- SPONSORS SECTION --- */}
      <div className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Industry Backing
          </h2>
          <h3 className="text-4xl sm:text-5xl font-sentient font-bold tracking-tight">
            Our <i className="font-light text-neutral-400">Partners</i>
          </h3>
        </div>

        {/* Marquee 1: Title Sponsors */}
        <div className="flex flex-col items-center justify-center gap-1 border-t border-b border-neutral-900 py-4">
          <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Title Sponsors</span>
          <InfiniteTextSlider
            items={titleSponsors}
            speed={60}
            direction="left"
            textClass="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-neutral-800 transition-colors hover:text-white"
            separator={<Hexagon size={24} className="text-neutral-800" />}
          />
        </div>

        {/* Marquee 2: Gold Sponsors */}
        <div className="flex flex-col items-center justify-center gap-1 border-b border-neutral-900 py-4 bg-neutral-950/30">
          <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Gold Sponsors</span>
          <InfiniteTextSlider
            items={goldSponsors}
            speed={45}
            direction="right"
            textClass="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-neutral-700 transition-colors hover:text-neutral-300"
            separator={<Sparkle size={16} className="text-neutral-700" />}
          />
        </div>

        {/* Marquee 3: Community Partners */}
        <div className="flex flex-col items-center justify-center gap-1 border-b border-neutral-900 py-4">
          <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Community Partners</span>
          <InfiniteTextSlider
            items={communitySponsors}
            speed={35}
            direction="left"
            textClass="text-xl sm:text-3xl font-medium tracking-tight text-neutral-500 transition-colors hover:text-neutral-400"
            separator={<Circle size={10} className="text-neutral-800" />}
          />
        </div>
      </div>

      {/* --- GALLERY SECTION --- */}
      <div id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
              Legacy
            </h2>
            <h3 className="text-4xl sm:text-5xl font-sentient font-bold tracking-tight">
              Past <i className="font-light text-neutral-400">Editions</i>
            </h3>
          </div>
          <p className="text-neutral-500 text-sm font-mono mt-4 md:mt-0 max-w-xs md:text-right">
            Visuals from previous Web-a-thon events at GEHU Campus.
          </p>
        </div>

        {/* Gallery Grid (6 images minimum as per rubric) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900"
            >
              {/* Image with grayscale effect by default, full color on hover */}
              <img 
                src={src} 
                alt={`Web-a-thon past edition ${idx + 1}`} 
                className="h-full w-full object-cover grayscale opacity-60 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end p-6">
                <span className="text-white font-mono text-xs uppercase tracking-widest">
                  Archive // 2025
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}