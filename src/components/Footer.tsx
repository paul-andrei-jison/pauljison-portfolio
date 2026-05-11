interface FooterProps {
  onOpenCard: () => void;
}

export default function Footer({ onOpenCard }: FooterProps) {
  return (
    <footer className="footer-glass" style={{ padding: '40px 0 120px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
          © 2026 Paul Jison. Built with patience and too much coffee.
        </span>

        <button
          onClick={onOpenCard}
          style={{ fontSize: 13, color: 'var(--muted)', opacity: 0.5, transition: 'opacity .3s', fontWeight: 500 }}
          onPointerEnter={e => (e.currentTarget.style.opacity = '1')}
          onPointerLeave={e => (e.currentTarget.style.opacity = '0.5')}
          aria-label="Open surprise card"
        >
          ♡
        </button>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
          <span className="pulse-green-anim" style={{ width: 6, height: 6, borderRadius: '50%', background: '#30D158', display: 'inline-block' }} />
          System operational · Manila, PH
        </span>
      </div>
    </footer>
  );
}
