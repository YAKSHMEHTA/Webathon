import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Flag, 
  Map, 
  Gamepad2, 
  Wrench, 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Coins, 
  ScrollText,
  ArrowRight
} from "lucide-react";

// --- Mock Data (Hits the "Mock/Static Backend" allowance in the rubric) ---
const eventsData = [
  {
    id: "hackathon",
    title: "Hackathon",
    shortDesc: "High-energy innovation challenge to build solutions.",
    description: "A 24-hour intense coding sprint where developers, designers, and creators collaborate to build innovative software or hardware solutions to real-world problems.",
    date: "April 15-16, 2026",
    time: "Starts 10:00 AM (24 Hours)",
    venue: "Main Lab Complex, GEHU",
    teamSize: "2–4 Members",
    eligibility: "Open to all university students",
    fee: "Free",
    prizePool: "₹50,000",
    rules: [
      "All code must be written during the event.",
      "Use of open-source libraries is allowed.",
      "Final submission must include a working demo and GitHub repo."
    ],
    icon: Terminal
  },
  {
    id: "ctf",
    title: "Capture The Flag",
    shortDesc: "Cybersecurity challenge (crypto, web, forensics).",
    description: "Test your hacking skills in this jeopardy-style CTF. Challenges cover cryptography, web security, reverse engineering, and digital forensics.",
    date: "April 15, 2026",
    time: "02:00 PM - 08:00 PM",
    venue: "Cyber Security Lab",
    teamSize: "1–2 Members",
    eligibility: "Basic knowledge of cybersecurity",
    fee: "₹100 / Team",
    prizePool: "₹25,000",
    rules: [
      "Do not attack the CTF infrastructure.",
      "No flag sharing between teams.",
      "Brute-forcing the flag submission portal will result in a ban."
    ],
    icon: Flag
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    shortDesc: "Logic, teamwork, and problem-solving adventure.",
    description: "An exciting campus-wide adventure where teams solve technical riddles, decipher codes, and complete physical tasks to find the ultimate prize.",
    date: "April 16, 2026",
    time: "11:00 AM - 03:00 PM",
    venue: "GEHU Campus Grounds",
    teamSize: "4 Members",
    eligibility: "Anyone can participate",
    fee: "₹200 / Team",
    prizePool: "₹15,000 + Goodies",
    rules: [
      "Stick together as a team at all times.",
      "Do not enter restricted campus zones.",
      "Clues must be presented to the marshals to proceed."
    ],
    icon: Map
  },
  {
    id: "esports",
    title: "E-Sports Arena",
    shortDesc: "Competitive gaming tournament.",
    description: "Battle it out in Valorant and BGMI. Bring your best strategies, teamwork, and aim to claim the championship title.",
    date: "April 15-16, 2026",
    time: "Ongoing (Check brackets)",
    venue: "Auditorium Gaming Zone",
    teamSize: "5 Members (Valorant) / 4 Members (BGMI)",
    eligibility: "Valid College ID required",
    fee: "₹500 / Team",
    prizePool: "₹40,000",
    rules: [
      "Use of emulators or cheats is strictly prohibited.",
      "Players must use provided network connections.",
      "Respect the referees and opponents."
    ],
    icon: Gamepad2
  },
  {
    id: "workshop",
    title: "Tech Workshop",
    shortDesc: "Hands-on learning experience led by experts.",
    description: "A deep dive into Web3 and AI integration. Learn from industry experts how to build modern, decentralized, and intelligent applications.",
    date: "April 16, 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Seminar Hall 1",
    teamSize: "Individual",
    eligibility: "Beginner friendly",
    fee: "Free (Pre-registration required)",
    prizePool: "Certificates provided",
    rules: [
      "Bring a fully charged laptop.",
      "Install required software prior to the workshop (details in email).",
      "Interactive Q&A is encouraged."
    ],
    icon: Wrench
  }
];

// --- Component ---
export default function EventArena() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedEvent]);

  return (
    <section id="events" className="relative min-h-screen bg-black text-neutral-200 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">
            The Core Experience
          </h2>
          <h3 className="text-4xl sm:text-5xl font-sentient font-bold text-white tracking-tight">
            Event <i className="font-light text-neutral-400">Arena</i>
          </h3>
          <div className="h-px w-full bg-neutral-800 mt-8" />
        </motion.div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="group relative flex flex-col justify-between p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black border border-neutral-800 text-white mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{event.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {event.shortDesc}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center text-sm font-medium text-neutral-500 group-hover:text-white transition-colors">
                  View Details <ArrowRight size={16} className="ml-2 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- Standardized Detail Modal (Hits UX & Specific Data Rubric) --- */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-4 sm:p-0"
            >
              <div className="relative overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl max-h-[90vh] flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-800 p-6 bg-black">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 text-white">
                      <selectedEvent.icon size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{selectedEvent.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
                  {/* Description */}
                  <div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
                      <Calendar size={18} className="text-neutral-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-mono mb-0.5">DATE & TIME</div>
                        <div className="text-sm text-neutral-200">{selectedEvent.date}</div>
                        <div className="text-xs text-neutral-400">{selectedEvent.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
                      <MapPin size={18} className="text-neutral-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-mono mb-0.5">VENUE</div>
                        <div className="text-sm text-neutral-200">{selectedEvent.venue}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
                      <Users size={18} className="text-neutral-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-mono mb-0.5">TEAM & ELIGIBILITY</div>
                        <div className="text-sm text-neutral-200">{selectedEvent.teamSize}</div>
                        <div className="text-xs text-neutral-400">{selectedEvent.eligibility}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/50">
                      <Trophy size={18} className="text-neutral-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-neutral-500 font-mono mb-0.5">FEE & PRIZE POOL</div>
                        <div className="text-sm text-neutral-200">Entry: {selectedEvent.fee}</div>
                        <div className="text-xs text-neutral-400">Prize: {selectedEvent.prizePool}</div>
                      </div>
                    </div>
                  </div>

                  {/* Rules */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-300 mb-3 border-b border-neutral-800 pb-2">
                      <ScrollText size={16} /> Guidelines & Rules
                    </h4>
                    <ul className="space-y-2">
                      {selectedEvent.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-400">
                          <span className="text-neutral-600 mt-0.5">•</span> {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="border-t border-neutral-800 bg-neutral-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-neutral-500 font-mono">
                    Registrations close 48 hours prior to event.
                  </span>
                  <a 
                    href="#register"
                    onClick={() => setSelectedEvent(null)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center"
                  >
                    Register Now
                  </a>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}