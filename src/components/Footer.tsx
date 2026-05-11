interface FooterProps {
  onOpenCard: () => void;
}

export default function Footer({ onOpenCard }: FooterProps) {
  return (
    <footer style={{ padding: '60px 0 30px', borderTop: '1px solid var(--line)', background: 'var(--bg-0)' }}>
      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 60 }} className="footer-top">
          {/* Mark */}
          <div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 80,
              lineHeight: 0.9,
              color: 'var(--text-0)',
              letterSpacing: '-0.02em',
            }}
          >
            Paul
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>Jison.</em>
          </div>

          {/* Sitemap */}
          <div>
            <h5 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: 18 }}>
              Sitemap
            </h5>
            <a href="#about" className="footer-col-link" data-hover>About</a>
            <a href="#work" className="footer-col-link" data-hover>Work</a>
            <a href="#contact" className="footer-col-link" data-hover>Contact</a>
          </div>

          {/* Social */}
          <div>
            <h5 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: 18 }}>
              Social
            </h5>
            <a href="#" className="footer-col-link" data-hover>GitHub ↗</a>
            <a href="#" className="footer-col-link" data-hover>LinkedIn ↗</a>
            <a href="#" className="footer-col-link" data-hover>Twitter ↗</a>
            <a href="#" className="footer-col-link" data-hover>Read.cv ↗</a>
          </div>

          {/* Elsewhere */}
          <div>
            <h5 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: 18 }}>
              Elsewhere
            </h5>
            <a href="#" className="footer-col-link" data-hover>Writing</a>
            <a href="#" className="footer-col-link" data-hover>Robotics log</a>
            <a href="#" className="footer-col-link" data-hover>Language notes</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 30,
            borderTop: '1px solid var(--line)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--text-2)',
            letterSpacing: '0.05em',
          }}
          className="footer-bottom"
        >
          <span>© 2026 Paul Jison. Built with patience and too much coffee.</span>

          <button
            onClick={onOpenCard}
            data-hover
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.05em',
              color: 'var(--text-2)',
              opacity: 0.4,
              transition: 'opacity .3s',
            }}
            onPointerEnter={e => (e.currentTarget.style.opacity = '1')}
            onPointerLeave={e => (e.currentTarget.style.opacity = '0.4')}
            aria-label="Open surprise card"
          >
            ♡
          </button>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span
              className="pulse-anim"
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }}
            />
            System operational · Manila, PH
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr !important; }
          .footer-top > *:first-child { grid-column: span 2; font-size: 56px !important; }
          .footer-bottom { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>
    </footer>
  );
}
