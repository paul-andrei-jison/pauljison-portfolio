import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>({ authMode: 'apiKey' });

type Project = Schema['Project']['type'];

export default function ProjectsGallery() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const sub = client.models.Project.observeQuery().subscribe({
      next: ({ items }) => setProjects([...items]),
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <section id="work" className="project-section">
      <div className="container">
        <p style={{ color: 'white' }}>Loaded {projects.length} projects.</p>
      </div>
    </section>
  );
}
