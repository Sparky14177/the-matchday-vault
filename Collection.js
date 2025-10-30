(async function () {
  const grid = document.getElementById('grid');
  const noRes = document.getElementById('no-results');
  let items = [];
  try {
    const r = await fetch('items.json');
    items = await r.json();
  } catch (e) {
    grid.innerHTML = '<p>Could not load items.</p>';
    return;
  }

  function card(it) {
    return `
      <a class="card" href="about.html" role="listitem">
        <div class="thumb">
          <img loading="lazy" src="${it.cover}" alt="${it.title}">
        </div>
        <div class="pad">
          <div class="eyebrow">${it.type || ''}</div>
          <h4 style="margin:.25rem 0 .35rem">${it.title}</h4>
          <p class="muted">${[it.player, it.team, it.year].filter(Boolean).join(' · ')}</p>
        </div>
      </a>
    `;
  }

  if (!items.length) {
    noRes.hidden = false;
    return;
  }

  noRes.hidden = true;
  grid.innerHTML = items.map(card).join('');
})();
