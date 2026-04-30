import { writeFileSync } from 'node:fs';

const W = 1200, H = 240;
const spacing = 20;
const radius = 1.5;
const cx = W / 2, cy = H / 2;
const maxDist = Math.hypot(cx, cy);

let seed = 7;
const rand = () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

const parts = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" preserveAspectRatio="xMidYMid slice" style="background:#000;border-radius:8px">`,
  `<defs><radialGradient id="vignette" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="1"/></radialGradient></defs>`,
];

for (let x = spacing / 2; x < W; x += spacing) {
  for (let y = spacing / 2; y < H; y += spacing) {
    const dist = Math.hypot(x - cx, y - cy);
    const norm = dist / maxDist;
    const delay = (norm * 2.2 + rand() * 0.35).toFixed(2);
    const op = (0.25 + rand() * 0.7).toFixed(2);
    parts.push(
      `<circle cx="${x}" cy="${y}" r="${radius}" fill="#fff" opacity="0">` +
      `<animate attributeName="opacity" from="0" to="${op}" dur="0.7s" begin="${delay}s" fill="freeze"/>` +
      `</circle>`
    );
  }
}

parts.push(`<rect width="${W}" height="${H}" fill="url(#vignette)"/>`);

parts.push(
  `<text x="${W / 2}" y="${H / 2 - 6}" text-anchor="middle" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="56" font-weight="700" fill="#fff" opacity="0">` +
  `Hiya, I&apos;m Kenny` +
  `<animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="2.2s" fill="freeze"/>` +
  `</text>`
);
parts.push(
  `<text x="${W / 2}" y="${H / 2 + 38}" text-anchor="middle" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="18" fill="#9ca3af" opacity="0">` +
  `offensive security &#183; software engineering &#183; product design` +
  `<animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="2.6s" fill="freeze"/>` +
  `</text>`
);

parts.push(`</svg>`);

writeFileSync('header.svg', parts.join(''));
console.log('header.svg written');
