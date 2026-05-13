# Portfolio UI Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor portfolio content for authenticity (remove Philippines references, strip fake stats, keep only real projects), overhaul mobile responsiveness, and apply progressive enhancement so desktop gets cinematic effects while mobile stays fast and utilitarian.

**Architecture:** Direct component-level edits to 7 TSX files + index.css. Desktop keeps full Framer Motion scroll reveals, magnetic hover physics, and CSS hover pseudo-classes. Mobile suppresses these via `@media (hover: hover) and (pointer: fine)` guards in CSS and Framer Motion's `useReducedMotion` hook in animation-heavy components. No new abstractions, no new components.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Framer Motion, CSS variables, inline styles + scoped `<style>` blocks

---

## Files Modified

| File | Changes |
|---|---|
| `src/components/Navbar.tsx` | Update badge text; responsive padding |
| `src/components/Hero.tsx` | Remove coordinates eyebrow; remove stats block; fix 2-col bottom grid; disable ParticleCanvas on `prefers-reduced-motion`; mobile padding |
| `src/components/Projects.tsx` | Remove "Quezon City" Philippines reference from Tinker |
| `src/components/Portfolio.tsx` | Keep Court Booking System only; center single card |
| `src/components/Contact.tsx` | Update LinkedIn + GitHub hrefs; update chatbot location reply; mobile grid stack |
| `src/components/Footer.tsx` | Remove "Manila, PH"; update social hrefs; responsive layout |
| `src/components/About.tsx` | Fix Reveal → bento grid column-span passthrough (bug fix); mobile bento collapse |
| `src/index.css` | Wrap all `:hover` rules in `@media (hover: hover) and (pointer: fine)`; add `prefers-reduced-motion` block; mobile tap-target sizing |

---

## Task 1: Update Location Badge + Remove Philippines References

**Files:**
- Modify: `src/components/Navbar.tsx` line ~91
- Modify: `src/components/Hero.tsx` line ~203
- Modify: `src/components/Projects.tsx` line ~107
- Modify: `src/components/Footer.tsx` line ~99
- Modify: `src/components/Contact.tsx` line ~36–37

- [ ] **Step 1: Navbar.tsx — update badge text**

Change "Available for hire" to "Remote • Now open to new opportunities":

```tsx
// src/components/Navbar.tsx — line ~91-103
<a
  href="#contact"
  className="nav-cta"
  data-hover
  style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '10px 18px',
    border: '1px solid var(--line-strong)',
    borderRadius: 999,
    color: 'var(--text-0)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
  }}
>
  <span
    className="pulse-anim"
    style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--teal)',
      flexShrink: 0,
    }}
  />
  Remote&nbsp;•&nbsp;Now open to new opportunities
</a>
```

- [ ] **Step 2: Hero.tsx — remove Manila coordinates eyebrow**

The right-side eyebrow on line ~203 reads `Lat 14.5995° · Lon 120.9842°`. Remove it entirely. Keep only the left eyebrow:

```tsx
// Replace the eyebrow row (lines ~201–204) with:
<div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginBottom: 36 }}>
  <Reveal><div className="eyebrow">Portfolio · Vol. 4 · 2026</div></Reveal>
</div>
```

- [ ] **Step 3: Projects.tsx — remove Quezon City from Tinker description**

Line ~107, change:
```
"Built for a robotics lab in Quezon City."
```
to:
```
"Built for a university robotics lab."
```

Full desc field replacement:
```tsx
desc: "Drive a Raspberry-Pi rover from anywhere with sub-100ms latency. WebRTC for the camera, ROS bridge over WebSockets, and a React UI with a magnetic joystick that maps thumb pressure to motor torque. Built for a university robotics lab.",
```

- [ ] **Step 4: Footer.tsx — remove "Manila, PH"**

Line ~99, change:
```tsx
System operational · Manila, PH
```
to:
```tsx
System operational · Remote
```

- [ ] **Step 5: Contact.tsx — update chatbot location reply**

Lines ~36–37, change the location match reply:
```tsx
{ match: /location|where|live|manila|philippines/i, reply: "Fully remote — available worldwide. My laptop is always packed." },
```

- [ ] **Step 6: Build check**

