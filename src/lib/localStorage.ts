const RECENT_KEY = "gaoshouke_recent";
const PREFS_KEY = "gaoshouke_prefs";

export function saveRecentItem(type: string, slug: string) {
  try {
    const data = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    const entry = { type, slug, timestamp: Date.now() };
    const filtered = data.filter((d: any) => !(d.type === type && d.slug === slug));
    filtered.unshift(entry);
    localStorage.setItem(RECENT_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch {}
}

export function getRecentItems() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch { return []; }
}

export function savePreference(key: string, value: string) {
  try {
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
    prefs[key] = value;
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

export function getPreference(key: string): string | null {
  try {
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
    return prefs[key] || null;
  } catch { return null; }
}
