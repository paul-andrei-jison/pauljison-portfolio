import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const, delay }}
    >
      {children}
    </motion.div>
  );
}

// ---- Magnetic ghost button ----
function MagWrap({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapRef}
      style={{ display: 'inline-block', position: 'relative' }}
      onPointerEnter={() => {
        if (innerRef.current) innerRef.current.style.transition = 'transform .15s ease-out';
      }}
      onPointerLeave={() => {
        if (innerRef.current) {
          innerRef.current.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
          innerRef.current.style.transform = 'translate(0,0)';
        }
      }}
      onPointerMove={(e) => {
        if (!wrapRef.current || !innerRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        innerRef.current.style.transform = `translate(${x}px,${y}px)`;
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

// ---- Parallax visual wrapper ----
function ParallaxVisual({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current!;
    const inner = innerRef.current!;

    const onScroll = () => {
      const r = outer.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-40, Math.min(40, center * -0.06));
      inner.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={outerRef} className="project-visual">
      <div ref={innerRef} className="project-visual-inner">
        {children}
      </div>
    </div>
  );
}

const projects = [
  {
    index: '01 / 04',
    title: <>Polyglot, an <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--teal)' }}>AI translation</em> studio for indigenous languages.</>,
    desc: "A React + WebSpeech app that helps linguists build training corpora for under-resourced languages. Real-time waveform diffing, collaborative annotation, and a Node service that streams transcripts via WebSocket. Shipped with 6 universities.",
    tags: ['React', 'TypeScript', 'Node', 'WebSockets', 'WebAudio'],
    links: ['Live demo →', 'GitHub →'],
    visual: (
      <div className="project-visual-inner pv-1" style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(124,110,240,0.45), transparent 50%), radial-gradient(circle at 70% 60%, rgba(79,179,217,0.35), transparent 55%), linear-gradient(135deg, #1a1530 0%, #0d1622 100%)',
      }}>
        <div className="pv-overlay" />
        <div className="pv-glyph">
          <svg width="56%" height="56%" viewBox="0 0 200 200" fill="none">
            <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4FB3D9" /><stop offset="100%" stopColor="#7C6EF0" /></linearGradient></defs>
            <circle cx="100" cy="100" r="70" stroke="url(#g1)" strokeWidth="1" opacity=".6" />
            <circle cx="100" cy="100" r="50" stroke="#C5C6C7" strokeWidth="1" opacity=".25" />
            <path d="M50 100 Q100 30 150 100 T150 100" stroke="url(#g1)" strokeWidth="1.5" fill="none" />
            <path d="M50 100 Q100 170 150 100" stroke="#7C6EF0" strokeWidth="1.5" fill="none" opacity=".6" />
            <circle cx="100" cy="100" r="4" fill="#fff" />
          </svg>
        </div>
        <div className="pv-label">/01 — capture.preview</div>
      </div>
    ),
  },
  {
    index: '02 / 04',
    title: <>Tinker — a <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--teal)' }}>browser cockpit</em> for autonomous rovers.</>,
    desc: "Drive a Raspberry-Pi rover from anywhere with sub-100ms latency. WebRTC for the camera, ROS bridge over WebSockets, and a React UI with a magnetic joystick that maps thumb pressure to motor torque. Built for a robotics lab in Quezon City.",
    tags: ['React', 'WebRTC', 'ROS2', 'Python', 'Raspberry Pi'],
    links: ['Case study →', 'GitHub →'],
    visual: (
      <div className="project-visual-inner" style={{
        background: 'radial-gradient(circle at 70% 30%, rgba(232,181,122,0.3), transparent 55%), radial-gradient(circle at 30% 80%, rgba(79,179,217,0.25), transparent 55%), linear-gradient(160deg, #1d1815 0%, #0e1820 100%)',
      }}>
        <div className="pv-overlay" />
        <div className="pv-glyph">
          <svg width="60%" height="60%" viewBox="0 0 200 200" fill="none">
            <defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#E8B57A" /><stop offset="100%" stopColor="#4FB3D9" /></linearGradient></defs>
            <rect x="30" y="60" width="140" height="90" rx="8" stroke="url(#g2)" strokeWidth="1.5" />
            <circle cx="60" cy="105" r="14" stroke="#E8B57A" strokeWidth="1.2" />
            <circle cx="60" cy="105" r="4" fill="#E8B57A" />
            <line x1="90" y1="90" x2="160" y2="90" stroke="#C5C6C7" strokeWidth="1" opacity=".4" />
            <line x1="90" y1="100" x2="150" y2="100" stroke="#C5C6C7" strokeWidth="1" opacity=".4" />
            <line x1="90" y1="110" x2="140" y2="110" stroke="#C5C6C7" strokeWidth="1" opacity=".4" />
            <circle cx="100" cy="60" r="10" fill="none" stroke="#4FB3D9" strokeWidth="1.2" />
            <line x1="100" y1="50" x2="100" y2="35" stroke="#4FB3D9" strokeWidth="1" />
          </svg>
        </div>
        <div className="pv-label">/02 — rover.feed</div>
      </div>
    ),
  },
  {
    index: '03 / 04',
    title: <>Carbonik — telemetry for <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--teal)' }}>climate startups</em>.</>,
    desc: "A real-time dashboard that ingests sensor data from 800+ farms and surfaces actionable insights. Built the visualization layer with D3 + React, the ingestion pipeline with Node + Kafka, and obsessed over getting every chart under 16ms.",
    tags: ['React', 'D3', 'Node', 'Kafka', 'Postgres'],
    links: ['Live demo →', 'Read post →'],
    visual: (
      <div className="project-visual-inner" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(79,179,217,0.4), transparent 60%), linear-gradient(180deg, #0e1a22 0%, #050a10 100%)',
      }}>
        <div className="pv-overlay" />
        <div className="pv-glyph">
          <svg width="58%" height="58%" viewBox="0 0 200 200" fill="none">
            <defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4FB3D9" /><stop offset="100%" stopColor="#1A1A1D" /></linearGradient></defs>
            <path d="M30 150 Q50 130 70 140 T110 130 T150 120 T180 110" stroke="#4FB3D9" strokeWidth="1.5" fill="none" />
            <path d="M30 150 Q50 130 70 140 T110 130 T150 120 T180 110 L180 170 L30 170 Z" fill="url(#g3)" opacity=".3" />
            <line x1="30" y1="170" x2="180" y2="170" stroke="#C5C6C7" strokeWidth="1" opacity=".4" />
            <circle cx="70" cy="140" r="3" fill="#4FB3D9" />
            <circle cx="110" cy="130" r="3" fill="#4FB3D9" />
            <circle cx="150" cy="120" r="3" fill="#4FB3D9" />
            <text x="100" y="55" textAnchor="middle" fontFamily="Space Grotesk" fontSize="32" fontWeight="500" fill="#fff">+218%</text>
            <text x="100" y="78" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="#7A7B82">YOY · CARBON SAVED</text>
          </svg>
        </div>
        <div className="pv-label">/03 — dashboard.live</div>
      </div>
    ),
  },
  {
    index: '04 / 04',
    title: <>Pact — a <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: 'var(--teal)' }}>contract signer</em> that doesn't feel like a lawsuit.</>,
    desc: "Replaced a Fortune-500's e-signature flow with a React + Framer-Motion experience. Drag-and-drop document editor, presence cursors, and a TypeScript state machine that survives offline. Cut signing time from 12 minutes to 90 seconds.",
    tags: ['React', 'TypeScript', 'XState', 'Framer Motion', 'tRPC'],
    links: ['Case study →', 'GitHub →'],
    visual: (
      <div className="project-visual-inner" style={{
        background: 'radial-gradient(circle at 20% 80%, rgba(124,110,240,0.4), transparent 60%), radial-gradient(circle at 80% 20%, rgba(232,181,122,0.2), transparent 50%), linear-gradient(135deg, #1c1428 0%, #0b0f1c 100%)',
      }}>
        <div className="pv-overlay" />
        <div className="pv-glyph">
          <svg width="58%" height="58%" viewBox="0 0 200 200" fill="none">
            <defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7C6EF0" /><stop offset="100%" stopColor="#E8B57A" /></linearGradient></defs>
            <circle cx="100" cy="100" r="50" stroke="url(#g4)" strokeWidth="1.5" />
            <path d="M75 100 L88 113 L125 80" stroke="url(#g4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="60" cy="60" r="3" fill="#7C6EF0" />
            <circle cx="140" cy="60" r="3" fill="#E8B57A" />
            <circle cx="60" cy="140" r="3" fill="#E8B57A" />
            <circle cx="140" cy="140" r="3" fill="#7C6EF0" />
            <line x1="60" y1="60" x2="140" y2="140" stroke="#7C6EF0" strokeWidth="0.5" opacity=".4" />
            <line x1="140" y1="60" x2="60" y2="140" stroke="#E8B57A" strokeWidth="0.5" opacity=".4" />
          </svg>
        </div>
        <div className="pv-label">/04 — pact.flow</div>
      </div>
    ),
  },
];

