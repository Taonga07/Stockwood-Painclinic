export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const clientId = env.GITHUB_CLIENT_ID;
  const sitePassword = env.CMS_PASSWORD;

  // Security headers to prevent search engine indexing
  const securityHeaders = {
    "Content-Type": "text/html",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "Cache-Control": "no-store, max-age=0"
  };

  if (!clientId || !sitePassword) {
    return new Response("Configuration Error: Missing GITHUB_CLIENT_ID or CMS_PASSWORD.", {
      status: 500,
      headers: securityHeaders
    });
  }

  const submittedPassword = url.searchParams.get("pass");

  if (submittedPassword !== sitePassword) {
    const errorMsg = submittedPassword ? '<p style="color:#d93025; font-weight: 500;">Incorrect password. Please try again.</p>' : '';

    const htmlForm = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="noindex, nofollow">
        <title>CMS Access</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f4f5f7; }
          .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; max-width: 320px; text-align: center; }
          input[type="password"] { width: 100%; padding: 0.75rem; margin: 1rem 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
          button { width: 100%; padding: 0.75rem; background: #0066cc; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
          button:hover { background: #0052a3; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Stockwood CMS</h2>
          ${errorMsg}
          <form method="GET" action="/admin/auth">
            <input type="password" name="pass" placeholder="Enter CMS Password" required autofocus>
            <button type="submit">Continue to Login</button>
          </form>
        </div>
      </body>
      </html>
    `;
    return new Response(htmlForm, { headers: securityHeaders });
  }

  // Redirect to GitHub
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  return Response.redirect(githubAuthUrl, 302, {
    headers: { "X-Robots-Tag": "noindex, nofollow" }
  });
}
