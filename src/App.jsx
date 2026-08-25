import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlotingNavbar from "./Components/FlotingNavbar";
import "./index.css";
import Footer from "./Footer";

import EventArena from "./Components/EventArena";
import Hero from "./Components/Hero";
import About from "./Components/About";
import { InteractiveGlobe } from "./Components/InteractiveGlobe";
import Events from "./Pages/Events";
import Home from "./Home";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <ReactLenis root>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  );
}
