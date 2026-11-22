# DORISY YE — static portfolio

This is a framework-free, responsive portfolio migrated from the publicly accessible Squarespace site at `ukulele-harp-m3w7.squarespace.com`. The Work, About, Archive, Architecture Lecture Series, and Alexander Calder pages are static HTML. Referenced Squarespace CDN images are stored locally under `public/assets/images/`, so the published pages do not depend on Squarespace to load artwork.

## Image copy deterrence

The site disables image dragging and text selection on images, and suppresses the context menu on image areas. These are deterrents only: because this is a public static site, visitors can still retrieve image files from their browser or take screenshots. Preventing access requires keeping original assets behind authentication or a protected service rather than publishing them in the static site.

## GitHub Pages deployment

The GitHub Actions workflow publishes the `public/` directory whenever a commit is pushed to `main`. Enable **Settings → Pages → Build and deployment → Source: GitHub Actions** in the repository. The production origin is `https://newsite.nobistudio.com/`.

The site uses relative CSS, JavaScript, image, and page links, so it also works under a repository path such as `https://xiao7511.github.io/newsit/`.

## Custom domain and `/newsit`

GitHub Pages custom domains attach to a hostname (for example `nobistudio.com` or `www.nobistudio.com`), not to a URL path. A `CNAME` record cannot point only `nobistudio.com/newsit` at GitHub Pages, and setting `nobistudio.com` as the Pages custom domain would make Pages responsible for the domain root, potentially replacing the existing site.

To keep the existing site at `https://nobistudio.com` and serve this project at `https://nobistudio.com/newsit/`, use `https://newsite.nobistudio.com/` as a dedicated Pages origin and a Cloudflare Worker as a path reverse proxy. The Worker source is [cloudflare/newsit-proxy.js](./cloudflare/newsit-proxy.js); it maps `/newsit/...` to the subdomain root while leaving other paths alone.

In the Cloudflare dashboard:

1. In **DNS → Records**, configure the existing `newsite` CNAME to target `xiao7511.github.io` and set **Proxy status: DNS only** while GitHub verifies the domain. Do not change the existing apex or `www` records.
2. In the GitHub repository, open **Settings → Pages**, set **Custom domain** to `newsite.nobistudio.com`, and save. Keep the Pages source set to **GitHub Actions**. Wait for GitHub's DNS check and HTTPS certificate setup to complete.
3. Open **Workers & Pages**, deploy a Worker with the contents of `cloudflare/newsit-proxy.js`.
4. Add Worker route patterns for `nobistudio.com/newsit*` and `www.nobistudio.com/newsit*`. The apex and `www` DNS records must be proxied through Cloudflare for Worker routes to run; do not change their existing targets.
5. Test `https://newsite.nobistudio.com/`, `https://nobistudio.com/newsit/`, and `https://nobistudio.com/newsit/posters/poster1.html`.

The Worker route is scoped to the `/newsit` path and should not affect the existing homepage. A DNS CNAME cannot map a hostname path such as `/newsit`; do not set `nobistudio.com` or `www.nobistudio.com` as this repository's Pages custom domain.

The dedicated `newsite.nobistudio.com` origin is directly accessible at its hostname root; the Worker provides the `/newsit` URL on the main domain.

## Connect and push

The repository is initialized, connected to `xiao7511/newsit`, and uses the `main` branch. To publish local changes:

```powershell
git add .
git commit -m "Migrate Squarespace portfolio content"
git push -u origin main
```
