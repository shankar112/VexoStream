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
    <div class="thumb">
      <img src="${t.thumb}" alt="${t.name}">
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
