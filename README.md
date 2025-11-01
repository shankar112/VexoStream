VexoStream — Travel Streaming Website (Static Prototype)

Structure
- index.html — Home / Landing
- browse.html — Browse / Categories
- title.html — Title Detail Page (TDP)
- watch.html — Watch Page (player)
- profile.html — Profile / Account Settings (mock)
- assets/css/base.css — Variables, layout, themes
- assets/css/components.css — Components, animations
- assets/js/helpers.js — Utilities (DOM, query, storage, theme)
- assets/js/data.js — Mock catalog data
- assets/js/ui.js — Rendering utilities (cards, lists, stars)
- assets/js/app.js — Page initializers and wiring

Notes
- No external build; pure HTML/CSS/JS.
- Light/Dark theme persists in localStorage.
- Browse includes live search and genre filtering.
- Title page shows recommended items by shared genre.
- Watch page streams remote, copyright-free sample videos.
- Service worker (`sw.js`) precaches core assets for faster loads (HTTPS/localhost only).
- 404 page and sitemap.xml included.
- Keep each file under ~250 lines as requested.

How to use
1) Open `index.html` in a browser.
2) Navigate via the header menu.
3) Toggle theme via the sun/moon button.
4) Try search and filters on `browse.html`.
