(function () {
  const intro = document.getElementById('intro');
  const logo = document.getElementById('introLogo');
  const ambient = document.getElementById('ambient');
  const clickS = document.getElementById('clickS');

  function playAmbient() {
    if (!ambient) return;
    try {
      ambient.volume = 0.15;
      ambient.play().catch(() => {});
    } catch (e) {}
  }

  function start() {
    if (clickS) {
      try {
        clickS.currentTime = 0;
        clickS.play().catch(() => {});
      } catch (e) {}
    }
    setTimeout(() => {
      intro.classList.add('intro--hide');
    }, 900);
    sessionStorage.setItem('mv_intro', '1');
    playAmbient();
  }

  if (sessionStorage.getItem('mv_intro') === '1') {
    intro.style.display = 'none';
    playAmbient();
  } else {
    logo.addEventListener('click', start);
  }
})();
