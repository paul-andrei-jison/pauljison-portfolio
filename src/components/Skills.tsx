import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillCategory {
  label: string;
  accent: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    label: 'Frontend',
    accent: 'text-blue-400',
    badgeBg: 'bg-blue-500/10',
    badgeBorder: 'border-blue-500/20',
    badgeText: 'text-blue-300',
    dotColor: 'bg-blue-400',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Next.js', 'Vite', 'Framer Motion'],
  },
  {
    label: 'Backend',
    accent: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    badgeText: 'text-emerald-300',
    dotColor: 'bg-emerald-400',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'Supabase', 'REST APIs'],
  },
  {
    label: 'Cloud & DevOps',
    accent: 'text-violet-400',
    badgeBg: 'bg-violet-500/10',
    badgeBorder: 'border-violet-500/20',
    badgeText: 'text-violet-300',
    dotColor: 'bg-violet-400',
    skills: ['AWS Amplify', 'AWS S3', 'Docker', 'GitHub Actions', 'Render', 'Vercel'],
  },
  {
    label: 'Payments & Integrations',
    accent: 'text-amber-400',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/20',
    badgeText: 'text-amber-300',
    dotColor: 'bg-amber-400',
    skills: ['Stripe', 'PayMongo', 'Webhooks', 'SendGrid', 'Twilio', 'Zapier'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
            Tech Stack
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Built With the Best Tools
          </h2>
          <p className="mt-4 text-gray-400 tracking-wide max-w-xl mx-auto">
            Every technology chosen for reliability, performance, and long-term maintainability.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {categories.map(cat => (
            <motion.div
              key={cat.label}
              variants={cardVariants}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md"
            >
              {/* Category label */}
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
                <p className={`${cat.accent} text-xs font-medium tracking-widest uppercase`}>
                  {cat.label}
                </p>
              </div>

              {/* Badge grid */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <motion.span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg ${cat.badgeBg} border ${cat.badgeBorder} ${cat.badgeText} text-xs font-medium tracking-wide cursor-default select-none`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
