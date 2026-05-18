import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projects';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
    >
      <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectsGallery() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggle(id: string) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  return (
    <section id="work" className="project-section">
      <div className="container px-4">

        {/* Section header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto', textAlign: 'center', alignItems: 'center', padding: '120px 0 60px' }}>
          <span className="sec-eyebrow"><span className="edot" />Selected work</span>
          <h2 className="sec-title">
            Projects I'm <span className="hl">proud</span> to walk you through.
          </h2>
        </div>

        {/* Accordion list */}
        <div className="max-w-3xl mx-auto divide-y divide-white/10">
          {PROJECTS.map(project => {
              const isOpen = expandedId === project.id;
              return (
                <div key={project.id}>
                  {/* Header row */}
                  <button
                    onClick={() => toggle(project.id)}
                    className="w-full flex items-center justify-between px-2 py-5 text-left group"
                  >
                    <span className="text-lg font-semibold text-neutral-900 group-hover:text-white transition-colors duration-200">
                      {project.title}
                    </span>
                    <span className="text-white/40 group-hover:text-white/80 transition-colors duration-200 ml-4 shrink-0">
                      <ChevronIcon open={isOpen} />
                    </span>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row gap-6 px-2 pb-8 pt-2">
                          {/* Image */}
                          {project.imageUrl && (
                            <div className="md:w-64 shrink-0">
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full rounded-xl object-cover aspect-video"
                              />
                            </div>
                          )}

                          {/* Text content */}
                          <div className="flex flex-col gap-4 flex-1">
                            <p className="text-sm text-neutral-600 leading-relaxed">
                              {project.description}
                            </p>

                            {project.techStack && (
                              <div className="project-tags">
                                {project.techStack.map(tag => (
                                  <span key={tag} className="glass-pill sm">
                                    <span className="glass-icon">
                                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="2.5" /></svg>
                                    </span>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {project.liveUrl && (
                              <div className="mt-auto">
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="glass-btn dark"
                                  style={{ padding: '12px 20px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                >
                                  View Live
                                  <span className="ico">
                                    <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  </span>
                                  <span className="btn-glow" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
}
