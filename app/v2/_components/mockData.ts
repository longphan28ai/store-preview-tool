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

export type MockCountry = {
  code: string;        // ISO uppercase (display)
  glCode: string;      // lowercase code for &gl= URL param
  name: string;
  flag: string;
  tier: 1 | 2 | 3;
  defaultLangCode: string; // hl= param for native locale
  defaultLangName: string;
};

// Codes verified against Apero UA reference sheet
export const MOCK_COUNTRIES: MockCountry[] = [
  // Tier 1
  { code: "US", glCode: "us", name: "United States", flag: "🇺🇸", tier: 1, defaultLangCode: "en", defaultLangName: "English" },
  { code: "GB", glCode: "gb", name: "United Kingdom", flag: "🇬🇧", tier: 1, defaultLangCode: "en", defaultLangName: "English" },
  { code: "CA", glCode: "ca", name: "Canada", flag: "🇨🇦", tier: 1, defaultLangCode: "en", defaultLangName: "English" },
  { code: "AU", glCode: "au", name: "Australia", flag: "🇦🇺", tier: 1, defaultLangCode: "en", defaultLangName: "English" },
  { code: "DE", glCode: "de", name: "Germany", flag: "🇩🇪", tier: 1, defaultLangCode: "de", defaultLangName: "German" },
  { code: "FR", glCode: "fr", name: "France", flag: "🇫🇷", tier: 1, defaultLangCode: "fr", defaultLangName: "French" },
  { code: "JP", glCode: "jp", name: "Japan", flag: "🇯🇵", tier: 1, defaultLangCode: "ja", defaultLangName: "Japanese" },
  { code: "KR", glCode: "kr", name: "South Korea", flag: "🇰🇷", tier: 1, defaultLangCode: "ko", defaultLangName: "Korean" },
  // Tier 2
  { code: "IT", glCode: "it", name: "Italy", flag: "🇮🇹", tier: 2, defaultLangCode: "it", defaultLangName: "Italian" },
  { code: "ES", glCode: "es", name: "Spain", flag: "🇪🇸", tier: 2, defaultLangCode: "es", defaultLangName: "Spanish" },
  { code: "NL", glCode: "nl", name: "Netherlands", flag: "🇳🇱", tier: 2, defaultLangCode: "nl", defaultLangName: "Dutch" },
  { code: "SE", glCode: "se", name: "Sweden", flag: "🇸🇪", tier: 2, defaultLangCode: "sv", defaultLangName: "Swedish" },
  { code: "BR", glCode: "br", name: "Brazil", flag: "🇧🇷", tier: 2, defaultLangCode: "pt", defaultLangName: "Portuguese" },
  { code: "MX", glCode: "mx", name: "Mexico", flag: "🇲🇽", tier: 2, defaultLangCode: "es", defaultLangName: "Spanish" },
  { code: "RU", glCode: "ru", name: "Russia", flag: "🇷🇺", tier: 2, defaultLangCode: "ru", defaultLangName: "Russian" },
  // Tier 3
  { code: "IN", glCode: "in", name: "India", flag: "🇮🇳", tier: 3, defaultLangCode: "hi", defaultLangName: "Hindi" },
  { code: "ID", glCode: "id", name: "Indonesia", flag: "🇮🇩", tier: 3, defaultLangCode: "id", defaultLangName: "Indonesian" },
  { code: "VN", glCode: "vn", name: "Vietnam", flag: "🇻🇳", tier: 3, defaultLangCode: "vi", defaultLangName: "Vietnamese" },
  { code: "TH", glCode: "th", name: "Thailand", flag: "🇹🇭", tier: 3, defaultLangCode: "th", defaultLangName: "Thai" },
  { code: "PH", glCode: "ph", name: "Philippines", flag: "🇵🇭", tier: 3, defaultLangCode: "en", defaultLangName: "English" },
];

export type MockLanguage = { code: string; name: string; nativeName: string };

// Common languages for forced override
export const MOCK_LANGUAGES: MockLanguage[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "sv", name: "Swedish", nativeName: "Svenska" },
];

/**
 * Build a Google Play Store URL for a given app package.
 * - mode "main": original URL (no locale override)
 * - mode "custom": appends &hl=<lang>&gl=<country>
 *
 * If the caller wants only one of hl/gl, pass empty string for the other.
 */
export function buildPlayStoreUrl(packageId: string, hl?: string, gl?: string): string {
  const base = `https://play.google.com/store/apps/details?id=${packageId}`;
  const parts: string[] = [];
  if (hl) parts.push(`hl=${hl}`);
  if (gl) parts.push(`gl=${gl}`);
  return parts.length ? `${base}&${parts.join("&")}` : base;
}