```bash
npm run build
```
Expected: zero TypeScript or Vite errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.tsx src/components/Hero.tsx src/components/Projects.tsx src/components/Footer.tsx src/components/Contact.tsx
git commit -m "content: remove Philippines references, update location badge to remote"
```

---

## Task 2: Remove Hero Stats Block + Fix Bottom Grid

**Files:**
- Modify: `src/components/Hero.tsx` (lines ~275–337)

The current bottom row uses a 3-column grid: `[bio] [CTAs] [stats]`. Remove the stats entirely and switch to a 2-column grid.

- [ ] **Step 1: Replace the hero-bottom grid and its contents**

Replace the entire bottom-row div (from `{/* Bottom row: bio | CTAs | stats */}` through its closing `</div>`) with:

```tsx
{/* Bottom row: bio | CTAs */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr auto',
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
</div>
```

- [ ] **Step 2: Update the hero-bottom media query**

Replace the existing `<style>` block at the bottom of Hero.tsx:

```tsx
<style>{`
  @media (max-width: 900px) {
    .hero-bottom {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
      margin-top: 60px !important;
    }
  }
`}</style>
```

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "content: remove hero stats block, simplify bottom grid to 2-col"
```

---

## Task 3: Portfolio — Court Booking System Only

**Files:**
- Modify: `src/components/Portfolio.tsx`

Remove Arduino E-Commerce and Gym Membership Portal. Keep only Court Booking System. Center the single card with a constrained max-width.

- [ ] **Step 1: Trim the projects array to one item**

Replace the `projects` array (lines ~17–46) with:

```tsx
const projects: Project[] = [
  {
    title: 'Serverless Court Booking System',
    subtitle: 'Serverless AWS Platform',
    description:
      'A high-performance court reservation platform utilizing a fully serverless backend. Built with AWS Amplify Gen 2, DynamoDB, React, and Tailwind CSS. Employs strict IAM role delegation and sub-second database query performance.',
    tags: ['React', 'TypeScript', 'AWS Amplify Gen 2', 'DynamoDB', 'Tailwind CSS'],
    status: 'Live',
    demoUrl: 'https://court-booking-system.pauljison.com',
    githubUrl: 'https://github.com/JisonTechSolutions/court-booking-system',
  },
];
```

- [ ] **Step 2: Update grid and section heading**

Replace the grid `motion.div` className and header copy:

```tsx
{/* Header */}
<div className="mb-16 text-center">
  <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
    Featured Project
  </span>
  <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter text-white">
    Live & In Production
  </h2>
  <p className="mt-4 text-gray-400 tracking-wide max-w-xl mx-auto">
    A real system built on a real serverless stack. Click to explore the live demo.
  </p>
</div>

{/* Single card — centered */}
<motion.div
  ref={ref}
  className="flex justify-center"
  variants={containerVariants}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
>
  <div className="w-full max-w-lg">
    {projects.map(project => {
      const slug = project.title.toLowerCase().replace(/\s+/g, '-');
      return (
        <motion.div
          key={project.title}
          variants={cardVariants}
          className="group flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <BrowserChrome slug={slug} />

          {/* Mockup screen */}
          <div className="h-36 bg-gradient-to-br from-slate-900 via-slate-800/60 to-slate-900 flex items-center justify-center border-b border-white/[0.04]">
            <span className="text-xl font-bold tracking-tighter text-white/10 px-4 text-center">
              {project.title}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 gap-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-white font-semibold tracking-tight">{project.title}</h3>
                <p className="text-blue-400 text-xs tracking-wide mt-0.5">{project.subtitle}</p>
              </div>
              <span
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${statusStyles[project.status]}`}
              >
                <Circle size={6} className="fill-current" />
                {project.status}
              </span>
            </div>

            <p className="text-gray-400 text-sm tracking-wide leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/[0.06] text-gray-400 text-xs tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 text-sm font-medium tracking-wide hover:text-blue-300 transition-all duration-200 group-hover:gap-3"
              >
                View Live <ExternalLink size={13} />
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 text-sm font-medium tracking-wide hover:text-gray-300 transition-all duration-200"
                >
                  GitHub <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</motion.div>
```

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Portfolio.tsx
git commit -m "content: keep only Court Booking System in portfolio, center single card"
```

---

## Task 4: Update Social Link URLs

**Files:**
- Modify: `src/components/Contact.tsx` lines ~184–188
- Modify: `src/components/Footer.tsx` lines ~41–45

