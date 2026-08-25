import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton } from "./components/ui/resizable-navbar";
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
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <BrowserRouter>
        <ReactLenis root>
          <Navbar>
            <NavBody>
              <NavbarLogo text="loo" />
              <h1>yaksh</h1>
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
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/detail/:eventName" element={<EventDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ReactLenis>
      </BrowserRouter>
    </ThemeProvider>
  );
}
