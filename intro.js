(function(){const intro=document.getElementById('intro');const logo=document.getElementById('introLogo');const amb=document.getElementById('ambient');const clk=document.getElementById('clickS');
function playAmb(){try{amb.volume=0.15;amb.play().catch(()=>{})}catch(e){}}
function start(){try{clk.currentTime=0;clk.play().catch(()=>{})}catch(e){} setTimeout(()=>intro.classList.add('intro--hide'),900); sessionStorage.setItem('mv_intro','1'); playAmb();}
if(sessionStorage.getItem('mv_intro')==='1'){intro.style.display='none';playAmb();} else {logo.addEventListener('click',start);} })();