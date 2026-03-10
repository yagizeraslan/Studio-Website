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
          {/* Portrait */}
          <ScrollReveal>
            <div className="aspect-[1/1] overflow-hidden">
              <img
                src="https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Photography/Studio/portrait.jpg"
                alt="Yagiz Eraslan - Photographer"
                className="w-full h-full object-cover"
              />
            </div>
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

            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
