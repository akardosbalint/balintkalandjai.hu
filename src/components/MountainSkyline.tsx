/**
 * HEGYVONULAT + NAPKELTE + ÚTVONALÍV
 * -----------------------------------------------------------------
 * A Hero szekció alján lévő, kalandra hívó "establishing shot": egy
 * rétegzett, absztrakt Himalája-sziluett, meleg napkelte-színátmenettel,
 * és egy pontozott ívvel, ami egy induló ponttól (itthonról) egy
 * kiemelt csúcs-jelölőig (Indiáig) fut — a konkrét utazást vetíti elő
 * vizuálisan, mielőtt a látogató elolvasná a szöveget.
 *
 * Szándékosan alacsony, lapos sávban tartva (nem a teljes szekció
 * magasságában): a csúcsok csak a sáv alsó ~40%-áig érnek fel, hogy a
 * fölötte lévő szövegnek/formnak ne kelljen extra helyet hagynia — a
 * Hero.tsx z-index rétegzése garantálja, hogy a tartalom mindig
 * felette marad, még ha rá is lóg valamennyi.
 */
export default function MountainSkyline() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 overflow-hidden sm:h-56"
      aria-hidden="true"
    >
      {/* napkelte-mosás: meleg szín a láthatáron, elhalványul felfelé */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(193,97,60,0.22) 0%, rgba(184,147,91,0.13) 35%, rgba(184,147,91,0.04) 65%, rgba(251,247,241,0) 90%)",
        }}
      />

      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-full w-full"
        focusable="false"
      >
        {/* távoli hegyvonulat */}
        <path
          d="M0,145 L110,110 230,138 350,102 470,132 600,90 730,128 860,96 990,132 1120,104 1260,138 1440,112 L1440,200 L0,200 Z"
          fill="#2E3B2C"
          opacity="0.16"
        />
        {/* középső hegyvonulat */}
        <path
          d="M0,165 L150,128 300,158 450,116 610,150 770,108 930,150 1080,120 1230,158 1370,128 1440,144 L1440,200 L0,200 Z"
          fill="#243024"
          opacity="0.26"
        />
        {/* legközelebbi hegyvonulat */}
        <path
          d="M0,188 L130,152 270,180 410,140 570,178 730,134 890,178 1040,146 1200,180 1340,152 1440,168 L1440,200 L0,200 Z"
          fill="#1A231B"
          opacity="0.9"
        />

        {/* útvonalív: induló pont (itthon) → csúcs-jelölő (India) */}
        <path
          d="M50,188 Q380,70 760,92 T1300,60"
          fill="none"
          stroke="#F4ECE0"
          strokeWidth="1.5"
          strokeDasharray="0.5 12"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="50" cy="188" r="4" fill="#F4ECE0" opacity="0.7" />
        <circle
          cx="1300"
          cy="60"
          r="6"
          fill="#B8935B"
          className="animate-breathe-slow"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}
