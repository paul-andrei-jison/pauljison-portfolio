import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '22px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(12px) saturate(120%)',
        background: scrolled
          ? 'rgba(11,11,15,0.8)'
          : 'linear-gradient(180deg, rgba(11,11,15,0.7), rgba(11,11,15,0))',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'border-color .4s ease, background .4s ease',
      }}
    >
      <a
        href="#top"
        data-hover
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 24,
          letterSpacing: '0.02em',
          color: 'var(--text-0)',
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            background: 'var(--teal)',
            borderRadius: '50%',
            display: 'inline-block',
            transform: 'translateY(-2px)',
          }}
        />
        Paul Jison
      </a>

      <div
        className="nav-links"
        style={{
          display: 'flex',
          gap: 36,
          fontSize: 13,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--text-1)',
        }}
      >
        <a href="#about" className="nav-link" data-hover>About</a>
        <a href="#work" className="nav-link" data-hover>Work</a>
        <a href="#contact" className="nav-link" data-hover>Contact</a>
      </div>

      <a
        href="#contact"
        className="nav-cta"
        data-hover
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '10px 18px',
          border: '1px solid var(--line-strong)',
          borderRadius: 999,
          color: 'var(--text-0)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          className="pulse-anim"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--teal)',
            flexShrink: 0,
          }}
        />
        Available for hire
      </a>
    </nav>
  );
}
