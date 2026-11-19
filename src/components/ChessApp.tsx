import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { BookOpen, Shield, Timer, X } from "lucide-react";
import { PieceArt, pieceName } from "@/components/Pieces";
import {
  ARMOR_SPAWN_MS,
  BOMB_SPAWN_MS,
  type GameState,
  type Piece,
  type PieceKind,
  type Pos,
  type Spell,
  buffLabel,
  castSpell,
  choosePromotion,
  completeAnim,
  formatClock,
  highlightFor,
  legalMoves,
  legalShots,
  menuState,
  onBoard,
  spawnItems,
  squaresInZone,
  startGame,
  tryMove,
  tryShot,
} from "@/game/logic";

function blip(freq: number, dur = 0.05) {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = (blip as unknown as { ctx?: AudioContext }).ctx ?? new Ctx();
    (blip as unknown as { ctx?: AudioContext }).ctx = ctx;
    if (ctx.state === "suspended") void ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.value = 0.035;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
  } catch {
    /* audio is optional */
  }
}

function samePos(a: Pos | null, b: Pos | null): boolean {
  return !!a && !!b && a.r === b.r && a.c === b.c;
}

export function ChessApp() {
  const [state, setState] = useState<GameState>(menuState);
  const [now, setNow] = useState(0);
  const [hover, setHover] = useState<Pos | null>(null);
  const [ghost, setGhost] = useState<{ x: number; y: number; piece: Piece } | null>(null);
  const ref = useRef(state);
  ref.current = state;
  const boardRef = useRef<HTMLDivElement>(null);
  const press = useRef<{ from: Pos; x: number; y: number; dragging: boolean; pid: number } | null>(null);
  const completing = useRef(false);

  const apply = (next: GameState) => {
    ref.current = next;
    setState(next);
  };

  useEffect(() => {
    let frame = 0;
    let lastUi = 0;
    const loop = (t: number) => {
      const current = ref.current;
      if (current.anim && t - current.anim.t0 >= current.anim.dur) {
        if (!completing.current) {
          completing.current = true;
          const next = completeAnim(current);
          ref.current = next;
          setState(next);
          blip(next.phase === "gameover" ? 196 : 740, 0.08);
        }
      } else if (!current.anim) {
        completing.current = false;
        if (current.phase === "playing" || current.phase === "promotion") {
          const spawned = spawnItems(current, t);
          if (spawned !== current) {
            ref.current = spawned;
            setState(spawned);
          }
        }
      }
      if (current.anim || t - lastUi > 250) {
        setNow(t);
        lastUi = t;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const current = ref.current;
      if (current.bookOpen) apply({ ...current, bookOpen: false });
      else if (current.targeting) apply({ ...current, targeting: null, log: "Выбор отменён." });
      else if (current.selected) apply({ ...current, selected: null });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const squareAt = (x: number, y: number): Pos | null => {
    const el = boardRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const c = Math.floor(((x - rect.left) / rect.width) * 8);
    const r = Math.floor(((y - rect.top) / rect.height) * 8);
    return onBoard(r, c) ? { r, c } : null;
  };

  const aim = (current: GameState, to: Pos) => {
    const targeting = current.targeting;
    if (!targeting) return;
    if (targeting.spell.targets === 2 && !targeting.first) {
      apply({ ...current, targeting: { spell: targeting.spell, first: to }, log: "Теперь вторая клетка." });
      return;
    }
    const targets = targeting.first ? [targeting.first, to] : [to];
    apply(castSpell(current, targeting.spell, targets, performance.now()));
  };

  const release = (from: Pos, to: Pos | null, dragged: boolean) => {
    const current = ref.current;
    if (current.phase === "menu" || current.phase === "gameover" || current.phase === "promotion" || current.anim) return;
    if (current.targeting) {
      if (to) aim(current, to);
      return;
    }
    if (dragged && to) {
      const moved = tryMove(current, from, to, performance.now());
      if (moved !== current) {
        blip(620, 0.045);
        apply(moved);
        return;
      }
    }
    if (!to) {
      apply({ ...current, selected: null });
      return;
    }
    const sel = current.selected;
    if (sel && !samePos(sel, to)) {
      const shooter = current.board[sel.r][sel.c];
      const armed = !!shooter && (shooter.projectile || shooter.gold);
      if (armed && legalShots(current, sel.r, sel.c).some((shot) => shot.r === to.r && shot.c === to.c)) {
        blip(880, 0.06);
        apply(tryShot(current, sel, to, performance.now()));
        return;
      }
      if (!armed && legalMoves(current, sel.r, sel.c).some((move) => move.r === to.r && move.c === to.c)) {
        blip(620, 0.045);
        apply(tryMove(current, sel, to, performance.now()));
        return;
      }
    }
    const piece = current.board[to.r][to.c];
    if (piece && piece.color === current.turn && piece.frozen === 0 && !dragged) {
      apply({ ...current, selected: { r: to.r, c: to.c } });
    } else if (!dragged) {
      apply({ ...current, selected: null });
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const current = ref.current;
    if (current.bookOpen || current.anim || current.phase === "promotion" || current.phase === "gameover" || current.phase === "menu") return;
    const sq = squareAt(event.clientX, event.clientY);
    if (!sq) return;
    event.preventDefault();
    press.current = { from: sq, x: event.clientX, y: event.clientY, dragging: false, pid: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const sq = squareAt(event.clientX, event.clientY);
    setHover((prev) => (prev?.r === sq?.r && prev?.c === sq?.c ? prev : sq));
    const active = press.current;
    if (!active || active.pid !== event.pointerId || ref.current.targeting) return;
    if (!active.dragging && Math.hypot(event.clientX - active.x, event.clientY - active.y) > 8) active.dragging = true;
    if (!active.dragging) return;
    const piece = ref.current.board[active.from.r][active.from.c];
    if (piece && piece.color === ref.current.turn && piece.frozen === 0) {
      setGhost({ x: event.clientX, y: event.clientY, piece });
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const active = press.current;
    press.current = null;
    setGhost(null);
    if (!active || active.pid !== event.pointerId) return;
    release(active.from, squareAt(event.clientX, event.clientY), active.dragging);
  };

  const pickSpell = (spell: Spell) => {
    const current = ref.current;
    if (current.used.includes(spell.id) || current.anim) return;
    if (spell.targets === 0) {
      blip(540, 0.06);
      apply(castSpell(current, spell, [], performance.now()));
      return;
    }
    apply({
      ...current,
      bookOpen: false,
      selected: null,
      targeting: { spell, first: null },
      log: spell.targets === 2 ? `${spell.name}: выберите первую клетку.` : `${spell.name}: выберите клетку на доске.`,
    });
  };

  if (state.phase === "menu") {
    return (
      <main className="relative min-h-dvh overflow-hidden bg-ink text-parchment">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
          {Array.from({ length: 64 }, (_, i) => (
            <div key={i} className={(Math.floor(i / 8) + (i % 8)) % 2 === 0 ? "bg-light-sq" : "bg-dark-sq"} />
          ))}
        </div>
        <div className="relative mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-4 py-10">
          <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-line bg-ink px-6 py-10 text-center sm:px-10">
          <p className="text-sm tracking-widest text-gold uppercase">книга печатей</p>
          <h1 className="font-display text-5xl leading-none text-parchment sm:text-6xl">Шахматы Resjka</h1>
          <p className="max-w-md text-base leading-relaxed text-muted">
            Обычная партия, пока не откроете книгу. Шесть случайных печатей, броня на центре и снаряды, которые не прощают ближний бой.
          </p>
          <button
            type="button"
            data-testid="play"
            className="min-h-12 rounded-xl bg-gold px-10 py-3 font-semibold text-ink"
            onClick={() => {
              const t = performance.now();
              setNow(t);
              apply(startGame(t));
            }}
          >
            Играть
          </button>
          <ul className="max-w-md space-y-2 text-left text-sm leading-relaxed text-muted">
            <li>Фигура без снаряда ходит нажатием: сначала она, потом клетка.</li>
            <li>Снаряд и золото: перетащите, чтобы пойти. Нажмите по цели, чтобы выстрелить — фигура остаётся.</li>
            <li>Золото бьёт врагов и даёт щит своим. Броню можно сбивать вплотную.</li>
          </ul>
          </div>
        </div>
      </main>
    );
  }

  const clock = now > 0 ? now : state.startedAt;
  const armorLeft = formatClock(ARMOR_SPAWN_MS - (clock - state.armorAt));
  const bombLeft = formatClock(BOMB_SPAWN_MS - (clock - state.bombAt));
  const selected = state.selected;
  const selectedPiece = selected ? state.board[selected.r][selected.c] : null;
  const armed = !!selectedPiece && (selectedPiece.projectile || selectedPiece.gold);
  const moves = selected && !state.targeting && !state.anim ? legalMoves(state, selected.r, selected.c) : [];
  const shots = selected && !state.targeting && !state.anim ? legalShots(state, selected.r, selected.c) : [];
  const marks = new Set<string>();
  if (state.targeting && hover) {
    for (const sq of highlightFor(state.targeting.spell.id, hover.r, hover.c)) marks.add(`${sq.r}-${sq.c}`);
  }
  const frozen = new Set<string>();
  for (const zone of state.frozenZones) {
    for (const sq of squaresInZone(zone.r, zone.c)) frozen.add(`${sq.r}-${sq.c}`);
  }
  const anim = state.anim;
  let orb: { x: number; y: number; ink: string } | null = null;
  if (anim && clock > 0) {
    const p = Math.min(1, (clock - anim.t0) / anim.dur);
    const ease = 1 - (1 - p) * (1 - p);
    orb = {
      x: ((anim.from.c + (anim.to.c - anim.from.c) * ease + 0.5) / 8) * 100,
      y: ((anim.from.r + (anim.to.r - anim.from.r) * ease + 0.5) / 8) * 100,
      ink: anim.type === "bomb" ? "var(--color-blood)" : anim.ink === "gold" ? "var(--color-gold)" : "var(--color-blood)",
    };
  }
  const files = state.trip?.files ?? ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = state.trip?.ranks ?? ["8", "7", "6", "5", "4", "3", "2", "1"];
  const turnLabel = state.turn === "w" ? "Ход белых" : "Ход чёрных";

  return (
    <main className="min-h-dvh bg-ink text-parchment">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-4 lg:flex-row lg:items-start">
        <section className="mx-auto w-full max-w-xl flex-1">
          <header className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-4xl leading-none">Шахматы Resjka</h1>
              <p className="mt-1 text-sm text-muted">
                {turnLabel}
                {state.check && state.phase === "playing" ? " · шах" : ""}
                {" · "}ход {state.moveCounter}
              </p>
            </div>
            <button
              type="button"
              className="min-h-11 rounded-xl border border-line px-3 text-sm text-muted"
              onClick={() => apply(menuState())}
            >
              Меню
            </button>
          </header>

          {state.trip && (
            <p className="mb-2 text-center font-display text-2xl text-gold">Вторая доска — буквы и цифры врут</p>
          )}

          <div className="relative">
            {state.trip && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-3 -left-5 -z-10 grid w-full grid-cols-8 grid-rows-8 overflow-hidden rounded-xl opacity-90"
              >
                {state.trip.colors.flat().map((color, i) => (
                  <div key={i} style={{ background: color }} />
                ))}
              </div>
            )}
            <div
              ref={boardRef}
              data-testid="board"
              className="relative grid aspect-square w-full touch-none grid-cols-8 overflow-hidden rounded-xl border border-line select-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => {
                press.current = null;
                setGhost(null);
              }}
              onPointerLeave={() => setHover(null)}
            >
              {state.board.map((row, r) =>
                row.map((piece, c) => {
                  const key = `${r}-${c}`;
                  const light = (r + c) % 2 === 0;
                  const move = moves.find((item) => item.r === r && item.c === c);
                  const shot = shots.find((item) => item.r === r && item.c === c);
                  const isSel = samePos(selected, { r, c });
                  const portal = state.teleports.some((tp) => tp.r === r && tp.c === c);
                  const item = state.items.find((entry) => entry.r === r && entry.c === c);
                  const aimed = marks.has(key);
                  const iced = frozen.has(key);
                  const hide = state.blindTurns > 0;
                  const dim = ghost && isSel;
                  return (
                    <div
                      key={key}
                      data-sq={key}
                      className={light && !state.trip ? "relative bg-light-sq" : "relative bg-dark-sq"}
                      style={state.trip ? { background: state.trip.colors[r][c] } : undefined}
                    >
                      {aimed && <span className="absolute inset-0 bg-blood/45" />}
                      {iced && <span className="absolute inset-0 bg-ice/50" />}
                      {isSel && <span className="pointer-events-none absolute inset-0 border-2 border-gold" />}
                      {state.targeting?.first && samePos(state.targeting.first, { r, c }) && (
                        <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-gold" />
                      )}
                      {portal && (
                        <>
                          <span className="pointer-events-none absolute inset-2 rounded-full border-2 border-ice" />
                          <span className="pointer-events-none absolute inset-4 rounded-full border border-parchment" />
                        </>
                      )}
                      {item && (
                        <span
                          className={
                            item.type === "armor"
                              ? "absolute top-1/2 left-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted"
                              : "absolute top-1/2 left-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood"
                          }
                        />
                      )}
                      {move && !shot && move.kind === "move" && (
                        <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/40" />
                      )}
                      {move && !shot && move.kind !== "move" && (
                        <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-blood" />
                      )}
                      {shot && (
                        <span
                          className={
                            shot.kind === "shield"
                              ? "absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-gold/50"
                              : "absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blood bg-blood/60"
                          }
                        />
                      )}
                      {piece && !hide && (
                        <span className={dim ? "absolute inset-0 opacity-40" : "absolute inset-0"} aria-label={pieceName(piece.color, piece.kind)}>
                          {piece.armor > 0 && <span className="absolute inset-1 rounded-full border-2 border-parchment" />}
                          <PieceArt color={piece.color} kind={piece.kind} />
                          {piece.projectile && <span className="absolute top-1 right-3 size-2.5 rounded-full bg-blood" />}
                          {piece.gold && <span className="absolute top-1 left-3 size-2.5 rounded-full bg-gold" />}
                          {piece.armor > 0 && (
                            <span className="absolute right-0.5 bottom-0.5 text-xs font-semibold text-ink">{piece.armor}</span>
                          )}
                        </span>
                      )}
                      {c === 0 && (
                        <span
                          className={
                            state.trip
                              ? "absolute top-0.5 left-0.5 rounded bg-ink/75 px-1 text-xs font-semibold text-parchment"
                              : light
                                ? "absolute top-0.5 left-0.5 text-xs font-semibold text-dark-sq"
                                : "absolute top-0.5 left-0.5 text-xs font-semibold text-light-sq"
                          }
                        >
                          {ranks[r]}
                        </span>
                      )}
                      {r === 7 && (
                        <span
                          className={
                            state.trip
                              ? "absolute right-0.5 bottom-0.5 rounded bg-ink/75 px-1 text-xs font-semibold text-parchment"
                              : light
                                ? "absolute right-0.5 bottom-0.5 text-xs font-semibold text-dark-sq"
                                : "absolute right-0.5 bottom-0.5 text-xs font-semibold text-light-sq"
                          }
                        >
                          {files[c]}
                        </span>
                      )}
                    </div>
                  );
                }),
              )}
              {orb && (
                <span
                  className="pointer-events-none absolute z-10 size-5 rounded-full"
                  style={{
                    left: `${orb.x}%`,
                    top: `${orb.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: orb.ink,
                    boxShadow: "0 0 16px var(--color-gold)",
                  }}
                />
              )}
              {state.check && state.phase === "playing" && (
                <p key={state.checkPulse} className="check-pop pointer-events-none absolute top-1/2 left-1/2 z-10 font-display text-6xl text-blood">
                  ШАХ!
                </p>
              )}
            </div>
          </div>

          {armed && (
            <p className="mt-3 text-center text-sm text-gold">
              {selectedPiece?.gold
                ? "Перетащите, чтобы пойти. Нажмите по врагу — удар, по своему — щит."
                : "Перетащите, чтобы пойти. Нажмите по врагу, чтобы выстрелить. Фигура не двигается."}
            </p>
          )}
          {state.targeting && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-blood bg-panel px-3 py-2">
              <p className="text-sm">
                {state.targeting.spell.name}
                {state.targeting.spell.targets === 2 && !state.targeting.first ? " — первая клетка" : ""}
                {state.targeting.spell.targets === 2 && state.targeting.first ? " — вторая клетка" : ""}
                {state.targeting.spell.targets === 1 ? " — ведите по доске" : ""}
              </p>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm text-muted"
                onClick={() => apply({ ...ref.current, targeting: null, log: "Выбор отменён. Печать не потрачена." })}
              >
                <X className="size-4" />
                Отмена
              </button>
            </div>
          )}
          <p className="sr-only" aria-live="polite">
            {turnLabel}. {state.log}
          </p>
        </section>

        <aside className="w-full rounded-2xl border border-line bg-panel p-4 lg:w-80">
          <button
            type="button"
            data-testid="book"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold font-semibold text-ink disabled:opacity-40"
            disabled={!!state.anim || state.phase !== "playing" || !!state.targeting}
            onClick={() => apply({ ...ref.current, bookOpen: true, selected: null })}
          >
            <BookOpen className="size-5" />
            Книга печатей
          </button>
          <p className="mt-2 text-center text-xs text-muted">Осталось {state.spells.length - state.used.length} из {state.spells.length}</p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2 text-muted">
              <Shield className="size-4 text-parchment" />
              Броня через {armorLeft}
            </p>
            <p className="flex items-center gap-2 text-muted">
              <Timer className="size-4 text-blood" />
              Снаряд через {bombLeft}
            </p>
          </div>

          {(state.buffs.w.length > 0 || state.buffs.b.length > 0 || state.blindTurns > 0 || state.frozenZones.length > 0) && (
            <ul className="mt-4 space-y-1 text-sm">
              {state.buffs.w.map((id) => (
                <li key={`w-${id}`}>Белые: {buffLabel(id)}</li>
              ))}
              {state.buffs.b.map((id) => (
                <li key={`b-${id}`}>Чёрные: {buffLabel(id)}</li>
              ))}
              {state.blindTurns > 0 && <li>Слепота: ещё {state.blindTurns} ход.</li>}
              {state.frozenZones.length > 0 && (
                <li>Синие клетки: ещё {Math.max(...state.frozenZones.map((z) => z.turns))} ход.</li>
              )}
            </ul>
          )}

          <div className="mt-4 border-t border-line pt-4">
            <h2 className="font-display text-2xl text-gold">{state.lastSpell ? state.lastSpell.name : "Печать"}</h2>
            <p className="mt-2 text-sm leading-relaxed text-parchment">
              {state.lastSpell?.desc ?? "Откройте книгу. Печать тратится сразу и в этой партии больше не вернётся."}
            </p>
            {state.log && <p className="mt-3 text-sm leading-relaxed text-muted">{state.log}</p>}
          </div>
        </aside>
      </div>

      {state.bookOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/80 p-3 sm:items-center">
          <button type="button" aria-label="Закрыть книгу" className="absolute inset-0" onClick={() => apply({ ...ref.current, bookOpen: false })} />
          <div className="relative z-10 max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-3xl">Книга</h2>
              <button type="button" className="min-h-11 px-2 text-sm text-muted" onClick={() => apply({ ...ref.current, bookOpen: false })}>
                Закрыть
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {state.spells.map((spell) => {
                const used = state.used.includes(spell.id);
                return (
                  <button
                    key={spell.id}
                    type="button"
                    disabled={used}
                    onClick={() => pickSpell(spell)}
                    className="min-h-16 rounded-xl border border-line bg-panel-2 p-3 text-left disabled:opacity-40"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-display text-3xl">{spell.char}</span>
                      <span className={used ? "font-semibold line-through" : "font-semibold"}>{spell.name}</span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{spell.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {state.phase === "promotion" && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-panel p-5 text-center">
            <h2 className="font-display text-3xl">Выберите фигуру</h2>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {(["Q", "R", "B", "N"] as PieceKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  className="flex aspect-square items-center justify-center rounded-xl bg-dark-sq"
                  onClick={() => apply(choosePromotion(ref.current, kind))}
                  aria-label={pieceName(state.turn, kind)}
                >
                  <span className="size-14">
                    <PieceArt color={state.turn} kind={kind} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {state.phase === "gameover" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/85 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-panel px-6 py-8 text-center">
            <h2 className="font-display text-5xl leading-tight">{state.endMessage}</h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" className="min-h-12 rounded-xl bg-gold px-6 font-semibold text-ink" onClick={() => apply(menuState())}>
                Играть
              </button>
              <button
                type="button"
                className="min-h-12 rounded-xl border border-gold px-6 font-semibold text-gold"
                onClick={() => {
                  const t = performance.now();
                  setNow(t);
                  apply(startGame(t));
                }}
              >
                Реванш
              </button>
            </div>
          </div>
        </div>
      )}

      {ghost && (
        <div className="pointer-events-none fixed z-50 size-16" style={{ left: ghost.x, top: ghost.y, transform: "translate(-50%, -60%)" }}>
          <PieceArt color={ghost.piece.color} kind={ghost.piece.kind} />
        </div>
      )}
    </main>
  );
}
