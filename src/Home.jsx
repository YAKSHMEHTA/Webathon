import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import './index.css' 
import Footer from './Footer'
import EventArena from './Components/EventArena'

import About from './Components/About'
import { ParallaxHeroImagesDemo } from './Components/ParallaxHeroImagesDemo'
import { InteractiveGlobe } from './Components/InteractiveGlobe'
import Events from './Pages/Events'
import Hero from './Components/Hero'
import SponsorsAndGallery from './Components/SponsorsAndGallery'
import Registration from './Pages/Registration'

function Home() {


  return (
    <div>
    <Hero/>
      <ParallaxHeroImagesDemo></ParallaxHeroImagesDemo>
    <SponsorsAndGallery></SponsorsAndGallery>
      <About></About>
      <Registration></Registration>
    </div>
  )
}

export default Home
