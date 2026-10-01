import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const file = await readFile(path.join(process.cwd(), "cv", "Norma_Irkham_Maulana_CV.pdf"));
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Norma_Irkham_Maulana_CV.pdf"',
    },
  });
}
