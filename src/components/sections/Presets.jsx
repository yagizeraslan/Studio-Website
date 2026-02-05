import { Download, Check, ExternalLink } from 'lucide-react';
import { presets } from '../../data/presets';
import ScrollReveal from '../ui/ScrollReveal';

export default function Presets() {
  return (
    <section id="presets" className="py-24 px-6 bg-studio-surface">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              Presets &amp; LUTs
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              Edit Like a Pro
            </h2>
            <p className="text-studio-body max-w-2xl mx-auto mb-6">
              The same Lightroom presets and video LUTs I use in my own work — crafted for
              nature and landscape creators.
            </p>
            <div className="gold-line max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {presets.map((preset, i) => (
            <ScrollReveal key={preset.id} delay={i * 100}>
              <div
                className={`relative flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                  preset.popular
                    ? 'border-studio-accent/50'
                    : 'border-studio-border hover:border-studio-body/30'
                }`}
              >
                {preset.popular && (
                  <span className="absolute -top-3 left-8 bg-studio-accent text-black text-[10px] tracking-widest uppercase px-3 py-1 font-medium z-10">
                    Best Value
                  </span>
                )}

                {/* Preview gradient */}
                <div className={`aspect-[16/9] bg-gradient-to-br ${preset.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Download size={32} className="text-white/20" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-8 bg-studio-surface">
                  <h3 className="font-display text-studio-heading text-xl mb-2">
                    {preset.title}
                  </h3>
                  <p className="text-studio-body text-sm leading-relaxed mb-6">
                    {preset.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {preset.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check size={14} className="text-studio-accent shrink-0 mt-0.5" />
                        <span className="text-studio-body">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto border-t border-studio-border pt-6 flex items-end justify-between">
                    <div>
                      <p className="font-display text-studio-heading text-2xl">
                        {preset.price}
                      </p>
                    </div>
                    <a
                      href={preset.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
                        preset.popular
                          ? 'bg-studio-accent text-black border-studio-accent hover:bg-studio-accent-hover'
                          : 'border-studio-accent text-studio-accent hover:bg-studio-accent hover:text-black'
                      }`}
                    >
                      Get It
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
