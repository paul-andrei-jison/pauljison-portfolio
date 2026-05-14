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

        {/* Placeholder for grid — next task */}
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
          {filtered.length} project(s) match.
        </p>

      </div>
    </section>
  );
}
