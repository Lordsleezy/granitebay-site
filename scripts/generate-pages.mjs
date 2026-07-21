import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { servicesPages } from "./pages-data/services.mjs";
import { fenceTypePages } from "./pages-data/fence-types.mjs";
import { gatePages } from "./pages-data/gates.mjs";
import { deckPages } from "./pages-data/decks.mjs";
import { patioPages } from "./pages-data/patios.mjs";
import { serviceAreaPages } from "./pages-data/service-areas.mjs";
import { resourcePages } from "./pages-data/resources.mjs";
import { faqPage } from "./pages-data/faq.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/data/pages.js");

const pages = [
  ...servicesPages,
  ...fenceTypePages,
  ...gatePages,
  ...deckPages,
  ...patioPages,
  ...serviceAreaPages,
  ...resourcePages,
  faqPage,
];

const paths = pages.map((p) => p.path);
const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
if (dupes.length) {
  console.error("Duplicate paths:", dupes);
  process.exit(1);
}

const content = `/** Page content for Granite Bay Fence Company — Granite Bay, California */
export const pages = ${JSON.stringify(pages, null, 2)};

export function getPageByPath(path) {
  return pages.find((p) => p.path === path);
}
`;

writeFileSync(outPath, content, "utf8");
console.log(`Wrote ${pages.length} pages to ${outPath}`);
