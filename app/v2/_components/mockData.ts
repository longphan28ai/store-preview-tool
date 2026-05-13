export type MockApp = {
  productCode: string;
  name: string;
  packageId: string;
  category: string;
  iconBg: string;
  icon: string;
  rating: number;
  reviews: number;
  installs: string;
  size: string;
  updated: string;
  countries: number;
  cvr: number;
  trend: number;
};

export const MOCK_APPS: MockApp[] = [
  { productCode: "APB508", name: "AI Chat - Ask your AI Chatbot", packageId: "com.syct.chatbot.assistant", category: "AI Chatbot", iconBg: "from-violet-500 to-fuchsia-500", icon: "AI", rating: 4.6, reviews: 124380, installs: "10M+", size: "42 MB", updated: "2d ago", countries: 18, cvr: 32.4, trend: 12.3 },
  { productCode: "APB666", name: "Picshiner - AI Photo Enhancer", packageId: "com.adoreapps.photo.editor", category: "AI Photo & Video", iconBg: "from-emerald-400 to-teal-500", icon: "PS", rating: 4.7, reviews: 89420, installs: "5M+", size: "68 MB", updated: "1d ago", countries: 22, cvr: 38.1, trend: 8.7 },
  { productCode: "APB842", name: "LinguaPal - AI English Tutor", packageId: "learn.english.grammer.skills", category: "Language Learning", iconBg: "from-amber-400 to-orange-500", icon: "LP", rating: 4.5, reviews: 56120, installs: "1M+", size: "55 MB", updated: "5d ago", countries: 14, cvr: 28.9, trend: -2.1 },
  { productCode: "APB518", name: "Face Swap, AI Avatar Magic", packageId: "com.faceswap.ai.art.avatar", category: "AI Photo & Video", iconBg: "from-pink-500 to-rose-500", icon: "FS", rating: 4.4, reviews: 201540, installs: "10M+", size: "78 MB", updated: "3d ago", countries: 24, cvr: 41.2, trend: 15.6 },
  { productCode: "APB942", name: "LinguaSpeak: AI Learn English", packageId: "practice.ai_tutor.learn.study.ai", category: "Language Learning", iconBg: "from-blue-500 to-indigo-500", icon: "LS", rating: 4.6, reviews: 32890, installs: "1M+", size: "61 MB", updated: "6d ago", countries: 12, cvr: 31.7, trend: 4.2 },
  { productCode: "APB891", name: "AI Photo Video Slideshow Maker", packageId: "com.ai.photo.video.maker", category: "AI Photo & Video", iconBg: "from-cyan-400 to-blue-500", icon: "SM", rating: 4.3, reviews: 78420, installs: "5M+", size: "84 MB", updated: "1w ago", countries: 19, cvr: 26.5, trend: -1.4 },
  { productCode: "AIP801", name: "SongGenie: AI Music Generator", packageId: "aimusic.aisonggenerator.songmaker", category: "AI Music", iconBg: "from-purple-500 to-pink-500", icon: "SG", rating: 4.5, reviews: 41230, installs: "1M+", size: "52 MB", updated: "4d ago", countries: 16, cvr: 35.8, trend: 22.1 },
  { productCode: "APB864", name: "AI Chatbot Assistant - GPT AI", packageId: "com.brct.aichatbot.assistant", category: "AI Chatbot", iconBg: "from-teal-400 to-cyan-500", icon: "CB", rating: 4.4, reviews: 92150, installs: "5M+", size: "38 MB", updated: "2d ago", countries: 20, cvr: 29.3, trend: 6.8 },
];

export const MOCK_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
];
