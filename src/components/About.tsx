import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

function Reveal({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="container">

        {/* Section heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto', textAlign: 'center', alignItems: 'center', padding: '120px 0 60px' }}>
          <Reveal>
            <span className="sec-eyebrow"><span className="edot" />About me</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="sec-title">
              A few <span className="hl">things</span> about how I work — and what I'm building today.
            </h2>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="bento">

          {/* Bio — 4 col × 2 row */}
          <Reveal style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
            <div className="glass tile" style={{ padding: 36, height: '100%' }}>
              <span className="tile-label"><span className="dot" />Bio</span>
              <h3 style={{
                fontSize: 'clamp(20px, 2.3vw, 26px)',
                fontWeight: 500,
                lineHeight: 1.35,
                color: 'var(--ink)',
                marginTop: 18,
                letterSpacing: '-0.02em',
                position: 'relative', zIndex: 2,
              }}>
                A passionate web developer dedicated to building{' '}
                <span className="hl-blue">scalable</span>,{' '}
                <span className="hl">user-centric</span> applications. Seven years of shipping React +
                TypeScript front-ends and Node services across fintech, ed-tech and climate-tech — always
                treating every new domain as a language worth learning{' '}
                <span className="hl-pink">fluently</span>.
              </h3>
              <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 14, color: 'var(--muted)', fontSize: 13, position: 'relative', zIndex: 2 }}>
                <span style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(10,132,255,0.08)', color: '#0A84FF', fontWeight: 600, fontSize: 12 }}>
                  Currently · Senior
                </span>
                <span>Manila, PH · UTC+8</span>
              </div>
            </div>
          </Reveal>

          {/* Frontend */}
          <Reveal delay={0.05} style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
            <div className="glass tile" style={{ height: '100%' }}>
              <span className="tile-label"><span className="dot" />Frontend</span>
              <div className="pill-row">
                {[
                  { label: 'React', cls: 'blue' },
                  { label: 'TypeScript', cls: 'blue' },
                  { label: 'JavaScript', cls: '' },
                  { label: 'Tailwind', cls: '' },
                ].map(({ label, cls }) => (
                  <span key={label} className="glass-pill">
                    <span className={`glass-icon ${cls}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3" /></svg>
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Backend */}
          <Reveal delay={0.1} style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
            <div className="glass tile" style={{ height: '100%' }}>
              <span className="tile-label"><span className="dot" />Backend</span>
              <div className="pill-row">
                {[
                  { label: 'Node.js', cls: 'green' },
                  { label: 'Express', cls: '' },
                  { label: 'Postgres', cls: 'blue' },
                  { label: 'REST APIs', cls: 'purple' },
                ].map(({ label, cls }) => (
                  <span key={label} className="glass-pill">
                    <span className={`glass-icon ${cls}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3" /></svg>
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Architecture */}
          <Reveal delay={0.15} style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
            <div className="glass tile" style={{ height: '100%' }}>
              <span className="tile-label"><span className="dot" />Architecture</span>
              <div className="pill-row">
                {[
                  { label: 'Redux', cls: 'purple' },
                  { label: 'tRPC', cls: 'coral' },
                  { label: 'REST', cls: 'blue' },
                  { label: 'XState', cls: 'green' },
                ].map(({ label, cls }) => (
                  <span key={label} className="glass-pill">
                    <span className={`glass-icon ${cls}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="3" /></svg>
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Feature stat — dark */}
          <Reveal delay={0.2} style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
            <div className="glass tile" style={{ height: '100%', background: 'rgba(29,29,31,0.92)', borderColor: 'rgba(255,255,255,0.12)' }}>
              <span className="tile-label" style={{ color: 'rgba(255,255,255,0.6)' }}><span className="dot" />Crafted</span>
              <h4 style={{
                marginTop: 14,
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 44, fontWeight: 700,
                lineHeight: 1,
                background: 'var(--grad-1)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent',
              }}>+218%</h4>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                Avg. engagement my dashboards delivered for client teams.
              </p>
            </div>
          </Reveal>

          {/* Currently */}
          <Reveal delay={0.25} style={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
            <div className="glass tile" style={{ height: '100%' }}>
              <span className="tile-label"><span className="dot" />Currently</span>
              <h4 style={{ fontSize: 18, fontWeight: 600, marginTop: 14, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.35 }}>
                Shipping <span className="hl">DoomSchooling</span> &amp; the Court Booking platform.
              </h4>
              <div style={{ marginTop: 16, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '68%', background: 'var(--grad-1)', borderRadius: 3 }} />
              </div>
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
                <span>Phase: Beta</span>
                <span>68% · ETA July</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .bento .span4 { grid-column: span 2 !important; }
          .bento .span2 { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
