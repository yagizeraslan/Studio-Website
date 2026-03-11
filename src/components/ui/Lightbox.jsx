import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Aperture, Timer, Sun, Focus, ChevronDown } from 'lucide-react';

export default function Lightbox({ item, items, onClose, onNavigate, initialRect }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isClosingDetails, setIsClosingDetails] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('initial'); // 'initial' | 'flying' | 'complete' | 'closing'
  const [imageDimensions, setImageDimensions] = useState(null);
  const containerRef = useRef(null);
  const startRectRef = useRef(initialRect);
  const initialItemIdRef = useRef(item?.id); // Track originally clicked image

  // Preload image to get natural dimensions
  useLayoutEffect(() => {
    if (!item?.src) return;

    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = item.src;
  }, [item?.src]);

  // Calculate target position and start animation
  useLayoutEffect(() => {
    if (containerRef.current && imageDimensions && animationPhase === 'initial') {
      requestAnimationFrame(() => {
        setAnimationPhase('flying');
        setTimeout(() => setAnimationPhase('complete'), 400);
      });
    }
  }, [imageDimensions, animationPhase]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    setImageLoaded(false);
    setShowDetails(false);
    setIsClosingDetails(false);
  }, [item.id]);

  const handleCloseDetails = () => {
    setIsClosingDetails(true);
    setTimeout(() => {
      setShowDetails(false);
      setIsClosingDetails(false);
    }, 350);
  };

  const handleClose = () => {
    if (animationPhase === 'complete') {
      // Find current image's position in the gallery (not the original clicked one)
      const galleryImg = document.querySelector(`#photography img[src="${item.src}"]`);
      if (galleryImg) {
        const rect = galleryImg.getBoundingClientRect();
        startRectRef.current = rect; // Update return position to current image's location
      }
      setAnimationPhase('closing');
      setTimeout(() => onClose(), 350);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNavigate, animationPhase]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  // Calculate the final image size maintaining aspect ratio
  const getTargetImageRect = () => {
    if (!containerRef.current || !imageDimensions) return null;

    // Get the actual image element's position in the layout
    const imgElement = containerRef.current.querySelector('img');
    if (!imgElement) return null;

    const containerRect = imgElement.parentElement.getBoundingClientRect();
    const maxWidth = containerRect.width;
    const maxHeight = window.innerHeight * 0.85; // max-h-[85vh]

    const imgRatio = imageDimensions.width / imageDimensions.height;
    let finalWidth, finalHeight;

    if (maxWidth / maxHeight > imgRatio) {
      // Height constrained
      finalHeight = Math.min(maxHeight, imageDimensions.height);
      finalWidth = finalHeight * imgRatio;
    } else {
      // Width constrained
      finalWidth = Math.min(maxWidth, imageDimensions.width);
      finalHeight = finalWidth / imgRatio;
    }

    // Position centered within the image container area
    const left = containerRect.left + (containerRect.width - finalWidth) / 2;
    const top = containerRect.top + (containerRect.height - finalHeight) / 2;

    return { left, top, width: finalWidth, height: finalHeight };
  };

  const targetRect = getTargetImageRect();
  const startRect = startRectRef.current;

  // Calculate flying image styles using transform for smooth animation
  const getFlyingImageStyle = () => {
    if (!startRect || !targetRect) return { opacity: 0 };

    if (animationPhase === 'initial') {
      return {
        position: 'fixed',
        left: startRect.left,
        top: startRect.top,
        width: startRect.width,
        height: startRect.height,
        zIndex: 110,
        borderRadius: '0px',
      };
    }

    if (animationPhase === 'flying') {
      return {
        position: 'fixed',
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        zIndex: 110,
        transition: 'all 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        borderRadius: '0px',
      };
    }

    if (animationPhase === 'complete') {
      return {
        position: 'fixed',
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        zIndex: 1, // Lower z-index so UI elements appear on top
        transition: 'none',
        borderRadius: '0px',
      };
    }

    if (animationPhase === 'closing') {
      return {
        position: 'fixed',
        left: startRect.left,
        top: startRect.top,
        width: startRect.width,
        height: startRect.height,
        zIndex: 110,
        transition: 'all 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        borderRadius: '0px',
      };
    }

    return {};
  };

  const showFlyingImage = startRect && targetRect;

  return (
    <div
      className={`fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
        animationPhase === 'initial' || animationPhase === 'closing' ? 'bg-black/0' : 'bg-black/95'
      }`}
      onClick={handleClose}
    >
      {/* Flying image - this IS the main image, no swap/blink */}
      {showFlyingImage && (
        <div
          style={getFlyingImageStyle()}
          className="overflow-hidden"
        >
          <img
            key={animationPhase === 'complete' ? item.id : 'flying'}
            src={item.src}
            alt={item.title}
            className={`w-full h-full object-contain ${animationPhase === 'complete' && item.id !== initialItemIdRef.current ? 'animate-fadeIn' : ''}`}
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

      {/* Previous */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
          className={`absolute left-4 md:left-8 text-studio-body hover:text-studio-heading transition-all bg-transparent border-none cursor-pointer z-10 ${
            animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Content */}
      <div
        ref={containerRef}
        className={`max-w-6xl w-full mx-4 md:mx-8 max-h-[90vh] flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-6 transition-opacity duration-300 ${
          animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container - invisible placeholder for layout, flying image shows actual */}
        <div className="relative flex items-center justify-center flex-1 min-h-0">
          <img
            key={item.id}
            src={item.src}
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            className="max-h-[70vh] md:max-h-[85vh] max-w-full object-contain invisible"
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
            className={`md:hidden absolute inset-0 flex flex-col items-center justify-center p-6 z-20 transition-colors duration-300 ${
              isClosingDetails ? 'bg-black/0' : 'bg-black/80'
            }`}
            onClick={handleCloseDetails}
          >
            <div
              className="max-w-sm text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category */}
              <p
                className={`text-studio-accent text-sm tracking-[0.25em] uppercase mb-3 ${
                  isClosingDetails ? 'animate-slideUpOut' : 'animate-slideDown opacity-0'
                }`}
                style={{
                  animationDelay: isClosingDetails ? '250ms' : '50ms',
                  animationFillMode: 'forwards'
                }}
              >
                {item.category}
              </p>

              {/* Title */}
              <h3
                className={`font-display text-white text-3xl mb-4 ${
                  isClosingDetails ? 'animate-slideUpOut' : 'animate-slideDown opacity-0'
                }`}
                style={{
                  animationDelay: isClosingDetails ? '200ms' : '100ms',
                  animationFillMode: 'forwards'
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className={`text-white/70 text-base leading-relaxed mb-5 ${
                  isClosingDetails ? 'animate-slideUpOut' : 'animate-slideDown opacity-0'
                }`}
                style={{
                  animationDelay: isClosingDetails ? '150ms' : '150ms',
                  animationFillMode: 'forwards'
                }}
              >
                {item.description}
              </p>

              {/* Location */}
              {item.location && (
                <div
                  className={`flex items-center justify-center gap-2 text-white/60 text-sm mb-6 ${
                    isClosingDetails ? 'animate-slideUpOut' : 'animate-slideDown opacity-0'
                  }`}
                  style={{
                    animationDelay: isClosingDetails ? '100ms' : '200ms',
                    animationFillMode: 'forwards'
                  }}
                >
                  <MapPin size={14} className="text-studio-accent" />
                  <span>{item.location}</span>
                </div>
              )}

              {/* Divider */}
              <div
                className={`w-16 h-px bg-studio-accent/50 mx-auto mb-6 ${
                  isClosingDetails ? 'animate-scaleXReverse' : 'animate-scaleX opacity-0'
                }`}
                style={{
                  animationDelay: isClosingDetails ? '50ms' : '250ms',
                  animationFillMode: 'forwards'
                }}
              />

              {/* EXIF */}
              {item.exif && (
                <div
                  className={`${
                    isClosingDetails ? 'animate-slideUpOut' : 'animate-slideDown opacity-0'
                  }`}
                  style={{
                    animationDelay: isClosingDetails ? '0ms' : '300ms',
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="flex items-center justify-center gap-2.5 mb-5">
                    <Camera size={20} className="text-studio-accent" />
                    <span className="text-white text-lg">{item.exif.camera}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-base">
                    <div className="flex items-center justify-center gap-2">
                      <Timer size={18} className="text-studio-accent/70" />
                      <span className="text-white/70">{item.exif.shutter}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Aperture size={18} className="text-studio-accent/70" />
                      <span className="text-white/70">{item.exif.aperture}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Sun size={18} className="text-studio-accent/70" />
                      <span className="text-white/70">ISO {item.exif.iso}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Focus size={18} className="text-studio-accent/70" />
                      <span className="text-white/70">{item.exif.focalLength}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Close hint */}
              <p
                className={`mt-8 text-white/40 text-xs ${
                  isClosingDetails ? 'animate-slideUpOut' : 'animate-slideDown opacity-0'
                }`}
                style={{
                  animationDelay: isClosingDetails ? '0ms' : '400ms',
                  animationFillMode: 'forwards'
                }}
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
              className="space-y-5 animate-slideDown opacity-0"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-3">
                <Camera size={22} className="text-studio-accent" />
                <span className="text-studio-heading text-lg">{item.exif.camera}</span>
              </div>
              <div className="grid grid-cols-2 gap-5 text-lg">
                <div className="flex items-center gap-3">
                  <Timer size={20} className="text-studio-accent/70" />
                  <span className="text-studio-body">{item.exif.shutter}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Aperture size={20} className="text-studio-accent/70" />
                  <span className="text-studio-body">{item.exif.aperture}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sun size={20} className="text-studio-accent/70" />
                  <span className="text-studio-body">ISO {item.exif.iso}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Focus size={20} className="text-studio-accent/70" />
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
          className={`absolute right-4 md:right-8 text-studio-body hover:text-studio-heading transition-all bg-transparent border-none cursor-pointer z-10 ${
            animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Counter */}
      <p className={`absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 text-studio-body/50 text-xs md:text-sm transition-opacity duration-300 ${
        animationPhase === 'complete' ? 'opacity-100' : 'opacity-0'
      }`}>
        {currentIndex + 1} / {items.length}
      </p>
    </div>
  );
}
