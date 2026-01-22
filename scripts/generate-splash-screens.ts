import sharp from "sharp";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const SVG_PATH = join(ROOT_DIR, "public", "icon.svg");
const OUTPUT_DIR = join(ROOT_DIR, "public", "splash");

// iOS splash screen sizes (portrait)
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/launch-screen/
type SplashConfig = {
  width: number;
  height: number;
  devicePixelRatio: number;
  device: string;
};

const SPLASH_SCREENS: SplashConfig[] = [
  // iPhone SE, iPhone 8, iPhone 7, iPhone 6s
  { width: 750, height: 1334, devicePixelRatio: 2, device: "iPhone 8" },
  // iPhone 8 Plus, iPhone 7 Plus, iPhone 6s Plus
  { width: 1242, height: 2208, devicePixelRatio: 3, device: "iPhone 8 Plus" },
  // iPhone X, iPhone XS, iPhone 11 Pro
  { width: 1125, height: 2436, devicePixelRatio: 3, device: "iPhone X/XS" },
  // iPhone XR, iPhone 11
  { width: 828, height: 1792, devicePixelRatio: 2, device: "iPhone XR" },
  // iPhone XS Max, iPhone 11 Pro Max
  { width: 1242, height: 2688, devicePixelRatio: 3, device: "iPhone XS Max" },
  // iPhone 12 mini, iPhone 13 mini
  { width: 1080, height: 2340, devicePixelRatio: 3, device: "iPhone 12 mini" },
  // iPhone 12, iPhone 12 Pro, iPhone 13, iPhone 13 Pro, iPhone 14
  { width: 1170, height: 2532, devicePixelRatio: 3, device: "iPhone 12/13/14" },
  // iPhone 12 Pro Max, iPhone 13 Pro Max, iPhone 14 Plus
  { width: 1284, height: 2778, devicePixelRatio: 3, device: "iPhone 12/13/14 Pro Max" },
  // iPhone 14 Pro, iPhone 15, iPhone 15 Pro
  { width: 1179, height: 2556, devicePixelRatio: 3, device: "iPhone 14 Pro/15" },
  // iPhone 14 Pro Max, iPhone 15 Plus, iPhone 15 Pro Max
  { width: 1290, height: 2796, devicePixelRatio: 3, device: "iPhone 14/15 Pro Max" },
  // iPad Mini, iPad Air
  { width: 1536, height: 2048, devicePixelRatio: 2, device: "iPad" },
  // iPad Pro 10.5"
  { width: 1668, height: 2224, devicePixelRatio: 2, device: "iPad Pro 10.5" },
  // iPad Pro 11"
  { width: 1668, height: 2388, devicePixelRatio: 2, device: "iPad Pro 11" },
  // iPad Pro 12.9"
  { width: 2048, height: 2732, devicePixelRatio: 2, device: "iPad Pro 12.9" },
];

// Background color matching the app theme
const BG_COLOR = "#0f0a1e";

const generateSplashScreens = async () => {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const svgBuffer = readFileSync(SVG_PATH);

  console.log("Generating iOS splash screens...\n");

  for (const splash of SPLASH_SCREENS) {
    const outputPath = join(OUTPUT_DIR, `splash-${splash.width}x${splash.height}.png`);

    // Icon size is 25% of the smaller dimension
    const iconSize = Math.round(Math.min(splash.width, splash.height) * 0.25);

    // Create the icon at the calculated size
    const iconBuffer = await sharp(svgBuffer)
      .resize(iconSize, iconSize)
      .png()
      .toBuffer();

    // Create the background and composite the icon in the center
    await sharp({
      create: {
        width: splash.width,
        height: splash.height,
        channels: 4,
        background: BG_COLOR,
      },
    })
      .composite([
        {
          input: iconBuffer,
          gravity: "center",
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`  ✓ splash-${splash.width}x${splash.height}.png (${splash.device})`);
  }

  console.log("\nDone! Splash screens generated in public/splash/");
};

generateSplashScreens().catch(console.error);
