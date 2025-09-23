// ===== Router & App =====
const app = document.getElementById("app");
const menu = document.getElementById("topMenu");
menu.addEventListener("click", (e)=>{
  const a = e.target.closest('[data-go]');
  if(!a) return; e.preventDefault(); location.hash = a.dataset.go;
});
window.addEventListener("hashchange", render);
window.addEventListener('load', () => {
  if (!location.hash) location.hash = '#/';
  render();
  bindModalDelegationOnce();   // ★ 여기
});

function setActiveTab(){
  const h = location.hash;
  document.querySelectorAll('.tab').forEach(tab=>{
    const go = tab.getAttribute('data-go');
    tab.classList.toggle('active', h.startsWith(go));
  });
}

function squeezeLines(s = '') {
  return String(s)
    .replace(/\r\n/g, '\n')     // CRLF -> LF
    .replace(/\n{2,}/g, '\n')   // 연속 빈 줄 제거
    .trim();                    // 앞뒤 공백 제거
}

function escapeHtml(str=''){
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// ===== Modal =====
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
modal.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close') || e.target.classList.contains('modal__close')) closeModal();
});

function openModal({ img = '', goal = '', hint = '' } = {}) {
  const modal = document.getElementById('modal');
  const body  = document.getElementById('modalBody');
  const dlg   = modal?.querySelector('.modal__dialog');
  if (!modal || !body || !dlg) return;

  // 1-4, 2-4 가로형 이미지는 더 낮은 max-height를 적용
  const isWideImage = /\/s[12]-4\.png$/i.test(img);
  dlg.classList.toggle('wide-img', isWideImage);

  // ✅ 빈 줄 제거 후 출력
  const goalText = escapeHtml(squeezeLines(goal));
  const hintText = escapeHtml(squeezeLines(hint));

  body.innerHTML = `
    <div class="modal-inner">
      <div class="modal-media">
        ${img ? `<img src="${img}" alt="">` : ``}
      </div>
      <div class="modal-meta">
        ${goal ? `
          <div class="meta-block">
            <span class="label goal"><strong>목표</strong></span>
            <div class="text">${goalText}</div>
          </div>` : ``}
        ${hint ? `
          <div class="meta-block">
            <span class="label hint"><strong>힌트</strong></span>
            <div class="text">${hintText}</div>
          </div>` : ``}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal(){
  const modal = document.getElementById('modal');
  const dlg   = modal?.querySelector('.modal__dialog');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  dlg?.classList.remove('wide-img');
}




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
  if (!s || !s.perMode?.[mode]) return NotFound();

  const { courses = [], pages = {} } = s.perMode[mode];

  const blocks = courses.map((id) => {
    const p = pages[id] || {};
    const desc = (typeof p.subtitle === "string") ? p.subtitle : ""; // ← subtitle 없으면 빈 문자열

    return Card({
      title: `스테이지 ${id}`,
      desc,                                    // ← 기본 문구 없음
      badge: mode,
      img: MEDIA.stageImage[stageNo] || MEDIA.levelFallback,
      click: `#/stage/${stageNo}/${mode}/${id}`
    });
  }).join("");

  return `
    ${Crumbs([
      { label: "홈", href: "#/" },
      { label: "스테이지 " + stageNo, href: `#/stage/${stageNo}` },
      { label: mode }
    ])}
    <h2 style="margin:0 0 14px">스테이지 ${stageNo} · ${mode}</h2>
    <p class="muted" style="margin:0 0 20px">코스를 선택하세요.</p>
    <div class="grid-4">${blocks}</div>
  `;
}




// app.js
function Course(stageNo, mode, courseId){
  const s    = CONTENT.stages[stageNo];
  const page = s?.perMode?.[mode]?.pages?.[courseId];
  if(!page) return NotFound();

  const allLevels = page.levels || [];


  const sNo = Number(stageNo);
  // 1-4 / 2-4 는 카드 하나만, 3-4는 그대로
  const forceSingle = /-4$/.test(courseId) && (sNo === 1 || sNo === 2);
  const showLevels = forceSingle ? (allLevels || []).slice(0,1) : (allLevels || []);

  const cards = showLevels.map(L => `
    <div class="card level">
      <div class="thumb" data-open="#modal"
           data-img="${L.img}"
           data-goal="${escapeHtml(L.goal || '')}"
           data-hint="${escapeHtml(L.hint || '')}">
        <img src="${L.img}" alt="LEVEL ${L.no}">
      </div>
      <div class="meta">
        <div><b>목표</b> · ${escapeHtml(L.goal || '')}</div>
        <div><b>힌트</b> · ${escapeHtml(L.hint || '')}</div>
      </div>
    </div>
  `).join('');

  return `
    ${Crumbs([
      { label: '홈',               href: '#/' },
      { label: `스테이지 ${stageNo}`, href: `#/stage/${stageNo}` },
      { label: mode },
      { label: `스테이지 ${courseId}` }
    ])}
    <h2 style="margin:0 0 14px">스테이지 ${courseId} · ${mode}</h2>
    <p class="muted" style="margin:0 0 20px">
      각 레벨 이미지를 클릭하면 팝업으로 크게 보이며, 목표·힌트 텍스트도 함께 표시됩니다.
    </p>
    <div class="grid-3">${cards}</div>
  `;
}



function NotFound(){ return `<div style="padding:40px 0;text-align:center"><h2>내용을 준비 중입니다</h2><p class="muted">데이터를 추가해 주세요.</p><p><a class="btn" href="#/">홈으로</a></p></div>`; }
function Card({title, desc = "", badge, img, click}){
  return `
    <a class="card course" href="${click}">
      <div class="thumb"><img src="${img}" alt=""><span class="badge">${badge||""}</span></div>
      <div class="body">
        <div class="title">${title}</div>
        ${desc ? `<div class="muted">${escapeHtml(desc)}</div>` : ``}  <!-- ← 비어있으면 출력 안 함 -->
      </div>
    </a>`;
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
function render() {
  setActiveTab();
  const seg = location.hash.replace('#','').split('/').filter(Boolean);
  let view = Home();
  if (seg[0] === 'stage' && seg[1]) {
    const stage = seg[1];
    if (!seg[2]) view = Stage(stage);
    else if (seg[2] && !seg[3]) view = Mode(stage, seg[2]);
    else if (seg[2] && seg[3]) view = Course(stage, seg[2], seg[3]);
  }
  app.innerHTML = view;

  // ✅ 레벨 카드 클릭 → 새 openModal({ img, goal, hint }) 사용
  const levelsWrap = document.getElementById('levelsWrap');
    if (levelsWrap){
      levelsWrap.addEventListener('click', (e)=>{
        const th = e.target.closest('.thumb');
        if(!th) return;

        const card = th.closest('.level');
        const img = card.dataset.img || th.querySelector('img')?.src || MEDIA.levelFallback;

        // 빈 줄(연속 개행) 제거 + CRLF 정리
        const squash = s => (s||'').replace(/\r\n/g,'\n').replace(/\n{2,}/g,'\n');

        const goal = squash(decodeURIComponent(card.dataset.goal || ''));
        const hint = squash(decodeURIComponent(card.dataset.hint || ''));

        openModal(`
          <div class="modal-inner">
            <div class="modal-media">
              <img src="${img}" alt="레벨 이미지">
            </div>
            <div class="modal-meta">
              <div>
                <span class="label goal">목표</span>
                <div class="text">${escapeHtml(goal)}</div>
              </div>
              <div>
                <span class="label hint">힌트</span>
                <div class="text">${escapeHtml(hint)}</div>
              </div>
            </div>
          </div>
        `);

        // 이미지 비율에 따라 wide-img 토글 (가로로 긴 1-4, 2-4 등)
        requestAnimationFrame(()=>{
          const dialog = document.querySelector('.modal__dialog');
          const imgEl   = dialog?.querySelector('.modal-media img');
          if(!dialog || !imgEl) return;

          const apply = () => {
            const r = imgEl.naturalWidth / imgEl.naturalHeight;
            dialog.classList.toggle('wide-img', r >= 1.45); // 임계값은 필요시 미세조정
          };
          imgEl.complete ? apply() : imgEl.addEventListener('load', apply, {once:true});
        });
      });
    }
}



// 렌더가 바뀌어도 항상 동작하도록 문서 루트에서 위임
function bindModalDelegationOnce() {
  if (window.__modalBound) return;        // 중복 바인딩 방지
  window.__modalBound = true;

  document.addEventListener('click', (e) => {
    // 열기 트리거: data-open="#modal" 이 달린 어떤 요소든 OK
    const trigger = e.target.closest('[data-open="#modal"]');
    if (trigger) {
      const img  = trigger.getAttribute('data-img')  || trigger.querySelector('img')?.src || '';
      const goal = trigger.getAttribute('data-goal') || '';
      const hint = trigger.getAttribute('data-hint') || '';
      openModal({ img, goal, hint });
      e.preventDefault();
      return;
    }

    // 닫기(배경/버튼)
    if (e.target.matches('[data-close]') || e.target.closest('[data-close]')) {
      closeModal();
    }
  });

  // ESC로 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
