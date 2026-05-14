import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>({ authMode: 'apiKey' });

type Project = Schema['Project']['type'];

export default function ProjectsGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const sub = client.models.Project.observeQuery().subscribe({
      next: ({ items }) => setProjects([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  const filtered = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.techStack ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <section id="work" className="project-section">
      <div className="container">

        {/* Section header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto', textAlign: 'center', alignItems: 'center', padding: '120px 0 60px' }}>
          <span className="sec-eyebrow"><span className="edot" />Selected work</span>
          <h2 className="sec-title">
            Projects I'm <span className="hl">proud</span> to walk you through.
          </h2>
        </div>

        {/* Search bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title or tech stack…"
            className="border border-white/10 bg-white/5 rounded-xl px-4 py-3 w-full max-w-md text-sm text-white placeholder-white/30 outline-none focus:border-white/20"
          />
        </div>

        {/* Project grid */}
        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {projects.length === 0 ? 'No projects yet.' : 'No projects match your search.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map(project => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col gap-3"
              >
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#E8EEFF' }}>{project.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(139,156,200,0.7)', lineHeight: 1.6, flex: 1 }}>{project.description}</p>
                {project.techStack && (
                  <div className="project-tags">
                    {project.techStack.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
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
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn dark"
                    style={{ padding: '12px 20px', fontSize: 13, marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    View Live
                    <span className="ico">
                      <svg width="10" height="10" viewBox="0 0 11 11" fill="none"><path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="btn-glow" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
