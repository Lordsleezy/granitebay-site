import { site } from "../data/site.js";
import { escapeHtml, faqSchema, renderLayout } from "./layout.js";

const homeFaqs = [
  {
    question: "Do you install and repair fences in Granite Bay?",
    answer:
      "Yes. Twin Rivers Fence serves Granite Bay with fence installation, repair, custom gates, wood, vinyl, chain link, ornamental iron, pool fencing, and commercial projects across Placer County.",
  },
  {
    question: "What neighborhoods in Granite Bay do you work in?",
    answer:
      "We work throughout Granite Bay including Hidden Lakes, Los Lagos, Treelake Village, Douglas Boulevard corridors, Auburn Folsom Road estates, Eureka Road properties, and the Granite Bay High School area.",
  },
  {
    question: "Are you licensed and insured in Placer County?",
    answer: `Yes. Twin Rivers Fence is a California licensed contractor (#${site.license}) and carries insurance for residential and commercial fence work in Granite Bay and surrounding communities.`,
  },
];

export function renderHomePage() {
  const body = `
  <section id="hero">
    <canvas id="hero-canvas" aria-hidden="true"></canvas>
    <div class="hero-inner">
      <p class="eyebrow">Granite Bay, California · Licensed #${site.license}</p>
      <h1>Granite Bay Fence Company</h1>
      <p class="sub">Fence contractor in Granite Bay — luxury estate fencing, HOA-approved designs, pool barriers, ranch lines, and custom gates for Placer County's premier residential community</p>
      <a href="#contact" class="btn-gold">Get a Free Estimate</a>
      <div class="google-trust-bar" aria-label="Twin Rivers Fence Google review summary">
        <a class="google-review-link" href="${site.googleReviewsUrl}" target="_blank" rel="noopener noreferrer"><span class="google-star-row" aria-label="Reviews on Google">★★★★★</span> Twin Rivers Fence</a>
        <span>Verified Google Business Profile</span>
        <span>Licensed &amp; Insured — #${site.license}</span>
        <span>Residential &amp; Commercial</span>
      </div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span>Scroll</span><div class="scroll-line"></div></div>
  </section>

  <section class="photo-section" id="cedar">
    <img class="photo-bg" src="https://images.unsplash.com/photo-1604015641586-6fa03629f976?auto=format&fit=crop&w=1920&q=85" alt="Wood fence installation along a Granite Bay estate property line" width="1920" height="1080" loading="eager" decoding="async" fetchpriority="high">
    <div class="photo-content left"><span class="section-tag">Wood Fence Granite Bay</span><h2>Crafted for estate lots.<br>Built to last.</h2><p>Wood fencing in Granite Bay planned for sloped lots, shared property lines, and HOA-approved styles — from redwood privacy screens near Folsom Lake to cedar lines along Auburn Folsom Road.</p></div>
  </section>

  <section class="dark-section who">
    <div class="who-grid">
      <div class="who-copy"><h2>A fence contractor that understands Granite Bay properties.</h2><p>Twin Rivers Fence is a licensed contractor (#${site.license}) serving Granite Bay, California with fence installation, repair, custom gates, and commercial fencing — backed by real experience with Placer County HOAs, large-lot layouts, and hillside retaining-wall integrations.</p><p class="license">Licensed Contractor #${site.license} — Granite Bay, California</p></div>
      <div class="stats" aria-label="Twin Rivers Fence trust signals"><div class="stat-card"><div class="stat-number">✓</div><div class="stat-label">Licensed &amp; insured</div></div><div class="stat-card"><div class="stat-number">✓</div><div class="stat-label">HOA-approval experience</div></div><div class="stat-card"><div class="stat-number">★★★★★</div><div class="stat-label"><a href="${site.googleReviewsUrl}" target="_blank" rel="noopener noreferrer">Google Business Profile</a></div></div></div>
    </div>
  </section>

  <section class="dark-section alt legacy-section">
    <div class="legacy-copy">
      <span class="section-tag">Local &amp; Straightforward</span>
      <h2>Straight Answers. Real Craftsmanship.</h2>
      <p class="sub-text">Twin Rivers Fence helps Granite Bay homeowners, HOA boards, and property managers protect and improve their properties — without inflated numbers or invented reviews.</p>
      <p>Our reputation is built through honest work, quality craftsmanship, and customers recommending us to friends, family, and neighbors across Placer County.</p>
      <p>Verify us yourself: check our license, read our Google reviews, and ask for references from recent Granite Bay-area projects.</p>
      <div class="legacy-values" aria-label="Twin Rivers Fence values"><span>Do the job right.</span><span>Treat people fairly.</span><span>Stand behind your work.</span></div>
    </div>
    <div class="legacy-stats"><div class="legacy-stat"><strong>Licensed #${site.license}</strong></div><div class="legacy-stat"><strong>Fully Insured</strong></div><div class="legacy-stat"><strong>Residential &amp; Commercial</strong></div><div class="legacy-stat"><strong>HOA-Fluent Crew</strong></div></div>
  </section>

  <section class="dark-section services">
  <h2 class="section-heading">Fence services in Granite Bay</h2>
  <div class="services-grid">
    <article class="service-card"><h3><a href="/services/fence-installation/">Fence Installation Granite Bay</a></h3><p>New fence lines planned for hillside lots, HOA specs, and how your estate is actually used.</p></article>
    <article class="service-card"><h3><a href="/fence-repair/">Fence Repair Granite Bay</a></h3><p>Leaning posts on sloped terrain, storm damage, broken panels, and driveway gates that stopped closing right.</p></article>
    <article class="service-card"><h3><a href="/custom-gates/">Custom Gates Granite Bay</a></h3><p>Driveway entries, automated iron gates, and side-yard access built for daily use on larger properties.</p></article>
    <article class="service-card"><h3><a href="/fence-types/hoa-fence/">HOA Fencing</a></h3><p>Spec sheets and submittal support for Hidden Lakes, Los Lagos, and Treelake Village communities.</p></article>
    <article class="service-card"><h3><a href="/fence-types/pool-fence/">Pool Fencing</a></h3><p>Code-compliant barriers with self-latching gates for backyard pools near Folsom Lake.</p></article>
    <article class="service-card"><h3><a href="/vinyl-fencing/">Vinyl Fence Granite Bay</a></h3><p>Low-maintenance privacy and HOA-friendly lines for side yards and pool decks.</p></article>
  </div>
  </section>

  <section class="photo-section overlay-right" id="vinyl">
    <img class="photo-bg" src="https://images.unsplash.com/photo-1593285247650-cd7bb44adcfd?auto=format&fit=crop&w=1920&q=85" alt="Clean vinyl privacy fence on a Granite Bay residential estate" width="1920" height="1080" loading="lazy" decoding="async">
    <div class="photo-content right"><span class="section-tag">Vinyl Fence Granite Bay</span><h2>Low upkeep.<br>HOA-approved.</h2><p>Vinyl fencing for clean privacy, pool areas, and street-facing yards that need a polished look without a recurring stain cycle.</p></div>
  </section>

  <section class="dark-section alt hub-preview">
    <h2 class="section-heading">Explore the Granite Bay fence resource</h2>
    <div class="hub-grid">
      <article class="hub-card"><h3><a href="/fence-types/">Fence Types</a></h3><p>Wood, vinyl, privacy, pool, HOA, ornamental iron, and ranch fencing — with Granite Bay-specific guidance.</p></article>
      <article class="hub-card"><h3><a href="/resources/">Resource Center</a></h3><p>Cost guides, HOA rules, Placer County permits, and maintenance advice written for Granite Bay homeowners.</p></article>
      <article class="hub-card"><h3><a href="/calculators/">Planning Calculators</a></h3><p>Estimate cost, materials, posts, concrete, perimeter, and a seasonal maintenance schedule.</p></article>
      <article class="hub-card"><h3><a href="/service-areas/">Service Areas</a></h3><p>Granite Bay plus Folsom, Roseville, Loomis, Rocklin, Lincoln, and El Dorado Hills.</p></article>
    </div>
  </section>

  <section class="dark-section commercial-section">
  <div class="commercial-intro">
    <span class="section-tag">Commercial</span>
    <h2>Commercial Fencing Granite Bay</h2>
    <p class="sub-text">Trusted by property owners, contractors, HOAs, and businesses throughout Granite Bay and Placer County.</p>
    <p>Whether you are securing a construction site along Douglas Boulevard, upgrading a retail center, or improving access control on a commercial parcel, our licensed crew handles commercial fence projects throughout Granite Bay and surrounding areas.</p>
  </div>
  <div class="commercial-cta"><a href="/commercial-fencing/" class="btn-gold">Commercial Fencing Details</a></div>
  </section>

  <section class="photo-section" id="chain-link">
    <img class="photo-bg" src="https://images.unsplash.com/photo-1586574208875-cd77c2bfb851?auto=format&fit=crop&w=1920&q=85" alt="Chain link fence securing a Granite Bay property boundary" width="1920" height="1080" loading="lazy" decoding="async">
    <div class="photo-content left"><span class="section-tag">Chain Link Fence Granite Bay</span><h2>Built to work.<br>Not just look good.</h2><p>Chain link for practical security, dog runs, commercial yards, horse paddocks, and long property lines across Granite Bay.</p></div>
  </section>

  <section class="dark-section alt areas"><h2>Granite Bay neighborhoods we serve</h2><p class="sub-text">Local expertise — not generic city swaps</p><div class="tag-cloud" aria-label="Granite Bay neighborhoods">
    <a class="city-tag" href="/service-areas/granite-bay/">Granite Bay</a>
    <a class="city-tag" href="/service-areas/granite-bay/">Hidden Lakes</a>
    <a class="city-tag" href="/service-areas/granite-bay/">Los Lagos</a>
    <a class="city-tag" href="/service-areas/granite-bay/">Treelake Village</a>
    <a class="city-tag" href="/service-areas/folsom/">Folsom</a>
    <a class="city-tag" href="/service-areas/roseville/">Roseville</a>
    <a class="city-tag" href="/service-areas/loomis/">Loomis</a>
    <a class="city-tag" href="/service-areas/rocklin/">Rocklin</a>
    <a class="city-tag" href="/service-areas/lincoln/">Lincoln</a>
    <a class="city-tag" href="/service-areas/el-dorado-hills/">El Dorado Hills</a>
  </div></section>

  <section class="dark-section expanded-areas"><span class="section-tag">Fence Services</span><h2>Fence contractor Granite Bay</h2><div class="expanded-area-grid" aria-label="Granite Bay fence services">
    <a class="expanded-area-tag" href="/">Granite Bay Fence Company</a>
    <a class="expanded-area-tag" href="/services/fence-installation/">Fence Installation Granite Bay</a>
    <a class="expanded-area-tag" href="/commercial-fencing/">Commercial Fencing Granite Bay</a>
    <a class="expanded-area-tag" href="/fence-repair/">Fence Repair Granite Bay</a>
    <a class="expanded-area-tag" href="/custom-gates/">Custom Gates Granite Bay</a>
    <a class="expanded-area-tag" href="/wood-fencing/">Wood Fence Granite Bay</a>
    <a class="expanded-area-tag" href="/vinyl-fencing/">Vinyl Fence Granite Bay</a>
    <a class="expanded-area-tag" href="/chain-link-fencing/">Chain Link Fence Granite Bay</a>
    <a class="expanded-area-tag" href="/fence-types/ornamental-iron-fence/">Ornamental Iron Fence Granite Bay</a>
    <a class="expanded-area-tag" href="/fence-types/privacy-fence/">Privacy Fence Granite Bay</a>
    <a class="expanded-area-tag" href="/fence-types/ranch-fence/">Ranch Fence Granite Bay</a>
    <a class="expanded-area-tag" href="/fence-types/pool-fence/">Pool Fencing Granite Bay</a>
    <a class="expanded-area-tag" href="/gates/driveway-gates/">Gate Installation Granite Bay</a>
    <a class="expanded-area-tag" href="/services/residential-fencing/">Residential Fencing Granite Bay</a>
    <a class="expanded-area-tag" href="/resources/fence-cost-guide/">Fence Cost Guide</a>
    <a class="expanded-area-tag" href="/calculators/fence-cost-calculator/">Cost Calculator</a>
    <a class="expanded-area-tag" href="/faq/">FAQ Center</a>
  </div></section>

  <section class="dark-section alt local-seo">
    <span class="section-tag">Local Expertise</span>
    <h2>Fencing built for Granite Bay conditions</h2>
    <div class="prose" style="max-width:48rem;margin:0 auto">
      <p>Granite Bay sits between Folsom Lake and the Sierra foothills — a community defined by larger residential estates, hillside lots, and some of the strictest HOA standards in Placer County. Properties along Douglas Boulevard, Auburn Folsom Road, and Eureka Road often combine long perimeter runs with slope transitions, retaining-wall integrations, and view-preservation rules that favor ornamental iron over solid wood on lake-facing lots.</p>
      <p>We plan every project around the specifics of your address: whether you are in Hidden Lakes with its golf-course adjacency, Los Lagos with estate-scale driveway entries, Treelake Village near Granite Bay High School, or a horse property on the outskirts where ranch fence and residential privacy fencing meet on the same parcel.</p>
      <p>Placer County permitting, fire-hardening spacing near wildland interfaces, wildlife-resistant designs, and storm-durable post footings on sloped terrain are all part of a typical Granite Bay fence conversation — not afterthoughts.</p>
    </div>
  </section>

  <section class="photo-section short overlay-soft"><img class="photo-bg" src="https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1920&q=85" alt="Granite Bay, California residential estate neighborhood" width="1920" height="1080" loading="lazy" decoding="async"><h2 class="panorama-title">Granite Bay fence work you can count on.</h2></section>

  <section class="dark-section alt google-reviews-section" data-google-reviews-section>
    <div class="google-review-intro">
      <span class="section-tag">Google Reviews</span>
      <h2>Trusted By Granite Bay Property Owners</h2>
      <p class="sub-text">A verified Google Business Profile with real customer feedback.</p>
      <p class="google-review-status" data-google-reviews-status>Loading verified Google profile...</p>
    </div>
    <div class="google-review-cards" data-google-review-cards>
      <article class="google-review-card"><p>Loading verified Google profile...</p></article>
    </div>
    <div class="google-review-actions">
      <a class="btn-gold google-review-link" href="${site.googleReviewsUrl}" target="_blank" rel="noopener noreferrer">Read Reviews On Google</a>
    </div>
  </section>

  <section class="dark-section alt faq-section" id="faq">
    <h2 class="section-heading">Frequently asked questions</h2>
    <div class="faq-list">
      ${homeFaqs
        .map(
          (f) => `<details class="faq-item"><summary>${escapeHtml(f.question)}</summary><p>${escapeHtml(f.answer)}</p></details>`
        )
        .join("")}
    </div>
    <p class="seo-service-copy" style="margin-top:2rem;text-align:center"><a href="/faq/">Visit the full FAQ Center</a></p>
  </section>

  <section class="dark-section" id="contact">
  <div class="contact-grid">
    <div class="contact-copy">
      <h2>Get a free estimate</h2>
      <p>Tell us about your Granite Bay fence project — we will give you a straight answer and a real quote.</p>
      <div class="contact-detail"><span>Phone</span> <a href="tel:${site.phoneTel}">${site.phoneDisplay}</a></div>
      <p class="small">Granite Bay, California — Serving Folsom, Roseville, Loomis, Rocklin, Lincoln &amp; El Dorado Hills</p>
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

  return renderLayout({
    title: "Granite Bay Fence Company | Fence Contractor in Granite Bay, CA",
    description:
      "Granite Bay Fence Company — licensed fence contractor for installation, repair, wood, vinyl, iron, pool, ranch & HOA fencing in Granite Bay, California. Twin Rivers Fence. Call (916) 906-2254.",
    path: "/",
    body,
    schemas: [faqSchema(homeFaqs)],
    includeHeroCanvas: true,
  });
}
