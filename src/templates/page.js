import { site } from "../data/site.js";
import {
  escapeHtml,
  buildCrumbs,
  renderBreadcrumbs,
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  renderLayout,
} from "./layout.js";

function paragraphs(list = []) {
  return list.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function bullets(list) {
  if (!list?.length) return "";
  return `<ul>${list.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;
}

function relatedBlock(related = []) {
  if (!related.length) return "";
  return `
<section class="dark-section related-section">
  <h2 class="section-heading">Related guides &amp; services</h2>
  <div class="internal-links">
    ${related.map((r) => `<a href="${r.href}">${escapeHtml(r.label)}</a>`).join("")}
  </div>
</section>`;
}

function faqBlock(faqs = []) {
  if (!faqs.length) return "";
  return `
<section class="dark-section alt faq-section" id="faq">
  <h2 class="section-heading">Frequently asked questions</h2>
  <div class="faq-list">
    ${faqs
      .map(
        (f) => `
    <details class="faq-item">
      <summary>${escapeHtml(f.question)}</summary>
      <p>${escapeHtml(f.answer)}</p>
    </details>`
      )
      .join("")}
  </div>
</section>`;
}

function trustStrip() {
  return `
<section class="trust-strip" aria-label="Trust signals">
  <div class="trust-strip-inner">
    <span>Licensed #${site.license}</span>
    <span>Insured</span>
    <span>${site.yearsExperience}+ Years Experience</span>
    <span>${escapeHtml(site.address.locality)} Local</span>
    <a href="${site.googleReviewsUrl}" target="_blank" rel="noopener noreferrer">Google Business Profile</a>
  </div>
</section>`;
}

function contactSection(note) {
  return `
<section class="dark-section" id="contact">
  <div class="contact-grid">
    <div class="contact-copy">
      <h2>Get a free estimate</h2>
      <p>${escapeHtml(note || `Tell us about your ${site.address.locality} fence project — we will give you a straight answer and a real quote.`)}</p>
      <div class="contact-detail"><span>Phone</span> <a href="tel:${site.phoneTel}">${site.phoneDisplay}</a></div>
      <p class="small">${escapeHtml(site.address.locality)}, ${site.address.region} — Serving ${escapeHtml(site.address.locality)} and nearby communities</p>
      <ul class="eeat-list">
        <li>California contractor license #${site.license}</li>
        <li>Residential, commercial &amp; agricultural fencing</li>
        <li>Warranty-backed workmanship — ask us for project details</li>
      </ul>
    </div>
    <form name="contact" id="contact-form" method="POST" action="/success/" data-netlify="true" netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="contact">
      <p hidden><label>Don't fill this out: <input name="bot-field"></label></p>
      <input type="text" name="name" placeholder="Your name" required autocomplete="name">
      <input type="tel" name="phone" placeholder="Phone number" required autocomplete="tel">
      <input type="email" name="email" placeholder="Email (optional)" autocomplete="email">
      <textarea name="message" rows="5" placeholder="Tell us about your fence project..."></textarea>
      <button type="submit">Send message -&gt;</button>
      <p class="fine-print">By submitting you agree to be contacted by Twin Rivers Fence.</p>
      <p class="success-message" aria-live="polite"></p>
    </form>
  </div>
</section>`;
}

function pageHero(page, crumbs) {
  return `
<section class="page-hero">
  ${renderBreadcrumbs(crumbs)}
  <p class="eyebrow">${escapeHtml(page.eyebrow || "Twin Rivers Fence")}</p>
  <h1>${escapeHtml(page.h1)}</h1>
  <p class="sub">${escapeHtml(page.intro)}</p>
  <div class="hero-cta-row">
    <a href="#contact" class="btn-gold">Get a Free Estimate</a>
    <a href="tel:${site.phoneTel}" class="btn-ghost">Call ${site.phoneDisplay}</a>
  </div>
</section>
${trustStrip()}`;
}

function contentSections(sections = []) {
  return sections
    .map(
      (s) => `
<section class="dark-section content-block">
  <div class="prose">
    <h2>${escapeHtml(s.heading)}</h2>
    ${paragraphs(s.paragraphs)}
    ${bullets(s.bullets)}
  </div>
</section>`
    )
    .join("");
}

function googleReviewsSection() {
  return `
<section class="dark-section alt google-reviews-section" data-google-reviews-section>
  <div class="google-review-intro">
    <span class="section-tag">Google Reviews</span>
    <h2>Trusted across Northern California</h2>
    <p class="sub-text">A verified Google Business Profile with real customer feedback.</p>
    <p class="google-review-status" data-google-reviews-status>Loading verified Google profile...</p>
  </div>
  <div class="google-review-cards" data-google-review-cards>
    <article class="google-review-card"><p>Loading verified Google profile...</p></article>
  </div>
  <div class="google-review-actions">
    <a class="btn-gold google-review-link" href="${site.googleReviewsUrl}" target="_blank" rel="noopener noreferrer">Read Reviews On Google</a>
  </div>
</section>`;
}

export function renderContentPage(page, options = {}) {
  const crumbs = buildCrumbs(page);
  const calculatorMarkup = options.calculatorId
    ? `<section class="dark-section alt calculator-section"><div class="calculator-shell" data-calculator="${options.calculatorId}"></div></section>`
    : "";

  const howItWorks =
    options.howItWorks?.length
      ? `<section class="dark-section content-block"><div class="prose"><h2>How this tool works</h2><ol class="step-list">${options.howItWorks.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol></div></section>`
      : "";

  const assumptions =
    options.assumptions?.length
      ? `<section class="dark-section alt content-block"><div class="prose"><h2>Assumptions &amp; notes</h2>${bullets(options.assumptions)}</div></section>`
      : "";

  const body = `
${pageHero(page, crumbs)}
${contentSections(page.sections)}
${howItWorks}
${calculatorMarkup}
${assumptions}
${faqBlock(page.faqs)}
${relatedBlock(page.related)}
${googleReviewsSection()}
${contactSection(page.ctaNote)}
`;

  const schemas = [
    breadcrumbSchema(crumbs),
    faqSchema(page.faqs),
    ["service", "fence-type", "gate", "county"].includes(page.type) ? serviceSchema(page) : null,
  ];

  return renderLayout({
    title: page.title,
    description: page.description,
    path: page.path,
    body,
    schemas,
    includeCalculators: Boolean(options.calculatorId),
  });
}

export function renderHubCards(items, heading) {
  return `
<section class="dark-section">
  <h2 class="section-heading">${escapeHtml(heading)}</h2>
  <div class="hub-grid">
    ${items
      .map(
        (item) => `
    <article class="hub-card">
      <h3><a href="${item.path}">${escapeHtml(item.h1)}</a></h3>
      <p>${escapeHtml(item.description)}</p>
    </article>`
      )
      .join("")}
  </div>
</section>`;
}
