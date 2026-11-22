# Doris Ye — static portfolio

This site is a framework-free, responsive HTML/CSS/JavaScript site. The provided `Squarespace-Wordpress-Export-11-22-2026.xml` currently contains only the RSS channel title/link and no pages, project descriptions, or media. The project cards and poster pages are clearly marked placeholders; no Squarespace CDN image URLs were present to download.

## GitHub Pages deployment

The GitHub Actions workflow publishes the `public/` directory whenever a commit is pushed to `main`. Enable **Settings → Pages → Build and deployment → Source: GitHub Actions** in the repository.

For a project site whose URL path should be `/newsit`, create/name the repository `newsit`. Its default Pages URL will then use the repository path, and every site asset and internal link is relative so it works under that path.

## Custom domain and `/newsit`

GitHub Pages custom domains attach to a hostname (for example `nobistudio.com` or `www.nobistudio.com`), not to a URL path. A `CNAME` record cannot point only `nobistudio.com/newsit` at GitHub Pages, and setting `nobistudio.com` as the Pages custom domain would make Pages responsible for the domain root, potentially replacing the existing site.

To keep an existing site at `https://nobistudio.com` and serve this project at exactly `https://nobistudio.com/newsit`, keep DNS pointed at the existing host and configure that host's web server/CDN to reverse-proxy the `/newsit` path to the GitHub Pages project site. Configure the proxy to preserve the `/newsit` prefix (and serve `/newsit/` as the site entry point). GitHub Pages project sites are published at `https://<owner>.github.io/newsit/`; do not set `nobistudio.com` as the repository's Pages custom domain for this arrangement.

Alternatively, if a subdomain is acceptable, configure a dedicated hostname such as `newsit.nobistudio.com` as the repository's custom domain in **Settings → Pages** and create a DNS `CNAME` from `newsit` to `<owner>.github.io`. The site would then be served at the hostname root (`https://newsit.nobistudio.com/`), not under `/newsit`.

If dedicating the apex domain to this GitHub Pages site is acceptable, set `nobistudio.com` as the custom domain in **Settings → Pages** and add the GitHub Pages A records at the DNS provider:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

This apex-domain option is not compatible with retaining another website at `nobistudio.com`. Review GitHub's current Pages DNS documentation before changing production DNS.

## Connect and push

Create an empty GitHub repository named `newsit` first, then run these commands from this directory. Replace the owner/URL with the repository you created.

```powershell
git init
git add .
git commit -m "Create static portfolio site"
git branch -M main
git remote add origin https://github.com/<owner>/newsit.git
git push -u origin main
```

Then enable GitHub Actions as the Pages source as described above. No `CNAME` file is included because a custom domain does not support mapping only a path such as `/newsit`.
