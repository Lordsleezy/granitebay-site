import fs from "node:fs";
import { pages } from "../src/data/pages.js";
import { calculatorPages } from "../src/data/calculators.js";

const required = [
  "/services/",
  "/services/fence-installation/",
  "/fence-repair/",
  "/services/fence-replacement/",
  "/wood-fencing/",
  "/fence-types/",
  "/fence-types/redwood-fence/",
  "/fence-types/cedar-fence/",
  "/fence-types/privacy-fence/",
  "/fence-types/horizontal-fence/",
  "/fence-types/hoa-fence/",
  "/fence-types/pool-fence/",
  "/fence-types/ornamental-iron-fence/",
  "/fence-types/security-fence/",
  "/vinyl-fencing/",
  "/chain-link-fencing/",
  "/gates/",
  "/custom-gates/",
  "/gates/wood-gates/",
  "/gates/gate-repair/",
  "/gates/iron-gates/",
  "/gates/driveway-gates/",
  "/commercial-fencing/",
  "/temporary-fence-rental/",
  "/service-areas/",
  "/service-areas/granite-bay/",
  "/resources/",
  "/resources/fence-cost-guide/",
  "/resources/fence-buying-guide/",
  "/resources/hoa-fence-rules/",
  "/resources/wood-vs-vinyl/",
  "/faq/",
  "/calculators/",
  "/calculators/fence-cost-calculator/",
  "/calculators/fence-material-calculator/",
  "/calculators/concrete-calculator/",
  "/calculators/post-calculator/",
  "/calculators/fence-height-calculator/",
  "/calculators/property-perimeter-estimator/",
  "/calculators/maintenance-schedule-generator/",
];

const all = new Set([...pages.map((p) => p.path), ...calculatorPages.map((p) => p.path)]);
const missing = required.filter((r) => !all.has(r));
console.log("content pages", pages.length, "calc pages", calculatorPages.length);
console.log("missing", missing.length ? missing : "none");

const htmlFiles = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = `${d}/${e.name}`;
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") htmlFiles.push(p);
  }
}
walk("./dist");
console.log("dist html", htmlFiles.length);

const sample = fs.readFileSync("./dist/wood-fencing/index.html", "utf8");
console.log("has canonical", sample.includes('rel="canonical"'));
console.log("has breadcrumb schema", sample.includes("BreadcrumbList"));
console.log("has FAQ schema", sample.includes("FAQPage"));
console.log("has LocalBusiness", sample.includes("HomeAndConstructionBusiness"));

const calc = fs.readFileSync("./dist/calculators/fence-cost-calculator/index.html", "utf8");
console.log("has data-calculator", calc.includes('data-calculator="cost"'));
console.log("has calc script", calc.includes("/assets/js/calculators.js"));

const home = fs.readFileSync("./dist/index.html", "utf8");
console.log("home h1", /<h1>[^<]+<\/h1>/.exec(home)?.[0]);
console.log("home canonical granite bay", home.includes("https://granitebayfencing.com/"));

if (missing.length) process.exitCode = 1;
