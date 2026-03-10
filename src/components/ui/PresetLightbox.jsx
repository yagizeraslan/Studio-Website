import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Check, ExternalLink } from 'lucide-react';

export default function PresetLightbox({ preset, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, currentIndex]);

  // Reset slider when changing comparison
  useEffect(() => {
    setSliderPosition(50);
  }, [currentIndex]);

  if (!preset) return null;

  const comparisons = preset.comparisons || [];
  const currentComparison = comparisons[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < comparisons.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
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

      {/* Content */}
      <div
        className="w-full max-w-6xl mx-4 max-h-[90vh] flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Before/After Slider */}
        <div className="flex-1 flex flex-col items-center w-full lg:w-auto">
          <div className="relative w-full max-w-xl flex items-center">
            {/* Prev button */}
            {comparisons.length > 1 && currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute -left-12 lg:-left-14 top-1/2 -translate-y-1/2 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next button */}
            {comparisons.length > 1 && currentIndex < comparisons.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute -right-12 lg:-right-14 top-1/2 -translate-y-1/2 text-studio-body hover:text-studio-heading transition-colors bg-transparent border-none cursor-pointer z-10"
                aria-label="Next"
              >
                <ChevronRight size={28} />
              </button>
            )}

            <div
              ref={containerRef}
              className="relative w-full aspect-[3/4] overflow-hidden cursor-ew-resize select-none bg-studio-surface animate-fadeIn"
              onTouchMove={handleTouchMove}
            >
            {currentComparison && (
              <>
                {/* Images with animation on change */}
                <div key={currentIndex} className="absolute inset-0 animate-fadeIn">
                  {/* After image (full) */}
                  <img
                    src={currentComparison.after}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Before image (clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={currentComparison.before}
                      alt="Before"
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={() => {}}
                >
                  {/* Handle circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft size={14} className="text-black" />
                      <ChevronRight size={14} className="text-black" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs tracking-wider uppercase px-3 py-1.5">
                  Before
                </div>
                <div className="absolute top-4 right-4 bg-studio-accent text-black text-xs tracking-wider uppercase px-3 py-1.5">
                  After
                </div>
              </>
            )}
            </div>
          </div>

          {/* Carousel dots */}
          {comparisons.length > 1 && (
            <div className="flex gap-2 mt-3">
              {comparisons.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all bg-transparent border-none cursor-pointer ${
                    idx === currentIndex
                      ? 'bg-studio-accent w-6'
                      : 'bg-studio-body/30 hover:bg-studio-body/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Package details - Desktop */}
        <div className="hidden lg:flex w-80 flex-shrink-0 flex-col justify-center py-8">
          <p
            className="text-studio-accent text-sm tracking-[0.25em] uppercase mb-4 animate-slideDown opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            Preset Pack
          </p>

          <h3
            className="font-display text-studio-heading text-4xl mb-4 animate-slideDown opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            {preset.title}
          </h3>

          <p
            className="text-studio-body text-base leading-relaxed mb-6 animate-slideDown opacity-0"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            {preset.description}
          </p>

          <div
            className="w-16 h-px bg-studio-accent/50 mb-6 animate-scaleX origin-left opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          />

          <ul
            className="space-y-3 mb-8 animate-slideDown opacity-0"
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
          >
            {preset.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <Check size={16} className="text-studio-accent shrink-0 mt-0.5" />
                <span className="text-studio-body">{item}</span>
              </li>
            ))}
          </ul>

          <div
            className="animate-slideDown opacity-0"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          >
            <p className="font-display text-studio-heading text-4xl mb-6">
              {preset.price}
            </p>

            <a
              href={preset.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-sm tracking-widest uppercase px-6 py-4 bg-studio-accent text-black border border-studio-accent hover:bg-studio-accent-hover transition-all duration-300"
            >
              Purchase
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Package details - Mobile */}
        <div className="lg:hidden w-full max-w-xl px-4 pb-8">
          <div className="text-center">
            <p className="text-studio-accent text-xs tracking-[0.2em] uppercase mb-2">
              {preset.title}
            </p>
            <p className="text-studio-body text-sm mb-4 line-clamp-2">
              {preset.description}
            </p>

            <div className="flex items-center justify-center gap-4">
              <p className="font-display text-studio-heading text-2xl">
                {preset.price}
              </p>
              <a
                href={preset.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-2.5 bg-studio-accent text-black hover:bg-studio-accent-hover transition-all duration-300"
              >
                Purchase
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
