export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  const securityHeaders = {
    "Content-Type": "text/html",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Cache-Control": "no-store, max-age=0"
  };

  if (!clientId || !clientSecret) {
    return new Response("Configuration Error: Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET on Cloudflare.", {
      status: 500,
      headers: securityHeaders
    });
  }

  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Authentication failed: Missing authorization code.", {
      status: 400,
      headers: securityHeaders
    });
  }

  // Exchange authorization code for access token with GitHub
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return new Response(`GitHub Error: ${data.error_description || data.error}`, {
      status: 400,
      headers: securityHeaders
    });
  }

  // Return the access token to the Sveltia CMS window
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="robots" content="noindex, nofollow">
      <title>Authenticating...</title>
    </head>
    <body>
      <script>
        window.opener.postMessage(
          "authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}",
          "*"
        );
      </script>
    </body>
    </html>
  `;

  return new Response(html, { headers: securityHeaders });
}
