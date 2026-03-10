import { useState } from 'react';
import { Mail, MapPin, Instagram, Youtube, Linkedin, AlertCircle, CheckCircle } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import ScrollReveal from '../ui/ScrollReveal';

// Web3Forms access key from environment variable
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const socialLinks = [
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
];

// Allowed email domains (whitelist)
const allowedDomains = [
  'gmail.com', 'googlemail.com',
  'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de',
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me',
  'aol.com',
  'zoho.com',
  'mail.com',
  'gmx.com', 'gmx.net',
  'yandex.com', 'yandex.ru',
  'tutanota.com',
  'fastmail.com',
];

// Check if message contains URLs
const containsUrl = (text) => {
  const urlPattern = /(https?:\/\/|www\.|\.com\/|\.net\/|\.org\/|\.io\/|\.co\/|bit\.ly|tinyurl|t\.co)/i;
  return urlPattern.test(text);
};

// Check if email domain is allowed
const isEmailAllowed = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain && allowedDomains.includes(domain);
};

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (status.type === 'error') setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email domain
    if (!isEmailAllowed(form.email)) {
      setStatus({
        type: 'error',
        message: 'Please use a valid email from a common provider (Gmail, Outlook, Yahoo, etc.)'
      });
      return;
    }

    // Check for URLs in message
    if (containsUrl(form.message)) {
      setStatus({
        type: 'error',
        message: 'Links are not allowed in the message for security reasons.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '', // Honeypot - should be empty
          from_name: 'YE Studio Contact Form',
          subject: `New inquiry from ${form.name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Honeypot field - hidden from users, bots will fill it */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
              />

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
              <textarea
                name="message"
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />

              {/* Status message */}
              {status.message && (
                <div
                  className={`flex items-center gap-2 text-sm p-3 ${
                    status.type === 'error'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                      : 'bg-green-500/10 text-green-400 border border-green-500/30'
                  }`}
                >
                  {status.type === 'error' ? (
                    <AlertCircle size={16} />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-studio-accent text-black py-3 text-sm tracking-widest uppercase font-medium hover:bg-studio-accent-hover transition-colors border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
