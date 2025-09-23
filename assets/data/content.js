// assets/data/content.js
// 스테이지×모드×코스×레벨별 텍스트를 TEXT에 채워 넣으면 됩니다.
// 이미지는 규칙에 따라 자동 경로 생성: assets/img/s{코스ID}_{모드약자}_lv{레벨}.png
//   - 예) 스테이지 1-1, EASY, 레벨 1 -> assets/img/s1-1_e_lv1.png
//   - 모드 약자: EASY=e, NORMAL=n, HARD=h

// ─────────────────────────────────────────────────────────────
// 1) 여기를 채워 넣으세요: 사람 친화적 원본(TEXT)
//    - goal/hint는 빈 문자열("")로 두고 점차 채워도 됩니다.
//    - 1-4, 2-4는 안내 코스(type:"info") 그대로 유지
//    - 3-4는 레벨(1~3) 있음 → 각 모드에 자리 생성
// ─────────────────────────────────────────────────────────────
const TEXT = {
  1: {
    EASY: {
      "1-1": { levels: {
        1: { goal: "목표 지점에 도달하기", hint: "내가 바라보고 있는 방향에서 오른쪽 왼쪽을 구분하세요!" },
        2: { goal: "목표 지점에 도달하기", hint: "인수를 활용해 코드 라인 수를 줄여보세요!" },
        3: { goal: "보급품 3개 획득하기 \n목표지점에 도달하기", hint: "목표를 확인하여 보급품을 획득하면 조금 더 쉽게 통과할 수 있어요!" },
      }},
      "1-2": { levels: {
        1: { goal: "스테이지 1-2 EASY 레벨 1 목표", hint: "스테이지 1-2 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 1-2 EASY 레벨 2 목표", hint: "스테이지 1-2 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 1-2 EASY 레벨 3 목표", hint: "스테이지 1-2 EASY 레벨 3 힌트" },
      }},
      "1-3": { levels: {
        1: { goal: "스테이지 1-3 EASY 레벨 1 목표", hint: "스테이지 1-3 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 1-3 EASY 레벨 2 목표", hint: "스테이지 1-3 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 1-3 EASY 레벨 3 목표", hint: "스테이지 1-3 EASY 레벨 3 힌트" },
      }},
      "1-4": { type: "info", body: "스테이지 1-4 안내(EASY) 내용을 입력하세요." }
    },
    NORMAL: {
      "1-1": { levels: {
        1: { goal: "스테이지 1-1 NORMAL 레벨 1 목표", hint: "스테이지 1-1 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 1-1 NORMAL 레벨 2 목표", hint: "스테이지 1-1 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 1-1 NORMAL 레벨 3 목표", hint: "스테이지 1-1 NORMAL 레벨 3 힌트" },
      }},
      "1-2": { levels: {
        1: { goal: "스테이지 1-2 NORMAL 레벨 1 목표", hint: "스테이지 1-2 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 1-2 NORMAL 레벨 2 목표", hint: "스테이지 1-2 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 1-2 NORMAL 레벨 3 목표", hint: "스테이지 1-2 NORMAL 레벨 3 힌트" },
      }},
      "1-3": { levels: {
        1: { goal: "스테이지 1-3 NORMAL 레벨 1 목표", hint: "스테이지 1-3 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 1-3 NORMAL 레벨 2 목표", hint: "스테이지 1-3 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 1-3 NORMAL 레벨 3 목표", hint: "스테이지 1-3 NORMAL 레벨 3 힌트" },
      }},
      "1-4": { type: "info", body: "스테이지 1-4 안내(NORMAL) 내용을 입력하세요." }
    },
    HARD: {
      "1-1": { levels: {
        1: { goal: "스테이지 1-1 HARD 레벨 1 목표", hint: "스테이지 1-1 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 1-1 HARD 레벨 2 목표", hint: "스테이지 1-1 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 1-1 HARD 레벨 3 목표", hint: "스테이지 1-1 HARD 레벨 3 힌트" },
      }},
      "1-2": { levels: {
        1: { goal: "스테이지 1-2 HARD 레벨 1 목표", hint: "스테이지 1-2 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 1-2 HARD 레벨 2 목표", hint: "스테이지 1-2 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 1-2 HARD 레벨 3 목표", hint: "스테이지 1-2 HARD 레벨 3 힌트" },
      }},
      "1-3": { levels: {
        1: { goal: "스테이지 1-3 HARD 레벨 1 목표", hint: "스테이지 1-3 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 1-3 HARD 레벨 2 목표", hint: "스테이지 1-3 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 1-3 HARD 레벨 3 목표", hint: "스테이지 1-3 HARD 레벨 3 힌트" },
      }},
      "1-4": { type: "info", body: "스테이지 1-4 안내(HARD) 내용을 입력하세요." }
    }
  },

  2: {
    EASY: {
      "2-1": { levels: {
        1: { goal: "스테이지 2-1 EASY 레벨 1 목표", hint: "스테이지 2-1 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 2-1 EASY 레벨 2 목표", hint: "스테이지 2-1 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 2-1 EASY 레벨 3 목표", hint: "스테이지 2-1 EASY 레벨 3 힌트" },
      }},
      "2-2": { levels: {
        1: { goal: "스테이지 2-2 EASY 레벨 1 목표", hint: "스테이지 2-2 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 2-2 EASY 레벨 2 목표", hint: "스테이지 2-2 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 2-2 EASY 레벨 3 목표", hint: "스테이지 2-2 EASY 레벨 3 힌트" },
      }},
      "2-3": { levels: {
        1: { goal: "스테이지 2-3 EASY 레벨 1 목표", hint: "스테이지 2-3 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 2-3 EASY 레벨 2 목표", hint: "스테이지 2-3 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 2-3 EASY 레벨 3 목표", hint: "스테이지 2-3 EASY 레벨 3 힌트" },
      }},
      "2-4": { type: "info", body: "스테이지 2-4 안내(EASY) 내용을 입력하세요." }
    },
    NORMAL: {
      "2-1": { levels: {
        1: { goal: "스테이지 2-1 NORMAL 레벨 1 목표", hint: "스테이지 2-1 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 2-1 NORMAL 레벨 2 목표", hint: "스테이지 2-1 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 2-1 NORMAL 레벨 3 목표", hint: "스테이지 2-1 NORMAL 레벨 3 힌트" },
      }},
      "2-2": { levels: {
        1: { goal: "스테이지 2-2 NORMAL 레벨 1 목표", hint: "스테이지 2-2 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 2-2 NORMAL 레벨 2 목표", hint: "스테이지 2-2 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 2-2 NORMAL 레벨 3 목표", hint: "스테이지 2-2 NORMAL 레벨 3 힌트" },
      }},
      "2-3": { levels: {
        1: { goal: "스테이지 2-3 NORMAL 레벨 1 목표", hint: "스테이지 2-3 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 2-3 NORMAL 레벨 2 목표", hint: "스테이지 2-3 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 2-3 NORMAL 레벨 3 목표", hint: "스테이지 2-3 NORMAL 레벨 3 힌트" },
      }},
      "2-4": { type: "info", body: "스테이지 2-4 안내(NORMAL) 내용을 입력하세요." }
    },
    HARD: {
      "2-1": { levels: {
        1: { goal: "스테이지 2-1 HARD 레벨 1 목표", hint: "스테이지 2-1 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 2-1 HARD 레벨 2 목표", hint: "스테이지 2-1 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 2-1 HARD 레벨 3 목표", hint: "스테이지 2-1 HARD 레벨 3 힌트" },
      }},
      "2-2": { levels: {
        1: { goal: "스테이지 2-2 HARD 레벨 1 목표", hint: "스테이지 2-2 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 2-2 HARD 레벨 2 목표", hint: "스테이지 2-2 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 2-2 HARD 레벨 3 목표", hint: "스테이지 2-2 HARD 레벨 3 힌트" },
      }},
      "2-3": { levels: {
        1: { goal: "스테이지 2-3 HARD 레벨 1 목표", hint: "스테이지 2-3 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 2-3 HARD 레벨 2 목표", hint: "스테이지 2-3 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 2-3 HARD 레벨 3 목표", hint: "스테이지 2-3 HARD 레벨 3 힌트" },
      }},
      "2-4": { type: "info", body: "스테이지 2-4 안내(HARD) 내용을 입력하세요." }
    }
  },

  3: {
    EASY: {
      "3-1": { levels: {
        1: { goal: "스테이지 3-1 EASY 레벨 1 목표", hint: "스테이지 3-1 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 3-1 EASY 레벨 2 목표", hint: "스테이지 3-1 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 3-1 EASY 레벨 3 목표", hint: "스테이지 3-1 EASY 레벨 3 힌트" },
      }},
      "3-2": { levels: {
        1: { goal: "스테이지 3-2 EASY 레벨 1 목표", hint: "스테이지 3-2 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 3-2 EASY 레벨 2 목표", hint: "스테이지 3-2 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 3-2 EASY 레벨 3 목표", hint: "스테이지 3-2 EASY 레벨 3 힌트" },
      }},
      "3-3": { levels: {
        1: { goal: "스테이지 3-3 EASY 레벨 1 목표", hint: "스테이지 3-3 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 3-3 EASY 레벨 2 목표", hint: "스테이지 3-3 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 3-3 EASY 레벨 3 목표", hint: "스테이지 3-3 EASY 레벨 3 힌트" },
      }},
      // 3-4는 레벨이 있음(1~3)
      "3-4": { levels: {
        1: { goal: "스테이지 3-4 EASY 레벨 1 목표", hint: "스테이지 3-4 EASY 레벨 1 힌트" },
        2: { goal: "스테이지 3-4 EASY 레벨 2 목표", hint: "스테이지 3-4 EASY 레벨 2 힌트" },
        3: { goal: "스테이지 3-4 EASY 레벨 3 목표", hint: "스테이지 3-4 EASY 레벨 3 힌트" },
      }},
    },
    NORMAL: {
      "3-1": { levels: {
        1: { goal: "스테이지 3-1 NORMAL 레벨 1 목표", hint: "스테이지 3-1 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 3-1 NORMAL 레벨 2 목표", hint: "스테이지 3-1 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 3-1 NORMAL 레벨 3 목표", hint: "스테이지 3-1 NORMAL 레벨 3 힌트" },
      }},
      "3-2": { levels: {
        1: { goal: "스테이지 3-2 NORMAL 레벨 1 목표", hint: "스테이지 3-2 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 3-2 NORMAL 레벨 2 목표", hint: "스테이지 3-2 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 3-2 NORMAL 레벨 3 목표", hint: "스테이지 3-2 NORMAL 레벨 3 힌트" },
      }},
      "3-3": { levels: {
        1: { goal: "스테이지 3-3 NORMAL 레벨 1 목표", hint: "스테이지 3-3 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 3-3 NORMAL 레벨 2 목표", hint: "스테이지 3-3 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 3-3 NORMAL 레벨 3 목표", hint: "스테이지 3-3 NORMAL 레벨 3 힌트" },
      }},
      "3-4": { levels: {
        1: { goal: "스테이지 3-4 NORMAL 레벨 1 목표", hint: "스테이지 3-4 NORMAL 레벨 1 힌트" },
        2: { goal: "스테이지 3-4 NORMAL 레벨 2 목표", hint: "스테이지 3-4 NORMAL 레벨 2 힌트" },
        3: { goal: "스테이지 3-4 NORMAL 레벨 3 목표", hint: "스테이지 3-4 NORMAL 레벨 3 힌트" },
      }},
    },
    HARD: {
      "3-1": { levels: {
        1: { goal: "스테이지 3-1 HARD 레벨 1 목표", hint: "스테이지 3-1 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 3-1 HARD 레벨 2 목표", hint: "스테이지 3-1 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 3-1 HARD 레벨 3 목표", hint: "스테이지 3-1 HARD 레벨 3 힌트" },
      }},
      "3-2": { levels: {
        1: { goal: "스테이지 3-2 HARD 레벨 1 목표", hint: "스테이지 3-2 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 3-2 HARD 레벨 2 목표", hint: "스테이지 3-2 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 3-2 HARD 레벨 3 목표", hint: "스테이지 3-2 HARD 레벨 3 힌트" },
      }},
      "3-3": { levels: {
        1: { goal: "스테이지 3-3 HARD 레벨 1 목표", hint: "스테이지 3-3 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 3-3 HARD 레벨 2 목표", hint: "스테이지 3-3 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 3-3 HARD 레벨 3 목표", hint: "스테이지 3-3 HARD 레벨 3 힌트" },
      }},
      "3-4": { levels: {
        1: { goal: "스테이지 3-4 HARD 레벨 1 목표", hint: "스테이지 3-4 HARD 레벨 1 힌트" },
        2: { goal: "스테이지 3-4 HARD 레벨 2 목표", hint: "스테이지 3-4 HARD 레벨 2 힌트" },
        3: { goal: "스테이지 3-4 HARD 레벨 3 목표", hint: "스테이지 3-4 HARD 레벨 3 힌트" },
      }},
    }
  }
};

