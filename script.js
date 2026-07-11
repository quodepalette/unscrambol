/* ==========================================================================
   MIND RUSH — app logic
   ========================================================================== */
(() => {
  "use strict";

  /* ---------- Icons (inline SVG, stroke-based, theme-colored via currentColor) ---------- */
  const ICONS = {
    atom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/></svg>`,
    scroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4h11a2 2 0 0 1 2 2v13a1 1 0 0 1-1.5.87L15 18l-2 1.5L11 18l-2 1.5L7 18l-2.5 1.87A1 1 0 0 1 3 19V7a3 3 0 0 1 3-3Z"/><path d="M8 8h7M8 11.5h7"/></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4.2 5.7 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.7-4.2-9S9.2 5.6 12 3Z"/></svg>`,
    film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></svg>`,
    trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4M17 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4"/><path d="M12 14v3M9 21h6M8.5 21c0-2 1-3 3.5-3s3.5 1 3.5 3"/></svg>`,
    palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 1.6-1.9-.2-.5-.1-1.1.4-1.4.4-.3 1-.3 1.4 0 .7.5 1.7.4 2.2-.3A9 9 0 0 0 12 3Z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor" stroke="none"/><circle cx="10.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1.2" fill="currentColor" stroke="none"/></svg>`,
    music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>`,
    gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="7.5" width="19" height="10" rx="5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="18.5" cy="13" r="1" fill="currentColor" stroke="none"/></svg>`,
    shuffle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h3.5c2 0 3 .8 4 2.4M3 18h3.5c2 0 3-.8 4-2.4M17 6h4M17 18h4M14 8.5 17 6l-3-2.5M14 15.5 17 18l-3 2.5"/></svg>`,
    soundOn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>`,
    soundOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9.5l4.5 4.5M20.5 9.5 16 14"/></svg>`,
  };

  /* ---------- State ---------- */
  const state = {
    category: "all",      // 'all' or a category key
    difficulty: "all",     // 'all' | 'easy' | 'medium' | 'hard'
    length: 10,
    pool: [],
    index: 0,
    score: 0,              // total points earned this round
    correctCount: 0,        // number of correct answers this round (for accuracy)
    streak: 0,
    bestStreak: 0,
    answered: [],          // per-question record { correct, category, difficulty }
    timerId: null,
    timeLeft: 15,
    timePerQ: 15,
    locked: false,
    // session-only "high score" memory (no persistence across page loads, by design)
    sessionBest: 0,
    source: "live",        // 'live' (OpenTDB) or 'offline' (local fallback bank)
    muted: false,
  };

  /* ---------- DOM refs ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const views = { home: $("#view-home"), quiz: $("#view-quiz"), results: $("#view-results") };
  const categoryGrid = $("#categoryGrid");
  const difficultyRow = $("#difficultyRow");
  const lengthRow = $("#lengthRow");
  const startBtn = $("#startBtn");
  const statBest = $("#statBest");
  const statPlayed = $("#statPlayed");
  const muteBtn = $("#muteBtn");

  const quizTag = $("#quizTag");
  const quizProgressText = $("#quizProgressText");
  const bulbRow = $("#bulbRow");
  const timerNum = $("#timerNum");
  const timerBar = $("#timerBar");
  const questionCard = $("#questionCard");
  const questionCat = $("#questionCat");
  const questionText = $("#questionText");
  const answersGrid = $("#answersGrid");
  const explainBox = $("#explainBox");
  const nextBtn = $("#nextBtn");
  const quitBtn = $("#quitBtn");
  const sourceBadge = $("#sourceBadge");
  const quizScoreLive = $("#quizScoreLive");

  const resultsTitle = $("#resultsTitle");
  const scoreboard = $("#scoreboard");
  const scoreTotalLabel = $("#scoreTotalLabel");
  const accuracyBar = $("#accuracyBar");
  const accuracyNum = $("#accuracyNum");
  const streakNote = $("#streakNote");
  const breakdownList = $("#breakdownList");
  const playAgainBtn = $("#playAgainBtn");
  const changeSetupBtn = $("#changeSetupBtn");
  const shareBtn = $("#shareBtn");
  const toast = $("#toast");

  const TIMER_RADIUS = 22;
  const TIMER_CIRC = 2 * Math.PI * TIMER_RADIUS;
  const ACC_RADIUS = 60;
  const ACC_CIRC = 2 * Math.PI * ACC_RADIUS;

  /* ---------- Tiny sound cues via WebAudio (no external assets) ---------- */
  let audioCtx = null;
  function beep(freq, dur = 0.09, type = "sine", gain = 0.05) {
    if (state.muted) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g).connect(audioCtx.destination);
      osc.start();
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) { /* audio unsupported — fail silently */ }
  }
  const sfx = {
    correct: () => { beep(660, 0.09, "sine", 0.06); setTimeout(() => beep(880, 0.12, "sine", 0.06), 90); },
    wrong: () => beep(160, 0.22, "sawtooth", 0.05),
    tick: () => beep(1000, 0.03, "square", 0.02),
    start: () => { beep(440, 0.08, "sine", 0.05); setTimeout(() => beep(660, 0.1, "sine", 0.05), 80); },
  };

  /* ---------- View switching ---------- */
  function showView(name) {
    Object.entries(views).forEach(([key, el]) => {
      el.classList.toggle("is-active", key === name);
    });
    const el = views[name];
    el.classList.remove("view-enter");
    void el.offsetWidth; // restart animation
    el.classList.add("view-enter");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Build category cards (driven by the API's category metadata) ---------- */
  function renderCategories() {
    const meta = window.TriviaAPI ? window.TriviaAPI.CATEGORY_META : LOCAL_CATEGORY_META;
    Object.entries(meta).forEach(([key, info]) => {
      categoryGrid.appendChild(makeCatCard(key, info.label, info.blurb, info.icon));
    });
    selectCategory("all");
  }
  function makeCatCard(key, label, blurb, icon) {
    const btn = document.createElement("button");
    btn.className = "cat-card";
    btn.type = "button";
    btn.dataset.key = key;
    btn.innerHTML = `
      <span class="cat-card__icon">${ICONS[icon] || ICONS.shuffle}</span>
      <span class="cat-card__name">${label}</span>
      <span class="cat-card__count">${blurb}</span>
    `;
    btn.addEventListener("click", () => selectCategory(key));
    return btn;
  }
  function selectCategory(key) {
    state.category = key;
    $$(".cat-card").forEach(c => c.classList.toggle("is-selected", c.dataset.key === key));
  }

  function renderPillRow(container, options, activeValue, onPick) {
    container.innerHTML = "";
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "pill" + (opt.value === activeValue ? " is-active" : "");
      btn.type = "button";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => {
        onPick(opt.value);
        Array.from(container.children).forEach(c => c.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
      container.appendChild(btn);
    });
  }

  /* ---------- Quiz setup ---------- */
  // Offline fallback: pulls from the local hardcoded bank in questions.js.
  // Only used when the live OpenTDB API can't be reached.
  function buildOfflinePool() {
    let all = getAllQuestions().map(q => ({ ...q, source: "offline" }));
    if (state.category !== "all") all = all.filter(q => q.category === state.category);
    if (state.difficulty !== "all") all = all.filter(q => q.difficulty === state.difficulty);
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, Math.min(state.length, all.length));
  }

  // Tries the live trivia API first (fresh questions every round); if that
  // fails for any reason (offline, API down, rate-limited), falls back to
  // the local question bank so the game never breaks.
  async function buildPool() {
    if (window.TriviaAPI) {
      try {
        const live = await window.TriviaAPI.fetchLiveQuestions({
          categoryKey: state.category,
          difficulty: state.difficulty,
          amount: state.length,
        });
        if (live && live.length) {
          state.source = "live";
          return live;
        }
      } catch (err) {
        console.warn("Live trivia API unavailable, using offline pack:", err.message);
      }
    }
    state.source = "offline";
    const offline = buildOfflinePool();
    if (offline.length === 0) {
      throw new Error("No questions available, online or offline, for that combination.");
    }
    toastMsg("Couldn't reach the trivia API — playing from the offline pack.");
    return offline;
  }

  async function startQuiz() {
    startBtn.disabled = true;
    const originalLabel = startBtn.textContent;
    startBtn.textContent = "Get ready…";
    playAgainBtn.disabled = true;

    try {
      state.pool = await buildPool();
    } catch (err) {
      toastMsg(err.message || "Couldn't load questions — try again.");
      startBtn.disabled = false;
      startBtn.textContent = originalLabel;
      playAgainBtn.disabled = false;
      return;
    }

    startBtn.disabled = false;
    startBtn.textContent = originalLabel;
    playAgainBtn.disabled = false;

    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.answered = [];
    updateSourceBadge();
    updateLiveScore();
    sfx.start();
    showView("quiz");
    renderBulbs();
    loadQuestion();
  }

  /* ---------- Scoring ----------
     Points scale with question difficulty only — flat per-question value,
     no speed or streak bonuses.
  ---------------------------------------------------------------- */
  const BASE_POINTS = { easy: 10, medium: 20, hard: 30 };

  function calcPoints(difficulty) {
    return BASE_POINTS[difficulty] || BASE_POINTS.medium;
  }

  function updateMuteButton() {
    if (!muteBtn) return;
    muteBtn.innerHTML = state.muted ? ICONS.soundOff : ICONS.soundOn;
    muteBtn.classList.toggle("is-muted", state.muted);
    muteBtn.setAttribute("aria-label", state.muted ? "Unmute sound" : "Mute sound");
    muteBtn.setAttribute("title", state.muted ? "Unmute sound" : "Mute sound");
  }

  function updateLiveScore() {
    if (quizScoreLive) quizScoreLive.textContent = `${state.score.toLocaleString()} pts`;
  }

  function updateSourceBadge() {
    if (!sourceBadge) return;
    const isLive = state.source === "live";
    sourceBadge.textContent = isLive ? "● Live questions" : "● Offline pack";
    sourceBadge.classList.toggle("is-live", isLive);
    sourceBadge.classList.toggle("is-offline", !isLive);
  }

  function renderBulbs() {
    bulbRow.innerHTML = "";
    state.pool.forEach((_, i) => {
      const b = document.createElement("span");
      b.className = "bulb";
      b.dataset.i = i;
      bulbRow.appendChild(b);
    });
    updateBulbs();
  }
  function updateBulbs() {
    $$(".bulb").forEach((b, i) => {
      b.classList.remove("is-current", "is-correct", "is-wrong");
      const rec = state.answered[i];
      if (rec) b.classList.add(rec.correct ? "is-correct" : "is-wrong");
      else if (i === state.index) b.classList.add("is-current");
    });
  }

  function loadQuestion() {
    state.locked = false;
    explainBox.classList.remove("is-visible");
    nextBtn.classList.remove("is-visible");
    const q = state.pool[state.index];

    const meta = window.TriviaAPI ? window.TriviaAPI.CATEGORY_META : LOCAL_CATEGORY_META;
    const catLabel = meta[state.category] ? meta[state.category].label : "General Knowledge";
    quizTag.textContent = `${catLabel} · ${cap(state.difficulty)}`;
    quizProgressText.textContent = `Question ${state.index + 1} of ${state.pool.length}`;
    questionCat.textContent = q.categoryLabel + " · " + cap(q.difficulty);
    questionText.textContent = q.q;

    answersGrid.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.type = "button";
      btn.innerHTML = `
        <span class="answer-btn__row">
          <span class="answer-btn__letter">${letters[i]}</span><span>${opt}</span>
        </span>
        <span class="answer-btn__note" id="answerNote${i}"></span>
      `;
      btn.addEventListener("click", () => selectAnswer(i));
      answersGrid.appendChild(btn);
    });

    questionCard.classList.remove("question-enter");
    void questionCard.offsetWidth;
    questionCard.classList.add("question-enter");

    updateBulbs();
    startTimer(q.difficulty);
  }

  function startTimer(difficulty) {
    clearInterval(state.timerId);
    const durations = { easy: 15, medium: 18, hard: 22 };
    state.timePerQ = durations[difficulty] || 15;
    state.timeLeft = state.timePerQ;
    renderTimer();
    state.timerId = setInterval(() => {
      state.timeLeft -= 1;
      renderTimer();
      if (state.timeLeft <= 3 && state.timeLeft > 0) sfx.tick();
      if (state.timeLeft <= 0) {
        clearInterval(state.timerId);
        if (!state.locked) selectAnswer(-1); // time's up = no answer
      }
    }, 1000);
  }
  function renderTimer() {
    const ratio = Math.max(0, state.timeLeft / state.timePerQ);
    const offset = TIMER_CIRC * (1 - ratio);
    timerBar.style.strokeDasharray = `${TIMER_CIRC}`;
    timerBar.style.strokeDashoffset = `${offset}`;
    timerBar.classList.toggle("is-danger", state.timeLeft <= 4);
    timerNum.textContent = Math.max(0, state.timeLeft);
  }

  function selectAnswer(i) {
    if (state.locked) return;
    state.locked = true;
    clearInterval(state.timerId);
    const q = state.pool[state.index];
    const correct = i === q.answer;
    const btns = $$(".answer-btn");

    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("is-correct");
      else if (idx === i) btn.classList.add("is-wrong");
      else btn.classList.add("is-dim");

      if (q.optionNotes && q.optionNotes[idx]) {
        const noteEl = btn.querySelector(`#answerNote${idx}`);
        if (noteEl) {
          noteEl.textContent = q.optionNotes[idx];
          noteEl.classList.add("is-visible");
        }
      }
    });

    let pointsEarned = 0;
    if (correct) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      pointsEarned = calcPoints(q.difficulty);
      state.score += pointsEarned;
      state.correctCount += 1;
      sfx.correct();
    } else {
      state.streak = 0;
      sfx.wrong();
    }
    updateLiveScore();

    state.answered.push({ correct, category: q.category, categoryLabel: q.categoryLabel, difficulty: q.difficulty, points: pointsEarned });
    updateBulbs();

    const feedbackLine = correct
      ? `<b>Correct! +${pointsEarned} pts.</b> ${q.explain}`
      : `<b>${i === -1 ? "Time's up." : "Not quite."}</b> ${q.explain}`;
    explainBox.innerHTML = feedbackLine;
    explainBox.classList.add("is-visible");

    nextBtn.textContent = state.index + 1 < state.pool.length ? "Next question →" : "See results →";
    nextBtn.classList.add("is-visible");
  }

  nextBtn.addEventListener("click", () => {
    state.index += 1;
    if (state.index >= state.pool.length) {
      finishQuiz();
    } else {
      loadQuestion();
    }
  });

  quitBtn.addEventListener("click", () => {
    clearInterval(state.timerId);
    showView("home");
  });

  /* ---------- Results ---------- */
  function finishQuiz() {
    clearInterval(state.timerId);
    const total = state.pool.length;
    const correct = state.correctCount;
    const points = state.score;
    state.sessionBest = Math.max(state.sessionBest, points);
    statBest.textContent = state.sessionBest.toLocaleString();
    statPlayed.textContent = Number(statPlayed.textContent.replace(/,/g, "") || 0) + 1;

    showView("results");

    const pct = total ? Math.round((correct / total) * 100) : 0;
    resultsTitle.textContent = pickHeadline(correct, total);
    scoreTotalLabel.textContent = `${correct} of ${total} correct`;

    // Flip-digit scoreboard — shows total points earned this round
    renderScoreboard(points);

    // Accuracy ring — based on correct answers, not points
    requestAnimationFrame(() => {
      const offset = ACC_CIRC * (1 - pct / 100);
      accuracyBar.style.strokeDasharray = `${ACC_CIRC}`;
      accuracyBar.style.strokeDashoffset = `${ACC_CIRC}`;
      requestAnimationFrame(() => { accuracyBar.style.strokeDashoffset = `${offset}`; });
    });
    animateCount(accuracyNum, pct, "%");

    streakNote.innerHTML = `Longest streak this round: <b>${state.bestStreak}</b> correct in a row.`;

    renderBreakdown();
  }

  function pickHeadline(correct, total) {
    const pct = total ? correct / total : 0;
    if (pct === 1) return "Perfect Show!";
    if (pct >= 0.8) return "Crowd Favorite!";
    if (pct >= 0.6) return "Solid Performance!";
    if (pct >= 0.4) return "Halfway There";
    return "Back to Rehearsal";
  }

  function renderScoreboard(points) {
    scoreboard.innerHTML = "";
    const digits = Math.max(3, String(points).length);
    const pointsStr = String(points).padStart(digits, "0");
    [...pointsStr].forEach((ch, i) => scoreboard.appendChild(makeDigit(ch, i * 120)));
  }
  function makeDigit(ch, delay) {
    const d = document.createElement("div");
    d.className = "flip-digit";
    d.textContent = "0";
    setTimeout(() => {
      d.classList.add("flipping");
      setTimeout(() => { d.textContent = ch; }, 175);
      setTimeout(() => d.classList.remove("flipping"), 350);
    }, delay);
    return d;
  }

  function animateCount(el, target, suffix = "") {
    const start = 0;
    const dur = 900;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderBreakdown() {
    breakdownList.innerHTML = "";
    const byCat = {};
    state.answered.forEach(a => {
      byCat[a.categoryLabel] = byCat[a.categoryLabel] || { correct: 0, total: 0 };
      byCat[a.categoryLabel].total += 1;
      if (a.correct) byCat[a.categoryLabel].correct += 1;
    });
    const entries = Object.entries(byCat);
    if (entries.length === 0) return;
    entries.forEach(([label, { correct, total }]) => {
      const pct = Math.round((correct / total) * 100);
      const row = document.createElement("div");
      row.className = "breakdown-row";
      row.innerHTML = `
        <span class="breakdown-row__label">${label}</span>
        <span class="breakdown-row__bar"><span class="breakdown-row__fill"></span></span>
        <span class="breakdown-row__val">${correct}/${total}</span>
      `;
      breakdownList.appendChild(row);
      requestAnimationFrame(() => {
        row.querySelector(".breakdown-row__fill").style.width = pct + "%";
      });
    });
  }

  playAgainBtn.addEventListener("click", startQuiz);
  changeSetupBtn.addEventListener("click", () => showView("home"));

  shareBtn.addEventListener("click", async () => {
    const total = state.pool.length;
    const text = `I scored ${state.score.toLocaleString()} points (${state.correctCount}/${total} correct) on Mind Rush trivia! 🎯`;
    try {
      await navigator.clipboard.writeText(text);
      toastMsg("Result copied to clipboard!");
    } catch (e) {
      toastMsg(text);
    }
  });

  function toastMsg(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* ---------- Wire up setup controls ---------- */
  function init() {
    renderCategories();
    renderPillRow($("#difficultyRow"), [
      { label: "All levels", value: "all" },
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
    ], state.difficulty, (v) => { state.difficulty = v; });

    renderPillRow($("#lengthRow"), [
      { label: "5 questions", value: 5 },
      { label: "10 questions", value: 10 },
      { label: "15 questions", value: 15 },
      { label: "20 questions", value: 20 },
    ], state.length, (v) => { state.length = v; });

    startBtn.addEventListener("click", startQuiz);

    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        state.muted = !state.muted;
        updateMuteButton();
      });
      updateMuteButton();
    }

    // Timer ring circle setup
    timerBar.style.strokeDasharray = `${TIMER_CIRC}`;
    timerBar.style.strokeDashoffset = `0`;
    accuracyBar.style.strokeDasharray = `${ACC_CIRC}`;
    accuracyBar.style.strokeDashoffset = `${ACC_CIRC}`;

    statPlayed.textContent = "0";
    statBest.textContent = "0";
  }

  document.addEventListener("DOMContentLoaded", init);
})();