- [ ] **Step 1: Contact.tsx — update contactRows hrefs**

Replace the `contactRows` array:

```tsx
const contactRows = [
  { label: 'Email', value: 'hello@pauljison.dev', href: 'mailto:hello@pauljison.dev' },
  { label: 'LinkedIn', value: 'in/paul-andrei-jison', href: 'https://www.linkedin.com/in/paul-andrei-jison-55213a321/' },
  { label: 'GitHub', value: '@paul-andrei-jison', href: 'https://github.com/paul-andrei-jison' },
  { label: 'Read.cv', value: 'paul.read.cv', href: '#' },
];
```

- [ ] **Step 2: Footer.tsx — update Social column hrefs**

Replace the Social column links (lines ~41–45):

```tsx
{/* Social */}
<div>
  <h5 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', marginBottom: 18 }}>
    Social
  </h5>
  <a href="https://github.com/paul-andrei-jison" target="_blank" rel="noopener noreferrer" className="footer-col-link" data-hover>GitHub ↗</a>
  <a href="https://www.linkedin.com/in/paul-andrei-jison-55213a321/" target="_blank" rel="noopener noreferrer" className="footer-col-link" data-hover>LinkedIn ↗</a>
  <a href="#" className="footer-col-link" data-hover>Twitter ↗</a>
  <a href="#" className="footer-col-link" data-hover>Read.cv ↗</a>
</div>
```

- [ ] **Step 3: Build check**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx
git commit -m "content: set real LinkedIn and GitHub URLs in contact and footer"
```

---

## Task 5: Mobile Responsiveness Overhaul

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/About.tsx`
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Hero.tsx — mobile padding + font scaling**

Update the section outer `padding` style and the inner content wrapper:

```tsx
// Section element — existing padding: '120px 0 80px'
// Change to:
style={{
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  padding: '100px 0 60px',
}}

// Content wrapper div — existing padding: '0 40px'
// Change to:
style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}
```

Add to Hero.tsx `<style>` block (append to existing):

```tsx
<style>{`
  @media (max-width: 900px) {
    .hero-bottom {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
      margin-top: 60px !important;
    }
  }
  @media (max-width: 600px) {
    .hero-bottom { margin-top: 40px !important; }
  }
`}</style>
```

- [ ] **Step 2: About.tsx — fix Reveal bento grid bug + mobile collapse**

The `Reveal` component wraps each bento cell in a `motion.div`, but `gridColumn`/`gridRow` are set on the inner `bento-cell` div instead of the motion.div grid item. This breaks spanning on all screens. Fix by updating the `Reveal` component to accept and forward `style`:

```tsx
// Replace About.tsx local Reveal with:
function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const, delay }}
      style={{ height: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}
```

Move `gridColumn`/`gridRow` from each `bento-cell` inline style up to the wrapping `<Reveal style={...}>`. For example:

```tsx
{/* Bio — 3 col × 2 row */}
<Reveal style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
  <div className="bento-cell" style={{ padding: 32, overflow: 'visible', height: '100%' }}>
    ...
  </div>
</Reveal>

{/* Each skill cell */}
{skills.slice(0, 3).map((skill, i) => (
  <Reveal key={skill.tag} delay={i * 0.05} style={{ gridColumn: 'span 1' }}>
    <div className="bento-cell skill-cell" style={{ height: '100%' }} data-hover>
      ...
    </div>
  </Reveal>
))}

{/* Robotics — 1 col × 2 row */}
<Reveal delay={0.15} style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
  <div className="bento-cell" style={{ background: '...', display: 'flex', flexDirection: 'column', height: '100%' }}>
    ...
  </div>
</Reveal>

{/* Remaining skill cells */}
{skills.slice(3).map((skill, i) => (
  <Reveal key={skill.tag} delay={(i + 3) * 0.05} style={{ gridColumn: 'span 1' }}>
    <div className="bento-cell skill-cell" style={{ height: '100%' }} data-hover>
      ...
    </div>
  </Reveal>
))}

{/* Languages — 2 col × 2 row */}
<Reveal delay={0.1} style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
  <div className="bento-cell" style={{ background: '...', height: '100%' }}>
    ...
  </div>
</Reveal>

{/* Currently — 3 col × 1 row */}
<Reveal delay={0.2} style={{ gridColumn: 'span 3' }}>
  <div className="bento-cell" style={{ background: '...', height: '100%' }}>
    ...
  </div>
</Reveal>
```

