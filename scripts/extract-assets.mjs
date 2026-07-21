import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!cssMatch) throw new Error("No style block found");
fs.writeFileSync("src/styles/site.css", cssMatch[1].trim() + "\n");

const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)>([\s\S]*?)<\/script>/g)].map(
  (m) => m[1]
);
fs.writeFileSync("src/scripts/site.js", inlineScripts.join("\n\n").trim() + "\n");
console.log(`Extracted CSS (${cssMatch[1].length} chars) and JS (${inlineScripts.join("").length} chars)`);
