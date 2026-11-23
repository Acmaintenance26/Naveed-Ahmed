import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2F57" />
      <stop offset="100%" stop-color="#00A896" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Teal to Navy Gradient Rounded Background matching AL Naveed header logo -->
  <rect width="512" height="512" rx="116" fill="url(#bgGrad)" />
  <rect x="8" y="8" width="496" height="496" rx="108" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="8" />

  <!-- Sparkles Icon (Amber/Gold Lucide Sparkles identical to website header) -->
  <g transform="translate(86, 86) scale(14.166)" fill="none" stroke="#FCD34D" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" filter="url(#shadow)">
    <!-- Central 4-pointed Sparkle with luminous soft amber fill for clarity at small sizes -->
    <path
      d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
      fill="#FCD34D"
      fill-opacity="0.25"
    />
    <!-- Top-right mini sparkle -->
    <path d="M20 2v4" />
    <path d="M22 4h-4" />
    <!-- Bottom-left sparkling orb -->
    <circle cx="4" cy="20" r="2" fill="#FCD34D" fill-opacity="0.3" />
  </g>
</svg>`;

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Save SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
  console.log('Saved favicon.svg');

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate PNGs: apple-touch-icon (180x180), 32x32, 16x16, 192x192, 512x512
  const sizes = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name} (${size}x${size})`);
  }

  // Also create favicon.ico as 32x32
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');

  console.log('All favicon assets created successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
