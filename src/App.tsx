import { useState } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProjectsGallery from './components/ProjectsGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dock from './components/Dock';
import MothersDay from './components/MothersDay';

export default function App() {
  const [showCard, setShowCard] = useState(false);

  return (
    <>
      <div className="aurora">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>
      <div className="aurora-tint" />
      <Cursor />
      <div className="grain" />

      <Navbar />
      <div className="layer">
        <main>
          <Hero />
          <About />
          <ProjectsGallery />
          <Contact />
        </main>
        <Footer onOpenCard={() => setShowCard(true)} />
      </div>
      <Dock />
      {showCard && <MothersDay onClose={() => setShowCard(false)} />}
    </>
  );
}
