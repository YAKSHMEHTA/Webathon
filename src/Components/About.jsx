import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDownRight, Code2, Cpu, Zap } from "lucide-react";

/* ---------------------------------------------------------------------- */
/* Helper: Animated Text Reveal (Line by Line masking)                    */
/* ---------------------------------------------------------------------- */
const RevealText = ({ text, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split text into words for stagger effect
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <motion.p
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-2 mb-2 inline-block">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

/* ---------------------------------------------------------------------- */
/* Main About Component                                                   */
/* ---------------------------------------------------------------------- */
export default function About() {
  const containerRef = useRef(null);
  
  // Setup Scroll Parallax for the giant background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative min-h-screen w-full bg-black py-32 overflow-hidden selection:bg-white selection:text-black"
    >
      {/* 1. Giant Background Parallax Typography */}
      <motion.div 
        style={{ y: yBackground, opacity: opacityBackground }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <h2 className="text-[15vw] font-black leading-none tracking-tighter text-transparent" 
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
          NIRVAN
        </h2>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 2. Top Header (Minimalist) */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-8">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2">
            <ArrowDownRight size={16} />
            The Manifesto
          </h3>
          <span className="text-xs font-mono text-neutral-600 uppercase">
            EST. 2026 // GEHU
          </span>
        </div>

        {/* 3. The Core Statement (Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 pb-32">
          
          <div className="lg:col-span-4">
            <h4 className="text-2xl sm:text-3xl font-light text-white leading-tight">
              More than a festival. <br />
              <span className="font-bold">An ecosystem for builders.</span>
            </h4>
          </div>

          <div className="lg:col-span-8">
            {/* Using the Custom Word Reveal Helper */}
            <RevealText 
              text="NIRVAN '26 is Graphic Era Hill University's flagship technical convergence. We don't just host events; we engineer environments where raw ideas collide with relentless execution. For two days, the campus transforms into a high-octane sandbox for developers, designers, and tech enthusiasts to break things, build solutions, and define the future of technology."
              className="text-2xl sm:text-4xl lg:text-3xl font-sentient font-medium text-neutral-300 leading-[1.1] tracking-tight"
            />
          </div>
        </div>

        {/* 4. Highlights / Expectations (Awwwards Style Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-neutral-800">
          
          {[
            {
              title: "The Objective",
              icon: Code2,
              desc: "To bridge the gap between academic knowledge and industry-grade engineering through high-stakes problem solving.",
              metric: "24HR",
              metricLabel: "Build Cycle"
            },
            {
              title: "The Expectation",
              icon: Zap,
              desc: "Bring your highest level of craft. Expect sleepless nights, intense logic puzzles, and ruthless technical competition.",
              metric: "100%",
              metricLabel: "Commitment"
            },
            {
              title: "The Community",
              icon: Cpu,
              desc: "Network with top-tier talent, industry-leading sponsors, and visionary mentors who shape the modern web.",
              metric: "500+",
              metricLabel: "Innovators"
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative border-r border-b border-neutral-800 p-8 sm:p-12 hover:bg-white hover:text-black transition-colors duration-500 cursor-default flex flex-col justify-between aspect-square sm:aspect-auto sm:min-h-[400px]"
            >
              {/* Top half */}
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 group-hover:bg-black group-hover:border-black group-hover:text-white transition-colors duration-500">
                  <item.icon size={20} className="text-white" />
                </div>
                <h5 className="mb-4 text-xl font-bold uppercase tracking-wide text-white group-hover:text-black transition-colors duration-500">
                  {item.title}
                </h5>
                <p className="text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-700 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>

              {/* Bottom half (Metric) */}
              <div className="mt-8">
                <div className="text-4xl sm:text-5xl font-black tracking-tighter text-white group-hover:text-black transition-colors duration-500">
                  {item.metric}
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-500 transition-colors duration-500 mt-1">
                  {item.metricLabel}
                </div>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}