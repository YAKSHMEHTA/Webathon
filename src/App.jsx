import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import FlotingNavbar from './Components/FlotingNavbar'
import './index.css' 
import Footer from './Footer'
import Hero from "./Components/Hero"
import { InteractiveGlobe } from './Components/InteractiveGlobe'

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <ReactLenis root>
        
        {/* app content */}
        <FlotingNavbar></FlotingNavbar>
        <Hero></Hero>
        <InteractiveGlobe></InteractiveGlobe>
        <main className="min-h-[200vh] p-8">
          <h1 className="text-4xl font-bold">Hello Vite!</h1>
          <p className="mt-4">Scroll down to test the smooth scrolling.</p>
        </main>
        <Footer/>
      </ReactLenis>
    </ThemeProvider>
  )
}