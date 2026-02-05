import { services } from '../../data/services';
import ServiceCard from '../ui/ServiceCard';
import ScrollReveal from '../ui/ScrollReveal';

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-studio-surface">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              Services
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              Packages &amp; Pricing
            </h2>
            <div className="gold-line max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 100}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="text-center mt-16">
            <p className="text-studio-body mb-4">
              Looking for something custom?
            </p>
            <a
              href="#contact"
              className="inline-block text-studio-accent text-sm tracking-widest uppercase border-b border-studio-accent/50 pb-1 hover:border-studio-accent transition-colors"
            >
              Let&apos;s Talk
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
