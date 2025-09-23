// ===== Router & App =====
const app = document.getElementById("app");
const menu = document.getElementById("topMenu");
menu.addEventListener("click", (e)=>{
  const a = e.target.closest('[data-go]');
  if(!a) return; e.preventDefault(); location.hash = a.dataset.go;
});
window.addEventListener("hashchange", render);
window.addEventListener("load", ()=>{ if(!location.hash) location.hash = "#/"; render();});

function setActiveTab(){
  const h = location.hash;
  document.querySelectorAll('.tab').forEach(tab=>{
    const go = tab.getAttribute('data-go');
    tab.classList.toggle('active', h.startsWith(go));
  });
}
function escapeHtml(s){ return (s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// ===== Modal =====
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
modal.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close') || e.target.classList.contains('modal__close')) closeModal();
});
function openModal(html){ modalBody.innerHTML = html; modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
function closeModal(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); modalBody.innerHTML=''; document.body.classList.remove('modal-open'); }
window.addEventListener('keydown', e=>{ if(e.key==='Escape' && !modal.classList.contains('hidden')) closeModal(); });

// ===== Views =====
function Home(){
  return `
  <section class="hero">
    <div class="hero-media">
      <video autoplay muted loop playsinline poster="${MEDIA.heroPoster}">
        <source src="${MEDIA.heroVideo}" type="video/mp4" />
      </video>
      <img class="hero-logo" src="${MEDIA.logo}" alt="로고" />
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-body">
      <div class="kicker">LEVEL UP YOUR CODING : CONQUER PYTHON WITH MISSION CODE-YTHON</div>
      <h1>게임 가이드</h1>
      <p class="sub">스테이지·모드·레벨별로 목표와 힌트를 빠르게 찾아보세요.</p>
      <div class="cta">
        <a class="btn primary" href="#/stage/1">스테이지 1 바로가기</a>
        <a class="btn" href="https://www.missioncy.co.kr/" target="_blank" rel="noreferrer">게임 PLAY</a>
      </div>
    </div>
  </section>`;
}

function Stage(stageNo){
  const s = CONTENT.stages[stageNo];
  if(!s) return NotFound();

  const desc = s.desc || "난이도(EASY/NORMAL/HARD)에 관계없이 동일한 스테이지 이미지를 사용합니다."; // 기본 문구(없을 때)

  const banner = `
    <section class="stage-hero">
      <div class="stage-hero__media">
        <img src="${MEDIA.stageImage[stageNo] || MEDIA.levelFallback}" alt="Stage ${stageNo} image">
      </div>
      <div class="stage-hero__body">
        <h2>스테이지 ${stageNo}</h2>
        <p class="muted">${escapeHtml(desc)}</p>
        <div class="pill">EASY</div><div class="pill">NORMAL</div><div class="pill">HARD</div>
      </div>
    </section>`;

  const blocks = s.modes.map(m => CardMode({
    title: m, desc: m==='EASY'?'입문·기초':(m==='NORMAL'?'중급·응용':'고급·챌린지'),
    badge:`STAGE ${stageNo}`, click:`#/stage/${stageNo}/${m}`
  })).join('');

  return `
    ${Crumbs([{label:'홈', href:'#/'}, {label:'스테이지 '+stageNo}])}
    ${banner}
    <h2 style="margin:0 0 14px">스테이지 ${stageNo}</h2>
    <p class="muted" style="margin:0 0 20px">모드를 선택하세요.</p>
    <div class="grid-3">${blocks}</div>
  `;
}

