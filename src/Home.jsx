import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import FlotingNavbar from './Components/FlotingNavbar'
import './index.css' 
import Footer from './Footer'
import EventArena from './Components/EventArena'
import Hero from "./Components/Hero"
import About from './Components/About'
import { InteractiveGlobe } from './Components/InteractiveGlobe'
import Events from './Pages/Events'

function Home() {
  return (
    <div>
      <Hero></Hero>
      <About></About>
    </div>
  )
}

export default Home
