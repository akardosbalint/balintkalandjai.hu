import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-forest-800/10 bg-forest-900 px-6 py-14 text-sand-100 dark:border-sand-50/10 dark:bg-forest-800">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="font-serif text-xl">{siteConfig.brandName}</p>

        <div className="flex gap-6 text-sm text-sand-100/70">
          <a href={siteConfig.social.tiktok} className="hover:text-sand-50" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>

        <div className="max-w-md text-sm text-sand-100/60">
          <p>
            Bármikor egy kattintással leiratkozhatsz — minden levél alján
            találsz erre gombot.
          </p>
          <p className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/gyik" className="underline underline-offset-2 hover:text-sand-50">
              Gyakori kérdések
            </Link>
            <Link href="/adatkezeles" className="underline underline-offset-2 hover:text-sand-50">
              Adatkezelési tájékoztató
            </Link>
            <Link href="/aszf" className="underline underline-offset-2 hover:text-sand-50">
              Általános Szerződési Feltételek
            </Link>
          </p>
        </div>

        <p className="text-xs text-sand-100/55">
          © {new Date().getFullYear()} {siteConfig.brandName}. Minden jog
          fenntartva.
        </p>
      </div>
    </footer>
  );
}
