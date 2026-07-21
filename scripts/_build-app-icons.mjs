import sharp from 'sharp';
import { readFileSync } from 'fs';

const brut = readFileSync('public/images/ecole-t3p-logo-white-no-subtitle.svg', 'utf-8');
const svg = brut.split('fill="#0E3B2E"').join('fill="#FFFFFF"')
                .split('fill="#6E6E6E"').join('fill="#FFFFFF"');

const logo = await sharp(Buffer.from(svg), { density: 600 }).resize({ width: 1400 }).trim().png().toBuffer();
const m = await sharp(logo).metadata();
console.log('logo détouré :', m.width, 'x', m.height);

const coupe = Math.round(m.width * 0.61);
const ecoleBrut = await sharp(logo).extract({ left: 0, top: 0, width: coupe, height: m.height }).png().toBuffer();
const t3pBrut   = await sharp(logo).extract({ left: coupe, top: 0, width: m.width - coupe, height: m.height }).png().toBuffer();

const ecole = await sharp(ecoleBrut).trim().png().toBuffer();
const t3p   = await sharp(t3pBrut).trim().png().toBuffer();
const me = await sharp(ecole).metadata();
const mt = await sharp(t3p).metadata();
console.log('ÉCOLE :', me.width, 'x', me.height, '| T3P :', mt.width, 'x', mt.height);

async function icone(S, sortie) {
  const fond = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}"><rect width="${S}" height="${S}" rx="${Math.round(S*0.22)}" fill="#0E3B2E"/></svg>`
  );
  const we = Math.round(S*0.70), he = Math.round(me.height * (S*0.70) / me.width);
  const wt = Math.round(S*0.46), ht = Math.round(mt.height * (S*0.46) / mt.width);
  const esp = Math.round(S*0.06);
  const y = Math.round((S - (he + esp + ht)) / 2);
  const e = await sharp(ecole).resize(we, he).png().toBuffer();
  const t = await sharp(t3p).resize(wt, ht).png().toBuffer();
  await sharp(fond).composite([
    { input: e, left: Math.round((S-we)/2), top: y },
    { input: t, left: Math.round((S-wt)/2), top: y + he + esp },
  ]).png({ compressionLevel: 9 }).toFile(sortie);
  console.log(sortie, 'écrit');
}

await icone(512, 'public/icon-512.png');
await icone(192, 'public/icon-192.png');
