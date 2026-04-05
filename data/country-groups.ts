export const COUNTRY_GROUPS: Record<string, { label: string; codes: string[] }> = {
  T1: {
    label: "🏆 Tier 1",
    codes: ["us", "gb", "ca", "au", "de", "fr", "jp", "kr"],
  },
  SEA: {
    label: "🌏 SEA",
    codes: ["vn", "th", "id", "ph", "my", "sg", "kh", "la"],
  },
  LATAM: {
    label: "🌎 LATAM",
    codes: ["br", "mx", "ar", "co", "cl", "pe", "ec"],
  },
  EU: {
    label: "🇪🇺 EU",
    codes: ["de", "fr", "it", "es", "nl", "pl", "se", "no", "dk", "fi", "pt", "be", "at", "ch", "ie"],
  },
  MENA: {
    label: "🕌 MENA",
    codes: ["sa", "ae", "eg", "tr", "il", "qa", "kw", "bh", "om", "jo", "lb"],
  },
  SOUTH_ASIA: {
    label: "🇮🇳 South Asia",
    codes: ["in", "pk", "bd", "lk", "np"],
  },
  EAST_ASIA: {
    label: "🇯🇵 East Asia",
    codes: ["jp", "kr", "tw", "hk"],
  },
};
