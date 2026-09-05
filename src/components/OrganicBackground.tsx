type Variant = "hero" | "story" | "offer" | "proof" | "cta";

const VARIANT_BLOBS: Record<Variant, { className: string; style: React.CSSProperties }[]> = {
  hero: [
    {
      className:
        "absolute -top-32 -right-24 h-[34rem] w-[34rem] rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(193,97,60,0.35), rgba(193,97,60,0) 70%)",
      },
    },
    {
      className:
        "absolute top-1/3 -left-32 h-[26rem] w-[26rem] rounded-full blur-3xl animate-drift",
      style: {
        background:
          "radial-gradient(closest-side, rgba(184,147,91,0.25), rgba(184,147,91,0) 70%)",
      },
    },
  ],
  story: [
    {
      className:
        "absolute top-10 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(184,147,91,0.25), rgba(184,147,91,0) 70%)",
      },
    },
  ],
  offer: [
    {
      className:
        "absolute -bottom-24 -left-20 h-[28rem] w-[28rem] rounded-full blur-3xl animate-drift",
      style: {
        background:
          "radial-gradient(closest-side, rgba(46,59,44,0.3), rgba(46,59,44,0) 70%)",
      },
    },
  ],
  proof: [
    {
      className:
        "absolute -top-16 right-0 h-[24rem] w-[24rem] rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(193,97,60,0.22), rgba(193,97,60,0) 70%)",
      },
    },
  ],
  cta: [
    {
      className:
        "absolute inset-x-0 -top-40 mx-auto h-[30rem] w-[30rem] rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(193,97,60,0.3), rgba(193,97,60,0) 70%)",
      },
    },
  ],
};

export default function OrganicBackground({ variant }: { variant: Variant }) {
  const blobs = VARIANT_BLOBS[variant];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div key={i} className={blob.className} style={blob.style} />
      ))}
    </div>
  );
}
