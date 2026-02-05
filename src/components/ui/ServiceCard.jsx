import { Check } from 'lucide-react';

export default function ServiceCard({ service }) {
  const { icon: Icon, title, price, description, features, popular } = service;

  return (
    <div
      className={`relative p-8 border transition-all duration-300 hover:-translate-y-1 ${
        popular
          ? 'border-studio-accent/50 bg-studio-accent/5'
          : 'border-studio-border bg-studio-surface hover:border-studio-body/30'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-8 bg-studio-accent text-black text-[10px] tracking-widest uppercase px-3 py-1 font-medium">
          Popular
        </span>
      )}

      <Icon size={28} className="text-studio-accent mb-6" />

      <h3 className="font-display text-studio-heading text-xl mb-2">
        {title}
      </h3>
      <p className="text-studio-body text-sm leading-relaxed mb-6">
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <Check size={16} className="text-studio-accent shrink-0 mt-0.5" />
            <span className="text-studio-body">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-studio-border pt-6 flex items-end justify-between">
        <div>
          <p className="text-xs text-studio-body uppercase tracking-wider">
            Starting at
          </p>
          <p className="font-display text-studio-heading text-2xl">{price}</p>
        </div>
        <a
          href="#contact"
          className={`text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
            popular
              ? 'bg-studio-accent text-black border-studio-accent hover:bg-studio-accent-hover'
              : 'border-studio-accent text-studio-accent hover:bg-studio-accent hover:text-black'
          }`}
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
