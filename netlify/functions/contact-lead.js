const LEAD_ENDPOINT = "https://twinriversfence.com/";

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

  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  if (!name || !phone) {
    return json(400, { ok: false, error: "Name and phone are required." });
  }

  const city = String(data.city || "").trim();
  const source = String(data.source || "").trim();
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();
  const payload = new URLSearchParams({
    "form-name": "lead-chat",
    name,
    phone,
    email,
    city,
    source,
    project_type: "City site contact form",
    notes: [city, source].filter(Boolean).join(" / "),
    message:
      "CITY SITE LEAD\nSource: " +
      (source || "unknown") +
      "\nCity: " +
      (city || "unknown") +
      "\nName: " +
      name +
      "\nPhone: " +
      phone +
      "\nEmail: " +
      (email || "none") +
      "\n\n" +
      (message || "No project notes provided."),
  });

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });
    if (!response.ok) {
      return json(502, { ok: false, error: "Lead destination rejected the submission." });
    }
  } catch (error) {
    return json(502, { ok: false, error: "Lead destination was unreachable." });
  }

  if (wantsHtml(event)) {
    return { statusCode: 303, headers: { Location: "/success/" }, body: "" };
  }
  return json(200, { ok: true });
};
