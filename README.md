# Deepak Gupta — Portfolio

A single-page personal portfolio site. No build step, no dependencies — plain HTML, CSS, and vanilla JavaScript.

## Structure

```
portfolio/
├── index.html      # All page content (hero, about, experience, skills, projects, contact)
├── styles.css      # Design tokens (CSS variables) + layout + light/dark themes
├── script.js       # Theme toggle, mobile nav, scroll reveal, stat counters, progress bar
└── assets/
    └── profile.jpg # Profile photo
```

## Run locally

Just open `index.html` in a browser, or serve it (recommended, so relative asset paths behave):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing

- **Content** — edit `index.html` directly; each section is clearly commented.
- **Colors / spacing / fonts** — change the CSS variables in the `:root` (dark) and `[data-theme="light"]` blocks at the top of `styles.css`.
- **Photo** — replace `assets/profile.jpg` (portrait crop works best).

## Deploy

Static files, so anything works: GitHub Pages, Netlify, Vercel, or Cloudflare Pages. For GitHub Pages, push this folder to a repo and enable Pages on the `main` branch root.
