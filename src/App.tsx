import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MothersDay from './components/MothersDay';

export default function App() {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer onOpenCard={() => setShowCard(true)} />

      {showCard && <MothersDay onClose={() => setShowCard(false)} />}
    </div>
  );
}
