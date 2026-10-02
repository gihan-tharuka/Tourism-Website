/**
 * Generates IslandSea Travels brand assets (favicon set + social OG image)
 * from a single source SVG mark, so every size stays pixel-consistent.
 *
 * Run from the frontend/ directory:  node scripts/generate-brand-assets.cjs
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const APP_DIR = path.join(__dirname, '..', 'src', 'app')
const PUBLIC_DIR = path.join(__dirname, '..', 'public')
const BRAND_DIR = path.join(PUBLIC_DIR, 'brand')
const OG_DIR = path.join(PUBLIC_DIR, 'og')

const TEAL = '#0e7c86'
const NAVY = '#0b1b2b'
const AMBER = '#f5a524'
const DISPLAY_FONT = "Futura, 'Sora', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ *
 * Source mark: rounded tile, teal->navy gradient, amber dot, white stem
 * ------------------------------------------------------------------ */
const markSvg = (size = 512) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${TEAL}"/>
      <stop offset="1" stop-color="${NAVY}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#tile)"/>
  <path d="M64 448 C112 414, 160 482, 208 448 S304 414, 352 448 S432 434, 456 442" fill="none" stroke="${AMBER}" stroke-width="16" stroke-linecap="round" opacity="0.55"/>
  <circle cx="256" cy="152" r="48" fill="${AMBER}"/>
  <rect x="224" y="228" width="64" height="164" rx="32" fill="#FFFFFF"/>
</svg>`

/* Minimal multi-size .ico writer (PNG-compressed entries, Vista+). */
const buildIco = (pngBuffers) => {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngBuffers.length, 4)

  const dir = Buffer.alloc(16 * pngBuffers.length)
  let offset = header.length + dir.length

  pngBuffers.forEach(({ size, buffer }, i) => {
    const e = 16 * i
    dir.writeUInt8(size >= 256 ? 0 : size, e + 0) // width (0 => 256)
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1) // height
    dir.writeUInt8(0, e + 2) // palette
    dir.writeUInt8(0, e + 3) // reserved
    dir.writeUInt16LE(1, e + 4) // color planes
    dir.writeUInt16LE(32, e + 6) // bits per pixel
    dir.writeUInt32LE(buffer.length, e + 8)
    dir.writeUInt32LE(offset, e + 12)
    offset += buffer.length
  })

  return Buffer.concat([header, dir, ...pngBuffers.map((p) => p.buffer)])
}

const png = (size) => sharp(Buffer.from(markSvg())).resize(size, size).png().toBuffer()

/* Opaque square variant for iOS/Android home screens (no alpha corners) */
const squarePng = (size) =>
  sharp(Buffer.from(markSvg()))
    .resize(size, size)
    .flatten({ background: NAVY })
    .png()
    .toBuffer()
/* ------------------------------------------------------------------ *
 * OG image: hero photo + navy scrim + mark + two-tone wordmark
 * ------------------------------------------------------------------ */
const buildOgImage = async () => {
  const W = 1200
  const H = 630

  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0" stop-color="${NAVY}" stop-opacity="0.94"/>
      <stop offset="0.55" stop-color="${NAVY}" stop-opacity="0.72"/>
      <stop offset="1" stop-color="${TEAL}" stop-opacity="0.42"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${NAVY}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${NAVY}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect width="${W}" height="${H}" fill="url(#bottom)"/>
  <g transform="translate(80,212)">
    <rect width="80" height="80" rx="20" fill="${TEAL}"/>
    <circle cx="40" cy="24" r="7.5" fill="${AMBER}"/>
    <rect x="35" y="36" width="10" height="26" rx="5" fill="#FFFFFF"/>
    <text x="104" y="42" font-family="${DISPLAY_FONT}" font-size="46" font-weight="600" letter-spacing="-1" fill="#FFFFFF">Island<tspan fill="${AMBER}">Sea</tspan></text>
    <text x="105" y="72" font-family="${DISPLAY_FONT}" font-size="16" font-weight="500" letter-spacing="8" fill="#FFFFFF" opacity="0.75">TRAVELS</text>
  </g>
  <text x="80" y="440" font-family="${DISPLAY_FONT}" font-size="60" font-weight="700" letter-spacing="-1.8" fill="#FFFFFF">Discover Sri Lanka,</text>
  <text x="80" y="508" font-family="${DISPLAY_FONT}" font-size="60" font-weight="700" letter-spacing="-1.8" fill="${AMBER}">differently.</text>
  <rect x="80" y="546" width="76" height="5" rx="2.5" fill="${TEAL}"/>
</svg>`)

  const base = await sharp(path.join(PUBLIC_DIR, 'images', 'homehero2.jpg'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer()

  await sharp(base)
    .composite([{ input: overlay }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(OG_DIR, 'islandsea-travels-og.jpg'))
}
const main = async () => {
  fs.mkdirSync(BRAND_DIR, { recursive: true })
  fs.mkdirSync(OG_DIR, { recursive: true })

  // Source vector in the app dir (Next.js file convention icon)
  fs.writeFileSync(path.join(APP_DIR, 'icon.svg'), markSvg())

  const icoEntries = await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, buffer: await png(size) })),
  )
  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), buildIco(icoEntries))

  const apple = await squarePng(180)
  fs.writeFileSync(path.join(APP_DIR, 'apple-icon.png'), apple)
  fs.writeFileSync(path.join(BRAND_DIR, 'apple-touch-icon.png'), apple)

  fs.writeFileSync(path.join(BRAND_DIR, 'favicon-16x16.png'), await png(16))
  fs.writeFileSync(path.join(BRAND_DIR, 'favicon-32x32.png'), await png(32))
  fs.writeFileSync(path.join(BRAND_DIR, 'android-chrome-192x192.png'), await squarePng(192))
  fs.writeFileSync(path.join(BRAND_DIR, 'android-chrome-512x512.png'), await squarePng(512))

  fs.writeFileSync(
    path.join(BRAND_DIR, 'site.webmanifest'),
    `${JSON.stringify(
      {
        name: 'IslandSea Travels',
        short_name: 'IslandSea',
        description: 'Luxury Sri Lanka tours, private transfers and custom itineraries.',
        icons: [
          { src: '/brand/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/brand/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: TEAL,
        background_color: NAVY,
        display: 'standalone',
        start_url: '/',
      },
      null,
      2,
    )}\n`,
  )

  await buildOgImage()

  console.log('Brand assets generated.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})