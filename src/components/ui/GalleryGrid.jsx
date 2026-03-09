import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function GalleryGrid({ items, onSelect }) {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group relative w-full overflow-hidden bg-studio-surface border-none cursor-pointer p-0 break-inside-avoid block"
        >
          {/* Loading skeleton */}
          {!loadedImages[item.id] && (
            <div className="absolute inset-0 bg-studio-surface animate-pulse" />
          )}

          {/* Actual image */}
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            onLoad={() => handleImageLoad(item.id)}
            className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 ${
              loadedImages[item.id] ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
            <p className="text-studio-accent text-xs tracking-widest uppercase mb-1">
              {item.category}
            </p>
            <h3 className="font-display text-studio-heading text-xl mb-2">
              {item.title}
            </h3>
            {item.location && (
              <p className="flex items-center gap-1.5 text-studio-body text-xs">
                <MapPin size={12} />
                {item.location}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
