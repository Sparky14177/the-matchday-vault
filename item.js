import { initGallery } from './gallery.js';
(async function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const titleEl = document.getElementById('item-title');
  const subtitleEl = document.getElementById('item-subtitle');
  const typeEl = document.getElementById('item-type');
  const metaEl = document.getElementById('item-meta');
  const gallery = document.getElementById('gallery');
  const storySection = document.getElementById('story-section');
  const storyEl = document.getElementById('story');
  const videoSection = document.getElementById('video-section');
  const videoContainer = document.getElementById('video-container');
  const crumb = document.getElementById('crumb-current');
  let data = [];
  try{ const res = await fetch('assets/data/items.json'); data = await res.json(); }catch(e){ titleEl.textContent='Could not load item.'; return; }
  const item = data.find(x => x.id === id) || data[0];
  if (!item){ titleEl.textContent='Item not found'; crumb.textContent='Not found'; return; }
  document.title = item.title + ' — Item'; crumb.textContent = item.title;
  titleEl.textContent = item.title;
  subtitleEl.textContent = [item.player, item.team, item.year].filter(Boolean).join(' · ');
  typeEl.textContent = item.type;
  function addMeta(label, value){ if (!value) return; const dt=document.createElement('dt'); dt.textContent=label; const dd=document.createElement('dd'); dd.textContent=value; metaEl.append(dt,dd); }
  addMeta('Player', item.player); addMeta('Team', item.team); addMeta('Year', item.year); addMeta('Competition', item.competition); addMeta('Match', item.match); addMeta('Size', item.size); addMeta('Condition', item.condition); addMeta('Notes', item.notes);
  const slides = (item.photos||[]).map((p,i)=>`<div class="carousel__slide"><img src="${p.src}" alt="${p.alt||('Photo of '+item.title)}" data-index="${i}"></div>`).join('');
  gallery.innerHTML = `<div class="carousel" role="region" aria-label="Image carousel"><button class="carousel__btn carousel__btn--prev" aria-label="Previous image" id="prevBtn">‹</button><div class="carousel__viewport" tabindex="0" aria-roledescription="carousel" aria-live="polite"><div class="carousel__track" id="track">${slides}</div></div><button class="carousel__btn carousel__btn--next" aria-label="Next image" id="nextBtn">›</button><div class="carousel__dots" id="dots">${(item.photos||[]).map((_,i)=>`<button class="carousel__dot" aria-label="Go to slide ${i+1}" data-idx="${i}"></button>`).join('')}</div></div>`;
  if (item.story){ storySection.hidden = false; storyEl.textContent = item.story; }
  if (item.video){ videoSection.hidden = false; if (item.video.endsWith('.mp4')){ const v = document.createElement('video'); v.controls = true; v.preload = 'metadata'; const s = document.createElement('source'); s.src = item.video; s.type = 'video/mp4'; v.appendChild(s); videoContainer.appendChild(v);} else if (item.video.includes('drive.google.com')){ const iframe = document.createElement('iframe'); iframe.title = 'Match video'; iframe.allowFullscreen = true; iframe.loading = 'lazy'; iframe.src = item.video.replace('/view','/preview'); videoContainer.appendChild(iframe);} else { const iframe = document.createElement('iframe'); iframe.title = 'Match video'; iframe.allowFullscreen = true; iframe.loading = 'lazy'; iframe.src = item.video.replace('watch?v=','embed/'); videoContainer.appendChild(iframe);} }
  document.body.insertAdjacentHTML('beforeend', `<div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Image viewer"><button class="lightbox__close" id="lbClose" aria-label="Close">Close</button><button class="lightbox__prev" id="lbPrev" aria-label="Previous">‹</button><img class="lightbox__img" id="lbImg" alt=""><button class="lightbox__next" id="lbNext" aria-label="Next">›</button><div class="lightbox__caption" id="lbCap"></div></div>`);
  initGallery(document);
})();