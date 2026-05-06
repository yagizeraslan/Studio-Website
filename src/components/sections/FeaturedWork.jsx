import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const IMAGE_BASE = 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Photography/Studio';

const campaigns = [
  {
    id: 1,
    title: 'Dublin By Dusk',
    client: 'DublinTown BID & Fáilte Ireland',
    year: '2026',
    description: 'Hero image for citywide nightlife and culture initiative. Used as official campaign poster at the National Library photocall with DublinTown CEO and Dublin City Council officials. Featured on dublin.ie, Irish Independent, digital panels, and bus shelters across Dublin.',
    image: `${IMAGE_BASE}/IMG_20251213_162127%20(1).jpg`,
    links: [
      { label: 'Dublin.ie', url: 'https://dublin.ie/live/dublin-nights/dublin-by-dusk/' },
      { label: 'Irish Independent', url: 'https://www.independent.ie/life/travel/travel-news/dublin-by-dusk-pubs-hotels-and-clubs-in-dublin-to-stay-open-later-once-a-month-through-new-initiative/a542303996.html' },
      { label: 'Photocall Video', url: 'https://www.instagram.com/p/DXwgPHpDr8U/' },
      { label: 'Instagram', url: 'https://www.instagram.com/p/DXvzSd6iFc5/' },
    ],
    sharedBy: [
      { name: 'Dublin\'s Night Mayor', handle: '@RayRazor', url: 'https://www.instagram.com/rayrazor/' },
      { name: 'Dublin City Council', handle: '@dublincitycouncil', url: 'https://www.instagram.com/dublincitycouncil/' },
      { name: 'Dept. of Culture', handle: '@deptculturecommssport', url: 'https://www.instagram.com/deptculturecommssport/' },
      { name: 'DublinTown', handle: '@dublintown_', url: 'https://www.instagram.com/dublintown_/' },
      { name: 'Dublin.ie', handle: '@dublin_ie', url: 'https://www.instagram.com/dublin_ie/' },
    ],
  },
  {
    id: 2,
    title: 'Xiaomi Photo Calendar',
    client: 'Xiaomi Global',
    year: '2024',
    description: 'Featured photographer in Xiaomi\'s global photo calendar, showcasing mobile photography excellence.',
    image: `${IMAGE_BASE}/IMG_20240906_220756%20(3).jpg`,
    links: [
      { label: 'View Feature', url: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MzU5MjAwMTIwMTc4OTIz?story_media_id=3607735190075505590_197534330&igsh=MWJxaG40NnViNnJ0aQ==' },
    ],
  },
];

export default function FeaturedWork() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCampaign(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="featured" className="py-24 bg-studio-surface">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              Featured Work
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              Press & Campaigns
            </h2>
            <div className="gold-line max-w-xs mx-auto mb-4" />
            <p className="text-studio-body/60 text-sm tracking-wide">
              Selected work from tourism boards, city initiatives, and global brands.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-column centered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {campaigns.map((campaign, index) => (
            <ScrollReveal key={campaign.id} delay={index * 100}>
              <div
                onClick={() => openModal(campaign)}
                className="group cursor-pointer bg-studio-bg border border-studio-border overflow-hidden hover:border-studio-accent/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-studio-accent text-xs tracking-wider uppercase mb-1">
                    {campaign.client} · {campaign.year}
                  </p>
                  <h3 className="font-display text-studio-heading text-xl mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-studio-body/40 text-xs">
                    Shot on Xiaomi 14 Ultra
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCampaign && (
        <div
          className="fixed inset-0 z-50 bg-black/95 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-20 text-studio-body hover:text-studio-heading transition-colors"
          >
            <X size={28} />
          </button>

          {/* Content container */}
          <div className="h-full flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 gap-6 lg:gap-10">
            {/* Image */}
            <div
              className="flex-shrink-0 w-full lg:w-auto lg:h-[80vh] animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCampaign.image}
                alt={selectedCampaign.title}
                className="w-full h-auto lg:h-full lg:w-auto object-contain max-h-[50vh] lg:max-h-full"
              />
            </div>

            {/* Details panel */}
            <div
              className="w-full lg:w-80 flex-shrink-0 text-left animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-studio-accent text-xs tracking-wider uppercase mb-2">
                {selectedCampaign.client} · {selectedCampaign.year}
              </p>
              <h3 className="font-display text-studio-heading text-2xl lg:text-3xl mb-4">
                {selectedCampaign.title}
              </h3>
              <p className="text-studio-body text-sm leading-relaxed mb-6">
                {selectedCampaign.description}
              </p>

              {/* Links */}
              <p className="text-studio-accent text-xs uppercase tracking-wider mb-2">
                Featured In
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCampaign.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-studio-heading hover:text-studio-accent transition-colors border border-studio-border px-4 py-2 hover:border-studio-accent"
                  >
                    {link.label}
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>

              {/* Shared By */}
              {selectedCampaign.sharedBy && selectedCampaign.sharedBy.length > 0 && (
                <>
                  <p className="text-studio-accent text-xs uppercase tracking-wider mb-2">
                    Shared By
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedCampaign.sharedBy.map((account) => (
                      <a
                        key={account.url}
                        href={account.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-studio-body hover:text-studio-accent transition-colors border border-studio-border/50 px-3 py-1.5 hover:border-studio-accent/50"
                      >
                        {account.name}
                      </a>
                    ))}
                  </div>
                </>
              )}

              <p className="text-studio-body/40 text-xs">
                Shot on Xiaomi 14 Ultra
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
