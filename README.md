# Clear Notes: a free, fast blog you manage yourself

Built with **Astro** (very fast static site) and **Decap CMS** (a writing dashboard at `/admin/`). No database, no server, no monthly cost.

## What you get
- Unlimited sections (Economy, Geography, Psychology, ...) added from the dashboard
- Article editor: title, section, summary, cover image, headings, paragraphs, images with captions, tables, YouTube, tags, draft switch
- Reading-friendly article pages: ~700px column, big text, reading time, table of contents, progress bar, related articles
- Light and dark mode, search, share buttons (WhatsApp, X, LinkedIn, Facebook, copy link)
- English and Hindi (Devanagari) fonts, self-hosted
- Sitemap, RSS, social share cards, structured data for Google
- Switches (all OFF) for newsletter, ads, support button, cookie banner, comments

## 1. Run it on your computer (optional but recommended)
Install Node.js 22 from nodejs.org, then open a terminal in this folder:

```
npm install
npm run dev
```
Open http://localhost:4321. (Search only works after `npm run build`, then `npm run preview`.)

To try the writing dashboard locally, open a **second** terminal and run `npx decap-server`, then open http://localhost:4321/admin/.

## 2. Put it online for free (Netlify, the easiest path)
1. Create a free account at **github.com**. Click **New repository**, name it (e.g. `my-blog`), keep it **Public** or Private, click **Create**.
2. Upload this project: on your computer run
   ```
   git init
   git add .
   git commit -m "first version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/my-blog.git
   git push -u origin main
   ```
3. Create a free account at **netlify.com** (sign in with GitHub). Click **Add new site, Import an existing project, GitHub**, choose your repo. Build settings are read from `netlify.toml`. Click **Deploy**.
4. When it is live, note the address (e.g. `https://sparkly-name-123.netlify.app`). Optionally rename it in **Site configuration, Change site name**.
5. Edit **`src/config.mjs`**: set `url` to that address. Edit **`public/admin/config.yml`**: set `repo: YOUR-USERNAME/my-blog`. Commit and push again.
6. **Turn on CMS login** (GitHub OAuth through Netlify):
   - On GitHub: **Settings, Developer settings, OAuth Apps, New OAuth App**. Homepage URL = your site address. Callback URL = `https://api.netlify.com/auth/done`. Click **Register**, then **Generate a new client secret**.
   - On Netlify: **Site configuration, Access & security, OAuth, Install provider**. Choose **GitHub**, paste the Client ID and Secret, **Install**.
7. Open `https://YOUR-SITE/admin/`, click **Login with GitHub**. You are in.

## 2b. Cloudflare Pages instead (also free)
1. Push to GitHub as above. In Cloudflare: **Workers & Pages, Create, Pages, Connect to Git**, pick the repo.
2. Build command `npm run build`, output directory `dist`. Under **Environment variables** add `NODE_VERSION` = `22`. Deploy.
3. Create a GitHub OAuth App (as above) with Homepage = your `https://xxx.pages.dev` and Callback = `https://xxx.pages.dev/oauth/callback`.
4. In Cloudflare **Settings, Variables and Secrets** add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, then redeploy. (The login code is already in the `functions/oauth` folder.)
5. In `public/admin/config.yml` remove the `#` before `base_url` and `auth_endpoint`, set `base_url` to your site address, push.

## 3. How to publish a new article
1. Go to `/admin/` and log in.
2. Click **Articles, New Article**.
3. Type the **Title**, choose the **Section**, write a short **Summary**, upload a **Cover image**.
4. Paste your text into **Article text**. Select a line and use the toolbar to make it a heading (H2 for main parts, H3 for sub-parts).
5. To add a picture inside the text click **+, Image**. Fill **Description** (for blind readers) and **Title** (this shows as the caption).
6. Click **Publish, Publish now**. The site rebuilds and the article is live in about a minute.

Tips: keep images under 1.5 MB and about 1600px wide (free tools: squoosh.app). The web address comes from the title, so for Hindi articles write an English short title or accept a Hindi address.

## 4. How to add a new section
**Sections, New Section**: type the name (e.g. History), a short description, pick a colour and menu order, **Publish**. Then choose it in any article's Section field. It appears in the menu and on the homepage once it has an article.

## 5. Customise from ONE file: `src/config.mjs`
Site name, tagline, logo (`/logo.svg` placed in `public/`), accent colours, fonts, social links, analytics, newsletter, ads and more. For a different font, `npm install @fontsource/FONT-NAME`, add an `import` line in `src/layouts/Base.astro`, and set the font name in `config.fonts`.

## 6. See your visitors
Set `analytics` in `src/config.mjs`:
- **Cloudflare Web Analytics** (free): Cloudflare dashboard, Analytics & Logs, Web Analytics, Add a site, copy the token into `id`, set `provider: 'cloudflare'`.
- **GoatCounter** (free, hobby use): sign up at goatcounter.com, put your code in `id`, `provider: 'goatcounter'`.
- **Umami Cloud** (free tier): add a website, put its ID in `id`, `provider: 'umami'`.

Each dashboard shows visitors, page views, top articles and where traffic comes from.

## 7. Later: subscriptions and income
- **Newsletter:** create a free account on Buttondown, MailerLite or Brevo, copy the form action URL into `newsletter.action`, set `enabled: true`.
- **Ads:** apply to Google AdSense once you have 15 to 20 good articles and the About, Contact, Privacy, Terms pages (already included). Then fill `ads` and set `consent.enabled: true`. Approval is not guaranteed.
- **Support button:** `support.enabled: true` with a Ko-fi or Buy Me a Coffee link.
- **Comments:** follow giscus.app and fill `comments`.

## 8. Test before you announce
- [ ] Home page, a section page, an article page open on phone and laptop
- [ ] Dark mode toggle works and is remembered
- [ ] Search finds a word from an article (after a deploy)
- [ ] Share buttons open WhatsApp/X/LinkedIn/Facebook; Copy link works
- [ ] `/admin/` login works; publish a test article; delete it afterwards
- [ ] A new section shows up in the menu
- [ ] `/rss.xml`, `/sitemap-index.xml`, `/robots.txt` open
- [ ] Pasting your article link in WhatsApp shows the title and image
- [ ] Run Lighthouse in Chrome (F12, Lighthouse) and check the scores
- [ ] Replace the sample articles, About text and the placeholders in Privacy, Terms and Disclaimer (they are templates, not legal advice)

## Folder map
```
src/config.mjs         all your settings
public/admin/          the writing dashboard + its config.yml
src/content/blog/      articles (created by the dashboard)
src/content/categories/ sections
src/assets/uploads/    uploaded images (optimised automatically)
src/pages/             pages  |  src/components/  pieces  |  src/styles/global.css  look
functions/oauth/       Cloudflare login helper (ignored on Netlify)
```
