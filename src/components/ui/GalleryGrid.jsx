import Masonry from 'react-masonry-css';
import { MapPin } from 'lucide-react';

const breakpointColumns = {
  default: 4,
  1023: 2,
  639: 1,
};

export default function GalleryGrid({ items, onSelect }) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex w-auto -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group relative w-full overflow-hidden bg-studio-surface border-none cursor-pointer p-0 block mb-4"
        >
          {/* Image with lazy loading and fade-in */}
          <img
            src={item.src}
            alt={item.title}
            loading={items.indexOf(item) < 8 ? 'eager' : 'lazy'}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 animate-fadeIn"
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
    </Masonry>
  );
}
