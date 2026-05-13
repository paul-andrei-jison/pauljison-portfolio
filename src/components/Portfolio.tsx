import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Circle } from 'lucide-react';

type Status = 'Live' | 'In Progress';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  status: Status;
  demoUrl: string;
  githubUrl?: string;
}

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

const statusStyles: Record<Status, string> = {
  Live: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'In Progress': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
};

function BrowserChrome({ slug }: { slug: string }) {
  return (
    <div className="rounded-t-xl bg-slate-900 border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
      <div className="flex gap-1.5" aria-hidden="true">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
      </div>
      <div className="flex-1 bg-slate-800/60 rounded-md px-3 py-1 text-xs text-gray-500 tracking-wide text-center truncate">
        {slug}.pauljison.com
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="portfolio" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
            Featured Project
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Live &amp; In Production
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
      </div>
    </section>
  );
}
