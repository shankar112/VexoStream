// VexoStream helpers: DOM, query, storage, theme
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
export const on = (el, ev, fn, opts) => el.addEventListener(ev, fn, opts);

export const qs = () => Object.fromEntries(new URLSearchParams(location.search));
export const go = (path, params={}) => {
  const u = new URL(path, location.origin);
  Object.entries(params).forEach(([k,v])=>u.searchParams.set(k,v));
  location.href = u.toString();
};

export const store = {
  get(k, d=null){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};

// Theme
const THEME_KEY = 'vexo:theme';
export function setTheme(mode){
  document.documentElement.setAttribute('data-theme', mode);
  store.set(THEME_KEY, mode);
}
export function getTheme(){ return store.get(THEME_KEY, window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); }
export function toggleTheme(){ setTheme(getTheme()==='dark' ? 'light' : 'dark'); }

// Intersection reveal
export function revealInView(selector='.reveal'){
  const io = new IntersectionObserver(entries=>{
    for(const e of entries){ if(e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }
  }, {threshold:.12});
  $$(selector).forEach(el=>io.observe(el));
}

// Small utilities
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const formatRating = (n) => `${n.toFixed(1)}`;

