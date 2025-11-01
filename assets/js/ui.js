// VexoStream UI rendering utilities
import { $, $$, formatRating } from './helpers.js';

export function stars(n){
  const full = Math.floor(n);
  const half = n - full >= .5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half?1:0));
}

export function card(t){
  const g = t.genres.join(', ');
  return `
  <article class="card reveal" data-id="${t.id}">
    <div class="thumb" data-preview="${t.video}">
      <img src="${t.thumb}" alt="${t.name}" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/${t.id}/800/450';">
      <div class="play-overlay"><div class="play" aria-hidden>▶</div></div>
      <span class="badge">${formatRating(t.rating)}</span>
    </div>
    <div class="card-body">
      <h3 class="title">${t.name}</h3>
      <div class="muted">${g}</div>
      <div class="stars" aria-label="rating">${stars(t.rating)}</div>
      <div class="muted tiny">⏱ ${t.durationMin}m • ${t.year} • ${t.location?.split(',')[0] || ''}</div>
    </div>
  </article>`;
}

export function renderList(targetSel, items){
  const el = $(targetSel);
  if(!el) return;
  el.innerHTML = items.map(card).join('');
}

export function attachCardNavigation(containerSel, path='title.html'){
  const root = $(containerSel);
  if(!root) return;
  root.addEventListener('click', e=>{
    const art = e.target.closest('article.card');
    if(art){ location.href = `${path}?id=${encodeURIComponent(art.dataset.id)}`; }
  });
}

export function pickRecommendations(all, current, max=6){
  const pool = all.filter(t=> t.id!==current.id && t.genres.some(g=> current.genres.includes(g)) );
  return (pool.length?pool:all.filter(t=>t.id!==current.id)).slice(0, max);
}

export function enableCardHoverPreview(containerSel){
  const root = $(containerSel);
  if(!root) return;
  const build = (thumb, sources=[]) => {
    if(thumb.querySelector('video.preview')) return;
    const v = document.createElement('video');
    v.className = 'preview'; v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = 'metadata';
    const uniq = Array.from(new Set(sources));
    uniq.forEach(src=>{ const s = document.createElement('source'); s.src = src; s.type = 'video/mp4'; v.appendChild(s); });
    thumb.appendChild(v);
    v.load();
  };
  root.addEventListener('mouseenter', (e)=>{
    const t = e.target.closest('.thumb'); if(!t || !root.contains(t)) return;
    const preview = t.dataset.preview; if(!preview) return;
    const alt = t.closest('.card')?.dataset.id; // we can cross-ref later if needed
    const sources = [preview];
    build(t, sources);
  }, true);
  root.addEventListener('mouseleave', (e)=>{
    const t = e.target.closest('.thumb'); if(!t || !root.contains(t)) return;
    const v = t.querySelector('video.preview'); if(v){ v.pause(); v.remove(); }
  }, true);
}
