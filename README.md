# NIRVAN '26 — Technical Fest Official Website
> **Web-a-thon 4.0 Submission** | Graphic Era Hill University (GEHU), Haldwani Campus  
> *Core Tagline:* "Where Ideas Become Innovation"

---

## 🚀 Live Preview & Deployment
* **Live Website URL:** [Insert Vercel / Netlify / GitHub Pages URL Here]
* **GitHub Repository:** [Insert Repository URL Here]

---

## 🛠️ Tech Stack & Architecture
Engineered for ultra-fast performance, high fluidity, and top-tier visual feedback using a modern React toolchain:
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (v4)
* **Animations:** Framer Motion & GSAP (GreenSock Animation Platform)
* **3D / WebGL Elements:** Cobe (Interactive 3D Tech Globe)
* **Icons:** Lucide React & Custom SVG Brand Icons
* **Smooth Scrolling:** Lenis (Global smooth scroll experience)

---

## ✨ Key Features & Components

1. **High-Impact Hero Section:**
   * Features an interactive, physics-driven 3D Earth globe (`cobe`).
   * Live 7-day synchronized countdown timer.
   * Minimalist typographic introduction and clear primary/secondary CTAs (`[Explore Events]` and `[Register Now]`).

2. **The Manifesto (About Section):**
   * Awwwards-inspired agency layout utilizing kinetic typography and word-by-word staggered line reveals.
   * Strict geometric grid breaking down the objective, expectations, and community metrics.

3. **Event Arena & Interactive Modals:**
   * Showcases core fest events: *Hackathon, Capture The Flag (CTF), Treasure Hunt, E-Sports, and Tech Workshops*.
   * Fully standardized detail modal overlay (locking background scroll) displaying exact Date/Time, Venue, Team Size, Eligibility, Fees, Prize Pools, and Rules.

4. **Timeline & Schedule:**
   * Horizontal, swipeable timeline breaking down Day 01 and Day 02 chronologically with venue tracking.

5. **Industry Sponsor Wall:**
   * Multi-speed, multi-direction infinite text marquee powered by GSAP.
   * Categorized strictly by tiers: **Title** (*TechCorp, Zeopto*), **Gold** (*DevLabs, CloudNova.xyz, lovable.Ai, HackNest*), and **Community** (*GitHub Community, GDG*).

6. **Archive Gallery:**
   * A responsive masonry grid showcasing previous editions with grayscale-to-color hover transitions.

7. **Registration Portal:**
   * Interactive event selector, dynamic team size options, and a static backend simulation that instantly issues a verifiable mock ticket pass ID.

---

## 🏆 Rubric Alignment (100 Points Total)

| Criteria | Weight | Implementation Strategy |
| :--- | :---: | :--- |
| **Implementation & Knowledge** | 25 Pts | Clean component modularity, strict state management, and robust error handling. |
| **Creativity & Originality** | 20 Pts | Stealth monochrome agency aesthetic, 3D globe integration, and GSAP marquees. |
| **UX & Navigation** | 15 Pts | Instant modal locks, smooth transitions, click-to-copy contact utilities, and intuitive layout flow. |
| **Responsiveness** | 15 Pts | Fluid CSS grids (`sm`, `md`, `lg`, `xl`) ensuring flawless scaling across mobile, tablet, and desktop viewports. |
| **Functionality** | 10 Pts | Live countdown timers, functional registration flow, and active ticket generation. |
| **Animations & Interactions** | 10 Pts | Framer Motion spring physics, GSAP smooth ticker loops, and hover-state inversions. |
| **Code Quality** | 5 Pts | Clean, self-documenting JavaScript, logical file separation, and zero external build warnings. |

---

## 📂 Project Structure

```text
root/
├── public/                # Static assets & images
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx      # Hero with 3D Globe & Countdown
│   │   ├── About.jsx            # Manifesto & Agency Grid
│   │   ├── EventArena.jsx       # Event cards & Modal System
│   │   ├── SponsorsAndGallery.jsx # GSAP Marquee Sponsors & Photo Archive
│   │   ├── ScheduleAndContact.jsx # Horizontal Timeline & Direct Contact
│   │   └── Registration.jsx     # Registration Form & Pass Generator
│   ├── App.jsx              # Root component assembling sections
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind & custom scrollbar styles
├── package.json
└── README.md
