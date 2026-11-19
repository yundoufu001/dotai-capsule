
/* ---------- certificate poster seal (round seal, C laurel, four material tiers) ---------- */
function leaf(x,px,py,ang,len,wid){x.save();x.translate(px,py);x.rotate(ang);
  x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(wid,-len*.5,0,-len);x.quadraticCurveTo(-wid,-len*.5,0,0);x.stroke();x.restore();}
function laurel(x,cx,cy,Rr,style,lw){x.lineWidth=lw;
  [-1,1].forEach(function(s){x.strokeStyle=style;x.globalAlpha=.38;x.beginPath();
    for(var a=0;a<=1.001;a+=.04){var th=1.85*a;var px=cx+s*Rr*Math.sin(th),py=cy+Rr*Math.cos(th);a===0?x.moveTo(px,py):x.lineTo(px,py);}
    x.stroke();x.globalAlpha=.62;
    for(var t=.10;t<.99;t+=.115){var th2=1.85*t;var bx=cx+s*Rr*Math.sin(th2),by=cy+Rr*Math.cos(th2);
      var tang=Math.atan2(-Math.sin(th2),s*Math.cos(th2));leaf(x,bx,by,tang-s*0.62+Math.PI/2,(18-7*t)*(Rr/85),4.6*(Rr/85));}});
  x.globalAlpha=.9;x.fillStyle=style;x.beginPath();x.arc(cx,cy+Rr*0.68,Rr*0.038,0,7);x.fill();x.globalAlpha=1;}
function drawLetter(x,cx,cy,R,letter,fill,stroke){x.save();x.font='700 '+(R*0.88)+'px Georgia,"Times New Roman",serif';
  x.textAlign='center';x.textBaseline='middle';
  if(stroke){x.lineWidth=2.4;x.strokeStyle=stroke;x.strokeText(letter,cx,cy+2);}
  x.fillStyle=fill;x.fillText(letter,cx,cy+2);x.restore();}
