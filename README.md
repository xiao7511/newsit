# Doris Ye — static portfolio

This site is a framework-free, responsive HTML/CSS/JavaScript site. The provided `Squarespace-Wordpress-Export-11-22-2026.xml` currently contains only the RSS channel title/link and no pages, project descriptions, or media. The project cards and poster pages are clearly marked placeholders; no Squarespace CDN image URLs were present to download.

## GitHub Pages deployment

The GitHub Actions workflow publishes the `public/` directory whenever a commit is pushed to `main`. Enable **Settings → Pages → Build and deployment → Source: GitHub Actions** in the repository. The project site is published at `https://xiao7511.github.io/newsit/`.

For a project site whose URL path should be `/newsit`, create/name the repository `newsit`. Its default Pages URL will then use the repository path, and every site asset and internal link is relative so it works under that path.

## Custom domain and `/newsit`

GitHub Pages custom domains attach to a hostname (for example `nobistudio.com` or `www.nobistudio.com`), not to a URL path. A `CNAME` record cannot point only `nobistudio.com/newsit` at GitHub Pages, and setting `nobistudio.com` as the Pages custom domain would make Pages responsible for the domain root, potentially replacing the existing site.

To keep the existing site at `https://nobistudio.com` and serve this project at exactly `https://nobistudio.com/newsit/`, leave the repository's Pages custom domain blank and use a Cloudflare Worker as a path reverse proxy. The Worker source is [cloudflare/newsit-proxy.js](./cloudflare/newsit-proxy.js); it forwards `/newsit/...` to the GitHub Pages project URL while leaving other paths alone.

In the Cloudflare dashboard:

1. Open **Workers & Pages**, create and deploy a Worker, and paste the contents of `cloudflare/newsit-proxy.js`.
2. In that Worker, add route patterns for `nobistudio.com/newsit*` and (if the site is served on `www` too) `www.nobistudio.com/newsit*`.
3. Ensure the matching DNS hostnames are proxied through Cloudflare (orange cloud). Do not change the existing origin/DNS records or add a Pages CNAME for the apex domain.
4. Visit `https://nobistudio.com/newsit/` and `https://nobistudio.com/newsit/posters/poster1.html`. The Worker redirects `/newsit` to `/newsit/` so relative links resolve correctly.

The Worker route is scoped to the `/newsit` path and should not affect the existing homepage. A DNS CNAME cannot map a hostname path such as `/newsit`; do not set `nobistudio.com` as the repository's Pages custom domain for this arrangement.

Alternatively, if a subdomain is acceptable, configure a dedicated hostname such as `newsit.nobistudio.com` as the repository's custom domain in **Settings → Pages** and create a DNS `CNAME` from `newsit` to `xiao7511.github.io`. The site would then be served at the hostname root (`https://newsit.nobistudio.com/`), not under `/newsit`.

If dedicating the apex domain to this GitHub Pages site is acceptable, set `nobistudio.com` as the custom domain in **Settings → Pages** and add the GitHub Pages A records at the DNS provider:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

This apex-domain option is not compatible with retaining another website at `nobistudio.com`. Review GitHub's current Pages DNS documentation before changing production DNS.

## Connect and push

The repository is already initialized, connected to `xiao7511/newsit`, and on `main`. To publish any new local changes, run:

```powershell
git add .
git commit -m "Update static portfolio deployment"
git push -u origin main
```