export default function Projects() {
  return (
    <section id="work" style={{ padding: '40px 0 100px' }}>
      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

        {/* Section head */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 60,
            alignItems: 'end',
            padding: '160px 0 80px',
            borderTop: '1px solid var(--line)',
          }}
          className="section-head"
        >
          <div className="eyebrow">02 — Selected work</div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(40px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--text-0)',
            }}
          >
            Four projects, four{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'var(--teal)' }}>
              different languages
            </em>{' '}
            I had to learn first.
          </motion.h2>
        </div>

        {/* Project list */}
        {projects.map((project, i) => {
          const isEven = i % 2 === 1;
          return (
            <Reveal key={i}>
              <article
                style={{
                  minHeight: '100vh',
                  padding: '80px 0',
                  display: 'grid',
                  gridTemplateColumns: isEven ? '1fr 1.2fr' : '1.2fr 1fr',
                  gap: 60,
                  alignItems: 'center',
                  position: 'relative',
                  borderTop: i > 0 ? '1px solid var(--line)' : 'none',
                  marginTop: i > 0 ? 40 : 0,
                }}
                className="project-article"
              >
                <ParallaxVisual>{project.visual}</ParallaxVisual>

                <div style={{ padding: '0 20px', order: isEven ? -1 : 0 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--text-2)', letterSpacing: '0.15em' }}>
                    PROJECT {project.index}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(36px, 4.5vw, 64px)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-0)',
                      margin: '20px 0 16px',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-1)', maxWidth: 480, marginBottom: 28 }}>
                    {project.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="tag-chip" data-hover>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {project.links.map(link => (
                      <MagWrap key={link}>
                        <a href="#" className="ghost-btn" data-hover>{link}</a>
                      </MagWrap>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .section-head { grid-template-columns: 1fr !important; gap: 24px !important; padding: 100px 0 50px !important; }
          .project-article { grid-template-columns: 1fr !important; gap: 30px !important; min-height: auto !important; padding: 60px 0 !important; }
          .project-article > div { order: 0 !important; }
        }
      `}</style>
    </section>
  );
}
