import { useState } from 'react';
import { Play } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const videos = [
  {
    id: 'ccKA6y9w-0o',
    title: 'Galway Cathedral',
    description: 'Cinematic footage capturing the atmospheric gothic architecture of Galway Cathedral.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/galway-cathedral.jpg',
  },
  {
    id: 'pGVLMHfXJco',
    title: 'Malahide Castle',
    description: 'Cinematic footage exploring the historic grounds of Malahide Castle.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/malahide-castle.jpg',
  },
  {
    id: 'VRnF9taCZcc',
    title: 'St. Stephen\'s Green in Motion',
    description: 'Cinematic daytime footage capturing the spring atmosphere of St. Stephen\'s Green park.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/st-stephens-green.jpg',
  },
  {
    id: 'Zhc5yBV1BO4',
    title: 'Dublin Streets',
    description: 'Daytime street scenes capturing the vibrant atmosphere of Dublin city.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/dublin-streets.jpg',
  },
  {
    id: 'JG4qppQMCPo',
    title: 'Dublin Daytime',
    description: 'Exploring Dublin during the day with cinematic mobile footage.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/dublin-daytime.jpg',
  },
  {
    id: 'xbD85OcWa-A',
    title: 'Rainy Night At Dublin',
    description: 'Cinematic night footage capturing Dublin streets in the rain.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/rainy-night-dublin.jpg',
  },
  {
    id: 'ONpHRSbUruQ',
    title: 'Samuel Beckett Bridge',
    description: 'Capturing the elegant lines of Dublin\'s iconic cable-stayed bridge.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/samuel-beckett-bridge.jpg',
  },
  {
    id: '-BvOrM1wCkA',
    title: 'Dublin during Christmas',
    description: 'Festive lights and holiday atmosphere illuminating Dublin\'s streets.',
    aspect: '3/4',
    thumbnail: 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Video_Thumbnails/dublin-christmas.jpg',
  },
];

export default function Videography() {
  const [playingVideos, setPlayingVideos] = useState({});

  const handlePlay = (videoId) => {
    setPlayingVideos((prev) => ({ ...prev, [videoId]: true }));
  };

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
                {/* Video Player */}
                <div
                  className="relative bg-studio-surface overflow-hidden mb-4"
                  style={{ aspectRatio: video.aspect }}
                >
                  {video.thumbnail && !playingVideos[video.id] ? (
                    <button
                      onClick={() => handlePlay(video.id)}
                      className="absolute inset-0 w-full h-full cursor-pointer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 hover:bg-black/40">
                        <div className="w-16 h-16 rounded-full bg-studio-accent/90 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                          <Play className="w-7 h-7 text-studio-bg fill-current ml-1" />
                        </div>
                      </div>
                    </button>
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}${playingVideos[video.id] ? '?autoplay=1' : ''}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
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
