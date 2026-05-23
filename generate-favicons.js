import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-180x180.png': 180,
  'favicon-192x192.png': 192,
  'favicon-512x512.png': 512,
};

function generatePng(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Draw background - #7C3AED with modern squircle rounded corners
  ctx.fillStyle = '#7C3AED';
  const radius = size * 0.22;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();

  // Draw white lightning bolt perfectly centered
  ctx.beginPath();
  ctx.moveTo(size * 0.57, size * 0.18);
  ctx.lineTo(size * 0.32, size * 0.54);
  ctx.lineTo(size * 0.50, size * 0.54);
  ctx.lineTo(size * 0.41, size * 0.84);
  ctx.lineTo(size * 0.68, size * 0.48);
  ctx.lineTo(size * 0.50, size * 0.48);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  return canvas.toBuffer('image/png');
}

// Generate all PNG files
console.log('Generating PNG favicons...');
Object.entries(sizes).forEach(([filename, size]) => {
  const buffer = generatePng(size);
  fs.writeFileSync(filename, buffer);
  console.log(`Generated ${filename} (${size}x${size})`);
});

// Generate favicon.ico containing 16x16 and 32x32 PNG arrays
console.log('Generating favicon.ico...');
const png16 = generatePng(16);
const png32 = generatePng(32);

// Create a multi-image ICO folder buffer
// ICO Header structure (6 bytes):
// 2 bytes: Reserved (0)
// 2 bytes: Type (1 for ICO)
// 2 bytes: Count (2 images)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(2, 4);

// Directory entry 1 (16 bytes) - 16x16
const dir1 = Buffer.alloc(16);
dir1.writeUInt8(16, 0); // Width
dir1.writeUInt8(16, 1); // Height
dir1.writeUInt8(0, 2); // Colors
dir1.writeUInt8(0, 3); // Reserved
dir1.writeUInt16LE(1, 4); // Planes
dir1.writeUInt16LE(32, 6); // BPP
dir1.writeUInt32LE(png16.length, 8); // Size
dir1.writeUInt32LE(6 + 16 + 16, 12); // Offset: header + dir1 + dir2 = 38

// Directory entry 2 (16 bytes) - 32x32
const dir2 = Buffer.alloc(16);
dir2.writeUInt8(32, 0); // Width
dir2.writeUInt8(32, 1); // Height
dir2.writeUInt8(0, 2); // Colors
dir2.writeUInt8(0, 3); // Reserved
dir2.writeUInt16LE(1, 4); // Planes
dir2.writeUInt16LE(32, 6); // BPP
dir2.writeUInt32LE(png32.length, 8); // Size
dir2.writeUInt32LE(6 + 16 + 16 + png16.length, 12); // Offset: header + dir1 + dir2 + png16

const icoBuffer = Buffer.concat([header, dir1, dir2, png16, png32]);
fs.writeFileSync('favicon.ico', icoBuffer);
console.log('Generated favicon.ico successfully containing 16x16 and 32x32 images.');
