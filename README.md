# Twins Health website (React)

React 18 + Vite version of the Twins Health site. This app builds on the existing design system and source copy; the original static site remains in `../src`.

## Commands

```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve dist/ locally
```

## URLs

Routes are real paths. English has no prefix and Arabic lives under `/ar`:

| Old | New |
|---|---|
| `en/#/solutions/rcm` | `/solutions/rcm` |
| `ar/#/solutions/rcm` | `/ar/solutions/rcm` |
| `#/company/team` | `/team` |
| `#/company/journey` | `/history` |
| `#/contact?product=rcm` | `/contact?product=rcm` |

`/en/...` redirects to the unprefixed path. Because these are real paths, the host must send unknown paths to `index.html`. This is already configured for Netlify (`public/_redirects`) and Vercel (`vercel.json`). On Nginx, use `try_files $uri /index.html;`.

The current primary routes are `/`, `/about`, `/team`, `/leadership`, `/history`, `/solutions`, `/solutions/:id`, `/innovation`, and `/contact`; prefix any route with `/ar` for Arabic. Existing `/company/*` paths remain available for compatibility.

## Where things are

```
index.html               Static <head>: meta, Open Graph, JSON-LD, fonts
src/config.js            SITE_URL (set to the production domain), image paths
src/data/                Copy and data, unchanged from the original site:
  strings.js             UI and page strings, S.en / S.ar
  data.js                Zones, current solution data, leadership, values, Model of Care
  company.js             Existing Team, leadership and History copy
src/i18n.jsx             Language context (useLang), <L> link that keeps the language prefix
src/icons.jsx            lucide-react icons by name. Add new icon names here
src/components/
  Layout.jsx             Utility bar (text size, contrast, language), header, menus, mobile nav, footer
  common.jsx             Banner, section heading, cards, zone tabs, product video support, CTA and page metadata
  graphics.jsx           Dashboard mockup, digital-twin illustration, map
src/pages/
  Main.jsx               Home, About, Solutions, Solution detail, Innovation, Leadership, 404
  Contact.jsx            Contact page and demo-request form
  Company.jsx            Our Team, Our History and compatibility pages
src/site.css             All styles (copied from the original)
public/assets/           Logos and portraits
```

To change copy, edit `src/data/*` only. Each page sets its own `<title>`, meta description, canonical and hreflang links from the `TITLES` / `META` entries.

The site retains all 17 existing solutions and routes. The September 2021 and 2025 History timeline entries are marked as pending because approved milestone details were not present in the project files.

## Contact form

There is still no backend. On a valid submit the form opens the visitor's email app with a prefilled message to `sales@twinshealth.sa`. To post to a form endpoint or CRM instead, replace the mailto block in `onSubmit` in `src/pages/Contact.jsx`.

## SEO

This is a client-rendered single-page app, so crawlers that don't run JavaScript see only the static `<head>`. If that matters, prerender the routes at build time (for example with `vite-plugin-prerender`) or move to a framework with static generation, such as Next.js or Astro.
