const IMAGE_BASE = 'https://raw.githubusercontent.com/yagizeraslan/MyPortfolio/main/Photography/Studio';

export const presets = [
  {
    id: 'dark-cinematic',
    title: 'Dark Cinematic',
    description: 'My signature teal-orange split toning for urban night photography. Deep blacks, neon glows, rainy streets, fog, and that film-like quality perfect for moody cityscapes.',
    includes: ['15 Lightroom Presets (.xmp)', 'Mobile compatible (.dng)', 'Installation guide'],
    gradient: 'from-cyan-900/60 via-orange-900/40 to-slate-900/60',
    previewImage: 'IMG_20260210_185551%20(2).jpg',
    comparisons: [
      { before: `${IMAGE_BASE}/IMG_20260210_185551-before.jpg`, after: `${IMAGE_BASE}/IMG_20260210_185551%20(2).jpg` },
      { before: `${IMAGE_BASE}/IMG_20240906_223937-before.jpg`, after: `${IMAGE_BASE}/IMG_20240906_223937.jpg` },
      { before: `${IMAGE_BASE}/IMG_20251206_215631-before.jpg`, after: `${IMAGE_BASE}/IMG_20251206_215631.jpg` },
      { before: `${IMAGE_BASE}/IMG_20250404_215943-before.jpg`, after: `${IMAGE_BASE}/IMG_20250404_215943.jpg` },
      { before: `${IMAGE_BASE}/IMG_20250127_005616-before.jpg`, after: `${IMAGE_BASE}/IMG_20250127_005616.jpg` },
      { before: `${IMAGE_BASE}/IMG_20240906_220756-before.jpg`, after: `${IMAGE_BASE}/IMG_20240906_220756%20(3).jpg` },
    ],
  },
  {
    id: 'golden-cinematic',
    title: 'Golden Cinematic',
    description: 'Warm, rich tones for sunset shots, coastal scenes, and travel photography. Mediterranean vibes with amber highlights and cinematic color grading for golden hour magic.',
    includes: ['10 Lightroom Presets (.xmp)', 'Mobile compatible (.dng)', 'Installation guide'],
    gradient: 'from-amber-900/60 via-orange-800/40 to-yellow-900/60',
    previewImage: 'IMG_20240501_193920.jpg',
    comparisons: [
      { before: `${IMAGE_BASE}/IMG_20240501_193920-before.jpg`, after: `${IMAGE_BASE}/IMG_20240501_193920.jpg` },
      { before: `${IMAGE_BASE}/IMG_20251104_160743-before.jpg`, after: `${IMAGE_BASE}/IMG_20251104_160743.jpg` },
      { before: `${IMAGE_BASE}/IMG_20251207_130739-before.jpg`, after: `${IMAGE_BASE}/IMG_20251207_130739.jpg` },
      { before: `${IMAGE_BASE}/IMG_20240909_113731-before.jpg`, after: `${IMAGE_BASE}/IMG_20240909_113731.jpg` },
      { before: `${IMAGE_BASE}/IMG_20240909_115244-before.jpg`, after: `${IMAGE_BASE}/IMG_20240909_115244.jpg` },
    ],
  },
  {
    id: 'complete-collection',
    title: 'Complete Collection',
    description: 'Both Dark Cinematic and Golden Cinematic packs in one. The full range of my editing style — from moody nights to golden sunsets.',
    includes: ['25 Lightroom Presets (.xmp)', 'Mobile compatible (.dng)', 'Bonus presets', 'Installation guide'],
    popular: true,
    gradient: 'from-studio-accent/40 via-cyan-900/30 to-orange-900/40',
    previewImage: 'IMG_20240906_223937.jpg',
    comparisons: [
      { before: `${IMAGE_BASE}/IMG_20260210_185551-before.jpg`, after: `${IMAGE_BASE}/IMG_20260210_185551%20(2).jpg` },
      { before: `${IMAGE_BASE}/IMG_20240501_193920-before.jpg`, after: `${IMAGE_BASE}/IMG_20240501_193920.jpg` },
      { before: `${IMAGE_BASE}/IMG_20240906_223937-before.jpg`, after: `${IMAGE_BASE}/IMG_20240906_223937.jpg` },
      { before: `${IMAGE_BASE}/IMG_20251207_130739-before.jpg`, after: `${IMAGE_BASE}/IMG_20251207_130739.jpg` },
    ],
  },
];
