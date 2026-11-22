const PREFIX = "/newsit";
const PAGES_ORIGIN = "https://newsit.nobistudio.com";

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (incomingUrl.pathname === PREFIX) {
      incomingUrl.pathname = `${PREFIX}/`;
      return Response.redirect(incomingUrl, 308);
    }

    if (!incomingUrl.pathname.startsWith(`${PREFIX}/`)) {
      return fetch(request);
    }

    const upstreamPath = incomingUrl.pathname.slice(PREFIX.length) || "/";
    const upstreamUrl = new URL(`${upstreamPath}${incomingUrl.search}`, PAGES_ORIGIN);

    return fetch(new Request(upstreamUrl, request));
  },
};
