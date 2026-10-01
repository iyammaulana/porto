import path from "node:path";
import sharp from "sharp";

export const dynamic = "force-static";

const SOURCE = path.join(process.cwd(), "foto", "WhatsApp Image 2026-10-01 at 9.26.29 PM.jpeg");

// Crop box as fractions of the upright photo (reference size 1108 × 1477).
// 4:5, centred on Norma (x ≈ 595) with headroom above the hair. The left edge
// stays right of the two people in the background, so they never reach the browser.
const CROP = { left: 215 / 1108, top: 440 / 1477, width: 760 / 1108, height: 950 / 1477 };

export async function GET() {
  const { data, info } = await sharp(SOURCE).rotate().toBuffer({ resolveWithObject: true });

  const left = Math.round(info.width * CROP.left);
  const top = Math.round(info.height * CROP.top);
  const width = Math.min(Math.round(info.width * CROP.width), info.width - left);
  const height = Math.min(Math.round(info.height * CROP.height), info.height - top);

  const out = await sharp(data)
    .extract({ left, top, width, height })
    .resize({ width: 960, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(out), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
