import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-forest-800/10 bg-forest-900 px-6 py-14 text-sand-100">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <p className="font-serif text-xl">{siteConfig.brandName}</p>

        <div className="flex gap-6 text-sm text-sand-100/70">
          <a href={siteConfig.social.instagram} className="hover:text-sand-50" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={siteConfig.social.tiktok} className="hover:text-sand-50" target="_blank" rel="noreferrer">
            TikTok
          </a>
          <a href={siteConfig.social.facebook} className="hover:text-sand-50" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>

        <div className="max-w-md text-sm text-sand-100/60">
          <p>
            Bármikor egy kattintással leiratkozhatsz — minden levél alján
            találsz erre gombot.
          </p>
          <p className="mt-2">
            <Link href="/adatkezeles" className="underline underline-offset-2 hover:text-sand-50">
              Adatkezelési tájékoztató
            </Link>
          </p>
        </div>

        <p className="text-xs text-sand-100/40">
          © {new Date().getFullYear()} {siteConfig.brandName}. Minden jog
          fenntartva.
        </p>
      </div>
    </footer>
  );
}
