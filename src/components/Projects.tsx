import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MagWrap({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
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
        const glow = innerRef.current.querySelector('.btn-glow') as HTMLElement | null;
        if (glow) {
          glow.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
          glow.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`);
        }
      }}
      onPointerLeave={() => {
        if (innerRef.current) {
          innerRef.current.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
          innerRef.current.style.transform = '';
        }
      }}
    >
      <div ref={innerRef} style={{ display: 'inline-block' }}>{children}</div>
    </div>
  );
}

function TiltVisual({ children }: { children: ReactNode }) {
  const elRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ rx: 0, ry: 0, trx: 0, try_: 0, tz: 0, tzT: 0, raf: 0 });

  useEffect(() => {
    const el = elRef.current;
    const parent = parentRef.current;
    if (!el || !parent) return;
    const s = stateRef.current;

    function step() {
      s.rx += (s.trx - s.rx) * 0.12;
      s.ry += (s.try_ - s.ry) * 0.12;
      s.tz += (s.tzT - s.tz) * 0.12;
      el!.style.transform = `perspective(1400px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) translateZ(${s.tz}px)`;
      if (Math.abs(s.trx - s.rx) > 0.02 || Math.abs(s.try_ - s.ry) > 0.02 || Math.abs(s.tzT - s.tz) > 0.1) {
        s.raf = requestAnimationFrame(step);
      } else { s.raf = 0; }
    }

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      s.try_ = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 9;
      s.trx = -((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 7;
      s.tzT = 20;
      if (!s.raf) s.raf = requestAnimationFrame(step);
    };
    const onLeave = () => {
      s.trx = 0; s.try_ = 0; s.tzT = 0;
      if (!s.raf) s.raf = requestAnimationFrame(step);
    };

    parent.addEventListener('pointermove', onMove);
    parent.addEventListener('pointerleave', onLeave);
    return () => {
      parent.removeEventListener('pointermove', onMove);
      parent.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <div ref={parentRef} className="project-visual">
      <div ref={elRef} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

/* ---- iPhone mockup (DoomSchooling) ---- */
function IPhoneMockup() {
  return (
    <div className="iphone">
      <div className="iphone-screen" style={{ background: 'linear-gradient(180deg, #0D1535 0%, #0A0E22 100%)' }}>
        {/* Aurora */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(26,92,255,0.5) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(109,40,217,0.45) 0%, transparent 45%), radial-gradient(circle at 50% 80%, rgba(6,182,212,0.35) 0%, transparent 45%)',
        }} />
        {/* Status bar */}
        <div style={{ position: 'relative', height: 52, padding: '16px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 600, color: '#E8EEFF' }}>
          <span>9:41</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
              <rect x="0" y="6" width="2" height="4" rx="0.5" /><rect x="3" y="4" width="2" height="6" rx="0.5" />
              <rect x="6" y="2" width="2" height="8" rx="0.5" /><rect x="9" y="0" width="2" height="10" rx="0.5" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="14" height="7" rx="1" fill="currentColor" />
              <rect x="20" y="3.5" width="1.3" height="4" rx="0.4" fill="currentColor" />
            </svg>
          </span>
        </div>
        {/* Content */}
        <div style={{ position: 'relative', padding: '14px 14px 18px', height: 'calc(100% - 52px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ padding: '0 6px 4px' }}>
            <div style={{ fontSize: 12, color: 'rgba(139,156,200,0.8)', fontWeight: 500 }}>Good morning,</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#E8EEFF', letterSpacing: '-0.025em' }}>Maya 👋</div>
          </div>
          <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(15,25,60,0.8)', backdropFilter: 'blur(18px)', border: '1px solid rgba(80,130,210,0.2)', fontSize: 13, color: 'rgba(139,156,200,0.7)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 8.5L11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            <span>Search topics, subjects…</span>
          </div>
          {/* Feed card */}
          <div style={{ flex: 1, borderRadius: 22, background: 'rgba(12,22,55,0.75)', backdropFilter: 'blur(24px) saturate(180%)', border: '1px solid rgba(80,130,210,0.2)', boxShadow: '0 12px 30px -12px rgba(0,0,0,0.4)', padding: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            <div style={{ flex: 1, borderRadius: 16, background: 'radial-gradient(circle at 30% 30%, rgba(10,132,255,0.7), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,55,95,0.6), transparent 60%), linear-gradient(135deg, #1c1c1f, #2a2a30)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '60%', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2, width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px -6px rgba(0,0,0,0.4)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#000"><path d="M5 3l8 5-8 5V3z" /></svg>
              </div>
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, zIndex: 3, color: '#fff' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', display: 'inline-block', padding: '3px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', marginBottom: 4 }}>BIOLOGY · 1:30</span>
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2, textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>Why does the Krebs cycle even matter?</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>A 90-second walk-through.</div>
              </div>
            </div>
            {/* Tab bar */}
            <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 16, background: 'rgba(10,18,50,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(80,130,210,0.18)', display: 'flex', justifyContent: 'space-around' }}>
              {[['Feed', true], ['Library', false], ['Me', false]].map(([label, active]) => (
                <div key={label as string} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: active ? '#1A5CFF' : 'rgba(139,156,200,0.5)', fontSize: 9, fontWeight: 600 }}>
                  <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
                    {label === 'Feed' && <path d="M3 9l6-6 6 6v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.5" />}
                    {label === 'Library' && <><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9 5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" /></>}
                    {label === 'Me' && <><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" stroke="currentColor" strokeWidth="1.5" /></>}
                  </svg>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- MacBook mockup (E-Commerce) ---- */
function MacBookMockup() {
  return (
    <div className="macbook">
      <div className="mb-screen">
        <div className="mb-inner">
          <div className="browser-bar">
            <div className="browser-dots"><span /><span /><span /></div>
            <div className="browser-url">
              <span style={{ color: '#86868b' }}>🔒</span>
              <span><b style={{ color: '#E8EEFF' }}>marketkita.ph</b>/store/produce</span>
            </div>
          </div>
          <div className="browser-body" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(26,92,255,0.12), transparent 50%), radial-gradient(circle at 100% 100%, rgba(6,182,212,0.08), transparent 55%), #0e1120' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h6 style={{ fontSize: 22, fontWeight: 700, color: '#E8EEFF', letterSpacing: '-0.025em' }}>
                Today's <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', background: 'var(--grad-1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>harvest</em>
              </h6>
              <span style={{ padding: '7px 14px', borderRadius: 999, background: 'rgba(20,35,80,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(80,130,210,0.2)', fontSize: 11, fontWeight: 600, color: '#E8EEFF', display: 'inline-flex', alignItems: 'center', gap: 6, boxShadow: '0 6px 16px -6px rgba(26,92,255,0.3)' }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 1.5h2l1.4 6.8a1 1 0 001 .7h4.2a1 1 0 001-.7L11.5 4H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="4.8" cy="10.2" r="0.8" fill="currentColor" /><circle cx="9" cy="10.2" r="0.8" fill="currentColor" /></svg>
                3 · ₱840
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { bg: 'linear-gradient(135deg,#C586F5,#7B40C7)', nm: 'Heirloom tomatoes', pr: '₱120', unit: '/500g' },
                { bg: 'linear-gradient(135deg,#60A5FA,#0A84FF)', nm: 'Mountain greens', pr: '₱80', unit: '/bunch' },
                { bg: 'linear-gradient(135deg,#FF8AA8,#E64773)', nm: 'Local honey jar', pr: '₱260', unit: '/250ml' },
              ].map(({ bg, nm, pr, unit }) => (
                <div key={nm} style={{ background: 'rgba(12,22,60,0.8)', backdropFilter: 'blur(18px)', border: '1px solid rgba(80,130,210,0.2)', borderRadius: 12, padding: 10, boxShadow: '0 8px 16px -6px rgba(0,0,0,0.4)' }}>
                  <div style={{ aspectRatio: '1/1', borderRadius: 8, marginBottom: 8, background: bg, position: 'relative', overflow: 'hidden' }}>
                    <span style={{ position: 'absolute', bottom: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px -2px rgba(0,0,0,0.4)' }}>+</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#E8EEFF', lineHeight: 1.2 }}>{nm}</div>
                  <div style={{ fontSize: 10, color: 'rgba(139,156,200,0.7)', marginTop: 2 }}><b style={{ color: '#E8EEFF', fontWeight: 700 }}>{pr}</b>{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-base" />
    </div>
  );
}

/* ---- Court Booking MacBook mockup ---- */
function CourtBookingMockup() {
  const slots = ['8:00', '9:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
  const booked = ['9:00', '11:00', '15:00'];
  const selected = '10:00';

  return (
    <div className="macbook">
      <div className="mb-screen">
        <div className="mb-inner">
          <div className="browser-bar">
            <div className="browser-dots"><span /><span /><span /></div>
            <div className="browser-url">
              <span style={{ color: '#86868b' }}>🔒</span>
              <span><b style={{ color: '#E8EEFF' }}>courtbooking.app</b>/schedule</span>
            </div>
          </div>
          <div className="browser-body" style={{ background: 'radial-gradient(circle at 10% 10%, rgba(48,209,88,0.1), transparent 50%), var(--bg)', padding: '16px 18px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h6 style={{ fontSize: 18, fontWeight: 700, color: '#E8EEFF', letterSpacing: '-0.02em' }}>
                  Book a <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', background: 'linear-gradient(120deg,#30D158,#0A84FF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Court</em>
                </h6>
                <div style={{ fontSize: 11, color: 'rgba(139,156,200,0.7)', marginTop: 2 }}>Saturday, June 14 · Quezon City</div>
              </div>
              <span style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(48,209,88,0.12)', color: '#1E9C6F', fontWeight: 600, fontSize: 11, border: '1px solid rgba(48,209,88,0.25)' }}>
                3 courts open
              </span>
            </div>
            {/* Court tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {['Court A', 'Court B', 'Court C'].map((c, i) => (
                <span key={c} style={{
                  padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                  background: i === 0 ? 'rgba(26,92,255,0.15)' : 'rgba(12,22,60,0.7)',
                  color: i === 0 ? '#60A5FA' : 'rgba(139,156,200,0.6)',
                  border: `1px solid ${i === 0 ? 'rgba(26,92,255,0.3)' : 'rgba(80,130,210,0.15)'}`,
                }}>{c}</span>
              ))}
            </div>
            {/* Time slots */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 7 }}>
              {slots.map(slot => {
                const isBooked = booked.includes(slot);
                const isSel = slot === selected;
                return (
                  <div key={slot} style={{
                    padding: '8px 4px', borderRadius: 10, textAlign: 'center', fontSize: 11, fontWeight: 600,
                    background: isSel
                      ? 'linear-gradient(135deg,#30D158,#0A84FF)'
                      : isBooked ? 'rgba(8,12,24,0.6)' : 'rgba(12,22,60,0.75)',
                    color: isSel ? '#fff' : isBooked ? 'rgba(139,156,200,0.3)' : '#E8EEFF',
                    border: `1px solid ${isSel ? 'transparent' : isBooked ? 'rgba(80,130,210,0.08)' : 'rgba(80,130,210,0.18)'}`,
                    textDecoration: isBooked && !isSel ? 'line-through' : 'none',
                    boxShadow: isSel ? '0 6px 14px -4px rgba(48,209,88,0.4)' : 'none',
                  }}>{slot}</div>
                );
              })}
            </div>
            {/* CTA */}
            <div style={{ marginTop: 14, padding: '10px 16px', borderRadius: 12, background: 'linear-gradient(135deg,#30D158,#0A84FF)', color: '#fff', fontWeight: 700, fontSize: 13, textAlign: 'center', boxShadow: '0 8px 20px -6px rgba(48,209,88,0.5)' }}>
              Confirm · Court A · 10:00 AM
            </div>
          </div>
        </div>
      </div>
      <div className="mb-base" />
    </div>
  );
}

const projects = [
  {
    num: '— Project 01',
    title: <><span className="hl-pink">DoomSchooling</span>.<br />School docs, made <span className="hl">scrollable</span>.</>,
    desc: 'A mobile-oriented educational application engineered to transform standard school documents into an engaging, short-form video feed. Built so students learn the way they already scroll.',
    tags: [
      { label: 'React', cls: 'blue' },
      { label: 'Node.js', cls: 'green' },
      { label: 'Video Pipeline', cls: 'coral' },
      { label: 'Mobile UI', cls: '' },
    ],
    visual: <IPhoneMockup />,
  },
  {
    num: '— Project 02',
    title: <>A <span className="hl-blue">custom e-commerce</span> platform for <span className="hl">local</span> delivery.</>,
    desc: 'A comprehensive storefront built from the ground up, featuring a React-based UI and a robust Express backend designed for direct neighborhood delivery — no warehouses, no middlemen.',
    tags: [
      { label: 'React', cls: 'blue' },
      { label: 'Express', cls: '' },
      { label: 'Redux', cls: 'purple' },
      { label: 'Stripe', cls: '' },
      { label: 'Full-Stack', cls: '' },
    ],
    visual: <MacBookMockup />,
  },
  {
    num: '— Project 03',
    title: <>Court <span className="hl-blue">Booking System</span> — reserve your <span className="hl">court</span> in seconds.</>,
    desc: 'A real-time sports court reservation platform built with React and AWS Amplify. Features live availability, instant slot booking, and an admin dashboard — all deployed serverlessly.',
    tags: [
      { label: 'React', cls: 'blue' },
      { label: 'AWS Amplify', cls: 'amber' },
      { label: 'Tailwind', cls: '' },
      { label: 'Serverless', cls: 'green' },
    ],
    visual: <CourtBookingMockup />,
  },
];

export default function Projects() {
  return (
    <section id="work" className="project-section">
      <div className="container">

        {/* Section head */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto', textAlign: 'center', alignItems: 'center', padding: '120px 0 60px' }}>
          <Reveal>
            <span className="sec-eyebrow"><span className="edot" />Selected work</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="sec-title">
              Three products I'm <span className="hl">proud</span> to walk you through.
            </h2>
          </Reveal>
        </div>

        {/* Project list */}
        {projects.map((p, i) => {
          const isEven = i % 2 === 1;

          const textCol = (
            <Reveal delay={0.05}>
              <div style={{ padding: '0 12px' }}>
                <span className="project-num">{p.num}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(({ label, cls }) => (
                    <span key={label} className="glass-pill sm">
                      <span className={`glass-icon ${cls}`}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="2.5" /></svg>
                      </span>
                      {label}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <MagWrap>
                    <a href="#" className="glass-btn dark" style={{ padding: '14px 22px', fontSize: 14 }}>
                      Live demo
                      <span className="ico">
                        <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="btn-glow" />
                    </a>
                  </MagWrap>
                  <MagWrap>
                    <a href="#" className="glass-btn" style={{ padding: '14px 22px', fontSize: 14 }}>
                      Source code
                      <span className="btn-glow" />
                    </a>
                  </MagWrap>
                </div>
              </div>
            </Reveal>
          );

          const visualCol = (
            <Reveal delay={0.1}>
              <TiltVisual>{p.visual}</TiltVisual>
            </Reveal>
          );

          return (
            <article key={i} className="project">
              {isEven ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
            </article>
          );
        })}

      </div>
    </section>
  );
}
