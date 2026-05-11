import { useRef, type ReactNode } from 'react';
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
      style={{ display: 'inline-block' }}
      onPointerMove={(e) => {
        if (!wrapRef.current || !innerRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
        innerRef.current.style.transform = `translate(${x}px,${y}px)`;
        innerRef.current.style.transition = 'transform .1s ease-out';
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

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '140px 0 200px', textAlign: 'center' }}>
      <div className="container">
        <Reveal>
          <span className="sec-eyebrow"><span className="edot" />Say hello</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{
            fontSize: 'clamp(48px, 7vw, 92px)',
            lineHeight: 1.0,
            letterSpacing: '-0.045em',
            fontWeight: 700,
            color: 'var(--ink)',
            maxWidth: '13ch',
            margin: '24px auto 18px',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
          }}>
            Let's build <span className="hl">something</span> together.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ maxWidth: 540, margin: '0 auto 32px', color: 'var(--ink-soft)', fontSize: 17, lineHeight: 1.55, textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}>
            I'm opening up for new projects in <span className="hl-blue">June 2026</span>. If you've got a problem worth
            solving — or just want to chat about <span className="hl-pink">design &amp; code</span> — drop me a line.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <MagWrap>
            <a href="mailto:hello@pauljison.dev" className="email-card">
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--grad-1)',
                color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 6px 14px -4px rgba(10,132,255,0.5)',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M2 4l5 4 5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              hello@pauljison.dev
            </a>
          </MagWrap>
        </Reveal>
      </div>
    </section>
  );
}
