import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <img
          src="https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Photography/Studio/IMG_20260210_185551%20(2).jpg"
          alt="Cinematic urban photography"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-studio-bg/60 via-transparent to-studio-bg/60" />
      <div className="absolute inset-0 vignette" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-studio-accent text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in-up">
          Cinematic Urban Photography
        </p>
        <h1
          className="font-display text-studio-heading text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          Stories in{' '}
          <span className="italic">Light</span> &amp; Shadow
        </h1>
        <p
          className="text-studio-body text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          Capturing the soul of cities after dark — where neon meets rain,
          and every street tells a story.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <a
            href="#photography"
            className="border border-studio-accent text-studio-accent px-8 py-3 text-sm tracking-widest uppercase hover:bg-studio-accent hover:text-black transition-all duration-300"
          >
            Photography
          </a>
          <a
            href="#videography"
            className="border border-studio-accent text-studio-accent px-8 py-3 text-sm tracking-widest uppercase hover:bg-studio-accent hover:text-black transition-all duration-300"
          >
            Videography
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
