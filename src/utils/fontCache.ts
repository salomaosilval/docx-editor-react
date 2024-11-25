interface CachedFonts {
  fonts: Array<{ label: string; value: string }>;
  timestamp: number;
}

const CACHE_KEY = "@docx-editor:google-fonts";
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000;

export const saveFontsToCache = (fonts: Array<{ label: string; value: string }>) => {
  const cacheData: CachedFonts = {
    fonts,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

export const getFontsFromCache = (): Array<{ label: string; value: string }> | null => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return null;

  const { fonts, timestamp }: CachedFonts = JSON.parse(cachedData);
  const isExpired = Date.now() - timestamp > CACHE_DURATION;

  if (isExpired) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return fonts;
};
