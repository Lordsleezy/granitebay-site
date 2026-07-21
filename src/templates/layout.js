import { site, nav, fenceNavItems, gateNavItems, deckNavItems, patioNavItems, serviceNavItems, footerColumns } from "../data/site.js";

const assetVersion = "20260721-footer";

const citySites = [
  { label: "Grass Valley", href: "https://grassvalleyfencing.com/" },
  { label: "Rocklin", href: "https://rocklinfencing.com/" },
  { label: "Roseville", href: "https://rosevillefencingca.com/" },
  { label: "Folsom", href: "https://folsomfencing.com/" },
  { label: "Elk Grove", href: "https://elkgrovefencing.com/" },
  { label: "Granite Bay", href: "https://granitebayfencing.com/" },
];

const navMenus = {
  fencing: fenceNavItems,
  gates: gateNavItems,
  decks: deckNavItems,
  patios: patioNavItems,
  services: serviceNavItems,
};

const dropdownActivePrefixes = {
  fencing: ["/fence-types/", "-fencing/"],
  gates: ["/gates/", "/custom-gates/"],
  decks: ["/decks/"],
  patios: ["/patios/"],
  services: ["/services/", "/fence-repair/", "/commercial-fencing/", "/temporary-fence-rental/"],
};

function isDropdownActive(dropdownKey, currentPath, itemHref, children) {
  const prefixes = dropdownActivePrefixes[dropdownKey] || [];
  if (prefixes.some((p) => (p.startsWith("-") ? currentPath.endsWith(p) : currentPath.startsWith(p)))) {
    return true;
  }
  if (currentPath === itemHref) return true;
  return children.some(
    (child) =>
      currentPath === child.href ||
      (child.href !== "/" && currentPath.startsWith(child.href))
  );
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href.startsWith("http") ? c.href : `${site.domain}${c.href}`,
    })),
  };
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.domain}/#localbusiness`,
    name: site.name,
    alternateName: site.localName,
    url: site.domain + "/",
    telephone: site.phoneTel,
    priceRange: site.priceRange,
    image: site.ogImage,
    sameAs: site.socialSameAs,
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    description:
      `Licensed fence contractor serving ${site.address.locality} with installation, repair, wood, vinyl, chain link, gates, and commercial fencing.`,
  };
}

function faqSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function serviceSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    provider: { "@id": `${site.domain}/#localbusiness` },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    url: `${site.domain}${page.path}`,
  };
}

export function buildCrumbs(page) {
  const crumbs = [{ href: "/", label: "Home" }];
  const parts = page.path.split("/").filter(Boolean);
  let acc = "";
  for (let i = 0; i < parts.length; i++) {
    acc += `/${parts[i]}`;
    const isLast = i === parts.length - 1;
    const label = isLast
      ? page.h1
      : parts[i]
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
    crumbs.push({ href: `${acc}/`, label });
  }
  return crumbs;
}

function renderNav(currentPath) {
  return nav
    .map((item) => {
      const children = item.dropdown ? navMenus[item.dropdown] : item.children;
      if (children?.length) {
        const active = isDropdownActive(item.dropdown, currentPath, item.href, children);
        const links = children
          .map((child) => {
            const childActive = currentPath === child.href;
            return `<a href="${child.href}" role="menuitem"${childActive ? ' aria-current="page"' : ""}>${escapeHtml(child.label)}</a>`;
          })
          .join("");
        return `<div class="nav-dropdown"${active ? ' data-active="true"' : ""}>
  <a href="${item.href}" class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false">${escapeHtml(item.label)}</a>
  <div class="nav-dropdown-panel" role="menu">${links}</div>
</div>`;
      }
      const active =
        item.href !== "/#contact" &&
        (currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href)));
      return `<a href="${item.href}"${active ? ' aria-current="page"' : ""}>${escapeHtml(item.label)}</a>`;
    })
    .join("");
}

