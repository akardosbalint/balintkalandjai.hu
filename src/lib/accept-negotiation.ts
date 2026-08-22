/**
 * Minimal Accept-header content negotiation between text/html and
 * text/markdown, per the acceptmarkdown.com convention (RFC 9110 §12.5.1
 * quality values + specificity: exact type wins over a type wildcard,
 * which wins over the full wildcard).
 */
interface MediaTypePreference {
  type: string;
  q: number;
}

function parseAccept(acceptHeader: string): MediaTypePreference[] {
  return acceptHeader
    .split(",")
    .map((part): MediaTypePreference | null => {
      const [rawType, ...params] = part.split(";").map((s) => s.trim());
      const type = rawType.toLowerCase();
      if (!type) return null;

      let q = 1;
      for (const param of params) {
        const [key, value] = param.split("=").map((s) => s.trim());
        if (key === "q") {
          const parsed = Number.parseFloat(value);
          if (!Number.isNaN(parsed)) q = parsed;
        }
      }
      return { type, q };
    })
    .filter((entry): entry is MediaTypePreference => entry !== null);
}

/** Most specific matching entry wins: exact type, then type wildcard, then full wildcard. */
function qualityFor(entries: MediaTypePreference[], target: string): number | null {
  const exact = entries.find((e) => e.type === target);
  if (exact) return exact.q;

  const [targetType] = target.split("/");
  const typeWildcard = entries.find((e) => e.type === `${targetType}/*`);
  if (typeWildcard) return typeWildcard.q;

  const anyWildcard = entries.find((e) => e.type === "*/*");
  if (anyWildcard) return anyWildcard.q;

  return null;
}

/**
 * True when the request explicitly prefers text/markdown over text/html
 * (higher q-value, or text/markdown present with no competing text/html
 * preference at all). Generic clients sending only a wildcard Accept or
 * a bare "text/html" continue to get HTML.
 */
export function prefersMarkdown(acceptHeader: string | null | undefined): boolean {
  if (!acceptHeader) return false;

  const entries = parseAccept(acceptHeader);
  const markdownQ = qualityFor(entries, "text/markdown");
  if (markdownQ === null || markdownQ <= 0) return false;

  const htmlQ = qualityFor(entries, "text/html");
  if (htmlQ === null || htmlQ <= 0) return true;

  return markdownQ > htmlQ;
}
