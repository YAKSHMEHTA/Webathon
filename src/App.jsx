import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./components/ui/resizable-navbar";
import "./index.css";
import Footer from "./Footer";

import EventArena from "./Components/EventArena";
import Hero from "./Components/Hero";
import About from "./Components/About";
import { InteractiveGlobe } from "./Components/InteractiveGlobe";
import Events from "./Pages/Events";
import EventDetail from "./Pages/EventDetail";
import Home from "./Home";
import Contact from "./Pages/Contact";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
    { name: "About", link: "/#about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <BrowserRouter>
        <ReactLenis root>
          <Navbar>
            <NavBody>
              <NavbarLogo text="loo" />

              <NavItems
                items={[
                  { name: "Home", link: "/" },
                  { name: "Events", link: "/events" },
                  { name: "About", link: "/#about" },
                  { name: "Contact", link: "/contact" },
                ]}
              />
              <NavbarButton href="/login">Login</NavbarButton>
            </NavBody>

            {/* mobile toggle fixed top-right */}
            <div className="lg:hidden fixed right-4 top-4 z-50">
              <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((s) => !s)} />
            </div>

            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
              </MobileNavHeader>
              <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
                <div className="w-full flex flex-col gap-3">
                  {navItems.map((it) => (
                    <a key={it.link} href={it.link} onClick={() => setMobileOpen(false)} className="block px-4 py-2 rounded-lg text-lg text-neutral-800">{it.name}</a>
                  ))}
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/detail/:eventName" element={<EventDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ReactLenis>
        <FooterConditional />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function FooterConditional() {
  const { pathname } = useLocation();
  // Do not render footer on the /events page
  if (pathname === "/events") return null;
  return <Footer />;
}
