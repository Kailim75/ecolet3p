import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const svg = readFileSync('public/favicon.svg');
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(svg, { density: 384 }).resize(s, s).png({ compressionLevel: 9 }).toBuffer())
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);

let offset = 6 + 16 * sizes.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0);
  e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});

writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));
console.log('favicon.ico écrit :', offset, 'octets');
