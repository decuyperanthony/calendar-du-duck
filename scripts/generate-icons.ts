import sharp from "sharp";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const SVG_PATH = join(ROOT_DIR, "public", "icon.svg");
const OUTPUT_DIR = join(ROOT_DIR, "public", "icons");

type IconConfig = {
  name: string;
  size: number;
};

const ICONS: IconConfig[] = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
];

const generateIcons = async () => {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const svgBuffer = readFileSync(SVG_PATH);

  console.log("Generating icons from icon.svg...\n");

  for (const icon of ICONS) {
    const outputPath = join(OUTPUT_DIR, icon.name);

    await sharp(svgBuffer)
      .resize(icon.size, icon.size)
      .png()
      .toFile(outputPath);

    console.log(`  ✓ ${icon.name} (${icon.size}x${icon.size})`);
  }

  console.log("\nDone! Icons generated in public/icons/");
};

generateIcons().catch(console.error);