function renderFooter() {
  const cols = footerColumns
    .map(
      (col) => `
    <div class="footer-col">
      <h3>${escapeHtml(col.title)}</h3>
      <ul>${col.links.map((l) => `<li><a href="${l.href}">${escapeHtml(l.label)}</a></li>`).join("")}</ul>
    </div>`
    )
    .join("");
  const cityCol = `
    <div class="footer-col">
      <h3>City Sites</h3>
      <ul>${citySites.map((c) => `<li><a href="${c.href}">${escapeHtml(c.label)}</a></li>`).join("")}</ul>
    </div>`;

  return `
<footer class="site-footer">
  <div class="footer-grid">${cols}${cityCol}</div>
  <div class="footer-bottom">
    <div>${escapeHtml(site.name)} — License #${site.license} — ${escapeHtml(site.address.locality)}, ${site.address.region} — <a href="tel:${site.phoneTel}">${site.phoneDisplay}</a></div>
    <div class="footer-legal"><a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/sitemap.xml">Sitemap</a></div>
  </div>
</footer>`;
}

function renderBreadcrumbs(crumbs) {
  return `
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>${crumbs
    .map((c, i) => {
      const last = i === crumbs.length - 1;
      return `<li>${last ? `<span aria-current="page">${escapeHtml(c.label)}</span>` : `<a href="${c.href}">${escapeHtml(c.label)}</a>`}</li>`;
    })
    .join("")}</ol>
</nav>`;
}

export function renderLayout({
  title,
  description,
  path,
  canonical,
  body,
  schemas = [],
  includeHeroCanvas = false,
  includeCalculators = false,
  ogType = "website",
}) {
  const url = canonical || `${site.domain}${path}`;
  const allSchemas = [localBusinessSchema(), ...schemas.filter(Boolean)];
  const schemaTags = allSchemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<link rel="canonical" href="${url}">
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${escapeHtml(site.localName)}">
<meta property="og:image" content="${site.ogImage}">
<meta property="og:image:alt" content="${escapeHtml(site.name)} — ${escapeHtml(site.address.locality)} fence contractors">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${site.ogImage}">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/site.css?v=${assetVersion}">
<link rel="stylesheet" href="/assets/css/content.css?v=${assetVersion}">
<style>
.nav-dropdown{position:relative;display:inline-flex;align-items:center}
.nav-dropdown-panel{display:none!important;position:absolute;top:100%;left:0;z-index:60;grid-template-columns:1fr;gap:.15rem;min-width:15.5rem;max-height:min(70vh,28rem);overflow:auto;padding:.65rem .55rem .55rem;border:1px solid rgba(212,168,83,.22);border-radius:6px;background:rgba(10,10,10,.97);box-shadow:0 18px 50px rgba(0,0,0,.45);margin-top:0}
.nav-dropdown:hover .nav-dropdown-panel,.nav-dropdown:focus-within .nav-dropdown-panel,.nav-dropdown.is-open .nav-dropdown-panel{display:grid!important;pointer-events:auto}
.nav-dropdown-panel a{display:block;padding:.55rem .7rem;border-radius:4px;color:rgba(255,255,255,.78);font-size:.76rem;letter-spacing:.06em;text-decoration:none;text-transform:none;white-space:nowrap}
.nav-dropdown-panel a:hover,.nav-dropdown-panel a:focus-visible{background:rgba(212,168,83,.12);color:var(--gold)}
@media(max-width:780px){.nav-dropdown{display:block;width:100%}.nav-dropdown-panel{position:static;width:100%;max-height:none;margin-top:.35rem;padding:.55rem;box-shadow:none}}
</style>
${includeHeroCanvas ? '<link rel="preload" href="/assets/js/site.js" as="script">' : ""}
${schemaTags}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand-link" href="/">${escapeHtml(site.name)}</a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
      <span class="sr-only">Menu</span>
      <span aria-hidden="true"></span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Main">${renderNav(path)}</nav>
    <a class="top-call" href="tel:${site.phoneTel}" aria-label="Call Twin Rivers Fence at ${site.phoneDisplay}">Call ${site.phoneDisplay}</a>
  </div>
</header>
<main id="main">
${body}
</main>
${renderFooter()}
${
  includeHeroCanvas
    ? `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer></script>`
    : ""
}
<script src="/assets/js/site.js?v=${assetVersion}" defer></script>
<script src="/assets/js/google-reviews.js?v=${assetVersion}" defer></script>
${includeCalculators ? `<script src="/assets/js/calculators.js?v=${assetVersion}" defer></script>` : ""}
<script src="/assets/js/nav.js?v=${assetVersion}" defer></script>
</body>
</html>`;
}

export { escapeHtml, breadcrumbSchema, faqSchema, serviceSchema, renderBreadcrumbs, localBusinessSchema };
