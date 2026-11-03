#!/usr/bin/env node
/**
 * Génère src/icons/generated/dsIcons.ts à partir des icônes du Design System (ds-icons.css + police MDI).
 *
 * Aucune dépendance : ds-icons.css donne le codepoint de chaque `.mdi-<nom>:before`, et un parseur
 * TrueType minimal (cmap format 12/4, loca, glyf) convertit le contour du glyphe en tracé SVG
 * normalisé sur une grille 24 × 24 (celle de MDI et de --ds-icon-size-*).
 *
 * Usage : npm run icons            (chemins de icons.config.json, relatifs à la racine de core-react)
 *         DS_PATH=/chemin/vers/sf-p05-design-system npm run icons
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const config = JSON.parse(readFileSync(resolve(ROOT, 'scripts/icons/icons.config.json'), 'utf8'));
const OUTPUT = resolve(ROOT, 'src/icons/generated/dsIcons.ts');
const GRID = 24;

const fromDs = (path) =>
  process.env.DS_PATH ? resolve(process.env.DS_PATH, path.replace(/^\.\.\/sf-p05-design-system\//, '')) : resolve(ROOT, path);

// --- 1. Codepoints depuis ds-icons.css -------------------------------------------------------------
const readCodepoints = (cssPath, prefix) => {
  const css = readFileSync(cssPath, 'utf8');
  const map = new Map();
  const pattern = new RegExp(`\\.${prefix}-([a-z0-9-]+):+before\\{content:"\\\\([0-9a-f]+)"\\}`, 'g');
  for (const [, name, hex] of css.matchAll(pattern)) map.set(name, parseInt(hex, 16));
  return map;
};

// --- 2. Parseur TrueType minimal --------------------------------------------------------------------
const parseFont = (buffer) => {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const tables = {};
  const numTables = view.getUint16(4);
  for (let i = 0; i < numTables; i++) {
    const record = 12 + i * 16;
    const tag = String.fromCharCode(...buffer.subarray(record, record + 4));
    tables[tag] = { offset: view.getUint32(record + 8), length: view.getUint32(record + 12) };
  }
  for (const tag of ['head', 'hhea', 'maxp', 'cmap', 'loca', 'glyf']) {
    if (!tables[tag]) throw new Error(`Table TrueType « ${tag} » absente : police non prise en charge.`);
  }

  const head = tables.head.offset;
  const unitsPerEm = view.getUint16(head + 18);
  const longLoca = view.getInt16(head + 50) === 1;
  const ascender = view.getInt16(tables.hhea.offset + 4);
  const descender = view.getInt16(tables.hhea.offset + 6);
  const numGlyphs = view.getUint16(tables.maxp.offset + 4);

  const glyphOffset = (index) =>
    longLoca
      ? view.getUint32(tables.loca.offset + index * 4)
      : view.getUint16(tables.loca.offset + index * 2) * 2;

  // cmap : format 12 (plan supplémentaire, MDI utilise U+F0000…) sinon format 4
  const cmap = tables.cmap.offset;
  const subtables = [];
  for (let i = 0; i < view.getUint16(cmap + 2); i++) {
    const at = cmap + 4 + i * 8;
    const offset = cmap + view.getUint32(at + 4);
    subtables.push({ offset, format: view.getUint16(offset) });
  }
  const format12 = subtables.find((table) => table.format === 12);
  const format4 = subtables.find((table) => table.format === 4);

  const glyphIndexOf = (codepoint) => {
    if (format12) {
      const base = format12.offset;
      const groups = view.getUint32(base + 12);
      for (let g = 0; g < groups; g++) {
        const at = base + 16 + g * 12;
        const start = view.getUint32(at);
        const end = view.getUint32(at + 4);
        if (codepoint >= start && codepoint <= end) return view.getUint32(at + 8) + (codepoint - start);
      }
      return 0;
    }
    if (format4 && codepoint <= 0xffff) {
      const base = format4.offset;
      const segX2 = view.getUint16(base + 6);
      const ends = base + 14;
      const starts = ends + segX2 + 2;
      const deltas = starts + segX2;
      const ranges = deltas + segX2;
      for (let s = 0; s < segX2; s += 2) {
        if (codepoint > view.getUint16(ends + s)) continue;
        const start = view.getUint16(starts + s);
        if (codepoint < start) return 0;
        const delta = view.getInt16(deltas + s);
        const range = view.getUint16(ranges + s);
        if (range === 0) return (codepoint + delta) & 0xffff;
        const glyph = view.getUint16(ranges + s + range + (codepoint - start) * 2);
        return glyph === 0 ? 0 : (glyph + delta) & 0xffff;
      }
    }
    return 0;
  };

  /** Contours d'un glyphe : [{ x, y, onCurve }[]] (les glyphes composites sont aplatis). */
  const readContours = (index, dx = 0, dy = 0) => {
    if (index >= numGlyphs) return [];
    const start = glyphOffset(index);
    if (glyphOffset(index + 1) === start) return []; // glyphe vide
    let p = tables.glyf.offset + start;
    const contourCount = view.getInt16(p);
    p += 10;

    if (contourCount < 0) {
      const contours = [];
      let flags;
      do {
        flags = view.getUint16(p);
        const component = view.getUint16(p + 2);
        p += 4;
        let x;
        let y;
        if (flags & 0x0001) {
          x = view.getInt16(p);
          y = view.getInt16(p + 2);
          p += 4;
        } else {
          x = view.getInt8(p);
          y = view.getInt8(p + 1);
          p += 2;
        }
        if (flags & 0x0008) p += 2;
        else if (flags & 0x0040) p += 4;
        else if (flags & 0x0080) p += 8;
        contours.push(...readContours(component, dx + x, dy + y));
      } while (flags & 0x0020);
      return contours;
    }

    const endPoints = [];
    for (let c = 0; c < contourCount; c++, p += 2) endPoints.push(view.getUint16(p));
    const pointCount = (endPoints.at(-1) ?? -1) + 1;
    p += 2 + view.getUint16(p); // instructions ignorées

    const flags = [];
    while (flags.length < pointCount) {
      const flag = view.getUint8(p++);
      flags.push(flag);
      if (flag & 0x08) {
        let repeat = view.getUint8(p++);
        while (repeat-- > 0) flags.push(flag);
      }
    }

    const readAxis = (shortBit, sameBit) => {
      const values = [];
      let value = 0;
      for (const flag of flags) {
        if (flag & shortBit) {
          const delta = view.getUint8(p++);
          value += flag & sameBit ? delta : -delta;
        } else if (!(flag & sameBit)) {
          value += view.getInt16(p);
          p += 2;
        }
        values.push(value);
      }
      return values;
    };
    const xs = readAxis(0x02, 0x10);
    const ys = readAxis(0x04, 0x20);

    const contours = [];
    let first = 0;
    for (const last of endPoints) {
      const points = [];
      for (let i = first; i <= last; i++) {
        points.push({ x: xs[i] + dx, y: ys[i] + dy, onCurve: (flags[i] & 0x01) === 1 });
      }
      contours.push(points);
      first = last + 1;
    }
    return contours;
  };

  return { unitsPerEm, ascender, descender, glyphIndexOf, readContours };
};

