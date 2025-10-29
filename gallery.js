export function initGallery(root){
  const track = root.querySelector('#track');
  const slides = Array.from(track.children);
  const prev = root.querySelector('#prevBtn');
  const next = root.querySelector('#nextBtn');
  const dotsWrap = root.querySelector('#dots');
  const dots = Array.from(dotsWrap.children);
  let idx = 0;
  function update(){
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(${-idx * width}px)`;
    dots.forEach((d,i)=> d.setAttribute('aria-current', i===idx ? 'true' : 'false'));
  }
  window.addEventListener('resize', update);
  prev.addEventListener('click', ()=>{ idx = (idx - 1 + slides.length) % slides.length; update(); });
  next.addEventListener('click', ()=>{ idx = (idx + 1) % slides.length; update(); });
  dots.forEach(d=> d.addEventListener('click', ()=>{ idx = parseInt(d.dataset.idx); update(); }));
  const viewport = root.querySelector('.carousel__viewport');
  viewport.addEventListener('keydown', (e)=>{ if (e.key==='ArrowLeft') prev.click(); if (e.key==='ArrowRight') next.click(); });
  let sx = null; track.addEventListener('pointerdown', (e)=>{ sx = e.clientX; track.setPointerCapture(e.pointerId); });
  track.addEventListener('pointerup', (e)=>{ if (sx===null) return; const dx = e.clientX - sx; if (dx > 30) prev.click(); if (dx < -30) next.click(); sx = null; });
  // Lightbox
  const lb = document.getElementById('lightbox'); const lbImg = document.getElementById('lbImg'); const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose'); const lbPrev = document.getElementById('lbPrev'); const lbNext = document.getElementById('lbNext');
  function openLB(i){ idx = i; update(); const img = slides[idx].querySelector('img'); lbImg.src = img.src; lbImg.alt = img.alt || ''; lbCap.textContent = img.alt || ''; lb.setAttribute('aria-hidden','false'); }
  function closeLB(){ lb.setAttribute('aria-hidden','true'); }
  slides.forEach((s,i)=> s.querySelector('img').addEventListener('click', ()=> openLB(i)) );
  lbClose.addEventListener('click', closeLB); lb.addEventListener('click', (e)=>{ if (e.target===lb) closeLB(); });
  lbPrev.addEventListener('click', ()=>{ idx = (idx - 1 + slides.length) % slides.length; openLB(idx); });
  lbNext.addEventListener('click', ()=>{ idx = (idx + 1) % slides.length; openLB(idx); });
  document.addEventListener('keydown', (e)=>{ if (lb.getAttribute('aria-hidden')==='false'){ if (e.key==='Escape') closeLB(); if (e.key==='ArrowLeft') lbPrev.click(); if (e.key==='ArrowRight') lbNext.click(); } });
  update();
}