function Mode(stageNo, mode){
  const s = CONTENT.stages[stageNo];
  if(!s || !s.perMode?.[mode]) return NotFound();
  const {courses=[]} = s.perMode[mode];
  const blocks = courses.map(id => Card({
    title: `스테이지 ${id}`,
    desc: id.endsWith('-4') ? '안내 코스(레벨 없음)' : '레벨 1–3',
    badge: mode,
    img: MEDIA.stageImage[stageNo] || MEDIA.levelFallback,
    click: `#/stage/${stageNo}/${mode}/${id}`
  })).join('');
  return `
    ${Crumbs([{label:'홈', href:'#/'}, {label:'스테이지 '+stageNo, href:`#/stage/${stageNo}`}, {label:mode}])}
    <h2 style="margin:0 0 14px">스테이지 ${stageNo} · ${mode}</h2>
    <p class="muted" style="margin:0 0 20px">코스를 선택하세요.</p>
    <div class="grid-4">${blocks}</div>
  `;
}

function Course(stageNo, mode, courseId){
  const block = CONTENT.stages?.[stageNo]?.perMode?.[mode];
  if(!block) return NotFound();
  const page = block.pages?.[courseId];
  if(!page) return NotFound();

  if(page.type === 'info'){
    return `
      ${Crumbs([{label:'홈',href:'#/'},{label:'스테이지 '+stageNo,href:`#/stage/${stageNo}`},{label:mode,href:`#/stage/${stageNo}/${mode}`},{label:page.title}])}
      <h2 style="margin:0 0 14px">${page.title} · ${mode}</h2>
      <div class="card" style="padding:16px">${page.body || '안내 코스입니다.'}</div>
    `;
  }

  const levels = (page.levels||[]).map(L => {
    const goal = encodeURIComponent(L.goal||'');
    const hint = encodeURIComponent(L.hint||'');
    const img = L.img || MEDIA.levelFallback;
    return `
      <article class="card level" data-goal="${goal}" data-hint="${hint}" data-img="${img}">
        <div class="thumb" data-open-level>
          <img src="${img}" alt="LEVEL ${L.no}" />
          <span class="badge">LEVEL ${L.no}</span>
        </div>
        <div class="meta"><div><b>목표</b> · ${escapeHtml(L.goal||'')}</div></div>
        <div class="meta"><div><b>힌트</b> · ${escapeHtml(L.hint||'')}</div></div>
      </article>
    `;
  }).join('');
  return `
    ${Crumbs([{label:'홈',href:'#/'},{label:'스테이지 '+stageNo,href:`#/stage/${stageNo}`},{label:mode,href:`#/stage/${stageNo}/${mode}`},{label:page.title}])}
    <h2 style="margin:0 0 14px">${page.title} · ${mode}</h2>
    <p class="muted" style="margin:0 0 16px">각 레벨 이미지를 클릭하면 팝업으로 크게 보이며, 목표·힌트 텍스트도 함께 표시됩니다.</p>
    <div class="grid-3" id="levelsWrap">${levels}</div>
  `;
}

function NotFound(){ return `<div style="padding:40px 0;text-align:center"><h2>내용을 준비 중입니다</h2><p class="muted">데이터를 추가해 주세요.</p><p><a class="btn" href="#/">홈으로</a></p></div>`; }
function Card({title,desc,badge,img,click}){
  return `<a class="card" href="${click}"><div class="thumb"><img src="${img}" alt=""><span class="badge">${badge||''}</span></div><div class="body"><div class="title">${title}</div><div class="muted">${desc||''}</div></div></a>`;
}
// 교체
function CardMode({ title, desc, badge, click }){
  const ratingMap = { EASY:1, NORMAL:3, HARD:5 };
  const stars = `<div class="stars">${'<i class="star"></i>'.repeat(ratingMap[title]||0)}</div>`;

  return `
    <a class="card mode" href="${click}">
      <span class="badge">${badge || ''}</span>   <!-- ★ 카드의 직속 자식 -->
      <div class="body">
        <div class="title">${title}</div>
        ${stars}
        <div class="muted">${desc || ''}</div>
      </div>
    </a>`;
}


function Crumbs(items){
  const html = items.map((it,i)=>{
    const link = it.href ? `<a href="${it.href}">${it.label}</a>` : `<span>${it.label}</span>`;
    return `${i?'<span class="sep">›</span>':''}${link}`;
  }).join('');
  return `<div class="crumbs">${html}</div>`;
}

// ===== Render & interactions =====
function render(){
  setActiveTab();
  const seg = location.hash.replace('#','').split('/').filter(Boolean);
  let view = Home();
  if(seg[0]==='stage' && seg[1]){
    const stage = seg[1];
    if(!seg[2]) view = Stage(stage);
    else if(seg[2] && !seg[3]) view = Mode(stage, seg[2]);
    else if(seg[2] && seg[3]) view = Course(stage, seg[2], seg[3]);
  }
  app.innerHTML = view;

  const levelsWrap = document.getElementById('levelsWrap');
  if(levelsWrap){
    levelsWrap.addEventListener('click', (e)=>{
      const th = e.target.closest('.thumb');
      if(!th) return;
      const card = th.closest('.level');
      const img = card.dataset.img || th.querySelector('img')?.src || MEDIA.levelFallback;
      const goal = decodeURIComponent(card.dataset.goal || '');
      const hint = decodeURIComponent(card.dataset.hint || '');
      openModal(`
        <div class="modal-content">
          <img src="${img}" alt="레벨 이미지">
          <div class="modal-meta">
            <div><h4>목표</h4><div>${escapeHtml(goal)}</div></div>
            <div><h4>힌트</h4><div>${escapeHtml(hint)}</div></div>
          </div>
        </div>
      `);
    });
  }
}
