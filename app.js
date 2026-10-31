/* Angles morts : moteur du jeu. Progression en mémoire uniquement. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const main = $("#main");
  const dlg = $("#dialog");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const track = (n) => window.amAnalytics && window.amAnalytics.track(n);

  const state = {
    started: false,
    results: {},          // "m-s" -> { bias: pts, parade: pts }
    unlocked: new Set(),  // bias keys
    modStarted: new Set(),
    modDone: new Set(),
    allDone: false,
    cur: null             // current scene runtime
  };

  /* Thème */
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = prefersDark ? "dark" : "light";
  const applyTheme = () => { root.dataset.theme = theme; $("#theme").textContent = theme === "dark" ? "Clair" : "Sombre"; };
  $("#theme").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; applyTheme(); });
  applyTheme();

  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const modScore = (m) => m.scenes.reduce((t, _, i) => { const r = state.results[`${m.id}-${i}`]; return t + (r ? r.bias + r.parade : 0); }, 0);
  const modCount = (m) => m.scenes.filter((_, i) => state.results[`${m.id}-${i}`]).length;
  const totalDone = () => Object.keys(state.results).length;

  function setNav(view) {
    document.querySelectorAll(".topnav .nav").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
    $("#deck-count").textContent = `${state.unlocked.size}/15`;
  }
  function show(html, view) {
    main.innerHTML = html;
    setNav(view);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    main.focus({ preventScroll: true });
  }

  function confirmBox(title, text, okLabel, onOk) {
    $("#dialog-content").innerHTML = `<h2 id="dialog-title">${esc(title)}</h2><p>${esc(text)}</p><div class="dialog-actions"><button class="btn line" data-a="no">Annuler</button><button class="btn" data-a="ok">${esc(okLabel)}</button></div>`;
    dlg.showModal();
    dlg.onclick = (e) => {
      const a = e.target.closest("[data-a]");
      if (e.target === dlg || (a && a.dataset.a === "no")) dlg.close();
      else if (a && a.dataset.a === "ok") { dlg.close(); onOk(); }
    };
  }

  const loupe = `<svg class="hero-art" viewBox="0 0 300 260" role="img" aria-label="Loupe posée sur un dossier d'enquête">
    <rect x="30" y="40" width="200" height="190" rx="10" fill="#f3efe4" opacity=".1" transform="rotate(-6 130 135)"/>
    <rect x="44" y="34" width="200" height="190" rx="10" fill="none" stroke="#f3efe4" stroke-opacity=".5" stroke-width="2"/>
    <path d="M64 70h120M64 94h150M64 118h96M64 142h132M64 166h80" stroke="#f3efe4" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>
    <rect x="58" y="110" width="110" height="16" rx="3" fill="#e0a526" opacity=".85"/>
    <circle cx="190" cy="140" r="56" fill="#123d38" fill-opacity=".55" stroke="#f3efe4" stroke-width="9"/>
    <path d="M160 116a38 38 0 0 1 30-14" stroke="#e0a526" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="m231 182 46 46" stroke="#f3efe4" stroke-width="18" stroke-linecap="round"/>
    <text x="190" y="150" text-anchor="middle" font-family="Zodiak,Georgia,serif" font-size="34" font-weight="700" fill="#e0a526">?</text>
  </svg>`;

  /* Accueil */
  function home() {
    state.cur = null;
    const mods = MODULES.map((m) => {
      const n = modCount(m), done = state.modDone.has(m.id);
      const dots = m.scenes.map((_, i) => `<i class="${state.results[`${m.id}-${i}`] ? "on" : ""}"></i>`).join("");
      const label = done ? "Revoir le rapport" : n ? "Reprendre l'enquête" : "Ouvrir le dossier";
      return `<article class="module">
        <div class="code">${m.code}</div>
        <h3>${esc(m.title)}</h3>
        <div class="meta">${esc(m.audience)} · ${m.time} · 5 enquêtes</div>
        <p>${esc(m.intro)}</p>
        <div class="dots" aria-label="${n} enquêtes sur 5 terminées">${dots}</div>
        <div class="meta">${n}/5 enquêtes${n ? ` · ${modScore(m)}/20 points` : ""}</div>
        <button class="btn ${done ? "line" : ""}" data-mod="${m.id}">${label}</button>
      </article>`;
    }).join("");
    show(`<section class="hero">
        <div>
          <div class="eyebrow">Serious game · Hygiène hospitalière</div>
          <h1>Angles morts : les biais qui <em>transmettent</em></h1>
          <p>Les infections associées aux soins ne naissent pas seulement d'un manque de connaissances. Elles se glissent dans nos raccourcis de pensée. Menez 15 enquêtes, repérez le biais cognitif à l'œuvre, puis choisissez la parade qui protège vraiment.</p>
          <div class="hero-actions"><button class="btn amber" data-mod="${firstOpen()}">${totalDone() ? "Continuer l'enquête" : "Commencer l'enquête"}</button><button class="btn ghost" data-view="deck">Voir la biaisothèque</button></div>
        </div>${loupe}
      </section>
      <div class="section-head"><div><div class="eyebrow">Trois parcours par métier, indépendants</div><h2>Choisissez votre dossier</h2></div><span class="score-pill">${totalDone()}/15 enquêtes · ${state.unlocked.size} cartes</span></div>
      <div class="modules">${mods}</div>
      <div class="section-head"><div><div class="eyebrow">Méthode</div><h2>Comment se déroule une enquête</h2></div></div>
      <div class="how">
        <div><b>1</b>Lisez la situation et retournez les trois pièces à conviction.</div>
        <div><b>2</b>Identifiez le biais à l'œuvre parmi quatre cartes. 2 points au premier essai, 1 au second.</div>
        <div><b>3</b>Choisissez la parade. La plus systémique rapporte 2 points.</div>
        <div><b>4</b>Lisez le débriefing sourcé et débloquez la carte du biais.</div>
      </div>
      <p class="notice"><b>Prototype pédagogique.</b> Les situations sont fictives et simplifiées. Les contenus doivent être relus par l'équipe opérationnelle d'hygiène avant toute utilisation institutionnelle. Le jeu ne remplace ni les protocoles de l'établissement ni l'avis de l'EOH.</p>`, "home");
  }
  function firstOpen() { const m = MODULES.find((x) => !state.modDone.has(x.id)); return m ? m.id : 1; }

  function startModule(id) {
    const m = MODULES.find((x) => x.id === id);
    if (!state.started) { state.started = true; track("Jeu démarré"); }
    if (state.modDone.has(id)) return report(m);
    if (!state.modStarted.has(id)) { state.modStarted.add(id); track(`Module ${id} démarré`); }
    const i = m.scenes.findIndex((_, k) => !state.results[`${id}-${k}`]);
    scene(m, i < 0 ? 0 : i);
  }

  /* Scène */
  function scene(m, idx) {
    const sc = m.scenes[idx];
    state.cur = { m, idx, sc, opened: new Set(), tries: [], biasPts: null, paradePts: null, paradeIdx: null,
      choices: shuffle(sc.choices), parOrder: shuffle(sc.parades.map((_, i) => i)) };
    renderScene();
  }

  function renderScene() {
    const c = state.cur, { m, idx, sc } = c;
    const steps = m.scenes.map((_, i) => `<i class="${i < idx || state.results[`${m.id}-${i}`] ? "on" : i === idx ? "cur" : ""}"></i>`).join("");
    const clues = sc.clues.map((cl, i) => `<div class="clue ${c.opened.has(i) ? "open" : ""}">
      <button data-clue="${i}" aria-label="${c.opened.has(i) ? esc(cl.k + " : " + cl.v) : "Retourner la pièce à conviction " + (i + 1)}" ${c.opened.has(i) ? "aria-pressed=true" : ""}>
        <span class="face front" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="2"/><path d="m15 15 6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>Pièce n° ${i + 1}<small style="font-weight:500;color:var(--muted)">Retourner</small></span>
        <span class="face back" aria-hidden="${!c.opened.has(i)}"><small>${esc(cl.k)}</small>${esc(cl.v)}</span>
      </button></div>`).join("");
    const allOpen = c.opened.size === sc.clues.length;

    let p1 = "";
    if (allOpen) {
      const solved = c.biasPts !== null;
      const cards = c.choices.map((k) => {
        const b = BIASES[k], wrong = c.tries.includes(k) && k !== sc.answer, ok = solved && k === sc.answer;
        return `<button class="bias-card ${wrong ? "ko" : ""} ${ok ? "ok" : ""}" data-bias="${k}" ${solved || wrong ? "disabled" : ""}><small>${esc(b.tag)}</small><b>${esc(b.name)}</b></button>`;
      }).join("");
      let fb = "";
      const last = c.tries[c.tries.length - 1];
      if (solved) {
        const msg = c.biasPts === 2 ? "Bien vu, du premier coup." : c.biasPts === 1 ? "Trouvé au second essai." : `La réponse était : ${BIASES[sc.answer].name}.`;
        const cls = c.biasPts === 2 ? "ok" : c.biasPts === 1 ? "mid" : "ko";
        const extra = c.biasPts === 0 && last !== sc.answer ? ` ${esc(sc.wrong[last] || "")}` : "";
        fb = `<div class="feedback ${cls}" role="status"><b>${esc(msg)}</b> ${esc(BIASES[sc.answer].def)}${extra} <span class="score-pill" style="margin-left:.3rem">+${c.biasPts} pt${c.biasPts > 1 ? "s" : ""}</span></div>`;
      } else if (last) {
        fb = `<div class="feedback ko" role="status"><b>Pas tout à fait.</b> ${esc(sc.wrong[last] || "")} Il vous reste un essai.</div>`;
      }
      p1 = `<div class="phase" id="phase1"><h3><span>1</span>Quel biais est à l'œuvre ?</h3><p class="hint">Appuyez sur la carte qui décrit le mieux le mécanisme principal.</p><div class="cards">${cards}</div>${fb}</div>`;
    } else {
      p1 = `<p class="hint" style="margin-top:1rem">Retournez les trois pièces pour ouvrir l'analyse (${c.opened.size}/3).</p>`;
    }

    let p2 = "";
    if (c.biasPts !== null) {
      const done = c.paradePts !== null;
      const items = c.parOrder.map((pi, n) => {
        const p = sc.parades[pi], picked = c.paradeIdx === pi;
        const cls = done ? `s${p.s} ${picked ? "" : "dim"}` : "";
        const tag = p.s === 2 ? "Parade la plus solide" : p.s === 1 ? "Parade partielle" : "Parade contre-productive";
        return `<button class="parade ${cls}" data-parade="${pi}" ${done ? "disabled" : ""}><span class="l">${"ABC"[n]}</span><span>${esc(p.t)}${done ? `<span class="why"><b>${tag}${picked ? " · votre choix" : ""}.</b> ${esc(p.fb)}</span>` : ""}</span></button>`;
      }).join("");
      p2 = `<div class="phase" id="phase2"><h3><span>2</span>Quelle parade proposez-vous ?</h3><p class="hint">Cherchez ce qui protège durablement, pas seulement aujourd'hui.</p><div class="parades">${items}</div></div>`;
    }

    let p3 = "";
    if (c.paradePts !== null) {
      const b = BIASES[sc.answer], d = sc.debrief;
      const total = c.biasPts + c.paradePts;
      const last = idx === m.scenes.length - 1;
      p3 = `<div class="phase" id="phase3"><h3><span>3</span>Débriefing</h3>
        <div class="debrief">
          <div class="unlock"><small>Carte débloquée</small><h3>${esc(b.name)}</h3><p>${esc(b.def)}</p></div>
          <dl>
            <div><dt>Ce que disent les données</dt><dd>${esc(d.facts)}</dd></div>
            <div><dt>Ce que disent les recommandations</dt><dd>${esc(d.rule)}</dd></div>
            <div><dt>À retenir</dt><dd class="take">${esc(d.take)}</dd></div>
            <div><dt>Sources</dt><dd><ul class="srcs">${d.src.map((k) => `<li><a href="${SOURCES[k].url}" target="_blank" rel="noopener">${esc(SOURCES[k].name)}</a></li>`).join("")}</ul></dd></div>
          </dl>
        </div>
        <div class="next"><span class="score-pill">Enquête : ${total}/4 · Module : ${modScore(m)}/20</span><button class="btn" id="next">${last ? "Lire le rapport d'enquête" : "Enquête suivante"}</button></div>
      </div>`;
    }

    show(`<div class="crumbs"><button data-view="home">Retour aux dossiers</button><span>${m.code} · ${esc(m.title)} · enquête ${idx + 1}/5</span><span class="steps" aria-hidden="true">${steps}</span></div>
      <div class="scene-wrap"><article class="file"><span class="file-tab">Dossier ${m.code}-${idx + 1}</span>
        <div class="where"><span>${esc(sc.place)}</span><span>${esc(sc.hour)}</span></div>
        <h2>${esc(sc.title)}</h2>
        <p class="story">${esc(sc.story)}</p>
        <div class="clues">${clues}</div>
        ${p1}${p2}${p3}
      </article></div>`, "home");
  }

  function scrollTo(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }

  function onClue(i) {
    const c = state.cur; if (c.opened.has(i)) return;
    c.opened.add(i);
    const y = window.scrollY; renderScene(); window.scrollTo(0, y);
    if (c.opened.size === 3) scrollTo("phase1");
  }
  function onBias(k) {
    const c = state.cur; if (c.biasPts !== null || c.tries.includes(k)) return;
    c.tries.push(k);
    if (k === c.sc.answer) c.biasPts = c.tries.length === 1 ? 2 : 1;
    else if (c.tries.length >= 2) c.biasPts = 0;
    const y = window.scrollY; renderScene(); window.scrollTo(0, y);
    if (c.biasPts !== null) setTimeout(() => scrollTo("phase2"), 50);
  }
  function onParade(pi) {
    const c = state.cur; if (c.paradePts !== null) return;
    c.paradeIdx = pi; c.paradePts = c.sc.parades[pi].s;
    state.results[`${c.m.id}-${c.idx}`] = { bias: c.biasPts, parade: c.paradePts };
    state.unlocked.add(c.sc.answer);
    const y = window.scrollY; renderScene(); window.scrollTo(0, y);
    setTimeout(() => scrollTo("phase2"), 50);
  }
  function onNext() {
    const { m, idx } = state.cur;
    const nxt = m.scenes.findIndex((_, k) => k > idx && !state.results[`${m.id}-${k}`]);
    if (nxt >= 0) return scene(m, nxt);
    const any = m.scenes.findIndex((_, k) => !state.results[`${m.id}-${k}`]);
    if (any >= 0) return scene(m, any);
    if (!state.modDone.has(m.id)) {
      state.modDone.add(m.id); track(`Module ${m.id} terminé`);
      if (state.modDone.size === 3 && !state.allDone) { state.allDone = true; track("Parcours terminé"); }
    }
    report(m);
  }

  /* Rapport */
  function report(m) {
    state.cur = null;
    const s = modScore(m);
    const verdict = s >= 17 ? "Œil d'enquêteur" : s >= 12 ? "Bonne piste" : "Enquête à reprendre";
    const rows = m.scenes.map((sc, i) => {
      const r = state.results[`${m.id}-${i}`] || { bias: 0, parade: 0 };
      return `<tr><td>${esc(sc.title)}</td><td><b>${esc(BIASES[sc.answer].name)}</b></td><td>${esc(sc.debrief.take)}</td><td class="n">${r.bias + r.parade}/4</td></tr>`;
    }).join("");
    const others = MODULES.filter((x) => !state.modDone.has(x.id));
    show(`<div class="crumbs"><button data-view="home">Retour aux dossiers</button><span>${m.code} · Rapport d'enquête</span></div>
      <section class="report">
        <article class="file" style="margin-top:34px"><span class="file-tab">Rapport ${m.code}</span>
          <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:center">
            <div><div class="eyebrow">${esc(m.audience)}</div><h2>${esc(m.title)} : dossier clos</h2></div>
            <div style="text-align:right"><div class="big">${s}<span style="font-size:1.4rem;color:var(--muted)">/20</span></div><span class="stamp">${verdict}</span></div>
          </div>
          <p class="hint" style="margin-top:1rem">Le score sert à vous situer, il n'est ni enregistré ni transmis. Ce qui compte : reconnaître le mécanisme la prochaine fois qu'il se présente.</p>
          <table class="table" style="margin-top:1rem"><thead><tr><th>Enquête</th><th>Biais</th><th>Message clé</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table>
        </article>
        <article class="file"><h3>Trois réflexes contre tous les biais</h3>
          <ul><li>Ralentir aux moments à risque : avant un geste invasif, une prescription, une conclusion d'enquête.</li><li>Préférer les défenses du système (check-list, rôle nommé, question standardisée, retour de données) à la seule vigilance individuelle.</li><li>Rendre la parole facile et sans blâme : un signalement est une information, pas une accusation.</li></ul>
          <p class="hint">Le référentiel HAS de compétences en facteurs humains (2026) détaille ces compétences non techniques : <a href="${SOURCES.has_fh.url}" target="_blank" rel="noopener">${esc(SOURCES.has_fh.name)}</a>.</p>
        </article>
        <div class="next"><button class="btn line" id="replay" data-mod="${m.id}">Rejouer ce module</button>${others.length ? `<button class="btn" data-mod="${others[0].id}">Module suivant : ${esc(others[0].title)}</button>` : `<button class="btn" data-view="deck">Voir la biaisothèque complète</button>`}</div>
      </section>`, "home");
  }

  function replay(id) {
    confirmBox("Rejouer ce module ?", "Les réponses de ce module seront effacées. Les cartes débloquées restent dans votre biaisothèque.", "Rejouer", () => {
      const m = MODULES.find((x) => x.id === id);
      m.scenes.forEach((_, i) => delete state.results[`${id}-${i}`]);
      state.modDone.delete(id);
      scene(m, 0);
    });
  }

  /* Biaisothèque */
  function deck() {
    state.cur = null;
    const order = [];
    MODULES.forEach((m) => m.scenes.forEach((sc) => order.push([sc.answer, m.code])));
    const cards = order.map(([k, code]) => {
      const b = BIASES[k];
      return state.unlocked.has(k)
        ? `<article class="dcard on"><small>${code} · ${esc(b.tag)}</small><h3>${esc(b.name)}</h3><p>${esc(b.def)}</p><p class="ex">En hygiène : ${esc(b.ipc)}</p></article>`
        : `<article class="dcard off"><small>${code}</small><p>Carte verrouillée.<br>Résolvez l'enquête pour la débloquer.</p></article>`;
    }).join("");
    show(`<div class="section-head" style="margin-top:0"><div><div class="eyebrow">Votre collection</div><h2>Biaisothèque : ${state.unlocked.size}/15 cartes</h2><p class="hint">Chaque enquête résolue débloque la carte du biais rencontré, avec sa définition et un exemple en hygiène.</p></div></div>
      <div class="deck">${cards}</div>`, "deck");
  }

  function sources() {
    state.cur = null;
    const items = Object.values(SOURCES).map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("");
    show(`<div class="section-head" style="margin-top:0"><div><div class="eyebrow">Références</div><h2>Sources mobilisées</h2><p class="hint">Recommandations françaises et internationales, et publications sur les biais cognitifs en santé. Les chiffres cités dans les débriefings en sont issus ; les situations sont fictives.</p></div></div>
      <ul class="src-list">${items}</ul>
      <p class="notice"><b>Mesure d'audience.</b> Sur le site public, une mesure agrégée sans cookie (Plausible) compte uniquement les démarrages et fins de modules. Aucun score, aucune réponse, aucun identifiant n'est transmis.</p>`, "sources");
  }

  /* Délégation des événements */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button,a");
    if (!t) return;
    if (t.id === "brand") { e.preventDefault(); return home(); }
    if (t.id === "replay") return replay(+t.dataset.mod);
    if (t.dataset.mod) return startModule(+t.dataset.mod);
    if (t.dataset.view) { const v = t.dataset.view; return v === "deck" ? deck() : v === "sources" ? sources() : home(); }
    if (t.dataset.clue !== undefined) return onClue(+t.dataset.clue);
    if (t.dataset.bias) return onBias(t.dataset.bias);
    if (t.dataset.parade !== undefined) return onParade(+t.dataset.parade);
    if (t.id === "next") return onNext();
  });

  home();
})();
