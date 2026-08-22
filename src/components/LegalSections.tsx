import { legalSections } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site-config";

/** A jogalapot leíró bekezdésekben az email cím mailto-linkké alakítva. */
function renderParagraph(paragraph: string) {
  const parts = paragraph.split(siteConfig.email);
  if (parts.length === 1) return paragraph;

  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a
            key={`${part}-${i}`}
            href={`mailto:${siteConfig.email}`}
            className="underline decoration-terracotta-500 underline-offset-2"
          >
            {siteConfig.email}
          </a>,
          part,
        ],
  );
}

export default function LegalSections() {
  return (
    <div className="mt-10 space-y-8 text-ink-900/80">
      {legalSections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-serif text-xl text-forest-900">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-2">
              {renderParagraph(paragraph)}
            </p>
          ))}
          {section.list && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
