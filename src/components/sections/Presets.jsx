import { useState } from 'react';
import { Check, ExternalLink, Eye } from 'lucide-react';
import { presets } from '../../data/presets';
import ScrollReveal from '../ui/ScrollReveal';
import PresetLightbox from '../ui/PresetLightbox';

const IMAGE_BASE = 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Photography/Studio';

export default function Presets() {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [clickedRect, setClickedRect] = useState(null);

  const handlePresetClick = (preset, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickedRect(rect);
    setSelectedPreset(preset);
  };

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
              urban night photography and cinematic street scenes.
            </p>
            <div className="gold-line max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {presets.map((preset, i) => (
            <ScrollReveal key={preset.id} delay={i * 100}>
              <div
                className={`group relative flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
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

                {/* Preview image - clickable */}
                <button
                  onClick={(e) => handlePresetClick(preset, e)}
                  className="aspect-[4/3] relative overflow-hidden w-full border-none p-0 cursor-pointer"
                >
                  <img
                    src={`${IMAGE_BASE}/${preset.previewImage}`}
                    alt={preset.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${preset.gradient} opacity-40`} />

                  {/* Preview overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-white text-sm tracking-wider uppercase">
                      <Eye size={18} />
                      Preview
                    </div>
                  </div>
                </button>

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

      {selectedPreset && (
        <PresetLightbox
          preset={selectedPreset}
          onClose={() => setSelectedPreset(null)}
          initialRect={clickedRect}
        />
      )}
    </section>
  );
}
