(async function(){
  const grid = document.getElementById('grid');
  const noResults = document.getElementById('no-results');
  const q = document.getElementById('q');
  const type = document.getElementById('type');
  const team = document.getElementById('team');
  const year = document.getElementById('yearInput');
  let items = [];
  try{
    const res = await fetch('assets/data/items.json'); items = await res.json();
  }catch(e){ grid.innerHTML = '<p>Could not load items.</p>'; return; }
  function match(item){
    const terms = (q.value||'').toLowerCase();
    const t = (type.value||'').toLowerCase();
    const tm = (team.value||'').toLowerCase();
    const yr = (year.value||'').toLowerCase();
    const hay = [item.title, item.team, item.player, item.year, item.notes, (item.tags||[]).join(' ')].join(' ').toLowerCase();
    if (terms && !hay.includes(terms)) return false;
    if (t && item.type !== t) return false;
    if (tm && !(item.team||'').toLowerCase().includes(tm)) return false;
    if (yr && String(item.year).toLowerCase().indexOf(yr) === -1) return false;
    return true;
  }
  function render(){
    const filtered = items.filter(match);
    grid.innerHTML = '';
    if (!filtered.length){ noResults.hidden = false; return; }
    noResults.hidden = true;
    for (const it of filtered){
      const a = document.createElement('a');
      a.href = `item.html?id=${encodeURIComponent(it.id)}`;
      a.className = 'card'; a.setAttribute('role','listitem');
      a.innerHTML = `
        <div class="thumb"><img loading="lazy" src="${it.cover}" alt="${it.cover_alt||('Photo of ' + it.title)}"></div>
        <div class="pad">
          <div class="eyebrow">${it.type}</div>
          <h4 style="margin:.25rem 0 .35rem 0">${it.title}</h4>
          <p class="muted">${it.team || ''} ${it.year ? '· ' + it.year : ''}</p>
        </div>`;
      grid.appendChild(a);
    }
  }
  [q, type, team, year].forEach(el => el && el.addEventListener('input', render));
  render();
})();