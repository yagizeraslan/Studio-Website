import { useState, useMemo } from 'react';
import { categories, portfolioItems } from '../../data/portfolioItems';
import FilterBar from '../ui/FilterBar';
import GalleryGrid from '../ui/GalleryGrid';
import Lightbox from '../ui/Lightbox';
import ScrollReveal from '../ui/ScrollReveal';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  const handleNavigate = (direction) => {
    if (!lightboxItem) return;
    const currentIndex = filtered.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < filtered.length) {
      setLightboxItem(filtered[nextIndex]);
    }
  };

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              Portfolio
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              Selected Works
            </h2>
            <div className="gold-line max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <FilterBar
            categories={categories}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <GalleryGrid items={filtered} onSelect={setLightboxItem} />
        </ScrollReveal>
      </div>

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          items={filtered}
          onClose={() => setLightboxItem(null)}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
}
