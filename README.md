# Doris Ye — static portfolio

This site is a framework-free, responsive HTML/CSS/JavaScript site. The provided `Squarespace-Wordpress-Export-11-22-2026.xml` currently contains only the RSS channel title/link and no pages, project descriptions, or media. The project cards and poster pages are clearly marked placeholders; no Squarespace CDN image URLs were present to download.

## GitHub Pages deployment

The GitHub Actions workflow publishes the `public/` directory whenever a commit is pushed to `main`. Enable **Settings → Pages → Build and deployment → Source: GitHub Actions** in the repository. The project site is published at `https://xiao7511.github.io/newsit/`.

If you change or clear the Pages custom domain after a deployment, rerun **Actions → Deploy static site to GitHub Pages → Run workflow** so the published site reflects the current Pages configuration.

For a project site whose URL path should be `/newsit`, create/name the repository `newsit`. Its default Pages URL will then use the repository path, and every site asset and internal link is relative so it works under that path.

## Custom domain and `/newsit`

GitHub Pages custom domains attach to a hostname (for example `nobistudio.com` or `www.nobistudio.com`), not to a URL path. A `CNAME` record cannot point only `nobistudio.com/newsit` at GitHub Pages, and setting `nobistudio.com` as the Pages custom domain would make Pages responsible for the domain root, potentially replacing the existing site.

To keep the existing site at `https://nobistudio.com` and serve this project at exactly `https://nobistudio.com/newsit/`, use a dedicated Pages origin at `https://newsite.nobistudio.com/` and a Cloudflare Worker as a path reverse proxy. The account's `xiao7511.github.io` address redirects to the existing `www.nobistudio.com`, so it cannot be used directly as the Worker origin. The Worker source is [cloudflare/newsit-proxy.js](./cloudflare/newsit-proxy.js); it maps `/newsit/...` to the subdomain root while leaving other paths alone.

In the Cloudflare dashboard:

1. In **DNS → Records**, configure the existing `newsite` CNAME to target `xiao7511.github.io` and set **Proxy status: DNS only** while GitHub verifies the domain. Do not change the existing apex or `www` records. The record must resolve publicly before Pages can issue a certificate.
2. In the GitHub repository, open **Settings → Pages**, set **Custom domain** to `newsite.nobistudio.com`, and save. Keep the project's Pages source set to **GitHub Actions**; `public/CNAME` also records the custom hostname in the deployed artifact. Wait for GitHub's DNS check and HTTPS certificate setup to complete.
3. Open **Workers & Pages**, create and deploy a Worker, and paste the contents of `cloudflare/newsit-proxy.js`.
4. In that Worker, add route patterns for `nobistudio.com/newsit*` and `www.nobistudio.com/newsit*`. The apex and `www` DNS records must be proxied through Cloudflare for Worker routes to run; do not change their existing targets.
5. Visit `https://newsite.nobistudio.com/` to verify the origin, then visit `https://nobistudio.com/newsit/` and `https://nobistudio.com/newsit/posters/poster1.html`. The Worker redirects `/newsit` to `/newsit/` so relative links resolve correctly.

The Worker route is scoped to the `/newsit` path and should not affect the existing homepage. A DNS CNAME cannot map a hostname path such as `/newsit`; do not set `nobistudio.com` or `www.nobistudio.com` as this repository's Pages custom domain.

The dedicated `newsite.nobistudio.com` origin is used only as the Worker upstream. It is also directly accessible at its hostname root; the Worker provides the requested `/newsit` URL on the main domain.

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
