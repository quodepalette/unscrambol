/* ==========================================================================
   TRIVIA API LAYER — Open Trivia Database (opentdb.com)
   Free, no API key required. https://opentdb.com/api_config.php

   Exposes window.TriviaAPI with:
     - CATEGORY_META: display info for the home-screen category cards
     - fetchLiveQuestions({ categoryKey, difficulty, amount }) -> Promise<Question[]>
     - Question shape matches the local fallback bank in questions.js:
         { q, options[4], answer, difficulty, explain, category, categoryLabel, source }
   ========================================================================== */
(() => {
  "use strict";

  const BASE = "https://opentdb.com";

  // Our category keys -> OpenTDB category IDs. Some keys map to a few
  // related OpenTDB categories so repeated rounds feel varied, not identical.
  const CATEGORY_IDS = {
    all: null,               // no filter = fully random across OpenTDB
    science: [17],           // Science & Nature
    history: [23],
    geography: [22],
    movies: [11],            // Entertainment: Film
    music: [12],             // Entertainment: Music
    videogames: [15, 16],    // Entertainment: Video Games, Board Games
    sports: [21],
    arts: [25, 10, 20],      // Art, Books, Mythology
  };

  const CATEGORY_META = {
    all: { label: "All Categories", icon: "shuffle", blurb: "A live mix from every category" },
    science: { label: "Science & Nature", icon: "atom", blurb: "Biology, physics, space & more" },
    history: { label: "History", icon: "scroll", blurb: "Empires, wars & turning points" },
    geography: { label: "Geography", icon: "globe", blurb: "Places, borders & landmarks" },
    movies: { label: "Movies", icon: "film", blurb: "Directors, plots & box office" },
    music: { label: "Music", icon: "music", blurb: "Artists, albums & instruments" },
    videogames: { label: "Video Games", icon: "gamepad", blurb: "Consoles, characters & lore" },
    sports: { label: "Sports", icon: "trophy", blurb: "Teams, records & rules of play" },
    arts: { label: "Art & Literature", icon: "palette", blurb: "Painters, authors & classics" },
  };

  let sessionToken = null;
  let tokenPromise = null;

  /* ---------- Base64 (UTF-8 safe) decode, since we request encode=base64 ---------- */
  function b64Decode(str) {
    try {
      return decodeURIComponent(
        atob(str)
          .split("")
          .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch (e) {
      return str;
    }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  /* ---------- Session token: avoids OpenTDB repeating questions we've already seen ---------- */
  async function ensureSessionToken() {
    if (sessionToken) return sessionToken;
    if (tokenPromise) return tokenPromise;
    tokenPromise = fetch(`${BASE}/api_token.php?command=request`)
      .then(res => res.json())
      .then(data => {
        sessionToken = data.token || null;
        return sessionToken;
      })
      .catch(() => null)
      .finally(() => { tokenPromise = null; });
    return tokenPromise;
  }

  async function resetSessionToken() {
    if (!sessionToken) return;
    try {
      await fetch(`${BASE}/api_token.php?command=reset&token=${sessionToken}`);
    } catch (e) { /* ignore — a fresh token will be requested on next call */ }
  }

  function pickCategoryId(categoryKey) {
    const ids = CATEGORY_IDS[categoryKey];
    if (!ids || ids.length === 0) return null;
    return ids[Math.floor(Math.random() * ids.length)];
  }

  function transform(raw, categoryKey) {
    const question = b64Decode(raw.question);
    const correct = b64Decode(raw.correct_answer);
    const incorrect = raw.incorrect_answers.map(b64Decode);
    const options = shuffle([correct, ...incorrect]);
    return {
      q: question,
      options,
      answer: options.indexOf(correct),
      difficulty: b64Decode(raw.difficulty) || "medium",
      explain: `The correct answer is “${correct}.”`,
      category: categoryKey,
      categoryLabel: b64Decode(raw.category),
      source: "live",
    };
  }

  /**
   * Fetch a fresh batch of questions from OpenTDB.
   * Throws on failure — caller is expected to fall back to the offline bank.
   */
  async function fetchLiveQuestions({ categoryKey, difficulty, amount }, _retried = false) {
    await ensureSessionToken();

    const params = new URLSearchParams();
    params.set("amount", String(Math.min(Math.max(amount, 1), 50)));
    const catId = pickCategoryId(categoryKey);
    if (catId) params.set("category", String(catId));
    if (difficulty && difficulty !== "all") params.set("difficulty", difficulty);
    params.set("type", "multiple");
    params.set("encode", "base64");
    if (sessionToken) params.set("token", sessionToken);

    const res = await fetch(`${BASE}/api.php?${params.toString()}`);

    if (res.status === 429) {
      if (_retried) throw new Error("Rate limited by trivia API");
      await sleep(1300);
      return fetchLiveQuestions({ categoryKey, difficulty, amount }, true);
    }
    if (!res.ok) throw new Error(`Trivia API network error (${res.status})`);

    const data = await res.json();

    // response_code: 0 success, 1 not enough questions, 2 invalid param,
    // 3 token not found, 4 token exhausted (all questions in this filter seen)
    if (data.response_code === 4) {
      if (_retried) throw new Error("Trivia API session exhausted");
      await resetSessionToken();
      sessionToken = null;
      return fetchLiveQuestions({ categoryKey, difficulty, amount }, true);
    }
    if (data.response_code === 1) {
      throw new Error("Not enough live questions for that combination");
    }
    if (data.response_code !== 0 || !Array.isArray(data.results) || data.results.length === 0) {
      throw new Error(`Trivia API returned code ${data.response_code}`);
    }

    return data.results.map(r => transform(r, categoryKey));
  }

  window.TriviaAPI = {
    CATEGORY_META,
    fetchLiveQuestions,
  };
})();
