/* ═══════════════════════════════════════════════════════════════
   PLAY SCOPE — the projector.
   Scenes are markup; this file supplies the pieces that are easier
   to place from data (seats, dots, post-its), then runs the clock.
   Every string here is a placeholder, written to be replaced.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Content ─────────────────────────────────────────────── */

  // Scene 03: who was in the workshop, and who wasn't.
  // Eight chairs on one ellipse. Everyone who came sits in the top half;
  // the bottom half is the hole in the room, and it is deliberately the
  // half nearest the reader.
  var SEATS = [
    { l: "Digital team",           x: 34.3, y: 19.5, in: true  },
    { l: "Sales",                  x: 65.7, y: 19.5, in: true  },
    { l: "boost Solution\nDesign", x: 87.9, y: 37.4, in: true  },
    { l: "Claims &amp; fraud",        x: 87.9, y: 62.6, in: false },
    { l: "Ops &amp; WFM",             x: 65.7, y: 80.5, in: false },
    { l: "Contact centre\nreps",   x: 34.3, y: 80.5, in: false },
    { l: "Compliance",             x: 12.1, y: 62.6, in: false },
    { l: "boost Project\nLead",    x: 12.1, y: 37.4, in: true  }
  ];

  // Scene 05: the fifteen, placed on volume (x) × cost to serve (y).
  // band: "w1" high/high, "w2" high volume/low cost, "assist" low/high, "park" low/low.
  var CASES = [
    { n: 1,  t: "Claim status",           x: 84, y: 74, band: "w1" },
    { n: 2,  t: "Report a claim (motor)", x: 72, y: 86, band: "w1" },
    { n: 3,  t: "Policy documents",       x: 88, y: 22, band: "w2" },
    { n: 4,  t: "Change of address",      x: 76, y: 17, band: "w2" },
    { n: 5,  t: "Premium explained",      x: 66, y: 62, band: "w1" },
    { n: 6,  t: "Payment &amp; invoice",      x: 81, y: 58, band: "w1" },
    { n: 7,  t: "Card / direct debit",    x: 62, y: 27, band: "w2" },
    { n: 8,  t: "Renewal quote",          x: 57, y: 38, band: "w2" },
    { n: 9,  t: "Add a driver",           x: 34, y: 71, band: "assist" },
    { n: 10, t: "Complaint intake",       x: 21, y: 84, band: "assist" },
    { n: 11, t: "Fraud escalation",       x: 12, y: 92, band: "assist" },
    { n: 12, t: "Travel cover check",     x: 41, y: 30, band: "park" },
    { n: 13, t: "Pet policy queries",     x: 24, y: 22, band: "park" },
    { n: 14, t: "Broker callback",        x: 16, y: 41, band: "park" },
    { n: 15, t: "Cancel a policy",        x: 37, y: 55, band: "park" }
  ];

  // Scene 06: who signs, and what they are signing.
  var SIGNS = [
    { r: "Contact centre lead", w: "the volumes &middot; the peaks &middot; the reality" },
    { r: "Finance",             w: "the cost per call &middot; the baseline" },
    { r: "Ops &amp; WFM",          w: "the shift impact &middot; the 22% after hours" },
    { r: "Compliance",          w: "what a bot may say &middot; and may not" },
    { r: "Digital / product",   w: "the roadmap fit &middot; the intake for #16" },
    { r: "boost solution design", w: "the design &middot; the measurement plan" }
  ];

  // Scene 07: the worked example, from one use case up to the star.
  var TRACE = [
    { k: "The use case",  b: "<b>Claim status</b> &mdash; highest volume, highest cost to serve, asked at 22:40 as often as at 10:40." },
    { k: "The outcome",   b: "<b>Placeholder: 35% of status calls resolved end-to-end</b> by month six, measured against a baseline taken in week one." },
    { k: "The North Star", b: "<b>A customer never calls to ask where their claim is</b> &mdash; because they were already told." }
  ];

  // Scene 08: the outcome wall. One ask per post-it.
  var NOTES = [
    { need: "Twelve months of call reason codes and after-hours volumes",
      team: "Customer &rarr; contact centre analytics", icon: "i-data", bg: "#FBEFA6", ink: "#5A4A00", rot: "-2.2deg" },
    { need: "The source behind NOK 42 &mdash; or a number finance will stand behind",
      team: "Customer &rarr; finance", icon: "i-coin", bg: "#F7D6E7", ink: "#6D1F4B", rot: "1.8deg" },
    { need: "Two contact centre reps in workshop two, for a full day",
      team: "Customer &rarr; operations", icon: "i-seat", bg: "#CDEFE2", ink: "#0E4A39", rot: "-1.4deg" },
    { need: "One primary success metric, dated, named and signed",
      team: "Sales &amp; customer sponsor", icon: "i-target", bg: "#E3D4EE", ink: "#421148", rot: "2.4deg" }
  ];

  /* ── Build ───────────────────────────────────────────────── */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  var icon = function (id, cls) {
    return '<svg class="' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>';
  };

  // 01 · the fifteen tiles
  (function () {
    var g = $("#cases-grid");
    if (!g) return;
    for (var i = 1; i <= 15; i++) {
      var t = el("span", "case-tile", String(i));
      t.style.setProperty("--i", i);
      g.appendChild(t);
    }
  })();

  // 03 · the seats
  (function () {
    var ul = $("#room-seats");
    if (!ul) return;
    SEATS.forEach(function (s, i) {
      var li = el("li", "seat" + (s.in ? "" : " seat--out"));
      li.style.setProperty("--x", s.x + "%");
      li.style.setProperty("--y", s.y + "%");
      li.style.setProperty("--i", i);
      li.innerHTML =
        '<span class="seat-av">' + icon(s.in ? "i-seat" : "i-q") + "</span>" +
        '<span class="seat-l">' + s.l.replace(/\n/g, "<br>") + "</span>" +
        (s.in ? "" : '<span class="seat-tag">absent</span>');
      ul.appendChild(li);
    });
  })();

  // 05 · the dots and the wave-one list
  (function () {
    var d = $("#dots"), w = $("#wave-list");
    if (!d) return;
    CASES.forEach(function (c, i) {
      var s = el("span", "dot dot--" + c.band, String(c.n));
      s.style.setProperty("--x", c.x + "%");
      s.style.setProperty("--y", c.y + "%");
      s.style.setProperty("--i", i);
      s.title = c.t;
      d.appendChild(s);
    });
    if (!w) return;
    CASES.filter(function (c) { return c.band === "w1"; }).forEach(function (c, i) {
      var li = el("li", null,
        '<span class="wave-n">' + c.n + "</span>" + c.t +
        '<span class="wave-m">wave 1</span>');
      li.style.setProperty("--i", i);
      w.appendChild(li);
    });
  })();

  // 06 · the sign-off strip
  (function () {
    var ul = $("#signs");
    if (!ul) return;
    // A signature is a wobble with a capital at the front and a flourish at
    // the end. Seeded per row so each name keeps its own hand on every replay.
    function hand(seed) {
      var s = seed * 7919 + 13;
      var rnd = function () { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
      var x = 6, d = "M6 29";
      d += " c" + (2 + rnd() * 3).toFixed(1) + " -" + (17 + rnd() * 8).toFixed(1) +
           " " + (9 + rnd() * 5).toFixed(1) + " -" + (20 + rnd() * 7).toFixed(1) +
           " " + (13 + rnd() * 4).toFixed(1) + " " + (3 + rnd() * 4).toFixed(1);
      x += 15;
      for (var i = 0; i < 7 && x < 122; i++) {
        var dx = 13 + rnd() * 9, hgt = 9 + rnd() * 13, dy = (rnd() - 0.5) * 7;
        d += " c" + (dx * 0.25).toFixed(1) + " -" + hgt.toFixed(1) +
             " " + (dx * 0.7).toFixed(1) + " -" + (hgt * 0.75).toFixed(1) +
             " " + dx.toFixed(1) + " " + dy.toFixed(1);
        x += dx;
      }
      return d + " c9 5 15 -1 21 -11";
    }
    SIGNS.forEach(function (s, i) {
      var li = el("li", "sign");
      li.style.setProperty("--i", i);
      li.innerHTML =
        '<span class="sign-role">' + s.r + "</span>" +
        '<span class="sign-what">' + s.w + "</span>" +
        '<span class="sign-line">' +
          '<svg class="sign-ink" viewBox="0 0 160 38" aria-hidden="true"><path d="' + hand(i + 1) + '"/></svg>' +
          '<span class="sign-ok">' + icon("i-check", "mini") + " signed</span>" +
        "</span>";
      ul.appendChild(li);
    });
  })();

  // 07 · the trace
  (function () {
    var box = $("#trace");
    if (!box) return;
    TRACE.forEach(function (t, i) {
      if (i) {
        var a = el("span", "node-arrow", icon("i-arrow"));
        a.style.setProperty("--i", i);
        box.appendChild(a);
      }
      var n = el("article", "node",
        '<span class="node-k">' + t.k + "</span>" +
        '<span class="node-b">' + t.b + "</span>");
      n.style.setProperty("--i", i);
      box.appendChild(n);
    });
  })();

  // 08 · the post-its
  (function () {
    var ul = $("#notes");
    if (!ul) return;
    NOTES.forEach(function (n, i) {
      var li = el("li", "note");
      li.style.setProperty("--i", i);
      li.style.setProperty("--rot", n.rot);
      li.style.setProperty("--n-bg", n.bg);
      li.style.setProperty("--n-ink", n.ink);
      li.style.setProperty("--tape-rot", (i % 2 ? 2.5 : -3) + "deg");
      li.innerHTML =
        '<span class="note-ic">' + icon(n.icon) + "</span>" +
        '<span class="note-need">' + n.need + "</span>" +
        '<span class="note-team">' + n.team + "</span>";
      ul.appendChild(li);
    });
  })();

  /* ── The projector ───────────────────────────────────────── */
  var stage    = $("#stage"),
      cover    = $("#cover"),
      playBtn  = $("#play-btn"),
      scenes   = Array.prototype.slice.call(document.querySelectorAll(".scene")),
      rail     = $("#rail"),
      toggle   = $("#toggle"),
      hudNo    = $("#hud-no"),
      hudChap  = $("#hud-chapter");

  var idx = 0, playing = false, t0 = 0, elapsed = 0, raf = 0, segs = [];

  var dur = function (i) {
    var d = parseInt(scenes[i].dataset.dur, 10) || 10000;
    return reduced ? Math.max(4000, d * 0.6) : d;
  };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  // progress rail: one segment per scene, each a jump target
  scenes.forEach(function (s, i) {
    var b = el("button", "rail-seg");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", "Scene " + pad(i + 1) + ": " + (s.dataset.chapter || ""));
    b.addEventListener("click", function () { go(i, true); });
    rail.appendChild(b);
    segs.push(b);
  });

  function paintRail(p) {
    segs.forEach(function (s, i) {
      s.classList.toggle("is-done", i < idx);
      s.classList.toggle("is-live", i === idx);
      s.style.setProperty("--p", i < idx ? 1 : i === idx ? p : 0);
    });
  }

  function countUp(scene) {
    scene.querySelectorAll(".count").forEach(function (c) {
      var to = parseFloat(c.dataset.to) || 0,
          suffix = c.dataset.suffix || "",
          start = performance.now(),
          run = reduced ? 1 : 1100;
      (function step(now) {
        var k = Math.min(1, (now - start) / run),
            e = 1 - Math.pow(1 - k, 3);
        c.textContent = Math.round(to * e) + suffix;
        if (k < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  function go(i, keepPlaying) {
    idx = (i + scenes.length) % scenes.length;
    // Drop every scene, reflow, then light the new one. Re-adding the class
    // is what restarts the entrance animations, including on a replay of the
    // scene we are already sitting on.
    scenes.forEach(function (s) { s.classList.remove("is-live"); });
    var live = scenes[idx];
    void live.offsetWidth;
    live.classList.add("is-live");
    live.scrollTop = 0;
    stage.classList.toggle("is-night", live.classList.contains("night"));
    hudNo.textContent = pad(idx + 1);
    hudChap.textContent = live.dataset.chapter || "";
    elapsed = 0; t0 = performance.now();
    paintRail(0);
    countUp(live);
    if (keepPlaying !== false && playing) tick();
  }

  function tick() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function loop(now) {
      if (!playing) return;
      var p = Math.min(1, (elapsed + (now - t0)) / dur(idx));
      paintRail(p);
      if (p >= 1) {
        if (idx === scenes.length - 1) { setPlaying(false); return; }
        elapsed = 0; go(idx + 1);
        return;
      }
      raf = requestAnimationFrame(loop);
    });
  }

  function setPlaying(on) {
    playing = on;
    toggle.innerHTML = icon(on ? "i-pause" : "i-play");
    toggle.setAttribute("aria-label", on ? "Pause" : "Play");
    if (on) { t0 = performance.now(); tick(); }
    else { elapsed += performance.now() - t0; cancelAnimationFrame(raf); }
  }

  function open() {
    cover.classList.add("is-out");
    stage.hidden = false;
    setTimeout(function () { cover.hidden = true; }, 500);
    go(0, false);
    setPlaying(true);
  }

  function close() {
    setPlaying(false);
    stage.hidden = true;
    cover.hidden = false;
    void cover.offsetWidth;
    cover.classList.remove("is-out");
  }

  playBtn.addEventListener("click", open);

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (!b) return;
    var a = b.dataset.act;
    if (a === "next") { elapsed = 0; go(idx + 1); }
    else if (a === "prev") { elapsed = 0; go(idx - 1); }
    else if (a === "toggle") setPlaying(!playing);
    else if (a === "restart") { elapsed = 0; go(0); setPlaying(true); }
    else if (a === "exit") close();
  });

  document.addEventListener("keydown", function (e) {
    if (stage.hidden) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      return;
    }
    if (e.key === "ArrowRight") { e.preventDefault(); elapsed = 0; go(idx + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); elapsed = 0; go(idx - 1); }
    else if (e.key === " ") { e.preventDefault(); setPlaying(!playing); }
    else if (e.key === "Escape") close();
    else if (e.key === "Home") { elapsed = 0; go(0); }
  });

  // Pause when the tab is hidden — nothing worse than coming back to slide nine.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && playing) setPlaying(false);
  });
})();
