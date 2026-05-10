import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = ['Services', 'Portfolio', 'Contact'] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm tracking-tighter select-none">
            PJ
          </div>
          <span className="text-white font-semibold tracking-tight text-sm">JisonTechSolutions</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-400 hover:text-white text-sm tracking-wide transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
        >
          Let's Talk <ArrowRight size={14} />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-400 hover:text-white text-sm tracking-wide transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium tracking-wide transition-all duration-300 active:scale-95"
            onClick={() => setOpen(false)}
          >
            Let's Talk <ArrowRight size={14} />
          </a>
        </div>
      )}
    </nav>
  );
}
