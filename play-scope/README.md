# Play Scope

An animated, self-playing explainer on **scoping a voice expansion** — built for
boost.ai solution design, in the visual grammar of a document that argues with
itself: solid cards for what exists, dashed ghost slots for what is missing.

One button, nine scenes, roughly three minutes.

> **Everything on the slides is placeholder.** Every figure, name, use case and
> quote is a stand-in, written to be replaced. The structure, the motion and the
> visual grammar are the deliverable.

---

## The case it answers

A pre-signature voice expansion with an existing chat customer (Nordic insurance).
Chat has run well for two years. Sales has verbally promised "significant
automation in year one". Scope was set in a single workshop with the customer's
digital team — no contact centre reps in the room — and fifteen voice use cases
came out of it.

| | |
|---|---|
| 310k | calls a month |
| 22% | arrive outside opening hours (recorded message today) |
| 41% | land in "General enquiries", with no intent data |
| NOK 42 | claimed cost per call — **no source shared** |

### Challenge 01 — where the moment breaks *(scenes 03–04)*

1. **The room.** Eight chairs on one ellipse: the four that were filled sit in
   the top half, the four that were empty in the half nearest the reader.
   Contact centre, ops/WFM, claims and compliance were not there.
2. **No measurable outcome.** A gauge with no scale and no needle — "significant"
   is a word, not a target — and no standing intake for use case sixteen.
3. **The data horizon.** A small solid circle (two years of chat) inside a large
   dashed one (IVR paths, WFM peaks, claims backlog, agent desktop, NPS
   verbatims, repeat-call rate). We are scoping voice from the only dataset we
   happen to own.

### Challenge 02 — what good looks like *(scenes 05–06)*

All fifteen use cases plotted on **call volume × cost to serve**, the two axes
the customer already has sourced numbers for. The high/high quadrant lights up
as wave one; the rest get a date, not a no. Then a sign-off strip: six roles,
six signatures, one line each.

### Challenge 03 — the North Star *(scene 07)*

The star is drawn, the statement is said out loud, and the first use case is
traced up through its measurable outcome to the star it serves.

Scene 08 is the outcome wall — one ask per post-it, what you need and which team
you're asking. Scene 09 closes on the North Star.

---

## Running it

Static files, no build step, no dependencies.

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Editing it

| What | Where |
|---|---|
| Scene copy, titles, stats | `index.html` — one `<section class="scene">` per scene |
| Seats, use-case plot points, signatories, post-its | `js/scope.js` — the `SEATS`, `CASES`, `SIGNS`, `TRACE` and `NOTES` arrays at the top |
| Scene duration | `data-dur` (ms) on each `<section class="scene">` |
| Chapter label in the top bar | `data-chapter` on each scene |
| Colours, type scale, motion | the token block at the top of `css/styles.css` |

Plot points in `CASES` are `x` (call volume) and `y` (cost to serve) as
percentages, `band` picks the quadrant treatment: `w1`, `w2`, `assist`, `park`.

### Controls

`Space` play/pause · `←` `→` scenes · `Home` first scene · `Esc` back to cover.
The rail at the bottom is clickable — each segment jumps to its scene.
Playback pauses when the tab loses focus, and `prefers-reduced-motion` drops the
entrance animations and shortens every scene.

---

## Design notes

Typography and layout grammar follow [unformentoo.org](https://unformentoo.org):
Bricolage Grotesque for display, IBM Plex Mono for labels and captions, a
paper-coloured stage bookended by two fixed "night" scenes, a grain overlay, and
the solid-versus-dashed distinction doing the arguing.

The palette is boost.ai's, taken from their own stylesheet — purple `#59195D`,
teal `#208269` / `#36B595`, pink `#E383B7`, ochre `#D5B000` — with Nunito Sans,
boost's brand face, carrying the body text.

Fonts are vendored under `assets/fonts/` (latin + latin-ext subsets, ~300 KB
total), so the page has no external requests at all. See `NOTICE.md`.
