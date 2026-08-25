import { ImageResponse } from "next/og";

export const alt = "AA Design & Media";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#03060d,#07152f 58%,#0b3d86)", color: "white", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}><div style={{ width: 62, height: 62, borderRadius: 16, background: "#0b66ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 22 }}>AA</div><div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 4 }}>DESIGN &amp; MEDIA</div></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 900, lineHeight: .88, letterSpacing: -6 }}><span>CRIAMOS EXPERIÊNCIAS.</span><span>CONTAMOS HISTÓRIAS.</span></div><div style={{ marginTop: 28, color: "#76c5ff", fontSize: 20, letterSpacing: 4 }}>PRODUÇÃO AUDIOVISUAL · SÃO PAULO</div></div>
    </div>,
    size
  );
}
