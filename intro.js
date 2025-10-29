(function(){
  const intro = document.getElementById('intro');
  const logo = document.getElementById('introLogo');
  const cta = document.getElementById('introCta');
  const audio = document.getElementById('ambient');
  const dial = document.querySelector('#introLogo').contentDocument ? document.querySelector('#introLogo').contentDocument.getElementById('dial') : null;

  function playAmbient(){
    if (!audio) return;
    audio.volume = 0.15;
    const p = audio.play();
    if (p && typeof p.catch === 'function'){ p.catch(()=>{}); }
  }

  function start(){
    // animate dial rotation if inline SVG accessible
    try{
      const svgDoc = document.getElementById('introLogo').contentDocument;
      if (svgDoc){ const d = svgDoc.getElementById('dial'); if (d){ d.style.transformOrigin='256px 256px'; d.style.animation='dialTurn 1.6s ease forwards'; } }
    }catch(e){}
    playAmbient();
    setTimeout(()=>{ intro.classList.add('intro--hidden'); }, 1200);
    sessionStorage.setItem('mv_intro', '1');
  }

  if (sessionStorage.getItem('mv_intro')==='1'){
    // hide immediately
    intro.style.display='none';
    playAmbient();
  } else {
    // attach handlers
    logo.addEventListener('load', ()=>{ /* ready */ });
    logo.addEventListener('click', start);
    cta.addEventListener('click', start);
  }
})();