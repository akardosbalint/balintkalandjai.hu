type Variant = "hero" | "story" | "offer" | "proof" | "faq" | "cta";

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
          "radial-gradient(closest-side, rgba(46,59,44,0.28), rgba(46,59,44,0) 70%)",
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
  faq: [
    {
      className:
        "absolute -bottom-20 right-1/4 h-[24rem] w-[24rem] rounded-full blur-3xl animate-drift",
      style: {
        background:
          "radial-gradient(closest-side, rgba(184,147,91,0.22), rgba(184,147,91,0) 70%)",
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

/**
 * ROZETTA — szirmokból álló, elvont sugárminta.
 * Indiai textil- és épületdíszítésekre (rangoli, mehendi) utaló motívum,
 * de tudatosan absztrakt — nem másol konkrét vallási/kulturális szimbólumot
 * (nincs om-jel, csakra, mandala-ikonográfia), csak az ismétlődő,
 * szirmos díszítőnyelvet idézi.
 */
function Rosette({
  className,
  color = "#B8935B",
  petals = 10,
}: {
  className: string;
  color?: string;
  petals?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={color} strokeWidth="1" fill="none">
        {Array.from({ length: petals }).map((_, i) => (
          <ellipse
            key={i}
            cx="100"
            cy="100"
            rx="72"
            ry="22"
            transform={`rotate(${(360 / petals) * i} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="10" />
      </g>
    </svg>
  );
}

/**
 * HULLÁMGYŰRŰK — koncentrikus körök, a "belső út"/tudatosság vizuális
 * jele (az ECO neve is erre utal: Energy of Consciousness). Ugyanaz a
 * "lélegző" animáció adja az életet, mint a színes blobbeknek.
 */
function Ripples({ className, color = "#2E3B2C" }: { className: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <g stroke={color} strokeWidth="1" fill="none">
        <circle cx="100" cy="100" r="26" opacity="0.55" />
        <circle cx="100" cy="100" r="50" opacity="0.4" />
        <circle cx="100" cy="100" r="76" opacity="0.25" />
        <circle cx="100" cy="100" r="98" opacity="0.12" />
      </g>
    </svg>
  );
}

const VARIANT_MOTIFS: Record<
  Variant,
  { rosette?: string; ripples?: string }
> = {
  hero: {
    rosette: "absolute -bottom-6 left-6 h-32 w-32 opacity-[0.08] animate-drift sm:h-40 sm:w-40",
    ripples:
      "absolute bottom-0 right-8 h-64 w-64 translate-y-1/3 opacity-[0.1] animate-breathe-slow sm:h-80 sm:w-80",
  },
  story: {
    rosette: "absolute right-4 top-24 h-28 w-28 opacity-[0.07] animate-drift sm:h-36 sm:w-36",
    ripples:
      "absolute -left-10 bottom-10 h-56 w-56 opacity-[0.08] animate-breathe-slow sm:h-72 sm:w-72",
  },
  offer: {
    rosette: "absolute right-8 top-8 h-28 w-28 opacity-[0.07] animate-drift sm:h-36 sm:w-36",
    ripples:
      "absolute -bottom-16 right-0 h-64 w-64 opacity-[0.09] animate-breathe-slow sm:h-80 sm:w-80",
  },
  proof: {
    rosette: "absolute -bottom-4 left-6 h-28 w-28 opacity-[0.07] animate-drift sm:h-36 sm:w-36",
    ripples:
      "absolute -top-10 left-1/4 h-56 w-56 opacity-[0.08] animate-breathe-slow sm:h-72 sm:w-72",
  },
  faq: {
    rosette: "absolute left-4 top-10 h-28 w-28 opacity-[0.07] animate-drift sm:h-36 sm:w-36",
    ripples:
      "absolute -bottom-14 left-1/3 h-56 w-56 opacity-[0.08] animate-breathe-slow sm:h-72 sm:w-72",
  },
  cta: {
    ripples:
      "absolute inset-x-0 bottom-0 mx-auto h-[26rem] w-[26rem] translate-y-1/4 opacity-[0.1] animate-breathe-slow",
  },
};

export default function OrganicBackground({ variant }: { variant: Variant }) {
  const blobs = VARIANT_BLOBS[variant];
  const motifs = VARIANT_MOTIFS[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div key={i} className={blob.className} style={blob.style} />
      ))}
      {motifs.rosette && <Rosette className={motifs.rosette} />}
      {motifs.ripples && <Ripples className={motifs.ripples} />}
    </div>
  );
}
