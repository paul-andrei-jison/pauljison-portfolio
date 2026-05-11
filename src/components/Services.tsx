import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, TrendingUp, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: 'Custom Web Applications',
    description:
      'Full-stack React and Node.js SaaS platforms, internal tools, and customer portals engineered for scale and long-term reliability.',
  },
  {
    icon: TrendingUp,
    title: 'High-Converting Landing Pages',
    description:
      'Conversion-optimized, pixel-perfect marketing sites and campaign pages that turn visitors into paying customers.',
  },
  {
    icon: Zap,
    title: 'Automation & Integrations',
    description:
      'API integrations, webhook pipelines, and workflow automation that eliminate manual work and unlock measurable business growth.',
  },
];

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

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Services Built for Results
          </h2>
          <p className="mt-4 text-gray-400 tracking-wide max-w-xl mx-auto">
            Every engagement is scoped for measurable business impact, not just technical delivery.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
                <Icon size={22} className="text-blue-400" />
              </div>

              <h3 className="text-white font-semibold text-lg tracking-tight mb-3">{title}</h3>
              <p className="text-gray-400 text-sm tracking-wide leading-relaxed">{description}</p>

              {/* Hover glow */}
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
