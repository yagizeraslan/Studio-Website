import ScrollReveal from '../ui/ScrollReveal';

const videos = [
  {
    id: 'Zhc5yBV1BO4',
    title: 'Dublin Streets',
    description: 'Daytime street scenes capturing the vibrant atmosphere of Dublin city.',
    aspect: '3/4',
  },
  {
    id: 'JG4qppQMCPo',
    title: 'Dublin Daytime',
    description: 'Exploring Dublin during the day with cinematic mobile footage.',
    aspect: '3/4',
  },
  {
    id: 'xbD85OcWa-A',
    title: 'Rainy Night At Dublin',
    description: 'Cinematic night footage capturing Dublin streets in the rain.',
    aspect: '3/4',
  },
  {
    id: 'ONpHRSbUruQ',
    title: 'Samuel Beckett Bridge',
    description: 'Full sensor RAW video of Dublin\'s iconic cable-stayed bridge.',
    aspect: '3/4',
  },
  {
    id: '-BvOrM1wCkA',
    title: 'Dublin in 10-Bit RAW',
    description: 'Showcasing Xiaomi 14 Ultra\'s RAW DNG video capabilities.',
    aspect: '3/4',
  },
];

export default function Videography() {
  return (
    <section id="videography" className="py-24">
      {/* Header - centered with max-width like Portfolio */}
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-studio-accent text-xs tracking-[0.3em] uppercase mb-4">
              Videography
            </p>
            <h2 className="font-display text-studio-heading text-4xl sm:text-5xl mb-4">
              Motion Work
            </h2>
            <div className="gold-line max-w-xs mx-auto mb-4" />
            <p className="text-studio-body/60 text-sm tracking-wide">
              All videos captured on Xiaomi 14 Ultra
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Videos - 3 column grid */}
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 100}>
              <div className="group">
                {/* YouTube Embed */}
                <div
                  className="relative bg-studio-surface overflow-hidden mb-4"
                  style={{ aspectRatio: video.aspect }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Info */}
                <h3 className="font-display text-studio-heading text-xl mb-2">
                  {video.title}
                </h3>
                <p className="text-studio-body text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
