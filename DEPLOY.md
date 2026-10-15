# Deploying lighthouse-compliance

Host: **GitHub Pages** (free, deploys on every push to `main`, free HTTPS).
Domain: stays registered at **GoDaddy**; only its DNS records change (nameservers stay at GoDaddy).

The canonical address is `www.lighthousecompliance360.com`; the bare domain redirects to it.

---

## 1. Create the GitHub repo

1. Go to https://github.com/new
2. Repository name: `lighthouse-compliance`
3. Visibility: **Public** (free GitHub Pages needs a public repo; use Netlify instead if it must be private, see the end).
4. Do **not** add a README, .gitignore or license (the repo must be empty so the first push is clean).
5. Click **Create repository**.

## 2. Push the local project

From this folder:

```bash
git remote add origin https://github.com/jlrodea/lighthouse-compliance.git
```

```bash
git push -u origin main
```

Git will open a browser window to sign in to GitHub the first time.

## 3. Turn on GitHub Pages

1. Repo → **Settings** → **Pages**.
2. **Build and deployment** → Source: **Deploy from a branch**; Branch: `main`, folder `/ (root)` → **Save**.
3. Wait 1–2 minutes (repo → **Actions** shows a "pages build and deployment" run).
   The site is now at `https://jlrodea.github.io/lighthouse-compliance/`.
   (The 404 page's styling only works once the custom domain is on; that's expected.)

### Recommended: verify the domain (prevents domain takeover)

1. Your GitHub profile picture → **Settings** → **Pages** → **Add a domain** → enter `lighthousecompliance360.com`.
2. GitHub shows a TXT record (name like `_github-pages-challenge-jlrodea`, plus a value).
3. Add that TXT record at GoDaddy (step 4), then click **Verify**.

## 4. Point the GoDaddy domain at GitHub Pages

GoDaddy → **My Products** → your domain → **DNS** (Manage DNS).

1. **Delete** the default `A` record for `@` (value usually "Parked" or a GoDaddy IP).
2. **Delete** any `CNAME` for `www` and turn off any **Forwarding** on the domain.
3. **Add** these records:

| Type  | Name | Value                    | TTL    |
|-------|------|--------------------------|--------|
| A     | @    | 185.199.108.153          | 1 hour |
| A     | @    | 185.199.109.153          | 1 hour |
| A     | @    | 185.199.110.153          | 1 hour |
| A     | @    | 185.199.111.153          | 1 hour |
| AAAA  | @    | 2606:50c0:8000::153      | 1 hour |
| AAAA  | @    | 2606:50c0:8001::153      | 1 hour |
| AAAA  | @    | 2606:50c0:8002::153      | 1 hour |
| AAAA  | @    | 2606:50c0:8003::153      | 1 hour |
| CNAME | www  | jlrodea.github.io | 1 hour |

(AAAA rows are optional IPv6. The `www` CNAME value has **no** repo name in it.)

4. Leave **MX**, email-related **TXT** (SPF/DKIM/DMARC) and `_domainconnect` records alone.

## 5. Set the custom domain and HTTPS

1. Repo → **Settings** → **Pages** → **Custom domain**: `www.lighthousecompliance360.com` → **Save**.
   The repo already contains a `CNAME` file with this value, so GitHub may fill it in for you.
2. Wait for **DNS check successful** (minutes, sometimes a few hours). Check propagation with:

```bash
nslookup lighthousecompliance360.com
```

```bash
nslookup www.lighthousecompliance360.com
```

   The first should list the 185.199.x.153 addresses; the second should alias to `jlrodea.github.io`.
3. When GitHub has issued the certificate (can take up to ~1 hour after DNS passes), tick **Enforce HTTPS**.
   If the box is greyed out, remove the custom domain, save, re-add it, and wait again.

## 6. Check it

- `https://www.lighthousecompliance360.com` loads with a padlock.
- `http://lighthousecompliance360.com` and `https://lighthousecompliance360.com` redirect to `https://www.lighthousecompliance360.com`.
- A made-up URL (e.g. `/nope`) shows the styled 404 page.

## Updating the site later

Edit files, then:

```bash
git add -A
```

```bash
git commit -m "Update site"
```

```bash
git push
```

GitHub Pages redeploys automatically in a minute or two.

---

### Fallback: private repo on Netlify (also free)

Sign up at netlify.com with GitHub → **Add new site → Import from Git** → pick the repo (no build command, publish directory `/`).
Add the custom domain in Netlify, then at GoDaddy use: `A @ → 75.2.60.5` and `CNAME www → YOUR-SITE.netlify.app`. Netlify issues HTTPS automatically.
