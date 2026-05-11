import { useState, useRef, useEffect, type ReactNode, type FormEvent, type KeyboardEvent } from 'react';
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

// ---- Arrow icon ----
function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// ---- Chatbot ----
type MessageFrom = 'bot' | 'user';
interface Message { text: string; from: MessageFrom; typing?: boolean }

const replies = [
  { match: /stack|tech|react|node|typescript/i, reply: "Front: React + TypeScript + Tailwind. Back: Node, tRPC, Postgres. For fun: ROS, ESP32, and a dangerous amount of Python." },
  { match: /available|hire|job|work/i, reply: "Open to staff-eng & R&D roles starting June 2026. Remote, Tokyo, or Berlin. Drop me an email — I read every one." },
  { match: /joke|funny/i, reply: "Why don't C# devs go camping? They prefer using { }." },
  { match: /robot|rover|hardware/i, reply: "Currently teaching an ESP32-S3 sign language. It's about 60% fluent in 'wave hello'. Slow progress." },
  { match: /language|polyglot|tagalog|japanese|french|esperanto/i, reply: "English & Tagalog native. Conversational Japanese, intermediate French, a hopeful amount of Esperanto. ¿Cómo no?" },
  { match: /location|where|live|manila|philippines/i, reply: "Based in Manila — but happy to relocate. My laptop is light." },
  { match: /price|rate|cost|salary/i, reply: "Depends on the problem. For mission work I'm cheap; for ad-tech I'm expensive. We'll figure it out." },
  { match: /hello|hi|hey|sup/i, reply: "Hello, human. I'm 12% Paul and 88% wishful thinking. Ask me about his work." },
];
const fallback = "Hm, that's a question for the real Paul. Email him at hello@pauljison.dev and he'll write back within a day.";

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Paul's tiny clone. Ask me anything — or pick a starter below.", from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  function respond(q: string) {
    setMessages(prev => [
      ...prev,
      { text: q, from: 'user' },
      { text: '', from: 'bot', typing: true },
    ]);
    setTimeout(() => {
      const hit = replies.find(r => r.match.test(q));
      setMessages(prev => [
        ...prev.filter(m => !m.typing),
        { text: hit ? hit.reply : fallback, from: 'bot' },
      ]);
    }, 700 + Math.random() * 500);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    respond(v);
    setInput('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); submit(e as unknown as FormEvent); }
  }

  return (
    <div className="chatbot-card">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--teal), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Instrument Serif', serif", color: '#0b0b0f', fontSize: 18,
        }}>
          P
        </div>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text-0)' }}>Paul-bot v0.4</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
            <span style={{ color: 'var(--teal)' }}>●</span> trained on my résumé
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={msgsRef}
        className="chatbot-msgs"
        style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {messages.map((msg, i) => (
          msg.typing ? (
            <div key={i} style={{
              maxWidth: '88%', padding: 14,
              background: 'var(--bg-2)',
              border: '1px solid var(--line)',
              borderRadius: '14px 14px 14px 4px',
              alignSelf: 'flex-start',
              display: 'inline-flex', gap: 4, alignItems: 'center',
            }}>
              <span className="typing-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-2)', display: 'inline-block' }} />
              <span className="typing-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-2)', display: 'inline-block' }} />
              <span className="typing-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-2)', display: 'inline-block' }} />
            </div>
          ) : (
            <div key={i} style={{
              maxWidth: '88%',
              padding: '10px 14px',
              borderRadius: msg.from === 'bot' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
              fontSize: 14, lineHeight: 1.45,
              alignSelf: msg.from === 'bot' ? 'flex-start' : 'flex-end',
              background: msg.from === 'bot'
                ? 'var(--bg-2)'
                : 'linear-gradient(135deg, var(--teal), var(--purple))',
              color: msg.from === 'bot' ? 'var(--text-0)' : '#0b0b0f',
              border: msg.from === 'bot' ? '1px solid var(--line)' : 'none',
            }}>
              {msg.text}
            </div>
          )
        ))}
      </div>

      {/* Quick replies */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        {["What's your stack?", 'Available?', 'Tell me a joke'].map(q => (
          <button key={q} className="quick-btn" data-hover onClick={() => respond(q)}>{q}</button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={submit}
        style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid var(--line)' }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a question..."
          autoComplete="off"
          className="chatbot-input-field"
          data-hover
          style={{ flex: 1 }}
        />
        <button
          type="submit"
          data-hover
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--teal), var(--purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#0b0b0f',
            transition: 'transform .3s',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8L14 2L8 14L7 9L2 8Z" stroke="#0B0B0F" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}

const contactRows = [
  { label: 'Email', value: 'hello@pauljison.dev', href: 'mailto:hello@pauljison.dev' },
  { label: 'LinkedIn', value: 'in/pauljison', href: '#' },
  { label: 'GitHub', value: '@pauljison', href: '#' },
  { label: 'Read.cv', value: 'paul.read.cv', href: '#' },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: '160px 0 80px', borderTop: '1px solid var(--line)', position: 'relative' }}
    >
      <div style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'start' }}
          className="contact-grid"
        >
          {/* Left: links */}
          <div>
            <div className="eyebrow">03 — Get in touch</div>
            <Reveal>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(48px, 8vw, 120px)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: 'var(--text-0)',
                margin: '24px 0 32px',
              }}>
                Let's build something{' '}
                <em style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  background: 'linear-gradient(120deg, var(--teal), var(--purple))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>
                  strange and useful
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-1)', maxWidth: 480 }}>
                I'm hunting for staff-engineer or R&D roles that overlap with robotics, language, or anything in-between. Drop a line — or chat with my robot first, on the right.
              </p>
            </Reveal>

            <div style={{ marginTop: 40, borderTop: '1px solid var(--line)' }}>
              {contactRows.map(({ label, value, href }) => (
                <a key={label} href={href} className="contact-row" data-hover>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 18, color: 'var(--text-0)' }}>{value}</span>
                  <span className="ca"><ArrowIcon /></span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: chatbot */}
          <Reveal delay={0.2}>
            <Chatbot />
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-row { grid-template-columns: 120px 1fr auto !important; }
        }
      `}</style>
    </section>
  );
}
