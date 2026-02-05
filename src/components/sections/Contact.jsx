import { useState } from 'react';
import { Mail, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import ScrollReveal from '../ui/ScrollReveal';

const socialLinks = [
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
];

const serviceOptions = [
  'Nature Photography',
  'Landscape Photography',
  'Cinematic Videography',
  'Photo & Video Bundle',
  'Custom Project',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${form.service || 'Inquiry'} — ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full bg-studio-surface border border-studio-border px-4 py-3 text-sm text-studio-heading placeholder:text-studio-body/50 focus:border-studio-accent focus:outline-none transition-colors';

  return (
    <section id="contact" className="py-24 px-6 bg-studio-surface">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              Contact
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              Get in Touch
            </h2>
            <div className="gold-line max-w-xs mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Info */}
          <ScrollReveal>
            <div>
              <h3 className="font-display text-studio-heading text-2xl mb-6">
                Let&apos;s Create Together
              </h3>
              <p className="text-studio-body leading-relaxed mb-8">
                Whether you have a specific project in mind or just want to explore
                possibilities, I&apos;d love to hear from you. Every great image starts
                with a conversation.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-studio-accent" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-studio-body hover:text-studio-accent transition-colors text-sm"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin size={18} className="text-studio-accent" />
                  <span className="text-studio-body text-sm">
                    Available Worldwide
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 border border-studio-border flex items-center justify-center text-studio-body hover:text-studio-accent hover:border-studio-accent transition-all"
                  >
                    <item.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className={`${inputClass} ${!form.service ? 'text-studio-body/50' : ''}`}
              >
                <option value="" disabled>
                  Select a Service
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="w-full bg-studio-accent text-black py-3 text-sm tracking-widest uppercase font-medium hover:bg-studio-accent-hover transition-colors border-none cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
