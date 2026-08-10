import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Daddy Solutions — you bring the idea, Daddy handles the rest.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: 72,
          color: "#ede9e1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            letterSpacing: -0.5,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#f0b45e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08080a",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            D
          </div>
          Daddy Solutions
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -3, display: "flex" }}>
            You bring the idea.
          </div>
          <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -3, display: "flex" }}>
            <span style={{ color: "#f0b45e" }}>Daddy</span>
            <span>&nbsp;handles the rest.</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#85838f" }}>
          <span>Full-stack</span>
          <span>·</span>
          <span>APIs & data</span>
          <span>·</span>
          <span>Cloud & DevOps</span>
          <span>·</span>
          <span>Solana / Web3</span>
        </div>
      </div>
    ),
    size,
  );
}
