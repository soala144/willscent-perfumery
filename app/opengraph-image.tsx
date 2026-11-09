import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Will-Scent Perfumery — Premium perfume oils. Launching soon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function dataUrl(file: string, mime: string) {
  const buffer = await readFile(join(process.cwd(), "public", file));
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export default async function Image() {
  const [logo, bottle] = await Promise.all([
    dataUrl("logo1.png", "image/png"),
    dataUrl("image2.jpeg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a1712 100%)",
        }}
      >
        <div
          style={{
            width: 720,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={380} height={380} alt="" style={{ marginTop: -20 }} />
          <div
            style={{
              marginTop: 8,
              fontSize: 34,
              color: "#F3EAD7",
              letterSpacing: 2,
            }}
          >
            Premium perfume oils. Launching soon.
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bottle} width={480} height={720} alt="" style={{ objectFit: "cover", marginTop: -45 }} />
      </div>
    ),
    size,
  );
}
