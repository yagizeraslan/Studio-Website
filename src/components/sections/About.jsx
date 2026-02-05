import { Camera } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import ScrollReveal from '../ui/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              About
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              The Photographer
            </h2>
            <div className="gold-line max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Portrait placeholder */}
          <ScrollReveal>
            <div className="aspect-[3/4] bg-gradient-to-br from-stone-800/50 via-neutral-800/30 to-stone-900/50 border border-studio-border" />
          </ScrollReveal>

          {/* Bio content */}
          <ScrollReveal delay={200}>
            <div>
              {siteConfig.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-studio-body leading-relaxed mb-6"
                >
                  {paragraph}
                </p>
              ))}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-8 border-y border-studio-border mb-8">
                {siteConfig.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-studio-heading text-3xl mb-1">
                      {stat.value}
                    </p>
                    <p className="text-studio-body text-xs tracking-wider uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Equipment */}
              <h3 className="font-display text-studio-heading text-lg mb-4">
                Equipment
              </h3>
              <ul className="space-y-2">
                {siteConfig.equipment.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-studio-body">
                    <Camera size={14} className="text-studio-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
