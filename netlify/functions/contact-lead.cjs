exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Fence-Lead",
        "Cache-Control": "no-store",
      },
      body: "",
    };
  }

  return {
    statusCode: 410,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({
      ok: false,
      error: "Online requests are closed. Call (916) 906-2254.",
    }),
  };
};
