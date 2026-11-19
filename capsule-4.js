
/* enrichment widgets: hero sample seal + tier gallery (presentation only) */
function buildTierStrip(){
  const strip=document.getElementById('tierStrip');if(!strip)return;
  strip.innerHTML='';
  const want={};
  for(let i=0;i<6000;i++){const nm='seal'+i+'.ai';const k=tierOf(nm).kind;if(!want[k])want[k]=nm;
    if(want.common&&want.rare&&want.epic&&want.legend)break;}
  const meta=[['common',T().tier_common,'68%',T().m_common],['rare',T().rare,'22%',T().m_rare],
              ['epic',T().epic,'8%',T().m_epic],['legend',T().legendary,'2%',T().m_legend]];
  meta.forEach(function(m){
    const card=document.createElement('div');card.className='card tiercard';
    const s=document.createElement('div');paintSealEl(s,want[m[0]]);card.appendChild(s);
    const t=document.createElement('div');t.className='tiername';t.textContent=m[1]+' · '+m[2];card.appendChild(t);
    const d=document.createElement('div');d.className='msg';d.style.marginTop='6px';d.textContent=m[3];card.appendChild(d);
    const sn=document.createElement('div');sn.className='note';sn.textContent=want[m[0]];card.appendChild(sn);
    strip.appendChild(card);});
}
function drawHeroSeal(){const c=document.getElementById('heroSeal');if(!c)return;
  const x=c.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,300,300);drawSeal(x,150,150,118,'aurora.ai');}
window.addEventListener('load',function(){drawHeroSeal();buildTierStrip();tickCountdown();});
const _setLangCap=setLang;
setLang=function(l){_setLangCap(l);buildTierStrip();};

/* ---------- CSP: event bindings (inline onclick removed) ---------- */
(function(){
  var b=function(id,fn){var e=document.getElementById(id); if(e) e.addEventListener('click',fn);};
  b('btn-zh',function(){setLang('zh');});
  b('btn-en',function(){setLang('en');});
  b('btnConnect',function(){connectWallet();});
  b('kind0',function(){setKind(0);});
  b('kind1',function(){setKind(1);});
  b('btnSeal',function(){doSeal();});
  b('btnCert',function(){drawMyCert();});
  b('btnDownload',function(){downloadCert();});
  b('btnReveal',function(){doReveal();});
})();
