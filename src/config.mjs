// ============================================================
//  SITE SETTINGS — the ONE file you edit to customise your blog
//  Save the file, push to GitHub, and the site rebuilds.
// ============================================================
export const config = {
  // ---- Identity -------------------------------------------
  name: 'Clear Notes',                       // Site name (shown in header, tabs, shares)
  tagline: 'Plain-language explainers on economy, geography, psychology and more.',
  description: 'Free, easy-to-read articles that explain how the world works.',
  url: 'https://your-site-name.netlify.app', // CHANGE to your real address (needed for sitemap, RSS, share cards)
  lang: 'en',                                // 'en' or 'hi' (sets the <html lang>)
  author: 'Your Name',                       // Default author
  email: 'you@example.com',                  // Shown on the Contact page
  logo: null,                                // e.g. '/logo.svg' (put the file in the /public folder). null = text only

  // ---- Social links (leave '' to hide) ---------------------
  social: {
    x: '', instagram: '', youtube: '', linkedin: '', facebook: '', github: '',
  },

  // ---- Colours (hex). Light mode / dark mode accent --------
  colors: { accent: '#1F4FD8', accentDark: '#8FA8FF' },

  // ---- Fonts (CSS font-family strings). null = built-in fonts
  // Built in: Source Serif 4 (headings + articles), Inter (menus), with Hindi support.
  fonts: { heading: null, body: null, ui: null },

  // ---- Visitor counting (free + privacy friendly) ----------
  // provider: 'none' | 'cloudflare' | 'goatcounter' | 'umami'
  //   cloudflare  -> id = your Web Analytics token
  //   goatcounter -> id = your GoatCounter code (the part before .goatcounter.com)
  //   umami       -> id = website ID, src = script URL (default: Umami Cloud)
  analytics: { provider: 'none', id: '', src: '' },

  // ---- Email newsletter (switch on later) -------------------
  // Buttondown: action = https://buttondown.com/api/emails/embed-subscribe/YOUR-USERNAME
  // MailerLite / Brevo: paste the "form action" URL from their embedded-form code.
  newsletter: {
    enabled: false,
    action: '',
    emailField: 'email',                      // MailerLite uses 'fields[email]'
    heading: 'Get new articles by email',
    text: 'One short email whenever a new article is published. No spam.',
  },

  // ---- Ads (all OFF so the site stays clean) ----------------
  // After Google AdSense approves you: set enabled true, paste your publisher ID and slot IDs.
  ads: { enabled: false, client: 'ca-pub-0000000000000000', slots: { top: '', end: '', home: '' } },

  // ---- "Support me" button (Ko-fi / Buy Me a Coffee / UPI page) ----
  support: { enabled: false, label: 'Support this blog', url: '' },

  // ---- Cookie / consent banner (turn on when you add ads) ---
  consent: { enabled: false },

  // ---- Comments with Giscus (https://giscus.app) -----------
  comments: { enabled: false, repo: '', repoId: '', category: 'Announcements', categoryId: '' },

  // ---- Share buttons under every article --------------------
  share: true,
};
