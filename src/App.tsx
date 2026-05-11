import { useState } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MothersDay from './components/MothersDay';

export default function App() {
  const [showCard, setShowCard] = useState(false);

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Portfolio />
        <Contact />
      </main>
      <Footer onOpenCard={() => setShowCard(true)} />
      {showCard && <MothersDay onClose={() => setShowCard(false)} />}
    </>
  );
}
