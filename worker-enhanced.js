/**
 * Cloudflare Worker Edge Gateway for agentuniver.com
 * High-Availability Failover between Vercel, Netlify, and Tencent EdgeOne
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname + url.search;

  const PRIMARY = typeof PRIMARY_ORIGIN !== 'undefined' ? PRIMARY_ORIGIN : 'https://vercel.agentuniver.com';
  const SECONDARY = typeof SECONDARY_ORIGIN !== 'undefined' ? SECONDARY_ORIGIN : 'https://netlify.agentuniver.com';
  const TERTIARY = typeof TERTIARY_ORIGIN !== 'undefined' ? TERTIARY_ORIGIN : 'https://qcloud.agentuniver.com';

  const origins = [PRIMARY, SECONDARY, TERTIARY];

  for (let i = 0; i < origins.length; i++) {
    const origin = origins[i];
    try {
      const targetUrl = new URL(path, origin).toString();
      const originReq = new Request(targetUrl, request);
      originReq.headers.set('X-Forwarded-Host', url.hostname);
      originReq.headers.set('X-Gateway', 'Cloudflare-AgentUniver-Edge');

      const response = await fetch(originReq, {
        cf: { cacheTtl: 3600, cacheEverything: true }
      });

      if (response.ok || response.status === 304 || (response.status >= 300 && response.status < 400)) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set('X-Edge-Origin', origin);
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      }
    } catch (e) {
      // Failover to next origin
    }
  }

  return new Response('All Origin Servers Unavailable', { status: 502 });
}
