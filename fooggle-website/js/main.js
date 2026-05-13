/* ═══════════════════════════
   FOOGGLE — Shared JS
   ═══════════════════════════ */

/* ── DARK/LIGHT TOGGLE ── */
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('fooggle-theme') || 'dark';
if(saved === 'light'){ body.classList.add('light'); if(themeToggle) themeToggle.textContent='☀️'; }

if(themeToggle){
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('fooggle-theme', isLight ? 'light' : 'dark');
  });
}

/* ── CURSOR ── */
const cur = document.getElementById('cur');
const ring = document.getElementById('curRing');
if(cur && ring){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx-5+'px'; cur.style.top=my-5+'px';
  });
  (function ar(){
    rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
    ring.style.left=rx-19+'px'; ring.style.top=ry-19+'px';
    requestAnimationFrame(ar);
  })();
  document.querySelectorAll('a,button,.sv-card,.ft-card,.ts-card,.mv-block,.on,.pill,.pr-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.style.transform='scale(2.2)'; ring.style.transform='scale(1.6)'; });
    el.addEventListener('mouseleave',()=>{ cur.style.transform='scale(1)'; ring.style.transform='scale(1)'; });
  });
}

/* ── SCROLL ── */
const nav = document.getElementById('nav');
const sp = document.getElementById('sp');
window.addEventListener('scroll', () => {
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  if(sp){
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    sp.style.width = pct + '%';
  }
});

/* ── REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 65);
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── MOBILE NAV ── */
function openMNav(){ document.getElementById('mNav').classList.add('open'); document.body.style.overflow='hidden'; }
function closeMNav(){ document.getElementById('mNav').classList.remove('open'); document.body.style.overflow=''; }

/* ── TERMINAL TYPING ── */
const termLines = [
  {id:'tl0', text:'> fooggle.agent.run()', cls:''},
  {id:'tl1', text:'Scanning workflows...', cls:'m'},
  {id:'tl2', text:'✓ 12 tasks queued',    cls:'p'},
  {id:'tl3', text:'✓ All systems live',   cls:''}
];
let li = 0;
function typeNext(){
  if(li >= termLines.length){
    setTimeout(()=>{ termLines.forEach(t=>{ const el=document.getElementById(t.id); if(el) el.textContent=''; }); li=0; typeNext(); }, 3000);
    return;
  }
  const {id,text,cls} = termLines[li];
  const el = document.getElementById(id);
  if(!el){ li++; typeNext(); return; }
  el.className = 'tl '+(cls||''); el.textContent=''; let ci=0;
  const t = setInterval(()=>{
    el.textContent += text[ci++];
    if(ci >= text.length){ clearInterval(t); li++; setTimeout(typeNext, 400); }
  }, 44);
}
if(document.getElementById('tl0')) setTimeout(typeNext, 1000);

/* ── PRICING CURRENCY TOGGLE ── */
function initPricingToggle(){
  const btns = document.querySelectorAll('.ctog-btn');
  const bdtEls = document.querySelectorAll('[data-bdt]');
  const usdEls = document.querySelectorAll('[data-usd]');
  if(!btns.length) return;
  let cur = 'bdt';

  function show(c){
    cur = c;
    bdtEls.forEach(el => el.style.display = c==='bdt' ? '' : 'none');
    usdEls.forEach(el => el.style.display = c==='usd' ? '' : 'none');
    btns.forEach(b => b.classList.toggle('active', b.dataset.cur === c));
  }

  btns.forEach(b => b.addEventListener('click', () => show(b.dataset.cur)));
  show('bdt');
}
initPricingToggle();