Add className `bento-grid` to the grid container and add responsive styles:

```tsx
// Change the bento grid container opening tag:
<div
  className="bento-grid"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gridAutoRows: 200,
    gap: 16,
    paddingBottom: 60,
  }}
>
```

Add to About.tsx `<style>` block:

```tsx
<style>{`
  @media (max-width: 900px) {
    .section-head { grid-template-columns: 1fr !important; gap: 24px !important; padding: 100px 0 50px !important; }
    .bento-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: auto !important; }
    .bento-grid > * { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 180px; }
    .bento-grid > *:first-child { grid-column: span 2 !important; min-height: 220px; }
  }
  @media (max-width: 600px) {
    .bento-grid { grid-template-columns: 1fr !important; }
    .bento-grid > *:first-child { grid-column: span 1 !important; }
  }
`}</style>
```

Also add responsive padding to the About section wrapper:

```tsx
// Change existing padding: '0 40px' to:
style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}
```

- [ ] **Step 3: Projects.tsx — responsive padding**

Update the content wrapper padding:

```tsx
// Change padding: '0 40px' to:
style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}
```

Update the `<style>` block to improve mobile article layout:

```tsx
<style>{`
  @media (max-width: 900px) {
    .section-head { grid-template-columns: 1fr !important; gap: 24px !important; padding: 80px 0 40px !important; }
    .project-article { grid-template-columns: 1fr !important; gap: 30px !important; min-height: auto !important; padding: 48px 0 !important; }
    .project-article > div { order: 0 !important; padding: 0 !important; }
  }
  @media (max-width: 600px) {
    .project-article { padding: 32px 0 !important; }
  }
`}</style>
```

- [ ] **Step 4: Contact.tsx — responsive padding + stack grid**

Update wrapper padding:

```tsx
style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}
```

Update Contact section top padding and the `<style>` block:

```tsx
// Section style — change padding: '160px 0 80px' to:
style={{ padding: 'clamp(80px, 12vw, 160px) 0 80px', borderTop: '1px solid var(--line)', position: 'relative' }}
```

```tsx
<style>{`
  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .contact-row { grid-template-columns: 100px 1fr auto !important; }
  }
  @media (max-width: 600px) {
    .contact-row { gap: 8px !important; }
  }
`}</style>
```