function drawSeal(x,cx,cy,R,name){
  const ti=tierOf(name),letter=name.charAt(0).toUpperCase();
  function disc(Ri){x.beginPath();x.arc(cx,cy,Ri,0,7);x.fillStyle='#0c1016';x.fill();}
  function gradRing(r,w,stops){var g=x.createConicGradient(-Math.PI/2,cx,cy);stops.forEach(function(s){g.addColorStop(s[0],s[1])});x.lineWidth=w;x.strokeStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke();}
  if(ti.kind==='common'){const c=ti.color;
    disc(R);x.lineWidth=R*0.055;x.strokeStyle=c;x.beginPath();x.arc(cx,cy,R-R*0.028,0,7);x.stroke();
    x.lineWidth=1;x.strokeStyle='rgba(255,255,255,.10)';x.beginPath();x.arc(cx,cy,R-R*0.075,0,7);x.stroke();
    laurel(x,cx,cy,R*0.80,c,1.3);drawLetter(x,cx,cy,R,letter,c,null);}
  else if(ti.kind==='rare'){const g=ti.g,mid=g[1];
    x.save();x.globalAlpha=0.12;x.lineWidth=R*0.22;x.strokeStyle=mid;x.beginPath();x.arc(cx,cy,R-R*0.05,0,7);x.stroke();x.restore();
    disc(R);gradRing(R-R*0.04,R*0.075,[[0,g[0]],[.5,g[1]],[1,g[0]]]);
    x.lineWidth=R*0.075;x.strokeStyle='rgba(255,255,255,.28)';x.beginPath();x.arc(cx,cy,R-R*0.04,-2.5,-1.5);x.stroke();
    x.lineWidth=1;x.strokeStyle='rgba(255,255,255,.12)';x.beginPath();x.arc(cx,cy,R-R*0.095,0,7);x.stroke();
    laurel(x,cx,cy,R*0.80,mid,1.3);
    var lg=x.createLinearGradient(cx-R,cy-R,cx+R,cy+R);lg.addColorStop(0,g[0]);lg.addColorStop(1,g[1]);
    drawLetter(x,cx,cy,R,letter,lg,null);}
  else if(ti.kind==='epic'){const g=ti.g;
    x.save();x.globalAlpha=0.22;x.lineWidth=R*0.26;x.strokeStyle=g[1];x.beginPath();x.arc(cx,cy,R-R*0.055,0,7);x.stroke();x.restore();
    disc(R);gradRing(R-R*0.05,R*0.095,[[0,g[0]],[.33,g[1]],[.66,g[2]],[1,g[0]]]);
    var Ri=R-R*0.11;x.save();x.beginPath();x.arc(cx,cy,Ri,0,7);x.clip();x.translate(cx,cy);x.rotate(-0.5);
    var sw=x.createLinearGradient(-R,0,R,0);sw.addColorStop(0,'rgba(255,255,255,0)');sw.addColorStop(.42,'rgba(255,255,255,0)');
    sw.addColorStop(.52,'rgba(255,255,255,0.13)');sw.addColorStop(.62,'rgba(255,255,255,0)');sw.addColorStop(1,'rgba(255,255,255,0)');
    x.fillStyle=sw;x.fillRect(-R*1.6,-R*1.6,R*3.2,R*3.2);x.restore();
    x.lineWidth=1;x.strokeStyle='rgba(255,255,255,.14)';x.beginPath();x.arc(cx,cy,Ri,0,7);x.stroke();
    laurel(x,cx,cy,R*0.80,g[1],1.3);drawLetter(x,cx,cy,R,letter,'#f3d27a',null);}
  else{ /* LEGENDARY — M2+ holographic foil */
    var cols=['#ff8a80','#ffb25e','#ffe066','#7df0a8','#6ff2e4','#6fb7ff','#dba8ff','#ff8a80'];
    var colsV=['#ff7a6e','#ffa84d','#ffdf4d','#5df2a0','#4df0dd','#57adff','#d694ff','#ff7a6e'];
    function conic(pal,off){var g2=x.createConicGradient(-Math.PI/2+(off||0),cx,cy);for(var i=0;i<pal.length;i++)g2.addColorStop(i/(pal.length-1),pal[i]);return g2;}
    var BANDW=R*0.165,bandR=R-BANDW/2-2,bandOut=bandR+BANDW/2;
    var amb=x.createRadialGradient(cx,cy,R*0.6,cx,cy,R*1.9);
    amb.addColorStop(0,'rgba(150,140,255,0.10)');amb.addColorStop(.55,'rgba(120,200,255,0.05)');amb.addColorStop(1,'rgba(120,200,255,0)');
    x.fillStyle=amb;x.fillRect(cx-R*2,cy-R*2,R*4,R*4);
    x.save();x.globalAlpha=0.15;x.lineWidth=BANDW*2.4;x.strokeStyle=conic(cols,0);x.beginPath();x.arc(cx,cy,bandR,0,7);x.stroke();x.restore();
    x.save();x.globalAlpha=0.30;x.lineWidth=BANDW*1.6;x.strokeStyle=conic(cols,0);x.beginPath();x.arc(cx,cy,bandR,0,7);x.stroke();x.restore();
    x.lineWidth=BANDW;x.strokeStyle=conic(colsV,0);x.beginPath();x.arc(cx,cy,bandR,0,7);x.stroke();
    x.save();x.globalCompositeOperation='overlay';
    x.lineWidth=1.4;x.strokeStyle='rgba(255,255,255,0.55)';x.beginPath();x.arc(cx,cy,bandOut-3.6,0,7);x.stroke();
    x.lineWidth=1.8;x.strokeStyle='rgba(0,0,0,0.30)';x.beginPath();x.arc(cx,cy,bandOut-BANDW*0.5,0,7);x.stroke();
    x.lineWidth=1.4;x.strokeStyle='rgba(255,255,255,0.45)';x.beginPath();x.arc(cx,cy,bandOut-BANDW+3.4,0,7);x.stroke();x.restore();
    x.lineWidth=1.4;x.strokeStyle='rgba(231,187,65,0.55)';x.beginPath();x.arc(cx,cy,bandOut+2.5,0,7);x.stroke();
    var Ri2=bandR-BANDW/2-1;disc(Ri2);
    x.save();x.beginPath();x.arc(cx,cy,Ri2,0,7);x.clip();
    x.globalAlpha=0.15;x.fillStyle=conic(cols,0.7);x.fillRect(cx-Ri2,cy-Ri2,Ri2*2,Ri2*2);x.globalAlpha=1;
    x.save();x.translate(cx,cy);x.rotate(-0.42);x.globalCompositeOperation='overlay';
    var dw=x.createLinearGradient(-Ri2,0,Ri2,0);
    dw.addColorStop(0,'rgba(255,59,48,0.20)');dw.addColorStop(.3,'rgba(255,214,10,0.20)');dw.addColorStop(.55,'rgba(46,230,107,0.20)');
    dw.addColorStop(.8,'rgba(10,132,255,0.20)');dw.addColorStop(1,'rgba(191,90,242,0.20)');
    x.fillStyle=dw;x.fillRect(-Ri2*1.6,-Ri2*1.6,Ri2*3.2,Ri2*3.2);x.restore();
    var mh=x.createRadialGradient(cx-Ri2*0.48,cy-Ri2*0.48,4,cx-Ri2*0.48,cy-Ri2*0.48,Ri2*1.15);
    mh.addColorStop(0,'rgba(255,244,220,0.34)');mh.addColorStop(0.5,'rgba(255,244,220,0.10)');mh.addColorStop(1,'rgba(255,244,220,0)');
    x.fillStyle=mh;x.fillRect(cx-Ri2,cy-Ri2,Ri2*2,Ri2*2);
    var ch3=x.createRadialGradient(cx+Ri2*0.52,cy+Ri2*0.52,4,cx+Ri2*0.52,cy+Ri2*0.52,Ri2*1.05);
    ch3.addColorStop(0,'rgba(140,190,255,0.20)');ch3.addColorStop(1,'rgba(140,190,255,0)');
    x.fillStyle=ch3;x.fillRect(cx-Ri2,cy-Ri2,Ri2*2,Ri2*2);x.restore();
    x.save();x.beginPath();x.arc(cx,cy,R-1,0,7);x.clip();x.translate(cx,cy);x.rotate(-0.42);
    var sw2=x.createLinearGradient(-R,0,R,0);
    sw2.addColorStop(0,'rgba(255,255,255,0)');sw2.addColorStop(.26,'rgba(255,255,255,0)');sw2.addColorStop(.38,'rgba(255,255,255,0.26)');
    sw2.addColorStop(.47,'rgba(255,255,255,0.06)');sw2.addColorStop(.53,'rgba(255,255,255,0.06)');sw2.addColorStop(.62,'rgba(255,255,255,0.20)');
    sw2.addColorStop(.74,'rgba(255,255,255,0)');sw2.addColorStop(1,'rgba(255,255,255,0)');
    x.fillStyle=sw2;x.fillRect(-R*1.6,-R*1.6,R*3.2,R*3.2);x.restore();
    x.lineWidth=1.2;x.strokeStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(cx,cy,Ri2-1,0,7);x.stroke();
    laurel(x,cx,cy,Ri2*0.84,'#ffffff',1.3);drawLetter(x,cx,cy,R,letter,'#ffffff','rgba(6,8,12,.8)');}
}
/* ---------- capsule certificate (1200x630, NO plaintext — hash fingerprint only) ---------- */
function fmtDate(ts){const dt=new Date(ts*1000);return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');}
function hashShort(h){if(!h)return'';return '0x'+h.slice(2,8)+'…'+h.slice(-4);}
function drawCert(){
  const c=document.getElementById('poster');if(!c||!MY.name||!MY.seq)return;
  const x=c.getContext('2d'),l=LANG;
  x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';x.textAlign='left';x.textBaseline='alphabetic';
  const g=x.createLinearGradient(0,0,1200,630);g.addColorStop(0,'#0d1117');g.addColorStop(1,'#131a26');
  x.fillStyle=g;x.fillRect(0,0,1200,630);
  x.save();x.translate(600,315);x.rotate(-0.42);x.translate(-600,-315);
  const sh=x.createLinearGradient(0,-100,0,730);
  sh.addColorStop(0,'rgba(255,255,255,0)');sh.addColorStop(.46,'rgba(255,255,255,.045)');
  sh.addColorStop(.54,'rgba(255,255,255,.045)');sh.addColorStop(1,'rgba(255,255,255,0)');
  x.fillStyle=sh;x.fillRect(-300,-200,1800,1030);x.restore();
  x.fillStyle='rgba(231,187,65,.05)';x.font='800 150px "Segoe UI",sans-serif';x.fillText('.ai',998,668);
  const bg2=x.createLinearGradient(0,0,1200,630);
  bg2.addColorStop(0,'#f3d27a');bg2.addColorStop(.5,'#e7bb41');bg2.addColorStop(1,'#8a6d24');
  x.strokeStyle=bg2;x.lineWidth=2.5;x.strokeRect(26,26,1148,578);
  x.strokeStyle='rgba(231,187,65,.25)';x.lineWidth=1;x.strokeRect(38,38,1124,554);
  x.fillStyle='#e7bb41';x.font='600 25px "Segoe UI",sans-serif';x.fillText('D O T A I   C A P S U L E',72,104);
  x.fillStyle='#98a2b3';x.font='22px "Segoe UI","Microsoft YaHei",sans-serif';
  x.fillText(l==='zh'?'.ai 时光胶囊 · 给 2027 留一句话':'.ai Time Capsule · A message to 2027',72,142);
  let fs=118;x.font='800 '+fs+'px "Segoe UI",sans-serif';
  while(x.measureText(MY.name).width>800&&fs>40){fs-=6;x.font='800 '+fs+'px "Segoe UI",sans-serif';}
  x.fillStyle='#edeef2';x.fillText(MY.name,72,300);
  x.fillStyle='#e7bb41';x.font='700 40px "Segoe UI","Microsoft YaHei",sans-serif';
  const kindTxt=l==='zh'?(MY.kind===0?'给 2027 的信':'对 Agent 生态的预言'):(MY.kind===0?'LETTER TO 2027':'PREDICTION FOR THE AGENT ECOSYSTEM');
  x.fillText('#'+String(MY.seq).padStart(3,'0')+' · '+kindTxt,72,388);
  x.fillStyle='#edeef2';x.font=(l==='zh'?'29px "Segoe UI","Microsoft YaHei",sans-serif':'26px "Segoe UI",sans-serif');
  x.fillText(l==='zh'?'内容已封存 · 开封前无人能读':'Content sealed · unreadable until opening day',72,448);
  x.fillStyle='#98a2b3';x.font='23px "Segoe UI",sans-serif';
  x.fillText((l==='zh'?'内容指纹 ':'Fingerprint ')+hashShort(MY.hash),72,492);
  x.fillText((l==='zh'?'封存 ':'Sealed ')+fmtDate(MY.sealedAt)+' · '+(l==='zh'?'2027-01-01 跨年夜开封':'Opens New Year’s Eve · 2027-01-01')+' · BNB Chain',72,548);
  drawSeal(x,1000,322,102,MY.name);
}
function drawMyCert(){if(!MY.seq){setStatus(T().st_connect);return;}drawCert();}
function downloadCert(){if(!MY.seq){setStatus(T().st_connect);return;}drawCert();
  const a=document.createElement('a');a.download='dotai-capsule-'+String(MY.seq).padStart(3,'0')+'-'+MY.name+'-'+LANG+'.png';
  a.href=document.getElementById('poster').toDataURL('image/png');a.click();}

/* ---------- chain layer ---------- */
let READ=null, SIGNER=null, CAP_R=null, CAP_W=null, AGENT_R=null;
let MY={address:null,name:null,seq:0,kind:0,hash:'',sealedAt:0,revealed:false,text:''};
let CAPSULES=[], OPEN_TS=OPEN_TIME_MAINNET, MYKIND=0, CAP_LOAD_ERR=false;
let _readProv=null;function readProvider(){if(_readProv)return _readProv;const urls=[CFG.rpc,...BSC_RPCS.filter(u=>u!==CFG.rpc)];_readProv=new ethers.FallbackProvider(urls.map((u,i)=>({provider:new ethers.JsonRpcProvider(u),priority:i+1,stallTimeout:600,weight:1})),56,{quorum:1});return _readProv;}
function initRead(){
  READ=readProvider();
  AGENT_R=new ethers.Contract(CFG.agent,OFFICIAL_ABI,READ);
  if(DEPLOYED)CAP_R=new ethers.Contract(CFG.cap,CAP_ABI,READ);
}
async function resolveName(addr){
  const bal=await AGENT_R.balanceOf(addr);
  if(bal===0n)return{ok:false,reason:'no_id'};
  const label=await AGENT_R.handleOf(addr);
  if(!label)return{ok:false,reason:'no_id'};
  const o1=await AGENT_R.ownerOfHandle(label);
  const tid=ethers.keccak256(ethers.toUtf8Bytes(label));
  const o2=await AGENT_R.ownerOf(tid);
  if(o1.toLowerCase()!==addr.toLowerCase()||o2.toLowerCase()!==addr.toLowerCase())
    return{ok:false,reason:'bad_verify',label:label};
  return{ok:true,label:label,name:label+'.ai'};
}
function contentHashFor(addr,text){
  /* Address-bound content hash: keccak256(abi.encodePacked(address, text bytes)).
     The plaintext never leaves the browser; only this hash goes on-chain. */
  return ethers.solidityPackedKeccak256(['address','bytes'],[addr,ethers.toUtf8Bytes(text)]);
}
async function loadCapsules(){
  CAPSULES=[];
  if(!DEPLOYED){renderCapsules();tickCountdown();return;}
  try{
    OPEN_TS=Number(await CAP_R.openTime());
    const n=Number(await CAP_R.capsuleCount());
    if(n>0){
      const L=await CAP_R.capsulesList(0,n);
      for(let i=0;i<n;i+=8){
        const batch=Array.from({length:Math.min(8,n-i)},(_,j)=>i+j);
        const names=await Promise.all(batch.map(k=>resolveName(L[0][k]).then(r=>r.ok?r.name:null).catch(()=>null)));
        batch.forEach((k,j)=>{const nm=names[j];
          CAPSULES.push({user:L[0][k],kind:Number(L[1][k]),hash:L[2][k],at:Number(L[3][k]),revealed:L[4][k],text:L[5][k],
            name:nm||(L[0][k].slice(0,6)+'…'+L[0][k].slice(-4)),unresolved:!nm});});
      }
    }
  }catch(e){CAP_LOAD_ERR=true;console.warn('loadCapsules',e);}
  if(!CAP_LOAD_ERR)document.getElementById('statCap').textContent=CAPSULES.length+' / 30+';
  renderCapsules();tickCountdown();
}
function renderCapsules(){
  const grid=document.getElementById('capGrid');if(!grid)return;
  grid.innerHTML='';
  CAPSULES.forEach((e,i)=>{
    const card=document.createElement('div');card.className='card';
    const seq=document.createElement('div');seq.className='seq';seq.textContent='#'+String(i+1).padStart(3,'0');card.appendChild(seq);
    const seal=document.createElement('div');const ti=paintSealEl(seal,e.name);card.appendChild(seal);
    const nm=document.createElement('div');nm.className='name';
    const dot=e.name.lastIndexOf('.ai');
    if(dot>0&&!e.unresolved){nm.textContent=e.name.slice(0,dot);const ai=document.createElement('span');ai.className='ai';ai.textContent='.ai';nm.appendChild(ai);}
    else nm.textContent=e.name;
    card.appendChild(nm);
    const kt=document.createElement('span');kt.className='tag kind';kt.textContent=(e.kind===0?T().kind0:T().kind1);card.appendChild(kt);
    const st=document.createElement('div');st.className='msg';st.style.marginTop='10px';
    st.textContent=e.revealed?e.text:('🔒 '+T().cap_sealed+' · '+fmtDate(e.at));
    card.appendChild(st);
    if(e.unresolved){const ut=document.createElement('span');ut.className='tag';ut.textContent=T().tag_unresolved;card.appendChild(ut);}
    if(ti.kind==='legend'){const t=document.createElement('span');t.className='legend-tag';t.textContent=T().legendary;card.appendChild(t);}
    else if(ti.kind==='epic'||ti.kind==='rare'){const t=document.createElement('span');t.className='tag';t.textContent=(ti.kind==='epic'?T().epic:T().rare);card.appendChild(t);}
    grid.appendChild(card);});
  if(CAPSULES.length<8){
    for(let i=CAPSULES.length;i<8;i++){
      const card=document.createElement('div');card.className='card slot';
      const seq=document.createElement('div');seq.className='seq';seq.textContent='#'+String(i+1).padStart(3,'0');card.appendChild(seq);
      const ring=document.createElement('div');ring.className='slotring';card.appendChild(ring);
      const nm=document.createElement('div');nm.className='slotname';nm.textContent=T().slot_name;card.appendChild(nm);
      const m=document.createElement('div');m.className='msg';m.style.marginTop='8px';m.textContent=T().slot_msg;card.appendChild(m);
      grid.appendChild(card);}
  }
  document.getElementById('capEmpty').textContent=
    CAPSULES.length?'':(CAP_LOAD_ERR?T().cap_loaderr:(DEPLOYED?T().cap_empty:T().cap_notdeployed));
}
function renderMyPanel(){
  const form=document.getElementById('sealForm'),mine=document.getElementById('myCapsule');
  if(!form||!mine)return;
  if(MY.seq>0){
    form.style.display='none';mine.style.display='';
    document.getElementById('myCapInfo').textContent=T().cap_info(String(MY.seq).padStart(3,'0'),MY.kind)+' · '+fmtDate(MY.sealedAt);
    document.getElementById('myCapHash').textContent=T().cap_hash(hashShort(MY.hash));
    const opened=Date.now()/1000>=OPEN_TS;
    const rb=document.getElementById('revealBox');
    if(MY.revealed){rb.style.display='none';document.getElementById('myCapNote').textContent=T().cap_revealed(MY.text);}
    else if(opened){rb.style.display='';document.getElementById('myCapNote').textContent=T().cap_can_reveal;}
    else{rb.style.display='none';document.getElementById('myCapNote').textContent=T().cap_wait;}
  }else{
    form.style.display='';mine.style.display='none';
  }
}
function setKind(k){MYKIND=k;
  document.getElementById('kind0').classList.toggle('on',k===0);
  document.getElementById('kind1').classList.toggle('on',k===1);}
function tickCountdown(){
  const el=document.getElementById('statCount');if(!el)return;
  const now=Math.floor(Date.now()/1000),diff=OPEN_TS-now;
  if(diff<=0){el.textContent=T().cd_opened;const bc0=document.getElementById('bannerCount');if(bc0)bc0.textContent=el.textContent;return;}
  const d=Math.floor(diff/86400),h=Math.floor(diff%86400/3600),m=Math.floor(diff%3600/60),s=diff%60;
  el.textContent=T().cd_days(d,String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'));
  const bc=document.getElementById('bannerCount');if(bc)bc.textContent=el.textContent;
}
setInterval(tickCountdown,1000);
async function refreshMine(){
  if(!DEPLOYED||!MY.address)return;
  const seq=Number(await CAP_R.capsuleIndexOf(MY.address));
  if(seq>0){
    const c=await CAP_R.capsuleOf(MY.address);
    MY.seq=seq;MY.kind=Number(c[0]);MY.hash=c[1];MY.sealedAt=Number(c[2]);MY.revealed=c[3];MY.text=c[4];
    document.getElementById('btnSeal').disabled=true;
  }
  renderMyPanel();
  if(MY.seq>0)drawCert();
}
async function connectWallet(){
  try{
    setStatus(T().st_connecting);
    if(PREVIEW&&CFG.pk){SIGNER=new ethers.Wallet(CFG.pk,READ);}
    else if(window.ethereum){
      const bp=new ethers.BrowserProvider(window.ethereum);
      const net=await bp.getNetwork();
      if(Number(net.chainId)!==CFG.chainId){
        setStatus(T().st_wrong_chain);
        try{setStatus(T().st_switching);
          await window.ethereum.request({method:'wallet_switchEthereumChain',params:[{chainId:'0x'+CFG.chainId.toString(16)}]});
        }catch(sw){setStatus(T().st_wrong_chain);return;}
      }
      await window.ethereum.request({method:'eth_requestAccounts'});
      SIGNER=await bp.getSigner();
    }
    else{setStatus(T().st_no_wallet);return;}
    MY.address=await SIGNER.getAddress();
    document.getElementById('myName').textContent=MY.address.slice(0,6)+'…'+MY.address.slice(-4);
    if(DEPLOYED)CAP_W=new ethers.Contract(CFG.cap,CAP_ABI,SIGNER);
    setStatus(T().st_resolving);
    const r=await resolveName(MY.address);
    if(!r.ok){setStatusFn(()=>r.reason==='bad_verify'?T().st_bad_verify:T().st_no_id);
      document.getElementById('myState').textContent='';return;}
    MY.name=r.name;
    document.getElementById('myName').textContent=r.name;
    await refreshMine();
    if(MY.seq>0)setStatusFn(()=>T().st_sealed(String(MY.seq).padStart(3,'0')));
    else setStatusFn(()=>T().st_holder(r.name));
  }catch(e){setStatus(humanErr(e,'read'));}
}
async function doSeal(){
  if(!DEPLOYED){setStatus(T().st_notdeployed_op);return;}
  if(!SIGNER||!MY.name){setStatus(T().st_connect);return;}
  if(MY.seq>0){setStatus(T().st_dup_seal);return;}
  const text=document.getElementById('msgInput').value.trim();
  if(!text){setStatus(T().st_msg_empty);return;}
  const nBytes=new TextEncoder().encode(text).length;
  if(nBytes>280){setStatus(T().st_msg_long(nBytes));return;}
  try{setStatus(T().st_sealing);
    const h=contentHashFor(MY.address,text);
    const tx=await CAP_W.seal(MYKIND,h);await tx.wait();
    await refreshMine();await loadCapsules();
    setStatusFn(()=>T().st_done);
    if(PREVIEW)document.body.dataset.previewDone='1';
  }catch(e){setStatus(humanErr(e));}
}
async function doReveal(){
  if(!DEPLOYED){setStatus(T().st_notdeployed_op);return;}
  if(!SIGNER||!MY.seq){setStatus(T().st_connect);return;}
  const text=document.getElementById('revealInput').value.trim();
  if(!text){setStatus(T().st_msg_empty);return;}
  const nBytes=new TextEncoder().encode(text).length;
  if(nBytes>280){setStatus(T().st_msg_long(nBytes));return;}
  try{setStatus(T().st_revealing);
    const tx=await CAP_W.reveal(text);await tx.wait();
    await refreshMine();await loadCapsules();
    setStatusFn(()=>T().st_revealed_ok);
  }catch(e){setStatus(humanErr(e));}
}
/* wallet events: chain switch reloads; account switch resets local state and asks for reconnect */
if(window.ethereum&&window.ethereum.on){
  window.ethereum.on('chainChanged',function(){location.reload();});
  window.ethereum.on('accountsChanged',function(){SIGNER=null;CAP_W=null;
    MY={address:null,name:null,seq:0,kind:0,hash:'',sealedAt:0,revealed:false,text:''};
    const nm=document.getElementById('myName');if(nm)nm.textContent='';
    renderMyPanel();setStatus(T().st_acct);});
}
/* init */
try{initRead();}catch(e){setStatus('Ethers library failed to load — check your connection and reload. / ethers 库加载失败，请检查网络后刷新。');}
const _mi=document.getElementById('msgInput'),_mb=document.getElementById('msgBytes');
function _updBytes(){if(!_mi||!_mb)return;const n=new TextEncoder().encode(_mi.value.trim()).length;_mb.textContent=T().msg_bytes(n);_mb.style.color=n>280?'#e06c5c':'';}
if(_mi)_mi.addEventListener('input',_updBytes);
const _ql=QS.get('lang');
setLang(_ql==='en'||_ql==='zh'?_ql:(((navigator.language||'').toLowerCase().startsWith('zh')?'zh':'en')));
loadCapsules().then(async()=>{
  if(PREVIEW&&QS.get('auto')==='1'){
    await connectWallet();
    if(MY.name&&!MY.seq){
      document.getElementById('msgInput').value='愿 2027 年，Agent 们真的走进每个人的日常。——写于 2026，封存给未来。';
      _updBytes();
      await doSeal();
    }
    if(MY.seq)drawCert();
    document.body.dataset.previewDone='1';
  }
});
