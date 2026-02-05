export default function FilterBar({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 border bg-transparent cursor-pointer ${
            active === cat
              ? 'border-studio-accent text-studio-accent'
              : 'border-studio-border text-studio-body hover:border-studio-body hover:text-studio-heading'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
