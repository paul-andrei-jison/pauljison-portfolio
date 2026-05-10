import { X, Heart, Sparkles, Star, Sun, Music, Gift, Leaf, Bird, CloudSun, Flower, Rainbow } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const topIcons = [
  { icon: Sparkles, bg: 'bg-violet-100', color: 'text-violet-500' },
  { icon: Star,     bg: 'bg-amber-100',  color: 'text-amber-500 fill-amber-400' },
  { icon: Sun,      bg: 'bg-orange-100', color: 'text-orange-400' },
  { icon: Rainbow,  bg: 'bg-sky-100',    color: 'text-sky-500' },
  { icon: CloudSun, bg: 'bg-blue-100',   color: 'text-blue-400' },
  { icon: Bird,     bg: 'bg-teal-100',   color: 'text-teal-500' },
];

const bottomIcons = [
  { icon: Music,  bg: 'bg-pink-100',    color: 'text-pink-500' },
  { icon: Leaf,   bg: 'bg-emerald-100', color: 'text-emerald-500' },
  { icon: Gift,   bg: 'bg-rose-100',    color: 'text-rose-500' },
  { icon: Flower, bg: 'bg-fuchsia-100', color: 'text-fuchsia-500' },
  { icon: Star,   bg: 'bg-yellow-100',  color: 'text-yellow-500 fill-yellow-400' },
  { icon: Heart,  bg: 'bg-red-100',     color: 'text-red-400 fill-red-300' },
];

export default function MothersDay({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-gradient-to-br from-rose-50 via-pink-50 to-violet-50 rounded-3xl border border-rose-200/60 shadow-2xl shadow-rose-400/20 overflow-hidden"
        style={{ animation: 'fadeInUp 0.35s ease-out both' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ambient background blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-200/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-rose-100 hover:bg-rose-200 flex items-center justify-center text-rose-400 hover:text-rose-600 transition-all duration-200 active:scale-90"
          aria-label="Close"
        >
          <X size={14} />
        </button>

        <div className="px-7 pt-7 pb-8 flex flex-col items-center gap-5">

          {/* Top icon row */}
          <div className="flex items-center justify-center gap-2">
            {topIcons.map(({ icon: Icon, bg, color }, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shadow-sm`}
                style={{ animation: `pulse 2.4s ease-in-out ${i * 0.2}s infinite` }}
              >
                <Icon size={15} className={color} />
              </div>
            ))}
          </div>

          {/* Central heart */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-rose-300/30 blur-xl" />
            <div
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center shadow-lg shadow-rose-300/50"
              style={{ animation: 'pulse 1.8s ease-in-out infinite' }}
            >
              <Heart size={30} className="text-white fill-white" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-rose-400 text-[10px] font-medium tracking-[0.2em] uppercase mb-2">
              A little note ✨
            </p>
            <h2 className="font-serif text-3xl font-semibold text-rose-800 leading-tight tracking-wide mb-1">
              Happy Mother's
              <br />
              Day!
            </h2>
            <p className="font-serif text-4xl italic text-rose-500 tracking-wide mt-2">
              Pinya ♡
            </p>
          </div>

          {/* Divider with small hearts */}
          <div className="flex items-center gap-2 text-rose-300">
            <div className="h-px w-8 bg-rose-200" />
            <Heart size={9} className="fill-rose-300 text-rose-300" />
            <Heart size={12} className="fill-rose-400 text-rose-400" />
            <Heart size={9} className="fill-rose-300 text-rose-300" />
            <div className="h-px w-8 bg-rose-200" />
          </div>

          {/* Message */}
          <p className="text-stone-500 text-sm text-center leading-relaxed font-light italic px-2">
            "Thank you for being the warmest, most wonderful person in our lives."
          </p>

          {/* Bottom icon row */}
          <div className="flex items-center justify-center gap-2">
            {bottomIcons.map(({ icon: Icon, bg, color }, i) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shadow-sm`}
                style={{ animation: `pulse 2.6s ease-in-out ${i * 0.25}s infinite` }}
              >
                <Icon size={15} className={color} />
              </div>
            ))}
          </div>

          {/* Signature */}
          <div className="text-center pt-1">
            <p className="text-stone-400 text-xs tracking-widest uppercase">With all my love</p>
            <p className="font-serif text-xl italic text-rose-600 mt-1">— Bart 💌</p>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0)     scale(1);    }
          }
        `}</style>
      </div>
    </div>
  );
}
