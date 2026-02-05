import { Instagram, Youtube, Linkedin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const socialIcons = [
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
];

const footerLinks = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'presets', label: 'Presets' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-studio-border bg-studio-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-studio-heading text-xl tracking-[0.3em] uppercase">
              YE Studio
            </h3>
            <p className="text-studio-body text-sm mt-2">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="text-sm text-studio-body hover:text-studio-accent transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-4">
            {socialIcons.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-studio-body hover:text-studio-accent transition-colors"
              >
                <item.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="gold-line mt-12 mb-6" />

        <p className="text-center text-studio-body/60 text-xs">
          &copy; {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
