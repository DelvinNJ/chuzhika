import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Ensure favicon.ico and icon assets are generated from logo-transparent.png
try {
  const logoPngPath = path.join(process.cwd(), "public/images/logo-transparent.png");
  if (fs.existsSync(logoPngPath)) {
    const pngBuffer = fs.readFileSync(logoPngPath);

    // Construct standard ICO container holding the PNG
    const header = Buffer.alloc(22);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // type 1 = icon
    header.writeUInt16LE(1, 4); // 1 image
    header.writeUInt8(0, 6); // width (0 = 256px)
    header.writeUInt8(0, 7); // height (0 = 256px)
    header.writeUInt8(0, 8); // colors
    header.writeUInt8(0, 9); // reserved
    header.writeUInt16LE(1, 10); // color planes
    header.writeUInt16LE(32, 12); // bits per pixel
    header.writeUInt32LE(pngBuffer.length, 14); // image size
    header.writeUInt32LE(22, 18); // data offset = 22 bytes
    const icoBuffer = Buffer.concat([header, pngBuffer]);

    // Overwrite app/favicon.ico so Next.js serves the brand logo
    fs.writeFileSync(path.join(process.cwd(), "app/favicon.ico"), icoBuffer);

    // Overwrite/write public/favicon.ico for static root requests
    fs.writeFileSync(path.join(process.cwd(), "public/favicon.ico"), icoBuffer);

    // Also sync to app/icon.png and public/icon.png
    fs.writeFileSync(path.join(process.cwd(), "app/icon.png"), pngBuffer);
    fs.writeFileSync(path.join(process.cwd(), "public/icon.png"), pngBuffer);
    fs.writeFileSync(path.join(process.cwd(), "public/logo.png"), pngBuffer);
  }
} catch (e) {
  console.warn("Favicon sync skipped:", e);
}

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/chuzhika" : "",
  assetPrefix: isProd ? "/chuzhika/" : undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
