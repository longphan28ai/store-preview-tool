export interface StoreData {
  appId: string;
  country: string;
  countryName: string;
  flag: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  headerImage: string;
  screenshots: string[];
  video: string | null;
  score: number;
  ratings: number;
  reviews: number;
  histogram: Record<string, number>;
  price: number;
  free: boolean;
  priceText: string;
  currency: string;
  installs: string;
  minInstalls: number;
  developer: string;
  genre: string;
  contentRating: string;
  version: string;
  updated: number;
  recentChanges: string;
  adSupported: boolean;
  offersIAP: boolean;
  fetchedAt: string;
}

export interface FetchRequest {
  appId: string;
  countries: string[];
}

export interface FetchResponse {
  results: StoreData[];
  errors: { country: string; message: string }[];
}
