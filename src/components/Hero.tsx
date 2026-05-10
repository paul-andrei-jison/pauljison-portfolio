import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
          <Sparkles size={12} className="text-blue-400" />
          <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
            Davao's Premier Full-Stack Developer
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
          We Build Digital Systems
          <br />
          <span className="text-blue-400">That Win Clients,</span>
          <br />
          Grow Businesses.
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-lg md:text-xl tracking-wide leading-relaxed max-w-2xl mx-auto mb-10">
          JisonTechSolutions crafts premium web applications, high-converting landing pages,
          and smart automations for Davao City's most ambitious businesses.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold tracking-wide transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            View Our Work <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold tracking-wide transition-all duration-300 active:scale-95"
          >
            Get a Free Audit
          </a>
        </div>
      </div>
    </section>
  );
}
