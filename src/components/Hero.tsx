import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import { motion } from 'framer-motion';

// ---- Magnetic wrapper ----
function MagWrap({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onEnter = useCallback(() => {
    if (innerRef.current) innerRef.current.style.transition = 'transform .15s ease-out';
  }, []);

  const onLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      innerRef.current.style.transform = 'translate(0,0)';
    }
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!wrapRef.current || !innerRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.35;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    innerRef.current.style.transform = `translate(${x}px,${y}px)`;
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ display: 'inline-block', position: 'relative' }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

// ---- Particle canvas ----
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const mouse = { x: -9999, y: -9999 };
    let W = 0, H = 0;
    let raf: number;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      hue: 'teal' | 'purple';
    };
    let particles: Particle[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const hero = canvas.parentElement!;
      W = hero.clientWidth;
      H = hero.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((W * H) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.3,
        hue: Math.random() > 0.5 ? 'teal' : 'purple',
      }));
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      // edges
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(140,150,180,${(1 - d / 130) * 0.22})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 120) {
          const f = (1 - d / 120) * 0.6;
          p.vx += (dx / d) * f * 0.2;
          p.vy += (dy / d) * f * 0.2;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
        ctx.fillStyle = p.hue === 'teal' ? 'rgba(79,179,217,0.85)' : 'rgba(124,110,240,0.75)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);

    const hero = canvas.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  );
}

// ---- Reveal wrapper ----
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

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 80px',
      }}
    >
      <div className="hero-grid" />
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,110,240,0.18) 0%, rgba(79,179,217,0.08) 35%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <ParticleCanvas />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        {/* Eyebrow row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, gap: 40, flexWrap: 'wrap' }}>
          <Reveal><div className="eyebrow">Portfolio · Vol. 4 · 2026</div></Reveal>
          <Reveal delay={0.1}><div className="eyebrow">Lat 14.5995° · Lon 120.9842°</div></Reveal>
        </div>

        {/* Name */}
        <Reveal delay={0.15}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(64px, 12vw, 200px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--text-0)',
            }}
          >
            Paul
            <br />
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                background: 'linear-gradient(120deg, var(--teal) 0%, var(--purple) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Jison
            </span>
            <span style={{ WebkitTextStroke: '1px var(--text-2)', color: 'transparent' }}>.</span>
          </h1>
        </Reveal>

        {/* Role titles */}
        <Reveal delay={0.3}>
          <div
            style={{
              display: 'flex',
              gap: 28,
              flexWrap: 'wrap',
              marginTop: 32,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-1)',
            }}
          >
            {[
              { label: 'Full-Stack Developer', color: 'var(--teal)' },
              { label: 'Robotics Tinkerer', color: 'var(--purple)' },
              { label: 'Polyglot · 5 langs', color: 'var(--warm)' },
            ].map(({ label, color }) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: color,
                    borderRadius: 1,
                    transform: 'rotate(45deg)',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Bottom row: bio | CTAs | stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 60,
            alignItems: 'end',
            marginTop: 100,
          }}
          className="hero-bottom"
        >
          <Reveal delay={0.4}>
            <p style={{ maxWidth: 380, color: 'var(--text-1)', fontSize: 15, lineHeight: 1.6 }}>
              <span style={{ color: 'var(--text-0)' }}>I build software the way I learn languages —</span>
              {' '}by listening to the shape of a system before speaking. React, TypeScript, Node, and a soldering iron when the screen isn't enough.
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <MagWrap>
                <a href="#work" className="mag-btn" data-hover>
                  View my projects
                  <span className="arrow">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="#0B0B0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </MagWrap>
              <MagWrap>
                <a href="#contact" className="ghost-btn" data-hover>Say hello</a>
              </MagWrap>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <div style={{ display: 'flex', gap: 32, justifyContent: 'flex-end', textAlign: 'right' }}>
              {[
                { num: '07', label: 'Years shipping' },
                { num: '42', label: 'Projects' },
                { num: '5', label: 'Languages' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 44, color: 'var(--text-0)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)', marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-bottom {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            margin-top: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
