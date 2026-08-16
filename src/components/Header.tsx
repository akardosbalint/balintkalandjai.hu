import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  return (
    <div className="absolute left-0 top-0 z-20 p-5 sm:p-7">
      <Link href="/" aria-label={`${siteConfig.brandName} — főoldal`}>
        <Image
          src="/images/kardos-balint-logo.png"
          alt={siteConfig.brandName}
          width={40}
          height={39}
          className="h-9 w-9 opacity-90 transition-opacity hover:opacity-100 sm:h-10 sm:w-10"
          priority
        />
      </Link>
    </div>
  );
}