// --- 3. Contours quadratiques → chemin SVG (grille 24 × 24, axe Y inversé) --------------------------
const toSvgPath = (contours, font) => {
  const height = font.ascender - font.descender;
  const scale = GRID / height;
  const fmt = (n) => {
    const rounded = Math.round(n * 1000) / 1000;
    return Object.is(rounded, -0) ? '0' : String(rounded);
  };
  const pt = ({ x, y }) => `${fmt(x * scale)} ${fmt((font.ascender - y) * scale)}`;
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, onCurve: true });

  let d = '';
  for (const raw of contours) {
    if (raw.length === 0) continue;
    // Point de départ sur la courbe (sinon point implicite entre deux points de contrôle)
    let startIndex = raw.findIndex((point) => point.onCurve);
    let points = raw;
    let start;
    if (startIndex === -1) {
      start = mid(raw[0], raw[1 % raw.length]);
      points = [...raw.slice(1), raw[0]];
      startIndex = -1;
    } else {
      start = raw[startIndex];
      points = [...raw.slice(startIndex + 1), ...raw.slice(0, startIndex)];
    }

    d += `M${pt(start)}`;
    let control = null;
    for (const point of [...points, start]) {
      if (point.onCurve) {
        d += control ? `Q${pt(control)} ${pt(point)}` : `L${pt(point)}`;
        control = null;
      } else if (control) {
        const implied = mid(control, point);
        d += `Q${pt(control)} ${pt(implied)}`;
        control = point;
      } else {
        control = point;
      }
    }
    d += 'Z';
  }
  return d;
};

// --- 4. Génération ----------------------------------------------------------------------------------
const stripComment = (object) => Object.fromEntries(Object.entries(object).filter(([key]) => !key.startsWith('$')));

const codepoints = readCodepoints(fromDs(config.source.css), config.source.prefix);
const font = parseFont(readFileSync(fromDs(config.source.font)));
const aliases = stripComment(config.aliases);
const outlineCompatAliases = stripComment(config.outlineCompatAliases);

const names = [...new Set([...config.icons, ...Object.values(aliases), ...Object.values(outlineCompatAliases)])].sort();
const paths = {};
const missing = [];
for (const name of names) {
  const codepoint = codepoints.get(name);
  const glyph = codepoint === undefined ? 0 : font.glyphIndexOf(codepoint);
  const d = glyph ? toSvgPath(font.readContours(glyph), font) : '';
  if (d) paths[name] = d;
  else missing.push(name);
}
if (missing.length) {
  console.error(`Icônes introuvables dans le Design System : ${missing.join(', ')}`);
  process.exit(1);
}

const literal = (object) =>
  `{\n${Object.entries(object)
    .map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)},`)
    .join('\n')}\n}`;

const output = `/* eslint-disable */
// prettier-ignore
/**
 * FICHIER GÉNÉRÉ par scripts/icons/generate.mjs (npm run icons) : ne pas modifier à la main.
 * Source : ds-icons.css du Design System (Material Design Icons, police ${config.source.font.split('/').pop()}).
 * Tracés sur une grille ${GRID} × ${GRID}. Licence des tracés : voir src/icons/LICENSE.
 */

/** Noms des icônes du Design System embarquées. */
export type DsIconName =
${Object.keys(paths)
  .map((name) => `  | ${JSON.stringify(name)}`)
  .join('\n')};

/** Tracés SVG (attribut \`d\`) indexés par nom MDI. */
export const DS_ICONS: Readonly<Record<DsIconName, string>> = ${literal(paths)};

/** Noms historiques (hors MDI) toujours résolus vers une icône du DS. */
export const DS_ICON_ALIASES: Readonly<Record<string, DsIconName>> = ${literal(aliases)};

/**
 * Opt-in pour le social : noms MDI qu'il affichait en contour.
 * \`<UIProvider iconAliases={OUTLINE_COMPAT_ALIASES}>\`
 */
export const OUTLINE_COMPAT_ALIASES: Readonly<Record<string, DsIconName>> = ${literal(outlineCompatAliases)};
`;

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, output);
console.log(
  `${Object.keys(paths).length} icônes générées (em ${font.unitsPerEm}, ascender ${font.ascender}, descender ${font.descender}) → ${OUTPUT}`,
);
