import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Users, 
  Check, 
  Terminal, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from "lucide-react";

export default function Registration() {
  const [selectedEvent, setSelectedEvent] = useState("Hackathon");
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "Graphic Era Hill University, Haldwani",
    teamName: "",
    teamSize: "2 Members",
  });

  const eventsList = [
    { id: "hackathon", name: "Hackathon", limit: "1–4 Members" },
    { id: "ctf", name: "CTF (Capture The Flag)", limit: "1–2 Members" },
    { id: "treasure-hunt", name: "Treasure Hunt", limit: "4 Members" },
    { id: "esports", name: "E-Sports Arena", limit: "4–5 Members" },
    { id: "workshop", name: "Tech Workshop", limit: "Individual" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a mock registration ID for static backend confirmation
    const randomId = `NIRVAN-26-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegId(randomId);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      college: "Graphic Era Hill University, Haldwani",
      teamName: "",
      teamSize: "2 Members",
    });
  };

  return (
    <section id="register" className="relative min-h-screen bg-black text-white py-28 flex items-center justify-center">
      
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#17171715_1px,transparent_1px),linear-gradient(to_bottom,#17171715_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Web-a-thon 4.0 Portal
          </div>
          <h2 className="text-4xl sm:text-6xl font-sentient font-bold tracking-tight text-white mb-4">
            Secure Your <i className="font-light text-neutral-400">Spot</i>
          </h2>
          <p className="text-neutral-500 font-mono text-sm max-w-md mx-auto">
            Fill out the credentials below to register for NIRVAN '26 events at GEHU Haldwani campus.
          </p>
        </div>

        {/* Main Form Box */}
        <div className="rounded-3xl bg-neutral-950 border border-neutral-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                
                {/* 1. Event Selector Pills */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                    Select Event Arena *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {eventsList.map((ev) => (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => setSelectedEvent(ev.name)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          selectedEvent === ev.name
                            ? "bg-white text-black border-white font-bold"
                            : "bg-neutral-900/50 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-sans">{ev.name}</span>
                        <span className={`text-[10px] font-mono mt-2 ${selectedEvent === ev.name ? "text-neutral-600" : "text-neutral-600"}`}>
                          {ev.limit}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Personal & Team Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <User size={12} /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Alex Turner"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <Mail size={12} /> Student / Official Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@gehu.in"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <Phone size={12} /> WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* College Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <Building2 size={12} /> Institution / College *
                    </label>
                    <input
                      type="text"
                      name="college"
                      required
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Team Name (Conditional based on event) */}
                  {selectedEvent !== "Tech Workshop" && (
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                        <Terminal size={12} /> Team Name
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="e.g. NullPointers"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  )}

                  {/* Team Size */}
                  {selectedEvent !== "Tech Workshop" && (
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                        <Users size={12} /> Team Size
                      </label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="1 Member">1 Member (Solo)</option>
                        <option value="2 Members">2 Members</option>
                        <option value="3 Members">3 Members</option>
                        <option value="4 Members">4 Members</option>
                        <option value="5 Members">5 Members (E-Sports)</option>
                      </select>
                    </div>
                  )}

                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                    <ShieldCheck size={16} className="text-neutral-400" />
                    Static backend verification enabled. Instant pass generation.
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Complete Registration
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.form>
            ) : (
              /* Success / Ticket Confirmation Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 text-center space-y-6"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black mb-6 shadow-xl">
                  <Check size={32} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                    Registration Confirmed // NIRVAN '26
                  </span>
                  <h3 className="text-3xl font-bold text-white font-sentient">
                    You're Ready to Build
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    A confirmation pass has been noted for <span className="text-white font-semibold">{formData.fullName}</span> in the <span className="text-white font-semibold">{selectedEvent}</span> arena.
                  </p>
                </div>

                {/* Mock Digital Ticket Card */}
                <div className="mx-auto max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 p-6 text-left space-y-4 font-mono my-6">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                    <span className="text-xs text-neutral-500">PASS ID</span>
                    <span className="text-xs font-bold text-white">{regId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block mb-1">EVENT</span>
                      <span className="text-white font-sans font-bold">{selectedEvent}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block mb-1">VENUE</span>
                      <span className="text-white font-sans">GEHU Haldwani</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={14} /> Register Another Entry
                  </button>
                  <a
                    href="#events"
                    className="px-6 py-3 rounded-xl bg-white text-black font-bold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                  >
                    Back to Events
                  </a>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}