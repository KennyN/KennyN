import { writeFileSync } from 'node:fs';

const W = 1200, H = 240;
const spacing = 20;
const dotSize = 3;
const cx = W / 2, cy = H / 2;
const maxDist = Math.hypot(cx, cy);

const pulseDur = 3.5;
const waveSpeed = 1.6;

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
    const phase = -(norm * waveSpeed + rand() * 0.4);
    const peak = (0.45 + rand() * 0.55).toFixed(2);
    const valley = (0.04 + rand() * 0.08).toFixed(2);
    const rx = (x - dotSize / 2).toFixed(1);
    const ry = (y - dotSize / 2).toFixed(1);
    parts.push(
      `<rect x="${rx}" y="${ry}" width="${dotSize}" height="${dotSize}" fill="#fff" opacity="${valley}">` +
      `<animate attributeName="opacity" values="${valley};${peak};${valley}" keyTimes="0;0.5;1" dur="${pulseDur}s" begin="${phase.toFixed(2)}s" repeatCount="indefinite"/>` +
      `</rect>`
    );
  }
}

parts.push(`<rect width="${W}" height="${H}" fill="url(#vignette)"/>`);

parts.push(
  `<text x="${W / 2}" y="${H / 2 - 6}" text-anchor="middle" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="56" font-weight="700" fill="#fff">` +
  `Hiya, I&apos;m Kenny` +
  `</text>`
);
parts.push(
  `<text x="${W / 2}" y="${H / 2 + 38}" text-anchor="middle" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="18" fill="#9ca3af">` +
  `offensive security &#183; software engineering &#183; product design` +
  `</text>`
);

parts.push(`</svg>`);

writeFileSync('header.svg', parts.join(''));
console.log('header.svg written');
