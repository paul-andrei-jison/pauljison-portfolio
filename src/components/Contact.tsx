import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, MapPin, Mail, Clock } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const emptyForm: FormData = { name: '', email: '', company: '', message: '' };

const trustSignals = [
  { icon: MapPin, label: 'Location', value: 'Davao City, Philippines' },
  { icon: Mail, label: 'Email', value: 'hello@pauljison.com' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
] as const;

const inputBase =
  'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-600 text-sm tracking-wide focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200';

export default function Contact() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Connect to Render Backend API
      const res = await fetch('https://api.pauljison.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Non-2xx response');

      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-blue-400 text-xs font-medium tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Ready to Build Something?
          </h2>
          <p className="mt-4 text-gray-400 tracking-wide max-w-xl mx-auto">
            Tell us about your project. We'll get back within 24 hours with a clear proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Trust signals */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {trustSignals.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs tracking-widest uppercase">{label}</p>
                    <p className="text-white text-sm tracking-wide mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06]" />

            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
              <p className="text-blue-300 text-sm tracking-wide leading-relaxed">
                "We specialize in turning complex business problems into elegant digital solutions.
                Every project starts with a free discovery call."
              </p>
              <p className="text-gray-500 text-xs tracking-wide mt-4">— Paul Jison, Founder</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-gray-400 text-xs tracking-widest uppercase">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Juan dela Cruz"
                  className={inputBase}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-gray-400 text-xs tracking-widest uppercase">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="juan@business.com"
                  className={inputBase}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-gray-400 text-xs tracking-widest uppercase">
                Company (optional)
              </label>
              <input
                id="company"
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Your Business Name"
                className={inputBase}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-gray-400 text-xs tracking-widest uppercase">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project, timeline, and goals..."
                className={`${inputBase} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold tracking-wide transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
              {status === 'success' && <CheckCircle size={16} />}
              {(status === 'idle' || status === 'error') && <Send size={16} />}
              {status === 'loading'
                ? 'Sending...'
                : status === 'success'
                  ? 'Message Sent!'
                  : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-emerald-400 text-sm tracking-wide">
                <CheckCircle size={14} /> We'll be in touch within 24 hours.
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-rose-400 text-sm tracking-wide">
                <AlertCircle size={14} /> Something went wrong. Please email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
