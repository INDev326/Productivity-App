import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), ".vercel/output/static");
const assetsDir = join(outDir, "assets");

let cssFile = "";
let jsFiles = [];

try {
  const files = readdirSync(assetsDir);
  for (const f of files) {
    if (f.endsWith(".css") && f.startsWith("styles")) cssFile = f;
    if (f.endsWith(".js")) jsFiles.push(f);
  }
} catch {
  /* ignore */
}

const cssTag = cssFile ? `<link rel="stylesheet" href="./assets/${cssFile}" />` : "";
const jsTags = jsFiles
  .map((f) => `<script type="module" src="./assets/${f}"></script>`)
  .join("\n    ");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Folio</title>
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    ${cssTag}
  </head>
  <body>
    <div id="root"></div>
    ${jsTags}
  </body>
</html>`;

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), html, "utf8");
console.log(
  `[cap-copy-index] Ensured index.html in ${outDir} with ${jsFiles.length} JS assets and CSS ${cssFile}`,
);
