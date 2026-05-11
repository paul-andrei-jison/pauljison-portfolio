import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

function MagWrap({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement>(null);

  return (
    <div
      ref={wrapRef}
      style={{ display: 'inline-block', position: 'relative' }}
      onPointerMove={(e) => {
        if (!wrapRef.current || !innerRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
        innerRef.current.style.transform = `translate(${x}px,${y}px)`;
        innerRef.current.style.transition = 'transform .1s ease-out';
        const glow = (innerRef.current as HTMLElement).querySelector('.btn-glow') as HTMLElement | null;
        if (glow) {
          const gx = ((e.clientX - r.left) / r.width) * 100;
          const gy = ((e.clientY - r.top) / r.height) * 100;
          glow.style.setProperty('--gx', `${gx}%`);
          glow.style.setProperty('--gy', `${gy}%`);
        }
      }}
      onPointerLeave={() => {
        if (innerRef.current) {
          innerRef.current.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
          innerRef.current.style.transform = '';
        }
      }}
    >
      {/* Clone children with ref via wrapper */}
      <div
        ref={innerRef as React.RefObject<HTMLDivElement>}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
      style={{ transformOrigin: 'center top', willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight && containerRef.current) {
        const t = `translateY(${y * 0.18}px) scale(${1 - Math.min(0.08, y / 4000)})`;
        containerRef.current.style.transform = t;
        containerRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.7)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '140px 0 100px',
        position: 'relative',
      }}
    >
      <div className="container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, willChange: 'transform' }}>

        {/* Chip */}
        <Reveal>
          <div className="hero-chip">
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#30D158', display: 'inline-block', boxShadow: '0 0 6px #30D158' }} />
            Now open to new opportunities · Philippines / Remote
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.05}>
          <h1 style={{
            fontSize: 'clamp(48px, 7.5vw, 108px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
            fontWeight: 700,
            color: 'var(--ink)',
            textShadow: '0 2px 20px rgba(26,92,255,0.15)',
            maxWidth: '14ch',
          }}>
            <span style={{ display: 'block' }}>Hi, I'm Paul.</span>
            <span style={{ display: 'block', marginTop: 6 }}>
              <span className="hl-blue">Software Engineer</span>
              <br />
              &amp; <span className="hl-pink">Web Developer</span>.
            </span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.12}>
          <p style={{
            maxWidth: 580,
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            color: 'var(--ink-soft)',
            lineHeight: 1.55,
          }}>
            I design and build <span className="hl">scalable</span>, user-centric web apps with{' '}
            <span className="hl-blue">React</span>, <span className="hl-blue">TypeScript</span> and{' '}
            <span className="hl-blue">Node</span> — and I'm always learning new ways to{' '}
            <span className="hl-pink">grow</span>.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.18}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <MagWrap>
              <a href="#work" className="glass-btn dark">
                View my work
                <span className="ico">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="btn-glow" />
              </a>
            </MagWrap>
            <MagWrap>
              <a href="#contact" className="glass-btn">
                Get in touch
                <span className="btn-glow" />
              </a>
            </MagWrap>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.25}>
          <div style={{ marginTop: 20, display: 'flex', gap: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { v: '7+', k: 'Years building' },
              { v: '40+', k: 'Projects shipped' },
              { v: '12', k: 'Happy clients' },
            ].map(({ v, k }) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic', fontWeight: 600,
                  fontSize: 36,
                  background: 'var(--grad-1)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: 1,
                }}>
                  {v}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {k}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