// ─────────────────────────────────────────────────────────────
// 2) 이미지 경로 자동 생성 (규칙 적용)
// ─────────────────────────────────────────────────────────────
const MODE_KEY = { EASY: "e", NORMAL: "n", HARD: "h" };
function levelImagePath(stageNo, courseId, mode, levelNo) {
  const m = MODE_KEY[mode] || "e";
  return `assets/img/s${courseId}_${m}_lv${levelNo}.png`;
}

// ─────────────────────────────────────────────────────────────
// 3) TEXT → CONTENT 변환 (앱이 읽는 구조)
// ─────────────────────────────────────────────────────────────
function buildContent(TEXT_SRC) {
  const CONTENT = { stages: {} };
  const MODES = ["EASY", "NORMAL", "HARD"];

  Object.keys(TEXT_SRC).forEach((stageKey) => {
    const stageNo = Number(stageKey);
    const stageData = TEXT_SRC[stageKey] || {};
    const perMode = {};

    MODES.forEach((mode) => {
      const modeData = stageData[mode] || {};
      const courses = ["1", "2", "3", "4"].map((n) => `${stageNo}-${n}`);
      const pages = {};

      courses.forEach((cid) => {
        const entry = modeData[cid];

        // 안내 코스
        if (entry && entry.type === "info") {
          pages[cid] = {
            title: `스테이지 ${cid}`,
            type: "info",
            body: entry.body || ""
          };
          return;
        }

        // 레벨(1~3) 코스
        const lvMap = (entry && entry.levels) || {};
        const levels = [1, 2, 3].map((n) => ({
          no: n,
          img: levelImagePath(stageNo, cid, mode, n),
          goal:
            (lvMap[n] && lvMap[n].goal) ||
            `목표를 작성해 주세요 (S${stageNo}/${mode}/${cid}/L${n})`,
          hint:
            (lvMap[n] && lvMap[n].hint) ||
            `힌트를 작성해 주세요 (S${stageNo}/${mode}/${cid}/L${n})`
        }));

        // (참고) 1-4 / 2-4는 TEXT에 info로 이미 정의됨
        pages[cid] = { title: `스테이지 ${cid}`, type: "levels", levels };
      });

      perMode[mode] = { courses, pages };
    });

    CONTENT.stages[stageNo] = { modes: MODES, perMode };
  });

  return CONTENT;
}

// ─────────────────────────────────────────────────────────────
// 4) 앱에서 사용하는 최종 객체
// ─────────────────────────────────────────────────────────────
const CONTENT = buildContent(TEXT);
