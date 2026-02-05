import { Play } from 'lucide-react';

export default function GalleryGrid({ items, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group relative aspect-[4/3] overflow-hidden bg-studio-surface border-none cursor-pointer p-0"
        >
          {/* Gradient placeholder */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-700 group-hover:scale-105`}
          />

          {/* Video play icon */}
          {item.isVideo && (
            <div className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2">
              <Play size={16} className="text-white" fill="white" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end p-6">
            <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-left">
              <p className="text-studio-accent text-xs tracking-widest uppercase mb-1">
                {item.category}
              </p>
              <h3 className="font-display text-studio-heading text-xl">
                {item.title}
              </h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
