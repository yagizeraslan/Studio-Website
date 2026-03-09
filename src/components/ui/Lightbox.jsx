import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Aperture, Timer, Sun, Focus } from 'lucide-react';

export default function Lightbox({ item, items, onClose, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    setImageLoaded(false);
  }, [item.id]);

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
          className="absolute left-4 md:left-8 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Content */}
      <div
        className="max-w-6xl w-full mx-4 md:mx-8 max-h-[90vh] flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container with mobile overlay */}
        <div className="relative flex items-center justify-center flex-1 min-h-0">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-studio-accent/30 border-t-studio-accent rounded-full animate-spin" />
            </div>
          )}

          <img
            src={item.src}
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            className={`max-h-[70vh] md:max-h-[85vh] max-w-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Mobile: Gradient overlay with text */}
          <div
            key={`mobile-${item.id}`}
            className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16 pb-4 px-4"
          >
            <p
              className="text-studio-accent text-xs tracking-[0.2em] uppercase mb-2 animate-slideUp opacity-0"
              style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
            >
              {item.category}
            </p>
            <h3
              className="font-display text-white text-2xl mb-2 animate-slideUp opacity-0"
              style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
            >
              {item.title}
            </h3>
            {item.location && (
              <div
                className="flex items-center gap-1.5 text-white/70 text-sm animate-slideUp opacity-0"
                style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
              >
                <MapPin size={12} />
                <span>{item.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: EXIF bar below image */}
        {item.exif && (
          <div
            key={`mobile-exif-${item.id}`}
            className="w-full md:hidden flex items-center justify-center gap-4 py-3 text-xs animate-slideUp opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-1.5">
              <Camera size={12} className="text-studio-accent" />
              <span className="text-studio-body">Xiaomi 14 Ultra</span>
            </div>
            <span className="text-studio-border">|</span>
            <span className="text-studio-body">{item.exif.shutter}</span>
            <span className="text-studio-body">{item.exif.aperture}</span>
            <span className="text-studio-body">ISO {item.exif.iso}</span>
            <span className="text-studio-body">{item.exif.focalLength}</span>
          </div>
        )}

        {/* Desktop: Side Panel */}
        <div key={item.id} className="hidden md:flex w-80 flex-shrink-0 flex-col justify-center py-8">
          {/* Category */}
          <p
            className="text-studio-accent text-sm tracking-[0.25em] uppercase mb-4 animate-slideDown opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            {item.category}
          </p>

          {/* Title */}
          <h3
            className="font-display text-studio-heading text-4xl mb-5 animate-slideDown opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p
            className="text-studio-body text-base leading-relaxed mb-6 animate-slideDown opacity-0"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            {item.description}
          </p>

          {/* Location */}
          {item.location && (
            <div
              className="flex items-center gap-2.5 text-studio-body/80 text-base mb-8 animate-slideDown opacity-0"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              <MapPin size={16} className="text-studio-accent" />
              <span>{item.location}</span>
            </div>
          )}

          {/* Divider */}
          <div
            className="w-16 h-px bg-studio-accent/50 mb-8 animate-scaleX origin-left opacity-0"
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
          />

          {/* EXIF Data */}
          {item.exif && (
            <div
              className="space-y-4 animate-slideDown opacity-0"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-3">
                <Camera size={18} className="text-studio-accent" />
                <span className="text-studio-heading text-base">{item.exif.camera}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div className="flex items-center gap-2.5">
                  <Timer size={16} className="text-studio-accent/70" />
                  <span className="text-studio-body">{item.exif.shutter}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Aperture size={16} className="text-studio-accent/70" />
                  <span className="text-studio-body">{item.exif.aperture}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sun size={16} className="text-studio-accent/70" />
                  <span className="text-studio-body">ISO {item.exif.iso}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Focus size={16} className="text-studio-accent/70" />
                  <span className="text-studio-body">{item.exif.focalLength}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next */}
      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
          className="absolute right-4 md:right-8 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer z-10"
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 text-white/50 md:text-studio-body/60 text-xs md:text-sm">
        {currentIndex + 1} / {items.length}
      </p>
    </div>
  );
}
