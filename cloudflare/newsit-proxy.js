const PREFIX = "/newsit";
const PAGES_ORIGIN = "https://xiao7511.github.io";

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (incomingUrl.pathname === PREFIX) {
      return Response.redirect(`${incomingUrl.origin}${PREFIX}/`, 308);
    }

    if (!incomingUrl.pathname.startsWith(`${PREFIX}/`)) {
      return fetch(request);
    }

    const upstreamUrl = new URL(
      `${incomingUrl.pathname}${incomingUrl.search}`,
      PAGES_ORIGIN,
    );

    return fetch(new Request(upstreamUrl, request));
  },
};
