import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <div className="w-full h-full bg-gradient-to-br from-stone-900 via-neutral-900 to-black" />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-studio-accent text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in-up">
          Nature &amp; Landscape
        </p>
        <h1
          className="font-display text-studio-heading text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          Capturing the{' '}
          <span className="italic">Essence</span> of Light
        </h1>
        <p
          className="text-studio-body text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          Professional photography &amp; videography that transforms fleeting moments
          into timeless visual stories.
        </p>
        <div className="animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <a
            href="#portfolio"
            className="inline-block border border-studio-accent text-studio-accent px-8 py-3 text-sm tracking-widest uppercase hover:bg-studio-accent hover:text-black transition-all duration-300"
          >
            View Portfolio
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
        <ChevronDown size={24} className="text-studio-body/50" />
      </div>
    </section>
  );
}
