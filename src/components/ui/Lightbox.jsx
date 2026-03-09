import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Aperture, Timer, Sun, Focus, ChevronDown } from 'lucide-react';

export default function Lightbox({ item, items, onClose, onNavigate }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    setImageLoaded(false);
    setShowDetails(false);
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
        {/* Image container */}
        <div className="relative flex items-center justify-center flex-1 min-h-0">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-studio-accent/30 border-t-studio-accent rounded-full animate-spin" />
            </div>
          )}

          <img
            key={item.id}
            src={item.src}
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            className="max-h-[70vh] md:max-h-[85vh] max-w-full object-contain animate-fadeIn"
          />
        </div>

        {/* Mobile: Minimal info + expand arrow */}
        <div
          key={`mobile-minimal-${item.id}`}
          className={`md:hidden w-full text-center py-4 px-4 transition-opacity duration-200 ${
            showDetails ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <p
            className="text-studio-accent text-xs tracking-[0.2em] uppercase mb-1 animate-slideUp opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            {item.category}
          </p>
          <h3
            className="font-display text-studio-heading text-xl mb-3 animate-slideUp opacity-0"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            {item.title}
          </h3>
          <button
            onClick={() => setShowDetails(true)}
            className="animate-slideUp opacity-0 bg-transparent border-none cursor-pointer text-studio-body/50 hover:text-studio-accent transition-colors"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <ChevronDown size={24} className="animate-bounce" />
          </button>
        </div>

        {/* Mobile: Full details overlay */}
        {showDetails && (
          <div
            className="md:hidden absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 z-20"
            onClick={() => setShowDetails(false)}
          >
            <div
              className="max-w-sm text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category */}
              <p
                className="text-studio-accent text-sm tracking-[0.25em] uppercase mb-3 animate-slideDown opacity-0"
                style={{ animationDelay: '50ms', animationFillMode: 'forwards' }}
              >
                {item.category}
              </p>

              {/* Title */}
              <h3
                className="font-display text-white text-3xl mb-4 animate-slideDown opacity-0"
                style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-white/70 text-base leading-relaxed mb-5 animate-slideDown opacity-0"
                style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
              >
                {item.description}
              </p>

              {/* Location */}
              {item.location && (
                <div
                  className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6 animate-slideDown opacity-0"
                  style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
                >
                  <MapPin size={14} className="text-studio-accent" />
                  <span>{item.location}</span>
                </div>
              )}

              {/* Divider */}
              <div
                className="w-16 h-px bg-studio-accent/50 mx-auto mb-6 animate-scaleX opacity-0"
                style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}
              />

              {/* EXIF */}
              {item.exif && (
                <div
                  className="animate-slideDown opacity-0"
                  style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Camera size={16} className="text-studio-accent" />
                    <span className="text-white text-sm">{item.exif.camera}</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                    <span>{item.exif.shutter}</span>
                    <span>{item.exif.aperture}</span>
                    <span>ISO {item.exif.iso}</span>
                    <span>{item.exif.focalLength}</span>
                  </div>
                </div>
              )}

              {/* Close hint */}
              <p
                className="mt-8 text-white/40 text-xs animate-slideDown opacity-0"
                style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
              >
                Tap anywhere to close
              </p>
            </div>
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
      <p className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 text-studio-body/50 text-xs md:text-sm">
        {currentIndex + 1} / {items.length}
      </p>
    </div>
  );
}
