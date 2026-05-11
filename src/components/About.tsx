import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const, delay }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

const skills = [
  {
    tag: 'React',
    num: '01',
    tooltip: 'React',
    lvl: 'Daily · 6 yrs · Lead',
    icon: (
      <svg className="skill-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="16" cy="16" rx="14" ry="5.5" />
        <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="14" ry="5.5" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    tag: 'TypeScript',
    num: '02',
    tooltip: 'TypeScript',
    lvl: 'Daily · 5 yrs · Expert',
    icon: (
      <svg className="skill-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="24" height="24" rx="3" />
        <path d="M11 14h8M15 14v9M21 20c0 1.5 1.5 2 3 2s3-.7 3-2-1.5-1.7-3-2-3-.5-3-2 1.5-2 3-2 3 .5 3 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: 'Node.js',
    num: '03',
    tooltip: 'Node.js',
    lvl: 'Daily · 7 yrs · Architect',
    icon: (
      <svg className="skill-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 3l11.5 6.5v13L16 29 4.5 22.5v-13L16 3z" />
        <path d="M12 12v6c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5v-6M20 13c0-1-1-1.5-2.5-1.5S15 12 15 13c0 2.5 5 1.5 5 4 0 1-1 1.5-2.5 1.5S15 18 15 17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: 'Postgres',
    num: '04',
    tooltip: 'Postgres',
    lvl: 'Weekly · 4 yrs · Solid',
    icon: (
      <svg className="skill-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="16" cy="8" rx="11" ry="4" />
        <path d="M5 8v8c0 2.2 4.9 4 11 4s11-1.8 11-4V8M5 16v8c0 2.2 4.9 4 11 4s11-1.8 11-4v-8" />
      </svg>
    ),
  },
  {
    tag: 'Three.js',
    num: '05',
    tooltip: 'Three.js',
    lvl: 'Monthly · 3 yrs · WebGL',
    icon: (
      <svg className="skill-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4l11 6v12l-11 6L5 22V10l11-6z" />
        <path d="M16 4v28M5 10l22 12M27 10L5 22" />
      </svg>
    ),
  },
  {
    tag: 'Python',
    num: '06',
    tooltip: 'Python',
    lvl: 'Weekly · 5 yrs · ML & ROS',
    icon: (
      <svg className="skill-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4c-4 0-7 1-7 4v4h7v1H7c-3 0-4 2-4 6s1 6 4 6h2v-4c0-3 1-5 4-5h7c3 0 5-2 5-5V8c0-3-3-4-9-4z" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about">
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
          <div className="eyebrow">01 — About</div>
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
            A developer who reads dictionaries{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'var(--teal)' }}>
              for fun
            </em>{' '}
            and wires servos on Sundays.
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: 200,
            gap: 16,
            paddingBottom: 60,
          }}
        >
          {/* Bio — 3 col × 2 row */}
          <Reveal>
            <div
              className="bento-cell"
              style={{
                gridColumn: 'span 3',
                gridRow: 'span 2',
                padding: 32,
                overflow: 'visible',
                height: '100%',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
                // bio.md
              </span>
              <h3
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 36,
                  color: 'var(--text-0)',
                  lineHeight: 1.1,
                  marginTop: 14,
                  marginBottom: 18,
                }}
              >
                I bridge worlds that don't usually talk to each other — code, hardware, and human language.
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-1)' }}>
                For seven years I've shipped React + TypeScript front-ends and Node services for fintech, climate-tech, and a robotics lab nobody's heard of yet. I treat every domain as a new language to learn fluently.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-1)', marginTop: 14 }}>
                Off-keyboard you'll find me reading Japanese essays, tuning a Raspberry Pi rover, or arguing about Esperanto declensions.
              </p>
            </div>
          </Reveal>

          {/* Skill cells */}
          {skills.slice(0, 3).map((skill, i) => (
            <Reveal key={skill.tag} delay={i * 0.05}>
              <div className="bento-cell skill-cell" style={{ gridColumn: 'span 1', height: '100%' }} data-hover>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
                  {skill.tag}
                </span>
                {skill.icon}
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-2)' }}>{skill.num}</span>
                </div>
                <div className="skill-tooltip">
                  <div style={{ fontSize: 18, color: 'var(--text-0)' }}>{skill.tooltip}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--teal)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{skill.lvl}</div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Robotics — 1 col × 2 row */}
          <Reveal delay={0.15}>
            <div
              className="bento-cell"
              style={{
                gridColumn: 'span 1',
                gridRow: 'span 2',
                background: 'radial-gradient(circle at 50% 30%, rgba(79,179,217,0.15), transparent 60%), var(--bg-1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>// hobby.bot</span>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: 'var(--text-0)', marginTop: 8 }}>Robotics</div>
              <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.55, marginTop: 10 }}>ROS · ESP32 · Servo choreography</div>
              <div style={{ flex: 1, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="100%" height="120" viewBox="0 0 120 120" fill="none">
                  <defs>
                    <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4FB3D9" />
                      <stop offset="100%" stopColor="#7C6EF0" />
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="48" stroke="url(#rg)" strokeWidth="1" opacity=".5" />
                  <circle cx="60" cy="60" r="32" stroke="#C5C6C7" strokeWidth="1" opacity=".25" />
                  <rect x="44" y="44" width="32" height="32" rx="8" stroke="url(#rg)" strokeWidth="1.5" />
                  <circle cx="54" cy="58" r="2.5" fill="#4FB3D9" />
                  <circle cx="66" cy="58" r="2.5" fill="#7C6EF0" />
                  <path d="M53 67c2 2 12 2 14 0" stroke="#C5C6C7" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="60" y1="12" x2="60" y2="40" stroke="#4FB3D9" strokeWidth="1" opacity=".6" />
                  <circle cx="60" cy="12" r="2" fill="#4FB3D9" />
                </svg>
              </div>
            </div>
          </Reveal>

          {/* Remaining skill cells */}
          {skills.slice(3).map((skill, i) => (
            <Reveal key={skill.tag} delay={(i + 3) * 0.05}>
              <div className="bento-cell skill-cell" style={{ gridColumn: 'span 1', height: '100%' }} data-hover>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
                  {skill.tag}
                </span>
                {skill.icon}
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-2)' }}>{skill.num}</span>
                </div>
                <div className="skill-tooltip">
                  <div style={{ fontSize: 18, color: 'var(--text-0)' }}>{skill.tooltip}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--teal)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{skill.lvl}</div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Languages — 2 col × 2 row */}
          <Reveal delay={0.1}>
            <div
              className="bento-cell"
              style={{
                gridColumn: 'span 2',
                gridRow: 'span 2',
                background: 'linear-gradient(160deg, var(--bg-1) 0%, #1d1820 100%)',
                height: '100%',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>// languages.spoken</span>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: 'var(--text-0)', marginTop: 8 }}>Five tongues</div>
              <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.55, marginTop: 10 }}>Switching contexts is my favorite form of debugging.</div>
              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['English', 'Native'],
                  ['Tagalog', 'Native'],
                  ['日本語', 'Conversational'],
                  ['Français', 'B2 · reading'],
                  ['Esperanto', 'For fun'],
                ].map(([lang, level], i) => (
                  <div
                    key={lang}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: i < 4 ? '1px solid var(--line)' : 'none',
                      fontSize: 14,
                      color: 'var(--text-0)',
                    }}
                  >
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: 'var(--text-0)' }}>{lang}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Currently — 3 col × 1 row */}
          <Reveal delay={0.2}>
            <div
              className="bento-cell"
              style={{
                gridColumn: 'span 3',
                background: 'linear-gradient(120deg, var(--bg-1), #181a23)',
                height: '100%',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>// now.txt — May 2026</span>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24, color: 'var(--text-0)', marginTop: 14 }}>Currently</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { dot: 'var(--teal)', text: <><b style={{ color: 'var(--text-0)', fontWeight: 500 }}>Building</b> a sign-language gesture translator on an ESP32-S3.</> },
                  { dot: 'var(--purple)', text: <><b style={{ color: 'var(--text-0)', fontWeight: 500 }}>Reading</b> "The Pragmatic Programmer" — again, in Japanese.</> },
                  { dot: 'var(--warm)', text: <><b style={{ color: 'var(--text-0)', fontWeight: 500 }}>Open to</b> staff-eng + R&D roles in Tokyo, Berlin, or remote.</> },
                ].map(({ dot, text }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', fontSize: 14 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, marginTop: 7, flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ color: 'var(--text-1)', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .section-head { grid-template-columns: 1fr !important; gap: 24px !important; padding: 100px 0 50px !important; }
        }
      `}</style>
    </section>
  );
}
