export default function Navbar() {
  return (
    <nav
      className="glass"
      style={{
        position: 'fixed', top: 18, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        padding: '9px 9px 9px 22px',
        borderRadius: 999,
        display: 'inline-flex', alignItems: 'center', gap: 28,
        fontSize: 14, fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ink)' }}>
        <span style={{
          width: 24, height: 24, borderRadius: '50%',
          background: 'linear-gradient(120deg, #0A84FF 0%, #BF5AF2 50%, #FF375F 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5), 0 4px 10px -2px rgba(10,132,255,0.4)',
          display: 'inline-block', flexShrink: 0,
        }} />
        <span>Paul Jison</span>
      </a>

      <div className="topnav-links" style={{ display: 'flex', gap: 6 }}>
        {[
          { label: 'About', href: '#about' },
          { label: 'Work', href: '#work' },
          { label: 'Contact', href: '#contact' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ padding: '7px 14px', borderRadius: 999, color: 'var(--ink-soft)', transition: 'color .25s, background .25s' }}
            onPointerEnter={e => {
              e.currentTarget.style.color = 'var(--ink)';
              e.currentTarget.style.background = 'rgba(26,92,255,0.18)';
            }}
            onPointerLeave={e => {
              e.currentTarget.style.color = 'var(--ink-soft)';
              e.currentTarget.style.background = '';
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 16px', borderRadius: 999,
          background: 'linear-gradient(135deg, #1A5CFF, #6D28D9)', color: '#fff', fontWeight: 500,
          transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
          boxShadow: '0 6px 18px -4px rgba(26,92,255,0.5)',
        }}
        onPointerEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
        onPointerLeave={e => { e.currentTarget.style.transform = ''; }}
      >
        <span className="pulse-green-anim" style={{ width: 6, height: 6, borderRadius: '50%', background: '#30D158', flexShrink: 0 }} />
        Remote&nbsp;•&nbsp;Now open to new opportunities
      </a>
    </nav>
  );
}