Ensure the chatbot card has a max-height on mobile (it's currently `height: 480px` which can overflow small screens):

```tsx
// chatbot-card style — handled in CSS. Add to index.css (done in Task 6)
```

- [ ] **Step 5: Footer.tsx — responsive padding**

Update wrapper padding:

```tsx
style={{ width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}
```

Update footer outer padding:

```tsx
style={{ padding: '60px 0 30px', borderTop: '1px solid var(--line)', background: 'var(--bg-0)' }}
```

- [ ] **Step 6: Build check**

```bash
npm run build
```
Expected: zero errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.tsx src/components/About.tsx src/components/Projects.tsx src/components/Contact.tsx src/components/Footer.tsx
git commit -m "feat: overhaul mobile responsiveness across all sections"
```

---

## Task 6: Progressive Enhancement (Desktop Cinematic / Mobile Utilitarian)

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Hero.tsx`

The strategy:
- **CSS hover states** — wrap all `:hover` pseudo-classes in `@media (hover: hover) and (pointer: fine)` so touch screens never trigger broken hover flashes
- **Animations** — wrap continuous/heavy effects in `@media (prefers-reduced-motion: no-preference)` and add a `prefers-reduced-motion: reduce` block
- **ParticleCanvas** — disable on mobile (it runs a continuous rAF loop that hammers CPU on phones)
- **Tap targets** — ensure all interactive elements are min 44×44px on mobile

- [ ] **Step 1: index.css — wrap all hover rules in pointer-fine media query**

Add this block at the end of `src/index.css` (it uses `@media` specificity to override the existing rules without deleting them):

```css
/* ===== PROGRESSIVE ENHANCEMENT ===== */

/* Only apply hover effects on devices with a fine pointer (mouse/trackpad).
   This prevents touch devices from showing stuck hover states. */
@media (hover: none) {
  .nav-link::after { width: 0 !important; }
  .nav-cta:hover { border-color: var(--line-strong) !important; background: none !important; }
  .mag-btn:hover { box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(79,179,217,0.45) !important; }
  .mag-btn:hover .arrow { transform: none !important; }
  .ghost-btn:hover { border-color: var(--line-strong) !important; background: none !important; color: var(--text-0) !important; }
  .tag-chip:hover { border-color: var(--line-strong) !important; color: var(--text-1) !important; background: none !important; }
  .bento-cell:hover { border-color: var(--line) !important; background: var(--bg-1) !important; }
  .skill-cell:hover .skill-icon { color: var(--text-1) !important; transform: none !important; }
  .skill-cell:hover .skill-tooltip { opacity: 0 !important; transform: translateY(10px) !important; }
  .project-visual:hover .project-visual-inner { transform: none !important; }
  .contact-row:hover { padding-left: 0 !important; }
  .contact-row:hover .ca { transform: none !important; border-color: var(--line-strong) !important; background: none !important; }
  .quick-btn:hover { border-color: var(--line-strong) !important; color: var(--text-1) !important; background: none !important; }
  .footer-col-link:hover { color: var(--text-1) !important; transform: none !important; }
}

/* Disable all non-essential animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .pulse-anim { animation: none !important; }
  .typing-dot { animation: none !important; opacity: 0.5 !important; }
}

/* Mobile tap target sizing — ensure all interactive elements hit 44px minimum */
@media (max-width: 768px) {
  .nav-cta { min-height: 44px; padding: 10px 16px !important; font-size: 10px !important; }
  .mag-btn { min-height: 52px; padding: 16px 24px !important; }
  .ghost-btn { min-height: 52px; padding: 14px 20px !important; }
  .contact-row { min-height: 56px; padding: 16px 0 !important; }
  .quick-btn { min-height: 40px; padding: 10px 14px !important; }
  .chatbot-card { height: auto !important; max-height: 420px; }
}
```

- [ ] **Step 2: Hero.tsx — disable ParticleCanvas on mobile/reduced-motion**

Add a hook at the top of the `Hero` function component to check for mobile:

```tsx
// Add import at top of Hero.tsx:
import { useEffect, useRef, useCallback, useState, type ReactNode } from 'react';

// Inside the Hero() component, before the return:
const [showParticles, setShowParticles] = useState(false);

useEffect(() => {
  // Only run on non-touch desktop — particle canvas is CPU-intensive
  const noTouch = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const okMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setShowParticles(noTouch && okMotion);
}, []);

// In the JSX, conditionally render:
{showParticles && <ParticleCanvas />}
```

- [ ] **Step 3: Build check**

```bash
npm run build
```
Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/components/Hero.tsx
git commit -m "feat: progressive enhancement — disable hover states on touch, kill particle canvas on mobile"
```

---

## Task 7: Final Review + Git Push

- [ ] **Step 1: Full build + type check**

```bash
npm run build
```
Expected: `✓ built in X.Xs` with zero errors or warnings.

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```
Expected: `Branch 'main' set up to track remote branch 'main' from 'origin'.`

---

## Spec Coverage Self-Review

| Requirement | Task |
|---|---|
| Remove "Manila, PH" | Task 1 |
| Remove Philippines / Quezon City references | Task 1 |
| Badge → "Remote • Now open to new opportunities" | Task 1 |
| Remove hero stats (7+ Years, 40+, 12 Clients) | Task 2 |
| Delete Portfolio projects 1 & 2, keep Court Booking | Task 3 |
| LinkedIn href set | Task 4 |
| GitHub href set | Task 4 |
| Grid/flex mobile collapse (flex-col md:flex-row) | Task 5 |
| Mobile padding (px-4 py-12 md:px-8) | Task 5 |
| Text scaling — no overflow on small screens | Task 5 |
| Desktop: cinematic hover + Framer Motion | Preserved throughout (not removed) |
| Mobile: strip heavy animations | Task 6 |
| Disable hover states on touch | Task 6 |
| Fast scrolling / no lag on mobile | Task 6 |
| Large tap targets on mobile | Task 6 |
| `md:hover:` / `motion-safe` breakpoints | Task 6 |
| Git commit + push | Task 7 |
