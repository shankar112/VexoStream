# VexoStream Project Report

This document explains the site’s flow end‑to‑end, the role of every file, key design decisions, and how to extend or troubleshoot the project.

## Overview
- Static, multi‑page prototype for a travel streaming service.
- Tech: HTML5 + CSS3 + Vanilla JS (modules). Optional Bootstrap not used to keep footprint small.
- Goals: modern visuals, light/dark theme, search/filter, recommendations, watch playback, hover previews, performance via caching.

## User Flow
1) Home (`index.html`) — see hero, featured titles; click Browse or a card.
2) Browse (`browse.html`) — live search and genre chips refine the catalog.
3) Title Detail (`title.html`) — background hero, summary, meta, rating, watch CTA, and recommended titles.
4) Watch (`watch.html`) — HTML5 video player with multi‑source fallback; quick link back to details.
5) Profile (`profile.html`) — mock settings (local only) for name/email/playback options.

## File‑By‑File Purpose

### HTML Pages
- `index.html`
  - Landing page, header/nav, theme toggle, “Featured” grid rendered from JS.
  - Loads shared scripts and sets `data-page="home"` for targeted initialization.

- `browse.html`
  - Search input (`#q`) + dynamic genre chips (`#genre-chips`).
  - Grid container (`#browse-grid`) for filtered results.

- `title.html`
  - Hero section uses title thumbnail as background.
  - Displays title, genres, rating, summary, meta (location/year/duration), watch button.
  - Recommendations grid (`#recs-grid`).

- `watch.html`
  - `<video id="player">` filled with multiple `<source>` entries to enable native fallback.
  - Title label and descriptive sentence.

- `profile.html`
  - Mock profile/settings saved to `localStorage` only.

- `404.html`
  - Friendly not‑found page with links back to Home/Browse.

- `sitemap.xml`
  - Basic sitemap listing top‑level pages and core assets (for simple static hosting or SEO tooling).

### Stylesheets
- `assets/css/base.css`
  - Design tokens (CSS variables) for colors, theme, and shadows.
  - Global reset and primitives: containers, stacks, clusters.
  - Layout: header, hero, grid.
  - Card structure + consistent height handling.
  - Form controls and utility classes.
  - Theme system via `[data-theme="light"]` on `<html>`; dark is default.
  - Theme toggle switch visuals (pill, sliding thumb, “Dark/Light” label logic).

- `assets/css/components.css`
  - Animations: reveal on scroll, shimmer skeleton (reserved), hover effects.
  - Card overlays (play button), tabs (profile), chips.
  - Hover preview `<video>` styling and transitions.

### JavaScript Modules
- `assets/js/helpers.js`
  - DOM shorthands: `$`, `$$`, `on`.
  - URL query parsing `qs()` and navigation `go()`.
  - `store` wrapper for JSON `localStorage` use.
  - Theme helpers: `setTheme`, `getTheme`, `toggleTheme`.
  - IntersectionObserver reveal initializer.

- `assets/js/data.js`
  - Mock catalog (`titles`) with: `id`, `name`, `genres`, `rating`, `summary`, `location`, `year`, `durationMin`, `thumb`, `video`, `altVideos`.
  - `genres` list derived from titles.
  - Video URLs are CORS‑safe (media.w3.org, w3schools, Google sample bucket) and include fallbacks.

- `assets/js/ui.js`
  - `stars(n)` → star glyph string.
  - `card(t)` → returns HTML for a catalog card including title, genres, rating, and compact meta row.
  - `renderList(targetSel, items)` → injects cards.
  - `attachCardNavigation(containerSel, path)` → clicking a card opens `title.html?id=...`.
  - `pickRecommendations(all, current, max)` → genre‑based suggestions.
  - `enableCardHoverPreview(containerSel)` → on hover, inserts a muted looping `<video class="preview">` over the thumbnail; removed on mouseleave.

