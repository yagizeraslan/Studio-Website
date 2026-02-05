import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ item, items, onClose, onNavigate }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer z-10"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Previous */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          className="absolute left-4 md:left-8 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer"
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Content */}
      <div
        className="max-w-5xl w-full mx-4 md:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`aspect-[16/10] bg-gradient-to-br ${item.gradient} w-full`} />
        <div className="mt-6 text-center">
          <p className="text-studio-accent text-xs tracking-widest uppercase mb-2">
            {item.category}
          </p>
          <h3 className="font-display text-studio-heading text-2xl mb-2">
            {item.title}
          </h3>
          <p className="text-studio-body text-sm">{item.description}</p>
        </div>
      </div>

      {/* Next */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          className="absolute right-4 md:right-8 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-6 text-studio-body/60 text-sm">
        {currentIndex + 1} / {items.length}
      </p>
    </div>
  );
}
