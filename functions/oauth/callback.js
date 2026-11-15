// Cloudflare Pages Function: step 2 of GitHub login for the CMS (/oauth/callback).
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = (request.headers.get('Cookie') || '').match(/oauth_state=([^;]+)/)?.[1];
  let status = 'error', content = { message: 'Login failed. Please try again.' };

  if (code && state && state === cookie) {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
    });
    const data = await res.json();
    if (data.access_token) { status = 'success'; content = { token: data.access_token, provider: 'github' }; }
  }

  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><meta charset="utf-8"><script>
    (function () {
      var msg = ${JSON.stringify(message)};
      window.addEventListener('message', function (e) { window.opener.postMessage(msg, e.origin); }, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}
