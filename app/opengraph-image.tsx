import { ImageResponse } from "next/og"
import { site } from "@/lib/site"

export const alt = `${site.name} — Plumbing, Sanitary & Agriculture Fittings`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0f10",
          color: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#0095D8",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {`Since ${site.since} · Hyderabad`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
            PIPE CORPORATION
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#0095D8", fontWeight: 700 }}>
            Plumbing · Sanitary · Agriculture
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.62)", maxWidth: 900 }}>
            G.I, C.I, SS HDP, CPVC, UPVC, SWR pipes &amp; fittings — 7,000+ SKUs under one roof.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 26,
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>{site.phoneMain}</div>
          <div style={{ display: "flex", color: "#ffffff" }}>{site.email}</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