- `assets/js/app.js`
  - Bootstraps per page via `document.body.dataset.page`.
  - Theme: applies persisted or system preference; updates toggle accessibility and visual state.
  - Service worker registration for offline/fast loads.
  - Home: renders featured, attaches navigation and preview, reveals.
  - Browse: wires live search and genre filters; re‑renders grid.
  - Title: populates hero, summary, meta, rating; sets up recommendations.
  - Watch: creates multiple `<source>` entries for `<video>` and calls `load()`; sets description; back link.
  - Profile: binds inputs to `localStorage` model (`vexo:profile`).

### PWA
- `sw.js`
  - Versioned cache with a concise pre‑cache list.
  - Cache‑first for precached assets; network‑first with cache fallback for navigations.
  - Skips cross‑origin media from being cached (avoid heavy storage).
  - Note: Service workers require HTTPS or `localhost`.

## Data & Rendering Flow
1) Page loads shared modules; `app.js` reads `data-page` and runs the correct init.
2) For catalog views, `data.js` provides models; `ui.js` renders cards into containers.
3) Clicks on cards navigate by id via query string; detail/watch pages resolve `id` to a title object.
4) Theme state is read from `localStorage` (or system preference) and applied to `<html data-theme>`, impacting all CSS variables.

## Search & Filter (Browse)
- Input `#q` filters by title name or genre (case‑insensitive).
- Genre chips set an active genre; “All” disables genre filter.
- Both filters combine, then the grid is re‑rendered.

## Recommendations (TDP)
- Selects titles that share at least one genre with the current title; falls back to other titles if none match; shows up to 6.

## Playback Strategy (Watch)
- `<video id="player">` gets multiple `<source>` tags: primary + fallbacks.
- Browser chooses first compatible/available source and plays.
- `crossorigin="anonymous"`, `playsinline`, `preload="metadata"` for smooth UX.

## Theme Toggle UX
- Visual: pill switch with sliding thumb and centered label.
- Behavior: shows the next action (“Light” while in dark mode, “Dark” while in light mode).
- Persistence: stored in `localStorage` (`vexo:theme`).

## Accessibility
- Focusable controls (buttons, chips, inputs) use system fonts and high‑contrast colors.
- Visible focus via outlines on inputs.
- Buttons have ARIA labels and titles for the theme toggle; `aria-pressed` reflects state.
- Images include `alt`; card titles are readable; label text has sufficient contrast.

## Performance Considerations
- No large frameworks; CSS/JS split by concern to keep files < 250 lines.
- Preload overhead minimized; images and video served by CDNs, thumbnails use `loading="lazy"` with fallback.
- IntersectionObserver reveals on scroll to avoid jank.
- Service worker caches core shell for quick repeat navigations.

## SEO & Metadata
- `sitemap.xml` for discoverability.
- Clean URLs to top‑level pages; semantic headings and copy.

## Known Limitations
- Static prototype; no real authentication or backend.
- Catalog is in memory; search is client‑side only.
- Service worker precache list is static and must be bumped when files change.
- External media depends on third‑party uptime; fallbacks are provided but not exhaustive.

## Extending the Project
- Add content: extend `assets/js/data.js` with new titles and thumbs.
- New pages: copy an HTML page and set `data-page` accordingly; write a matching initializer in `app.js`.
- Components: expand `ui.js` for additional renderers (e.g., carousels, badges).
- Styling: add new component styles to `components.css`; avoid touching variables unless theming.
- Video: attach subtitles via `<track>` on the watch page; use the same multi‑source pattern.

## Local Development & Deployment
1) Open `index.html` directly for basic viewing; for service worker support use a local web server (e.g., VS Code Live Server) under `http://localhost`.
2) Deployment: any static host (Netlify, Vercel, GitHub Pages). Ensure the site is served from the domain root or update SW `PRECACHE` paths accordingly.
3) Cache busting: update `VERSION` in `sw.js` when changing CSS/JS/HTML.

## Quick Map of Responsibilities
- Pages: `index.html`, `browse.html`, `title.html`, `watch.html`, `profile.html`
- Styles: `assets/css/base.css`, `assets/css/components.css`
- Logic: `assets/js/helpers.js`, `assets/js/data.js`, `assets/js/ui.js`, `assets/js/app.js`
- PWA/SEO: `sw.js`, `sitemap.xml`, `404.html`

