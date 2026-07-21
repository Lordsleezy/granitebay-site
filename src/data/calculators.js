/** Calculator hub and tool page definitions for Granite Bay, California */
export const calculatorPages = [
  {
    path: "/calculators/",
    title: "Fence Calculators & Planning Tools | Granite Bay Fence Company",
    description:
      "Free fence planning tools for Granite Bay homeowners—estimate cost, materials, concrete, posts, height, perimeter, and seasonal maintenance.",
    h1: "Fence Planning Tools for Granite Bay",
    eyebrow: "Free Tools",
    intro:
      "Whether you are fencing a Granite Bay estate lot, an HOA-governed side yard in Hidden Lakes, or a pool enclosure near Folsom Lake, these calculators help you plan before you quote. Numbers are educational estimates only—HOA-required materials, sloped terrain footings, and custom gates change every job.",
    calculatorId: null,
    howItWorks: [
      "Choose the calculator that matches your planning question—cost, materials, posts, or perimeter.",
      "Enter your fence run length, material, and site conditions typical of Granite Bay lots.",
      "Use the results to compare options, then request a site-specific quote from a local installer.",
    ],
    assumptions: [
      "All tools use ballpark installed pricing for the greater Granite Bay / Placer County market.",
      "Expansive clay soil common here can increase footing depth and labor on some sites.",
      "Final quotes depend on a site visit, HOA requirements, and gate hardware selections.",
    ],
    related: [
      { href: "/calculators/fence-cost-calculator/", label: "Fence Cost Calculator" },
      { href: "/calculators/fence-material-calculator/", label: "Material Calculator" },
      { href: "/calculators/concrete-calculator/", label: "Concrete Calculator" },
      { href: "/calculators/post-calculator/", label: "Post Calculator" },
      { href: "/calculators/fence-height-calculator/", label: "Fence Height Guide" },
      { href: "/calculators/property-perimeter-estimator/", label: "Perimeter Estimator" },
      { href: "/calculators/maintenance-schedule-generator/", label: "Maintenance Schedule" },
      { href: "/resources/fence-cost-guide/", label: "Fence Cost Guide" },
      { href: "/#contact", label: "Request a Quote" },
    ],
    faqs: [
      {
        question: "Are these calculators accurate for Granite Bay fence projects?",
        answer:
          "They provide useful planning ranges based on typical Sacramento-area installed pricing. HOA-required materials, clay soil footings, and gate count often push real projects outside a simple estimate—use them to budget, then confirm with an on-site quote.",
      },
      {
        question: "Do I still need HOA approval for my fence?",
        answer:
          "Most Granite Bay fences at or under six feet don't need a city permit, but HOA architectural approval is a separate requirement in nearly every master-planned community. See our permit guide or ask during your quote walkthrough.",
      },
      {
        question: "Which calculator should I start with?",
        answer:
          "Most homeowners begin with the perimeter estimator to learn total linear feet, then the cost calculator for budget planning. Material and concrete tools help if you are comparing a DIY supply list against professional installation.",
      },
    ],
  },
  {
    path: "/calculators/fence-cost-calculator/",
    title: "Fence Cost Calculator Granite Bay, CA | Twin Rivers Fence",
    description:
      "Estimate installed fence cost in Granite Bay. Wood, vinyl, and chain link ballpark ranges with gate and HOA adjustments.",
    h1: "Fence Cost Calculator",
    eyebrow: "Free Tool",
    intro:
      "Plan your budget for a typical Granite Bay residential run—150 to 250 linear feet is common for a standard backyard, while larger Granite Bay lots often exceed 400 feet. This tool applies educational per-foot ranges for wood ($25–$55/ft), vinyl ($35–$70/ft), and chain link ($15–$35/ft) installed, then adjusts for gates. Actual quotes vary with access, soil, and HOA-required material or color.",
    calculatorId: "cost",
    howItWorks: [
      "Enter total linear feet for the fence run you want installed.",
      "Select material, number of gates, and site type (standard, HOA-restricted, or corner lot).",
      "Review the low–high estimate range and disclaimer before requesting a formal quote.",
    ],
    assumptions: [
      "Installed pricing includes standard posts, panels or pickets, and labor for typical 6-foot residential height.",
      "Wood $25–$55/ft, vinyl $35–$70/ft, chain link $15–$35/ft, and ornamental iron $45–$90/ft are Sacramento-area ballpark ranges only.",
      "Each gate adds roughly $450–$950 depending on width and hardware; HOA-required color or material upgrades and clay-soil footings can increase cost.",
    ],
    related: [
      { href: "/calculators/property-perimeter-estimator/", label: "Perimeter Estimator" },
      { href: "/calculators/fence-material-calculator/", label: "Material Calculator" },
      { href: "/resources/fence-cost-guide/", label: "Fence Cost Guide" },
      { href: "/wood-fencing/", label: "Wood Fencing" },
      { href: "/vinyl-fencing/", label: "Vinyl Fencing" },
      { href: "/chain-link-fencing/", label: "Chain Link Fencing" },
    ],
    faqs: [
      {
        question: "Why is my quote higher than this calculator shows?",
        answer:
          "HOA-required material or color upgrades, deep clay-soil footings, and driveway gates push real projects above simple per-foot math. This tool is a starting point, not a binding estimate.",
      },
      {
        question: "Does vinyl cost more than wood in Granite Bay?",
        answer:
          "Vinyl often has a higher upfront installed cost but lower long-term maintenance—especially since it skips the stain cycle wood needs under our summer sun. Compare both materials using the same linear footage here.",
      },
      {
        question: "Is removal of an old fence included?",
        answer:
          "No. Demolition and haul-off are quoted separately and can add $3–$8 per linear foot depending on material and access.",
      },
    ],
  },
  {
    path: "/calculators/fence-material-calculator/",
    title: "Fence Material Calculator | Granite Bay Fence Planning",
    description:
      "Estimate fence posts, panels, rails, and pickets for wood, vinyl, and chain link runs in Granite Bay.",
    h1: "Fence Material Calculator",
    eyebrow: "Free Tool",
    intro:
      "Useful for comparing a DIY materials list against professional installation on a standard Granite Bay lot or a longer run on a larger Granite Bay or Loomis property. Enter your fence length and post spacing—8-foot spacing is typical for wood privacy; 6-foot spacing adds stiffness on exposed rear-yard runs.",
    calculatorId: "material",
    howItWorks: [
      "Enter total linear feet and choose post spacing (6 or 8 feet).",
      "Select fence type to estimate posts, rails or panels, and pickets where applicable.",
      "Use the breakdown to discuss options with your installer or lumber yard.",
    ],
    assumptions: [
      "Posts are counted at spacing intervals plus one end post; corner and gate posts may need heavier stock on site.",
      "Wood picket estimates assume standard 3.5-inch pickets on a 6-foot privacy layout.",
      "Vinyl and prefab panel counts round up to full sections; chain link estimates include line posts and top rail.",
    ],
    related: [
      { href: "/calculators/post-calculator/", label: "Post Calculator" },
      { href: "/calculators/concrete-calculator/", label: "Concrete Calculator" },
      { href: "/calculators/fence-cost-calculator/", label: "Cost Calculator" },
      { href: "/wood-fencing/", label: "Wood Fencing Options" },
    ],
    faqs: [
      {
        question: "Should I use 6-foot or 8-foot post spacing?",
        answer:
          "Eight-foot spacing is standard for wood privacy on typical Granite Bay lots. Six-foot spacing helps on exposed rear-yard runs or for heavier vinyl panels—your installer can confirm for your site.",
      },
      {
        question: "Does this include gates?",
        answer:
          "Gate posts and hardware are not included in the base material list. Add gate posts separately or use the post calculator with your gate locations.",
      },
      {
        question: "How accurate are picket counts?",
        answer:
          "Picket counts are rounded estimates for planning. Pattern, board-on-board, and cap-and-trim styles change the number of boards per foot.",
      },
    ],
  },
  {
    path: "/calculators/concrete-calculator/",
    title: "Fence Post Concrete Calculator | Granite Bay, CA",
    description:
      "Calculate concrete bags needed for fence post holes—diameter, depth, and post count for Granite Bay installations.",
    h1: "Fence Post Concrete Calculator",
    eyebrow: "Free Tool",
    intro:
      "Granite Bay installers typically set posts 24 to 36 inches deep to resist seasonal clay soil movement; expansive clay sites may need wider holes or additional bags. This tool estimates cubic volume per hole (π × radius² × depth) and converts to 60-pound ready-mix bags for your post count.",
    calculatorId: "concrete",
    howItWorks: [
      "Enter the number of fence posts you plan to set.",
      "Set hole diameter and depth—10 inches wide by 24 inches deep is a common residential default.",
      "Review total volume and 60-pound bag count before ordering concrete.",
    ],
    assumptions: [
      "Calculations assume cylindrical post holes and 60-pound bags yielding roughly 0.45 cubic feet each.",
      "Granite Bay's expansive clay soil may require deeper or wider holes than this baseline estimate.",
      "Local code may require deeper footings for gate posts or taller fence—confirm before digging.",
    ],
    related: [
      { href: "/calculators/post-calculator/", label: "Post Calculator" },
      { href: "/calculators/fence-material-calculator/", label: "Material Calculator" },
      { href: "/calculators/fence-cost-calculator/", label: "Cost Calculator" },
    ],
    faqs: [
      {
        question: "How deep should fence posts be in Granite Bay?",
        answer:
          "Most residential posts are set 24 to 36 inches deep. Clay soil movement and heavier gates often call for deeper footings than a shallow, quick-set job.",
      },
      {
        question: "Can I use fast-setting concrete?",
        answer:
          "Yes—fast-setting mixes are popular for post-setting. Bag yield is similar; follow the manufacturer label for water ratio and set time.",
      },
      {
        question: "What if my soil is heavier clay than expected?",
        answer:
          "Expansive clay is common throughout Granite Bay. You may need a wider footing than this calculator's default—your installer can confirm on-site.",
      },
    ],
  },
  {
    path: "/calculators/post-calculator/",
    title: "Fence Post Count Calculator | Granite Bay",
    description:
      "Calculate how many fence posts you need by length, spacing, corners, and end posts for Granite Bay fence runs.",
    h1: "Fence Post Calculator",
    eyebrow: "Free Tool",
    intro:
      "From a short Granite Bay side yard to a longer perimeter run on a Granite Bay lot, post count drives both material cost and install time. Enter run length, spacing, and corner or end extras to estimate total posts before you order.",
    calculatorId: "post",
    howItWorks: [
      "Enter total fence length in linear feet.",
      "Choose post spacing and add corner or end posts beyond the standard run count.",
      "Review total posts and spacing summary for your layout.",
    ],
    assumptions: [
      "Base formula: floor(length ÷ spacing) + 1 for a straight run.",
      "Corner and end extras account for gate posts, brace posts, or additional terminals not in a simple straight count.",
      "Spacing of 8 feet is typical for wood and vinyl; 10 feet may apply to some chain link runs.",
    ],
    related: [
      { href: "/calculators/concrete-calculator/", label: "Concrete Calculator" },
      { href: "/calculators/fence-material-calculator/", label: "Material Calculator" },
      { href: "/calculators/property-perimeter-estimator/", label: "Perimeter Estimator" },
    ],
    faqs: [
      {
        question: "Do corner posts count twice?",
        answer:
          "On a continuous run, corner posts are usually included in the base count. Use corner extras only for additional brace posts, gate posts, or separate fence segments.",
      },
      {
        question: "How many posts does a gate need?",
        answer:
          "A single walk gate typically needs two posts; double-drive gates often need three or four depending on width and hardware. Add those in the corner/end extras field.",
      },
      {
        question: "What post spacing is best for a side-yard gate run?",
        answer:
          "Shorter spacing (6 feet) near a gate opening adds stiffness where daily use puts the most stress on the fence line.",
      },
    ],
  },
  {
    path: "/calculators/fence-height-calculator/",
    title: "Fence Height Guide | Granite Bay & Placer County",
    description:
      "Informational fence height recommendations for privacy, pools, dogs, and HOA use in Granite Bay—not legal advice.",
    h1: "Fence Height Guide",
    eyebrow: "Free Tool",
    intro:
      "Height choices on Granite Bay properties balance privacy, HOA rules, and code. Most residential lots use 6-foot side and rear fences; front yards may be limited to 3–4 feet, and many HOAs set their own maximum below the city limit.",
    calculatorId: "height",
    howItWorks: [
      "Select your primary use case—privacy, pool, dog containment, decorative, or HOA-restricted.",
      "Review recommended height ranges and local planning notes.",
      "Confirm final height with Placer County planning and your HOA before you build—this is informational only.",
    ],
    assumptions: [
      "Recommendations are general planning guidance, not legal or engineering advice.",
      "Pool barrier rules in California often require minimum 60-inch height and specific gate latching—verify with current code.",
      "HOA covenants in most Granite Bay communities may restrict height below the city's maximum.",
    ],
    related: [
      { href: "/resources/fence-permit-guide/", label: "Fence Permit Guide" },
      { href: "/fence-types/pool-fence/", label: "Pool Fence Options" },
      { href: "/fence-types/privacy-fence/", label: "Privacy Fence" },
      { href: "/calculators/fence-cost-calculator/", label: "Cost Calculator" },
    ],
    faqs: [
      {
        question: "How tall can a fence be without a permit in Granite Bay?",
        answer:
          "Rules vary by zoning, corner visibility, and HOA overlay. Many rear and side fences up to 6 feet are routine, but always confirm with your HOA and Placer County before construction.",
      },
      {
        question: "What height keeps most dogs contained?",
        answer:
          "Four to six feet covers most breeds; athletic jumpers may need extended height in specific cases. This tool suggests ranges—you know your dog best.",
      },
      {
        question: "Is this legal advice?",
        answer:
          "No. Use these ranges for planning conversations only. HOA approval, permits, and pool codes require official verification.",
      },
    ],
  },
  {
    path: "/calculators/property-perimeter-estimator/",
    title: "Property Perimeter Estimator | Granite Bay Fence Planning",
    description:
      "Estimate fence linear footage for rectangular lots or multi-segment Granite Bay property lines.",
    h1: "Property Perimeter Estimator",
    eyebrow: "Free Tool",
    intro:
      "Before pricing a full perimeter in Granite Bay or a partial run along a shared property line, you need total linear feet. Rectangular lots use length × 2 + width × 2; irregular lots with angled segments can be summed side by side. Typical Granite Bay estate lots run 300–800+ feet; larger Loomis and horse properties can exceed 1,000 feet.",
    calculatorId: "perimeter",
    howItWorks: [
      "Choose rectangular lot mode or irregular segment mode.",
      "Enter dimensions in feet for each side or segment.",
      "Use the total perimeter in the cost or material calculators for next-step planning.",
    ],
    assumptions: [
      "Rectangular mode assumes four straight sides; deduct for existing shared fences or structures manually.",
      "Irregular mode sums user-entered segments and does not auto-close the polygon.",
      "Field-measure before ordering—plan dimensions can differ slightly from as-built conditions.",
    ],
    related: [
      { href: "/calculators/fence-cost-calculator/", label: "Cost Calculator" },
      { href: "/calculators/fence-material-calculator/", label: "Material Calculator" },
      { href: "/calculators/post-calculator/", label: "Post Calculator" },
      { href: "/service-areas/roseville/", label: "Granite Bay Service Area" },
    ],
    faqs: [
      {
        question: "Should I fence the full perimeter?",
        answer:
          "Many Granite Bay homeowners fence rear and side lines only, leaving the front open or using a lower decorative fence. Enter only the segments you plan to install.",
      },
      {
        question: "How do I measure a lot with an irregular shape?",
        answer:
          "Measure along the intended fence line on the ground, segment by segment, rather than relying on a rough plat sketch.",
      },
      {
        question: "Can I use this for a larger acreage-style lot?",
        answer:
          "Yes—add each straight run as a segment. Very long runs are often quoted by the foot with separate gate and brace allowances.",
      },
    ],
  },
  {
    path: "/calculators/maintenance-schedule-generator/",
    title: "Fence Maintenance Schedule | Granite Bay Climate",
    description:
      "Seasonal fence maintenance checklist for wood, vinyl, chain link, and iron in Granite Bay's hot-summer climate.",
    h1: "Fence Maintenance Schedule Generator",
    eyebrow: "Free Tool",
    intro:
      "Granite Bay's intense summer sun, occasional heavy winter rain, and sprinkler overspray wear fences differently by material. Wood needs stain and rot checks; vinyl benefits from an occasional rinse; chain link and iron need rust control before the rainy season. Generate a simple seasonal checklist tuned to your fence type.",
    calculatorId: "maintenance",
    howItWorks: [
      "Select your fence material—wood, vinyl, chain link, or ornamental iron.",
      "Optionally note if your fence sits in full sun or near sprinklers.",
      "Review the seasonal checklist and Granite Bay climate notes for your maintenance plan.",
    ],
    assumptions: [
      "Schedules are general guidance for the Granite Bay / Sacramento-area climate.",
      "Fences near sprinkler heads or in full-sun exposures need more frequent rot and UV inspection.",
      "Professional inspection every 2–4 years catches post lean, gate sag, and hardware fatigue early.",
    ],
    related: [
      { href: "/fence-repair/", label: "Fence Repair Services" },
      { href: "/wood-fencing/", label: "Wood Fencing" },
      { href: "/vinyl-fencing/", label: "Vinyl Fencing" },
      { href: "/chain-link-fencing/", label: "Chain Link Fencing" },
    ],
    faqs: [
      {
        question: "When should I restain a wood fence in Granite Bay?",
        answer:
          "Many wood fences benefit from cleaning and restain every 2–4 years, sooner on full-sun, south- or west-facing exposures or where sprinklers hit the pickets.",
      },
      {
        question: "Does vinyl need maintenance?",
        answer:
          "Vinyl is low maintenance but not zero—rinse dust and hard-water spotting periodically, and check posts after heavy rain for any shift in clay soil.",
      },
      {
        question: "How does clay soil movement affect my fence over time?",
        answer:
          "Seasonal swelling and shrinking can gradually pull posts out of plumb if footings were shallow. Tighten hardware and check post plumb during your annual walk-through.",
      },
    ],
  },
];
