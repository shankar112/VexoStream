// VexoStream app bootstrap
import { $, $$, on, qs, setTheme, getTheme, toggleTheme, revealInView, store } from './helpers.js';
import { titles, genres } from './data.js';
import { renderList, attachCardNavigation, pickRecommendations, enableCardHoverPreview } from './ui.js';

function initTheme(){ setTheme(getTheme()); updateThemeIcon(); }
function updateThemeIcon(){
  const dark = getTheme()==='dark';
  const ico = $('#theme-ico'); if(ico) { ico.textContent = dark? '☀' : '🌙'; }
  const btn = $('#theme-toggle'); if(btn) { btn.title = dark? 'Switch to light' : 'Switch to dark'; btn.setAttribute('aria-pressed', String(!dark)); btn.dataset.next = dark? 'light':'dark'; }
}

function initHeader(){
  const btn = $('#theme-toggle');
  if(btn){ on(btn,'click', ()=>{ toggleTheme(); updateThemeIcon(); }); }
}

function initServiceWorker(){
  if ('serviceWorker' in navigator) {
    // Register at root for maximum scope
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  }
}

function homeInit(){
  renderList('#home-grid', titles.slice(0,6));
  attachCardNavigation('#home-grid');
  enableCardHoverPreview('#home-grid');
  revealInView();
}

function browseInit(){
  // Populate genre filters
  const chips = $('#genre-chips');
  if(chips){ chips.innerHTML = ['All', ...genres].map(g=>`<button class="chip" data-g="${g}">${g}</button>`).join(''); }
  let active = 'All';
  const apply = () => {
    const q = ($('#q')?.value || '').toLowerCase().trim();
    const list = titles.filter(t=>{
      const matchQ = !q || t.name.toLowerCase().includes(q) || t.genres.some(g=>g.toLowerCase().includes(q));
      const matchG = active==='All' || t.genres.includes(active);
      return matchQ && matchG;
    });
    renderList('#browse-grid', list);
    attachCardNavigation('#browse-grid');
    enableCardHoverPreview('#browse-grid');
    revealInView();
  };
  on($('#q'), 'input', apply);
  on($('#genre-chips'), 'click', e=>{
    const b = e.target.closest('button.chip'); if(!b) return;
    active = b.dataset.g;
    $$('#genre-chips .chip').forEach(x=>x.classList.toggle('pill', x.dataset.g===active));
    apply();
  });
  apply();
}

function titleInit(){
  const { id } = qs();
  const item = titles.find(t=>t.id===id) || titles[0];
  if(!item) return;
  $('#tdp-title').textContent = item.name;
  $('#tdp-hero').style.background = `linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,.2)), url('${item.thumb}') center/cover`;
  $('#tdp-summary').textContent = item.summary;
  $('#tdp-genres').textContent = item.genres.join(' • ');
  $('#tdp-rating').textContent = item.rating.toFixed(1);
  const meta = $('#tdp-meta');
  if(meta){
    meta.innerHTML = `
      <div class="pill">Location: ${item.location || '—'}</div>
      <div class="pill">Year: ${item.year || '—'}</div>
      <div class="pill">Duration: ${item.durationMin || '—'} min</div>
    `;
  }
  $('#watch-btn').addEventListener('click', ()=> location.href = `watch.html?id=${encodeURIComponent(item.id)}`);
  const recs = pickRecommendations(titles, item);
  renderList('#recs-grid', recs);
  attachCardNavigation('#recs-grid');
  enableCardHoverPreview('#recs-grid');
  revealInView();
}

function watchInit(){
  const { id } = qs();
  const item = titles.find(t=>t.id===id) || titles[0];
  if(!item) return;
  const v = $('#player');
  v.setAttribute('crossorigin', 'anonymous');
  const sources = [item.video, ...(item.altVideos||[])];
  // Build <source> list so the browser can try each
  v.innerHTML = '';
  sources.forEach(u=>{
    const s = document.createElement('source');
    s.src = u; s.type = 'video/mp4';
    v.appendChild(s);
  });
  // In some browsers we still need to call load()
  v.load();
  $('#watch-title').textContent = item.name;
  const desc = `Enjoy ${item.name}. ${item.summary} Genres: ${item.genres.join(', ')}.`;
  const d = $('#watch-desc'); if(d) d.textContent = desc;
  $('#to-tdp').addEventListener('click', ()=> location.href = `title.html?id=${encodeURIComponent(item.id)}`);
}

function profileInit(){
  const key = 'vexo:profile';
  const model = store.get(key, { name:'Traveler', email:'you@example.com', quality: '1080p', autoplay: true });
  const bind = (id, prop, type='value') => {
    const el = $('#'+id); if(!el) return;
    el[type] = model[prop];
    on(el, (type==='checked'?'change':'input'), () => { model[prop]= el[type]; store.set(key, model); });
  };
  bind('pf-name','name');
  bind('pf-email','email');
  bind('pf-quality','quality');
  bind('pf-autoplay','autoplay','checked');
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();
  initHeader();
  initServiceWorker();
  const page = document.body.dataset.page;
  if(page==='home') homeInit();
  if(page==='browse') browseInit();
  if(page==='title') titleInit();
  if(page==='watch') watchInit();
  if(page==='profile') profileInit();
});
