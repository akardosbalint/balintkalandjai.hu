import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prefersMarkdown } from "@/lib/accept-negotiation";
import { getMarkdownForPath } from "@/lib/markdown-content";

/**
 * Accept: text/markdown content negotiation (acceptmarkdown.com convention).
 *
 * Next.js itself recomputes the Vary header for normal page responses
 * (it always ends up "RSC, Next-Router-State-Tree, Next-Router-Prefetch,
 * Accept-Encoding", overwriting anything middleware sets on a
 * NextResponse.next() passthrough) — verified locally, values set via
 * .set()/.append() on the passthrough response are silently dropped.
 * So instead of trying to patch that response's Vary header, we fully
 * bypass Next's renderer for negotiated requests and return our own
 * Response with full control over Content-Type and Vary.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never touch anything that looks like a static asset, even if the
  // matcher below missed a case.
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  if (!prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const { status, body } = getMarkdownForPath(pathname);
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}

export const config = {
  matcher: [
    "/((?!api/|_next/static/|_next/image/|favicon.ico|images/|sitemap.xml|robots.txt|llms.txt|opengraph-image|manifest.webmanifest).*)",
  ],
};
