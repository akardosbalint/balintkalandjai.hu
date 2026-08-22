import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.brandName;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FBF7F1",
          color: "#1A231B",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: "#A94F30",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {siteConfig.brandName}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          31 éven keresztül lemaradtam a saját életemről
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#1A231B", opacity: 0.75 }}>
          58 nap, Rishikesh, RYT-500 jógaoktatói képzés — nyilvánosan dokumentálva
        </div>
      </div>
    ),
    { ...size },
  );
}
