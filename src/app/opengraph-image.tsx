import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = `${siteConfig.brandName} — ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pageTitle = "31 éven keresztül lemaradtam a saját életemről.";

export default function OpengraphImage() {
  const logoData = readFileSync(
    join(process.cwd(), "public/images/kardos-balint-logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FBF7F1",
          position: "relative",
          padding: "72px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(193,97,60,0.38), rgba(193,97,60,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(46,59,44,0.32), rgba(46,59,44,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={76} height={75} alt="" />
          <span style={{ fontSize: 30, color: "#1A231B", fontWeight: 600 }}>
            {siteConfig.brandName}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 60,
              lineHeight: 1.2,
              color: "#1A231B",
              fontWeight: 600,
              maxWidth: 920,
            }}
          >
            {pageTitle}
          </span>
        </div>

        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 28, color: "rgba(36,28,21,0.65)" }}>
            58 nap Rishikeshben — élőben dokumentálva
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
