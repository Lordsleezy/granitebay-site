const crypto = require("crypto");

const LEAD_ENDPOINT = "https://twinriversfence.com/";
const INGEST_ENDPOINT = "https://twinriversfence.com/.netlify/functions/lead-ingest";

function json(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(payload),
  };
}

function parseBody(event) {
  const raw = event.body || "";
  const decoded = event.isBase64Encoded ? Buffer.from(raw, "base64").toString("utf8") : raw;
  const contentType = String(event.headers["content-type"] || event.headers["Content-Type"] || "");
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(decoded || "{}");
    } catch (error) {
      return {};
    }
  }
  return Object.fromEntries(new URLSearchParams(decoded));
}

function wantsHtml(event) {
  const accept = String(event.headers.accept || event.headers.Accept || "");
  return accept.includes("text/html");
}

function clip(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

function digits(value) {
  return clip(value, 40).replace(/\D/g, "");
}

function hostnameFromEnv() {
  try {
    if (process.env.URL) return new URL(process.env.URL).hostname.replace(/^www\./i, "");
  } catch (error) {}
  return "";
}

function newLeadId() {
  return crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString("hex");
}

function isQuoteLead(data) {
  const form = clip(data.form_name || data["form-name"], 80).toLowerCase();
  const type = clip(data.lead_type, 80).toLowerCase();
  return form === "instant-quote" || type === "fence-quote" || Boolean(data.estimated_range || data.footage);
}

function quoteDetails(data) {
  if (clip(data.quote_details, 4000)) return clip(data.quote_details, 4000);
  const parts = [];
  const fields = [
    ["fence_type", "Fence type"],
    ["height", "Height"],
    ["footage", "Linear feet"],
    ["gates", "Gates"],
    ["removal", "Removal"],
    ["estimated_range", "Estimated range"],
  ];
  for (const [key, label] of fields) {
    const value = clip(data[key], 120);
    if (value) parts.push(label + ": " + value);
  }
  return parts.join("\n");
}

function notificationMessage(record) {
  const chunks = [
    record.lead_type === "fence-quote" ? "CITY SITE FENCE QUOTE" : "CITY SITE LEAD",
    "Source: " + (record.source_domain || "unknown"),
    "Page: " + (record.source_page || "unknown"),
    "City: " + (record.city || "unknown"),
    "Name: " + (record.name || ""),
    "Phone: " + record.phone,
    "Email: " + (record.email || ""),
    "Lead ID: " + record.lead_id,
  ];
  if (record.quote_details) chunks.push("", record.quote_details);
  chunks.push("", record.message || "No project notes provided.");
  return chunks.join("\n");
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" } };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const data = parseBody(event);
  if (data["bot-field"]) {
    return wantsHtml(event)
      ? { statusCode: 303, headers: { Location: "/success/" }, body: "" }
      : json(200, { ok: true, ignored: true });
  }

  const name = clip(data.name, 120);
  const phone = clip(data.phone, 40);
  if (digits(phone).length < 10) {
    return json(400, { ok: false, error: "A valid phone number is required." });
  }
  if (!isQuoteLead(data) && !name) {
    return json(400, { ok: false, error: "Name and phone are required." });
  }

  const quoteLead = isQuoteLead(data);
  const leadId = clip(data.lead_id, 80) || newLeadId();
  const city = clip(data.city, 80);
  const sourceDomain = hostnameFromEnv() || clip(data.source_domain || data.source, 200).replace(/^https?:\/\//i, "").split("/")[0];
  const record = {
    lead_id: leadId,
    submitted_at: new Date().toISOString(),
    name,
    email: clip(data.email, 200),
    phone,
    city,
    source_domain: sourceDomain,
    source_page: clip(data.source_page, 300),
    form_name: clip(data.form_name || data["form-name"], 80) || (quoteLead ? "instant-quote" : "contact"),
    lead_type: clip(data.lead_type, 80) || (quoteLead ? "fence-quote" : "contact"),
    message: clip(data.message || data.notes, 4000),
    project_details: clip(data.project_details, 4000),
    quote_details: quoteDetails(data),
    fence_type: clip(data.fence_type, 80),
    height: clip(data.height, 40),
    footage: clip(data.footage, 40),
    gates: clip(data.gates, 20),
    removal: clip(data.removal, 20),
    estimated_range: clip(data.estimated_range, 80),
    utm_source: clip(data.utm_source, 120),
    utm_medium: clip(data.utm_medium, 120),
    utm_campaign: clip(data.utm_campaign, 120),
    utm_term: clip(data.utm_term, 120),
    utm_content: clip(data.utm_content, 120),
    referrer: clip(data.referrer, 300),
  };

  const payload = new URLSearchParams({
    "form-name": "lead-chat",
    name,
    phone,
    email: record.email,
    city,
    source: sourceDomain,
    project_type: quoteLead ? "Fence quote calculator" : "City site contact form",
    notes: [city, sourceDomain, leadId].filter(Boolean).join(" / "),
    message: notificationMessage(record),
  });

  let chatOk = false;
  let ingestOk = false;
  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
    chatOk = response.ok;
  } catch (error) {
    chatOk = false;
  }

  try {
    const response = await fetch(INGEST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(record),
    });
    ingestOk = response.ok;
  } catch (error) {
    ingestOk = false;
  }

  if (!chatOk && !ingestOk) {
    return json(502, { ok: false, error: "Lead destination was unreachable." });
  }

  if (wantsHtml(event)) {
    return { statusCode: 303, headers: { Location: "/success/" }, body: "" };
  }
  return json(200, { ok: true, lead_id: leadId });
};
