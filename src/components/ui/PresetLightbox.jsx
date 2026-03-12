import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react';

export default function PresetLightbox({ preset, onClose, initialRect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial' | 'flying' | 'complete' | 'closing'
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [targetRect, setTargetRect] = useState(null);
  const startRectRef = useRef(initialRect);

  // Calculate target position after mount
  useLayoutEffect(() => {
    if (imageContainerRef.current && animationPhase === 'initial') {
      const rect = imageContainerRef.current.getBoundingClientRect();
      setTargetRect(rect);
      // Start flying animation after a frame
      requestAnimationFrame(() => {
        setAnimationPhase('flying');
        // Complete animation after transition
        setTimeout(() => setAnimationPhase('complete'), 400);
      });
    }
  }, []);

  const handleClose = () => {
    if (startRectRef.current && animationPhase === 'complete') {
      setAnimationPhase('closing');
      setTimeout(() => onClose(), 350);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, animationPhase]);

  // Reset slider when changing comparison
  useEffect(() => {
    setSliderPosition(70);
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

  // Calculate flying image styles
  const startRect = startRectRef.current;

  const getFlyingImageStyle = () => {
    if (!startRect || !targetRect) return {};

    if (animationPhase === 'initial') {
      return {
        position: 'fixed',
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        zIndex: 110,
        transition: 'none',
      };
    }

    if (animationPhase === 'flying') {
      return {
        position: 'fixed',
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,
        zIndex: 110,
        transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
      };
    }

    if (animationPhase === 'complete') {
      return {
        position: 'fixed',
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,
        zIndex: 1, // Lower z-index so UI elements appear on top
        transition: 'none',
      };
    }

    if (animationPhase === 'closing') {
      return {
        position: 'fixed',
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        zIndex: 110,
        transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
      };
    }

    return {};
  };

  // Hide flying image when complete - the Before/After slider needs to be fully visible
  // Show during initial, flying, and closing phases only
  const showFlyingImage = startRect && targetRect && (animationPhase === 'initial' || animationPhase === 'flying' || animationPhase === 'closing');

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-300 ${
        animationPhase === 'initial' || animationPhase === 'closing' ? 'bg-black/0' : 'bg-black/95'
      }`}
      onClick={handleClose}
    >
      {/* Flying image overlay */}
      {showFlyingImage && currentComparison && (
        <div
          style={getFlyingImageStyle()}
          className="overflow-hidden"
        >
          <img
            src={currentComparison.after}
            alt={preset.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Close button */}
      <button
        onClick={handleClose}
        className={`absolute top-6 right-6 text-studio-body hover:text-studio-heading transition-all bg-transparent border-none cursor-pointer z-10 ${
          animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Content */}
      <div
        className={`w-full max-w-6xl mx-4 max-h-[90vh] flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-8 transition-opacity duration-300 ${
          animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Before/After Slider */}
        <div className="flex-1 flex flex-col items-center w-full lg:w-auto">
          <div className="relative w-full max-w-xl flex items-center">
            {/* Prev button - inside image on mobile, outside on desktop */}
            {comparisons.length > 1 && currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2 lg:-left-14 top-1/2 -translate-y-1/2 text-white lg:text-studio-body hover:text-studio-heading transition-colors bg-black/50 lg:bg-transparent rounded-full p-1 lg:p-0 border-none cursor-pointer z-20"
                aria-label="Previous"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next button - inside image on mobile, outside on desktop */}
            {comparisons.length > 1 && currentIndex < comparisons.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 lg:-right-14 top-1/2 -translate-y-1/2 text-white lg:text-studio-body hover:text-studio-heading transition-colors bg-black/50 lg:bg-transparent rounded-full p-1 lg:p-0 border-none cursor-pointer z-20"
                aria-label="Next"
              >
                <ChevronRight size={28} />
              </button>
            )}

            <div
              ref={(el) => {
                containerRef.current = el;
                imageContainerRef.current = el;
              }}
              className="relative w-full aspect-[3/4] overflow-hidden cursor-ew-resize select-none bg-studio-surface"
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
                  className="absolute top-0 bottom-0 w-px bg-white/80 cursor-ew-resize z-10"
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
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            Preset Pack
          </p>

          <h3
            className="font-display text-studio-heading text-4xl mb-4 animate-slideDown opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            {preset.title}
          </h3>

          <p
            className="text-studio-body text-base leading-relaxed mb-6 animate-slideDown opacity-0"
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
          >
            {preset.description}
          </p>

          <div
            className="w-16 h-px bg-studio-accent/50 mb-6 animate-scaleX origin-left opacity-0"
            style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
          />

          <ul
            className="space-y-3 mb-8 animate-slideDown opacity-0"
            style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
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
            style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
          >
            <div className="flex items-center gap-2 text-studio-accent">
              <Calendar size={18} />
              <p className="text-sm tracking-widest uppercase">
                Available in April 2026
              </p>
            </div>
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

            <div className="flex items-center justify-center gap-2 text-studio-accent">
              <Calendar size={14} />
              <p className="text-xs tracking-widest uppercase">
                Available in April 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
