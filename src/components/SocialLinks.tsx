import { siteConfig } from "@/lib/site-config";

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
}

export interface SocialItem {
  label: string;
  shortLabel?: string;
  href: string;
}

export const SOCIAL_ITEMS: SocialItem[] = [
  { label: "TikTok", href: siteConfig.social.tiktok },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "YouTube Shorts", shortLabel: "YouTube", href: siteConfig.social.youtube },
  { label: "Facebook", href: siteConfig.social.facebook },
];

export default function SocialLinks({
  className = "flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm",
  linkClassName = "-my-2 inline-block py-2 underline decoration-terracotta-500 underline-offset-2 transition-colors duration-200 hover:text-ink-900 dark:hover:text-sand-50",
}: SocialLinksProps) {
  return (
    <div className={className}>
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
          aria-label={`${item.label} (új lapon nyílik)`}
        >
          {item.shortLabel || item.label}
        </a>
      ))}
    </div>
  );
}
