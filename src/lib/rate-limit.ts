// Egyszerű, memóriában tartott, IP-alapú sliding-window rate limit.
//
// KORLÁT: a state csak egy warm szerverless függvénypéldányon belül él —
// több párhuzamos instance esetén (magas terhelésnél) ez nem egy globálisan
// pontos limit, csak egy best-effort fék. Ha a forgalom indokolja, érdemes
// megosztott tárra (pl. Vercel KV / Upstash) váltani — a jelenlegi
// feliratkozási volumen mellett ez a lépés egyelőre nem szükséges, de ez a
// modul úgy van elválasztva a route-tól, hogy később könnyű legyen cserélni.
const WINDOW_MS = 10 * 60 * 1000; // 10 perc
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

/** Eldobja a WINDOW_MS-nél régebbi bejegyzéseket, hogy a Map ne nőjön korlátlanul. */
function sweep(now: number) {
  Array.from(hits.entries()).forEach(([key, timestamps]) => {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) {
      hits.delete(key);
    } else {
      hits.set(key, recent);
    }
  });
}

/** true, ha az adott kulcs (jellemzően IP) túllépte a limitet ebben az időablakban. */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  sweep(now);

  const timestamps = hits.get(key) ?? [];
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}

/** A látogató IP-je a Vercel/proxy fejlécekből, best-effort. */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}
