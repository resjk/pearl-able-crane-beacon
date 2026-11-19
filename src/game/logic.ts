export type Color = "w" | "b";
export type PieceKind = "K" | "Q" | "R" | "B" | "N" | "P";
export type BuffId = "pawn_rush" | "cruel_pawns" | "peaceful_pawns";

export type SpellId =
  | "teleport"
  | "give_projectile"
  | "kill_any"
  | "swap"
  | "rewind"
  | "pawn_rush"
  | "cruel_pawns"
  | "peaceful_pawns"
  | "bombard_row"
  | "bombard_col"
  | "freeze"
  | "bomb"
  | "fortune"
  | "nothing"
  | "trip"
  | "betrayal"
  | "friendship"
  | "blindness"
  | "gold"
  | "genghis";

export type Piece = {
  color: Color;
  kind: PieceKind;
  armor: number;
  projectile: boolean;
  gold: boolean;
  moved: boolean;
  frozen: number;
};

export type Board = (Piece | null)[][];
export type Pos = { r: number; c: number };

export type Spell = {
  char: string;
  id: SpellId;
  name: string;
  desc: string;
  targets: 0 | 1 | 2;
};

export type Item = { r: number; c: number; type: "armor" | "bomb" };
export type FrozenZone = { r: number; c: number; turns: number };
export type LastMove = {
  fromR: number;
  fromC: number;
  toR: number;
  toC: number;
  color: Color;
  kind: PieceKind;
  doubleStep: boolean;
} | null;

export type TripState = {
  colors: string[][];
  files: string[];
  ranks: string[];
};

export type ShotKind = "hit" | "shield";

export type ShotAnim = {
  type: "shot";
  from: Pos;
  to: Pos;
  ink: "red" | "gold";
  resolve: "destroy" | "chip" | "shield";
  t0: number;
  dur: number;
};

export type BombAnim = {
  type: "bomb";
  from: Pos;
  to: Pos;
  mode: "row" | "col" | "area";
  t0: number;
  dur: number;
};

export type Anim = ShotAnim | BombAnim;

export type Snap = {
  board: Board;
  turn: Color;
  moveCounter: number;
  buffs: Record<Color, BuffId[]>;
  lastMove: LastMove;
  items: Item[];
  frozenZones: FrozenZone[];
  teleports: Pos[];
  blindTurns: number;
  trip: TripState | null;
};

export type Phase = "menu" | "playing" | "promotion" | "gameover";

export type GameState = {
  phase: Phase;
  board: Board;
  turn: Color;
  selected: Pos | null;
  lastMove: LastMove;
  buffs: Record<Color, BuffId[]>;
  items: Item[];
  history: Snap[];
  moveCounter: number;
  check: boolean;
  checkPulse: number;
  endMessage: string;
  blindTurns: number;
  frozenZones: FrozenZone[];
  teleports: Pos[];
  trip: TripState | null;
  spells: Spell[];
  used: SpellId[];
  targeting: { spell: Spell; first: Pos | null } | null;
  bookOpen: boolean;
  lastSpell: Spell | null;
  log: string;
  promo: Pos | null;
  anim: Anim | null;
  armorAt: number;
  bombAt: number;
  startedAt: number;
};

export const ARMOR_SPAWN_MS = 300_000;
export const BOMB_SPAWN_MS = 600_000;
export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const ALL_SPELLS: Spell[] = [
  {
    char: "瞬",
    id: "teleport",
    name: "Телепорт",
    desc: "Выберите 2 пустые точки, сквозь которые можно ходить, но нельзя стоять на них.",
    targets: 2,
  },
  {
    char: "弹",
    id: "give_projectile",
    name: "Снаряд",
    desc: "Даёт фигуре красный снаряд. Он бьёт как ферзь, фигура не двигается. Ход — перетаскиванием, выстрел — нажатием по цели.",
    targets: 1,
  },
  {
    char: "杀",
    id: "kill_any",
    name: "Убийство",
    desc: "Мгновенно уничтожает любую фигуру на доске, кроме короля.",
    targets: 1,
  },
  {
    char: "换",
    id: "swap",
    name: "Замена",
    desc: "Меняет местами две любые фигуры, кроме королей. Если ваш король окажется под шахом, замена отменяется.",
    targets: 2,
  },
  {
    char: "时",
    id: "rewind",
    name: "Время",
    desc: "Откатывает игру на 3 хода назад.",
    targets: 0,
  },
  {
    char: "攻",
    id: "pawn_rush",
    name: "Пешечное нашествие",
    desc: "Ваши пешки навсегда могут ходить на 2 клетки вперёд с любой горизонтали, каждый ход.",
    targets: 0,
  },
  {
    char: "酷",
    id: "cruel_pawns",
    name: "Жестокие",
    desc: "Ваши пешки ходят по диагонали вперёд и атакуют 3 клетки перед собой.",
    targets: 0,
  },
  {
    char: "和",
    id: "peaceful_pawns",
    name: "Мирные",
    desc: "Ваши пешки больше не могут атаковать, только ходить вперёд.",
    targets: 0,
  },
  {
    char: "炸",
    id: "bombard_row",
    name: "Бомбардировка",
    desc: "Снаряд летит от вашего короля и уничтожает выбранную горизонталь. Клетки с королями — ПВО, залп гаснет.",
    targets: 1,
  },
  {
    char: "列",
    id: "bombard_col",
    name: "Бомбардировка 2",
    desc: "Снаряд летит от вашего короля и уничтожает выбранную вертикаль. Клетки с королями — ПВО, залп гаснет.",
    targets: 1,
  },
  {
    char: "冻",
    id: "freeze",
    name: "Заморозка",
    desc: "Замораживает область 3×3 на 2 хода. Замороженные фигуры не могут ходить.",
    targets: 1,
  },
  {
    char: "爆",
    id: "bomb",
    name: "Бомба",
    desc: "Снаряд летит от вашего короля и уничтожает все фигуры в области 3×3. Король в зоне — ПВО, взрыва нет.",
    targets: 1,
  },
  {
    char: "运",
    id: "fortune",
    name: "Фортуна",
    desc: "С шансом 50% вы получаете копию выбранной фигуры на свободной клетке. Если не повезло, фигура погибает.",
    targets: 1,
  },
  {
    char: "无",
    id: "nothing",
    name: "Ничего",
    desc: "Просто пропускает ход.",
    targets: 0,
  },
  {
    char: "幻",
    id: "trip",
    name: "Нарко-трип",
    desc: "Появляется вторая доска: клетки покрашены наугад, буквы и цифры перепутаны.",
    targets: 0,
  },
  {
    char: "叛",
    id: "betrayal",
    name: "Измена",
    desc: "Ваш ферзь предаёт короля и уходит с доски.",
    targets: 0,
  },
  {
    char: "友",
    id: "friendship",
    name: "Дружба",
    desc: "Немедленная ничья. Партия заканчивается сразу.",
    targets: 0,
  },
  {
    char: "盲",
    id: "blindness",
    name: "Слепота",
    desc: "Все фигуры становятся невидимыми на 2 хода.",
    targets: 0,
  },
  {
    char: "金",
    id: "gold",
    name: "Золото",
    desc: "Даёт фигуре золотой снаряд и щит. Выстрел бьёт врагов, а своим даёт щит. Ход — перетаскиванием, выстрел — нажатием.",
    targets: 1,
  },
  {
    char: "汗",
    id: "genghis",
    name: "Чингисхан",
    desc: "Все ваши фигуры, кроме короля, становятся конями.",
    targets: 0,
  },
];

const SPELL_BY_ID = Object.fromEntries(ALL_SPELLS.map((s) => [s.id, s])) as Record<SpellId, Spell>;

export function spellById(id: SpellId): Spell {
  return SPELL_BY_ID[id];
}

export function opposite(color: Color): Color {
  return color === "w" ? "b" : "w";
}

export function onBoard(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((p) => (p ? { ...p } : null)));
}

export function makePiece(color: Color, kind: PieceKind, extra: Partial<Piece> = {}): Piece {
  return { color, kind, armor: 0, projectile: false, gold: false, moved: false, frozen: 0, ...extra };
}

export function makeStartBoard(): Board {
  const board: Board = Array.from({ length: 8 }, () => Array<Piece | null>(8).fill(null));
  const back: PieceKind[] = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  for (let c = 0; c < 8; c++) {
    board[0][c] = makePiece("b", back[c]);
    board[1][c] = makePiece("b", "P");
    board[6][c] = makePiece("w", "P");
    board[7][c] = makePiece("w", back[c]);
  }
  return board;
}

export function emptyBoard(): Board {
  return Array.from({ length: 8 }, () => Array<Piece | null>(8).fill(null));
}

function emptyBuffs(): Record<Color, BuffId[]> {
  return { w: [], b: [] };
}

export function menuState(): GameState {
  return {
    phase: "menu",
    board: makeStartBoard(),
    turn: "w",
    selected: null,
    lastMove: null,
    buffs: emptyBuffs(),
    items: [],
    history: [],
    moveCounter: 1,
    check: false,
    checkPulse: 0,
    endMessage: "",
    blindTurns: 0,
    frozenZones: [],
    teleports: [],
    trip: null,
    spells: [],
    used: [],
    targeting: null,
    bookOpen: false,
    lastSpell: null,
    log: "",
    promo: null,
    anim: null,
    armorAt: 0,
    bombAt: 0,
    startedAt: 0,
  };
}

function shuffle<T>(list: T[], rng: () => number): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function sampleSpells(rng: () => number = Math.random): Spell[] {
  return shuffle(ALL_SPELLS, rng).slice(0, 6);
}

function tripColor(rng: () => number): string {
  const h = Math.floor(rng() * 360);
  const s = 62 + Math.floor(rng() * 28);
  const l = 42 + Math.floor(rng() * 16);
  return `hsl(${h} ${s}% ${l}%)`;
}

export function makeTrip(rng: () => number = Math.random): TripState {
  return {
    colors: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => tripColor(rng))),
    files: shuffle(FILES, rng),
    ranks: shuffle(RANKS, rng),
  };
}

export function startGame(now: number, rng: () => number = Math.random): GameState {
  return {
    ...menuState(),
    phase: "playing",
    board: makeStartBoard(),
    spells: sampleSpells(rng),
    armorAt: now,
    bombAt: now,
    startedAt: now,
    log: "Книга открыта. Шесть печатей на партию — каждая один раз.",
  };
}

export function loadPosition(state: GameState, board: Board, turn: Color = state.turn): GameState {
  return { ...state, board: cloneBoard(board), turn, selected: null, lastMove: null, history: [] };
}

function hasBuff(buffs: Record<Color, BuffId[]>, color: Color, id: BuffId): boolean {
  return buffs[color].includes(id);
}

function isTeleport(teleports: Pos[], r: number, c: number): boolean {
  return teleports.some((t) => t.r === r && t.c === c);
}

export function findKing(board: Board, color: Color): Pos | null {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === color && p.kind === "K") return { r, c };
    }
  }
  return null;
}

function pathClear(board: Board, r: number, c: number, tr: number, tc: number): boolean {
  const sr = Math.sign(tr - r);
  const sc = Math.sign(tc - c);
  let rr = r + sr;
  let cc = c + sc;
  while (rr !== tr || cc !== tc) {
    if (!onBoard(rr, cc) || board[rr][cc]) return false;
    rr += sr;
    cc += sc;
  }
  return true;
}

function rayOk(dr: number, dc: number, kind: "R" | "B" | "Q"): boolean {
  if (dr === 0 && dc === 0) return false;
  const rook = dr === 0 || dc === 0;
  const bishop = Math.abs(dr) === Math.abs(dc) && dr !== 0;
  if (kind === "R") return rook;
  if (kind === "B") return bishop;
  return rook || bishop;
}

export function attacksSquare(
  board: Board,
  fromR: number,
  fromC: number,
  toR: number,
  toC: number,
  buffs: Record<Color, BuffId[]>,
): boolean {
  const attacker = board[fromR][fromC];
  if (!attacker || attacker.frozen > 0) return false;
  if (fromR === toR && fromC === toC) return false;
  const target = board[toR][toC];
  if (target && target.color === attacker.color) return false;
  const dr = toR - fromR;
  const dc = toC - fromC;

  if (attacker.kind === "N") {
    return (Math.abs(dr) === 2 && Math.abs(dc) === 1) || (Math.abs(dr) === 1 && Math.abs(dc) === 2);
  }
  if (attacker.kind === "K") return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
  if (attacker.kind === "P") {
    const dir = attacker.color === "w" ? -1 : 1;
    if (dr !== dir) return false;
    if (hasBuff(buffs, attacker.color, "cruel_pawns") && dc >= -1 && dc <= 1) return true;
    if (hasBuff(buffs, attacker.color, "peaceful_pawns")) return false;
    return Math.abs(dc) === 1;
  }
  const kind = attacker.kind === "R" || attacker.kind === "B" || attacker.kind === "Q" ? attacker.kind : null;
  if (!kind || !rayOk(dr, dc, kind)) return false;
  return pathClear(board, fromR, fromC, toR, toC);
}

export function kingInCheck(board: Board, color: Color, buffs: Record<Color, BuffId[]>): boolean {
  const king = findKing(board, color);
  if (!king) return true;
  const enemy = opposite(color);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === enemy && attacksSquare(board, r, c, king.r, king.c, buffs)) return true;
    }
  }
  return false;
}

function shiftKing(board: Board, r: number, c: number, tr: number, tc: number): Board {
  const next = cloneBoard(board);
  next[tr][tc] = next[r][c];
  next[r][c] = null;
  return next;
}

function castleOk(board: Board, fromR: number, fromC: number, toC: number, buffs: Record<Color, BuffId[]>): boolean {
  const king = board[fromR][fromC];
  if (!king || king.kind !== "K" || king.moved) return false;
  const dc = toC - fromC;
  if (Math.abs(dc) !== 2 || kingInCheck(board, king.color, buffs)) return false;
  if (dc === 2) {
    const rook = board[fromR][7];
    if (!rook || rook.kind !== "R" || rook.color !== king.color || rook.moved) return false;
    for (let c = fromC + 1; c < 7; c++) if (board[fromR][c]) return false;
    return !kingInCheck(shiftKing(board, fromR, fromC, fromR, fromC + 1), king.color, buffs);
  }
  const rook = board[fromR][0];
  if (!rook || rook.kind !== "R" || rook.color !== king.color || rook.moved) return false;
  for (let c = 1; c < fromC; c++) if (board[fromR][c]) return false;
  return !kingInCheck(shiftKing(board, fromR, fromC, fromR, fromC - 1), king.color, buffs);
}

export type MoveKind = "move" | "capture" | "chip" | "castle" | "enpassant";

export function classifyMove(
  state: Pick<GameState, "board" | "buffs" | "teleports" | "lastMove">,
  fromR: number,
  fromC: number,
  toR: number,
  toC: number,
): MoveKind | null {
  const board = state.board;
  const pieceAt = board[fromR][fromC];
  if (!pieceAt || pieceAt.frozen > 0 || !onBoard(toR, toC)) return null;
  if (fromR === toR && fromC === toC) return null;
  if (isTeleport(state.teleports, toR, toC)) return null;
  const target = board[toR][toC];
  if (target && (target.color === pieceAt.color || target.kind === "K")) return null;

  const dr = toR - fromR;
  const dc = toC - fromC;

  if (pieceAt.kind === "K" && Math.abs(dc) === 2 && dr === 0) {
    if (isTeleport(state.teleports, fromR, fromC + Math.sign(dc))) return null;
    if (!castleOk(board, fromR, fromC, toC, state.buffs)) return null;
    return "castle";
  }

  if (pieceAt.kind === "P") {
    const dir = pieceAt.color === "w" ? -1 : 1;
    const startRow = pieceAt.color === "w" ? 6 : 1;
    const rush = hasBuff(state.buffs, pieceAt.color, "pawn_rush");
    const cruel = hasBuff(state.buffs, pieceAt.color, "cruel_pawns");
    const peaceful = hasBuff(state.buffs, pieceAt.color, "peaceful_pawns");

    if (dc === 0 && dr === dir && !target) return "move";
    if (dc === 0 && dr === 2 * dir && (fromR === startRow || rush)) {
      const midR = fromR + dir;
      if (onBoard(midR, fromC) && !board[midR][fromC] && !target) return "move";
    }
    if (!peaceful && Math.abs(dc) === 1 && dr === dir && target) {
      return target.armor > 0 ? "chip" : "capture";
    }
    if (!peaceful && Math.abs(dc) === 1 && dr === dir && !target && state.lastMove) {
      const lm = state.lastMove;
      if (
        lm.doubleStep &&
        lm.kind === "P" &&
        lm.color !== pieceAt.color &&
        lm.toR === fromR &&
        lm.toC === toC &&
        board[fromR][toC]?.kind === "P" &&
        board[fromR][toC]?.color !== pieceAt.color
      ) {
        return board[fromR][toC]!.armor > 0 ? "chip" : "enpassant";
      }
    }
    if (cruel && dc >= -1 && dc <= 1 && dr === dir) {
      if (!target) return "move";
      return target.armor > 0 ? "chip" : "capture";
    }
    return null;
  }

  if (!attacksSquare(board, fromR, fromC, toR, toC, state.buffs)) return null;
  if (!target) return "move";
  return target.armor > 0 ? "chip" : "capture";
}

function applyGeometry(board: Board, fromR: number, fromC: number, toR: number, toC: number, kind: MoveKind): Board {
  const next = cloneBoard(board);
  const mover = next[fromR][fromC];
  if (!mover) return next;
  if (kind === "chip") {
    const beside = next[toR][toC];
    const ep = !beside ? next[fromR][toC] : null;
    const victim = beside ?? ep;
    if (victim && victim.armor > 0) victim.armor -= 1;
    return next;
  }
  if (kind === "castle") {
    next[toR][toC] = { ...mover, moved: true };
    next[fromR][fromC] = null;
    if (toC - fromC === 2) {
      next[fromR][5] = next[fromR][7] ? { ...next[fromR][7]!, moved: true } : null;
      next[fromR][7] = null;
    } else {
      next[fromR][3] = next[fromR][0] ? { ...next[fromR][0]!, moved: true } : null;
      next[fromR][0] = null;
    }
    return next;
  }
  if (kind === "enpassant") {
    next[toR][toC] = { ...mover, moved: true };
    next[fromR][fromC] = null;
    next[fromR][toC] = null;
    return next;
  }
  next[toR][toC] = { ...mover, moved: true };
  next[fromR][fromC] = null;
  return next;
}

function leavesKingSafe(
  state: Pick<GameState, "board" | "buffs" | "teleports" | "lastMove">,
  fromR: number,
  fromC: number,
  toR: number,
  toC: number,
  kind: MoveKind,
): boolean {
  const mover = state.board[fromR][fromC];
  if (!mover) return false;
  return !kingInCheck(applyGeometry(state.board, fromR, fromC, toR, toC, kind), mover.color, state.buffs);
}

export function legalMoves(state: GameState, r: number, c: number): { r: number; c: number; kind: MoveKind }[] {
  const out: { r: number; c: number; kind: MoveKind }[] = [];
  const p = state.board[r][c];
  if (!p || p.color !== state.turn || p.frozen > 0) return out;
  for (let tr = 0; tr < 8; tr++) {
    for (let tc = 0; tc < 8; tc++) {
      const kind = classifyMove(state, r, c, tr, tc);
      if (kind && leavesKingSafe(state, r, c, tr, tc, kind)) out.push({ r: tr, c: tc, kind });
    }
  }
  return out;
}

function queenRay(board: Board, r: number, c: number, tr: number, tc: number): boolean {
  const dr = tr - r;
  const dc = tc - c;
  return rayOk(dr, dc, "Q") && pathClear(board, r, c, tr, tc);
}

export function legalShots(state: GameState, r: number, c: number): { r: number; c: number; kind: ShotKind }[] {
  const shooter = state.board[r][c];
  if (!shooter || shooter.color !== state.turn || shooter.frozen > 0) return [];
  if (!shooter.projectile && !shooter.gold) return [];
  const out: { r: number; c: number; kind: ShotKind }[] = [];
  for (let tr = 0; tr < 8; tr++) {
    for (let tc = 0; tc < 8; tc++) {
      const target = state.board[tr][tc];
      if (!target || !queenRay(state.board, r, c, tr, tc)) continue;
      let kind: ShotKind | null = null;
      if (target.color === shooter.color) {
        if (shooter.gold) kind = "shield";
      } else if (target.kind !== "K") kind = "hit";
      if (!kind) continue;
      const next = cloneBoard(state.board);
      const src = next[r][c];
      const dst = next[tr][tc];
      if (!src || !dst) continue;
      if (kind === "shield") {
        src.gold = false;
        dst.armor = Math.max(dst.armor, 2);
      } else if (dst.armor > 0) {
        dst.armor -= 1;
        if (shooter.projectile) src.projectile = false;
        else src.gold = false;
      } else {
        next[tr][tc] = null;
        if (shooter.projectile) src.projectile = false;
        else src.gold = false;
      }
      if (!kingInCheck(next, shooter.color, state.buffs)) out.push({ r: tr, c: tc, kind });
    }
  }
  return out;
}

function snapshot(state: GameState): Snap {
  return {
    board: cloneBoard(state.board),
    turn: state.turn,
    moveCounter: state.moveCounter,
    buffs: { w: [...state.buffs.w], b: [...state.buffs.b] },
    lastMove: state.lastMove ? { ...state.lastMove } : null,
    items: state.items.map((i) => ({ ...i })),
    frozenZones: state.frozenZones.map((z) => ({ ...z })),
    teleports: state.teleports.map((t) => ({ ...t })),
    blindTurns: state.blindTurns,
    trip: state.trip
      ? { colors: state.trip.colors.map((row) => [...row]), files: [...state.trip.files], ranks: [...state.trip.ranks] }
      : null,
  };
}

function restore(state: GameState, snap: Snap, history: Snap[]): GameState {
  return {
    ...state,
    board: cloneBoard(snap.board),
    turn: snap.turn,
    moveCounter: snap.moveCounter,
    buffs: { w: [...snap.buffs.w], b: [...snap.buffs.b] },
    lastMove: snap.lastMove ? { ...snap.lastMove } : null,
    items: snap.items.map((i) => ({ ...i })),
    frozenZones: snap.frozenZones.map((z) => ({ ...z })),
    teleports: snap.teleports.map((t) => ({ ...t })),
    blindTurns: snap.blindTurns,
    trip: snap.trip
      ? { colors: snap.trip.colors.map((row) => [...row]), files: [...snap.trip.files], ranks: [...snap.trip.ranks] }
      : null,
    history,
    selected: null,
    targeting: null,
    promo: null,
    anim: null,
    phase: "playing",
    check: kingInCheck(snap.board, snap.turn, snap.buffs),
  };
}

function tickStatuses(state: GameState): GameState {
  const board = cloneBoard(state.board);
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.frozen > 0) p.frozen -= 1;
    }
  }
  return {
    ...state,
    board,
    frozenZones: state.frozenZones.map((z) => ({ ...z, turns: z.turns - 1 })).filter((z) => z.turns > 0),
    blindTurns: Math.max(0, state.blindTurns - 1),
  };
}

function pickupItems(state: GameState): GameState {
  const board = cloneBoard(state.board);
  const items: Item[] = [];
  for (const item of state.items) {
    const p = board[item.r][item.c];
    if (!p) {
      items.push(item);
      continue;
    }
    if (item.type === "armor") p.armor = Math.max(p.armor, 2);
    else p.projectile = true;
  }
  return { ...state, board, items };
}

function sideStatus(state: GameState, color: Color): "ok" | "check" | "checkmate" | "stalemate" {
  if (!findKing(state.board, color)) return "checkmate";
  const probe = { ...state, turn: color };
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = state.board[r][c];
      if (!p || p.color !== color || p.frozen > 0) continue;
      if (legalMoves(probe, r, c).length || legalShots(probe, r, c).length) {
        return kingInCheck(state.board, color, state.buffs) ? "check" : "ok";
      }
    }
  }
  return kingInCheck(state.board, color, state.buffs) ? "checkmate" : "stalemate";
}

function mateMessage(loser: Color): string {
  return `МАТ! Победа ${loser === "w" ? "чёрных" : "белых"}.`;
}

function finishPly(state: GameState, log?: string): GameState {
  const ticked = tickStatuses(state);
  const turn = opposite(ticked.turn);
  let next: GameState = {
    ...ticked,
    turn,
    moveCounter: ticked.moveCounter + 1,
    selected: null,
    targeting: null,
    bookOpen: false,
    log: log ?? ticked.log,
  };
  next = pickupItems(next);
  return sealTurn(next);
}

function sealTurn(state: GameState): GameState {
  if (state.phase !== "playing") return state;
  const status = sideStatus(state, state.turn);
  if (status === "checkmate") {
    return { ...state, phase: "gameover", check: true, checkPulse: state.checkPulse + 1, endMessage: mateMessage(state.turn) };
  }
  if (status === "stalemate") {
    return { ...state, phase: "gameover", check: false, endMessage: "ПАТ! Ничья." };
  }
  const entering = status === "check" && !state.check;
  return {
    ...state,
    check: status === "check",
    checkPulse: entering ? state.checkPulse + 1 : state.checkPulse,
  };
}

function withHistory(state: GameState): GameState {
  return { ...state, history: [...state.history, snapshot(state)] };
}

function endNow(state: GameState, message: string): GameState {
  return {
    ...state,
    phase: "gameover",
    endMessage: message,
    selected: null,
    targeting: null,
    bookOpen: false,
    anim: null,
    check: false,
    log: message,
  };
}

function spend(state: GameState, spell: Spell): GameState {
  return {
    ...state,
    used: state.used.includes(spell.id) ? state.used : [...state.used, spell.id],
    lastSpell: spell,
    targeting: null,
    bookOpen: false,
  };
}

export function squaresInZone(r: number, c: number): Pos[] {
  const out: Pos[] = [];
  for (let rr = r - 1; rr <= r + 1; rr++) {
    for (let cc = c - 1; cc <= c + 1; cc++) {
      if (onBoard(rr, cc)) out.push({ r: rr, c: cc });
    }
  }
  return out;
}

export function highlightFor(spell: SpellId, r: number, c: number): Pos[] {
  if (spell === "bombard_row") return Array.from({ length: 8 }, (_, i) => ({ r, c: i }));
  if (spell === "bombard_col") return Array.from({ length: 8 }, (_, i) => ({ r: i, c }));
  if (spell === "freeze" || spell === "bomb") return squaresInZone(r, c);
  return [{ r, c }];
}

function applyFreeze(state: GameState, r: number, c: number): GameState {
  const board = cloneBoard(state.board);
  for (const sq of squaresInZone(r, c)) {
    const p = board[sq.r][sq.c];
    if (p) p.frozen = Math.max(p.frozen, 2);
  }
  return sealTurn({
    ...state,
    board,
    frozenZones: [...state.frozenZones, { r, c, turns: 2 }],
  });
}

export function blastSquares(mode: "row" | "col" | "area", at: Pos): Pos[] {
  if (mode === "row") return Array.from({ length: 8 }, (_, i) => ({ r: at.r, c: i }));
  if (mode === "col") return Array.from({ length: 8 }, (_, i) => ({ r: i, c: at.c }));
  return squaresInZone(at.r, at.c);
}

export function blastHasKing(board: Board, squares: Pos[]): boolean {
  return squares.some((sq) => board[sq.r][sq.c]?.kind === "K");
}

function resolveBlast(state: GameState, anim: BombAnim): GameState {
  const squares = blastSquares(anim.mode, anim.to);
  if (blastHasKing(state.board, squares)) {
    return finishPly({ ...state, anim: null }, "ПВО короля — залп погас, фигуры целы.");
  }
  const board = cloneBoard(state.board);
  for (const sq of squares) board[sq.r][sq.c] = null;
  return finishPly({ ...state, board, anim: null }, "Залп накрыл клетки.");
}

function resolveShot(state: GameState, anim: ShotAnim): GameState {
  const board = cloneBoard(state.board);
  const src = board[anim.from.r][anim.from.c];
  const dst = board[anim.to.r][anim.to.c];
  if (src) {
    if (anim.ink === "red") src.projectile = false;
    else src.gold = false;
  }
  if (anim.resolve === "shield" && dst) dst.armor = Math.max(dst.armor, 2);
  if (anim.resolve === "chip" && dst && dst.armor > 0) dst.armor -= 1;
  if (anim.resolve === "destroy" && dst && dst.kind !== "K") board[anim.to.r][anim.to.c] = null;
  const verb =
    anim.resolve === "shield" ? "Золото дало щит своей фигуре." : anim.resolve === "chip" ? "Снаряд сбил броню." : "Снаряд поразил цель.";
  return finishPly({ ...state, board, anim: null }, verb);
}

export function completeAnim(state: GameState): GameState {
  if (!state.anim) return state;
  return state.anim.type === "bomb" ? resolveBlast(state, state.anim) : resolveShot(state, state.anim);
}

function beginBomb(state: GameState, spell: Spell, mode: "row" | "col" | "area", at: Pos, now: number): GameState {
  const king = findKing(state.board, state.turn);
  return {
    ...spend(withHistory(state), spell),
    anim: { type: "bomb", from: king ?? at, to: at, mode, t0: now, dur: 480 },
    selected: null,
    log: "Снаряд сорвался с короля…",
  };
}

function addBuff(state: GameState, id: BuffId): GameState {
  if (hasBuff(state.buffs, state.turn, id)) return state;
  return { ...state, buffs: { ...state.buffs, [state.turn]: [...state.buffs[state.turn], id] } };
}

export function castSpell(
  state: GameState,
  spell: Spell,
  targets: Pos[],
  now: number,
  rng: () => number = Math.random,
): GameState {
  if (state.phase !== "playing" || state.anim || state.used.includes(spell.id)) return state;

  if (spell.id === "rewind") {
    if (state.history.length < 3) {
      return { ...state, targeting: null, log: "Мало ходов: для отката нужно три. Печать не потрачена." };
    }
    const snap = state.history[state.history.length - 3];
    return { ...restore(spend(state, spell), snap, state.history.slice(0, -3)), log: "Время откатилось на три хода." };
  }

  if (spell.id === "friendship") return endNow(spend(withHistory(state), spell), "ДРУЖБА! Ничья.");

  if (spell.targets === 1 && targets.length < 1) return state;
  if (spell.targets === 2 && targets.length < 2) return state;

  if (spell.id === "teleport") {
    const [a, b] = targets;
    if (!a || !b || (a.r === b.r && a.c === b.c)) return { ...state, log: "Нужны две разные клетки." };
    const blocked =
      !!state.board[a.r][a.c] ||
      !!state.board[b.r][b.c] ||
      state.items.some((i) => (i.r === a.r && i.c === a.c) || (i.r === b.r && i.c === b.c));
    if (blocked) return { ...state, log: "Телепорт ставится только на пустые клетки.", targeting: { spell, first: a } };
    return finishPly(
      { ...spend(withHistory(state), spell), teleports: [a, b] },
      "Два портала открыты. Сквозь них ходят, стоять нельзя.",
    );
  }

  if (spell.id === "swap") {
    const [a, b] = targets;
    const p1 = a ? state.board[a.r][a.c] : null;
    const p2 = b ? state.board[b.r][b.c] : null;
    if (!a || !b || !p1 || !p2) return { ...state, log: "Нужны две фигуры." };
    if (p1.kind === "K" || p2.kind === "K") return { ...state, log: "Королей менять нельзя." };
    if (a.r === b.r && a.c === b.c) return state;
    const board = cloneBoard(state.board);
    board[a.r][a.c] = { ...p2 };
    board[b.r][b.c] = { ...p1 };
    const next = spend(withHistory(state), spell);
    if (kingInCheck(board, state.turn, state.buffs)) return finishPly(next, "Замена отменена: ваш король под шахом.");
    return finishPly({ ...next, board }, "Фигуры поменялись местами.");
  }

  if (spell.id === "give_projectile" || spell.id === "gold" || spell.id === "kill_any" || spell.id === "fortune") {
    const at = targets[0];
    const victim = state.board[at.r][at.c];
    if (!victim) return { ...state, log: "На клетке никого нет." };
    if ((spell.id === "kill_any" || spell.id === "fortune") && victim.kind === "K") {
      return { ...state, log: "Король под защитой ПВО." };
    }
    const next = spend(withHistory(state), spell);
    const board = cloneBoard(next.board);
    const p = board[at.r][at.c];
    if (!p) return state;
    if (spell.id === "give_projectile") {
      p.projectile = true;
      return finishPly({ ...next, board }, "Красный снаряд заряжен. Тащите фигуру, чтобы пойти, и нажмите по цели, чтобы выстрелить.");
    }
    if (spell.id === "gold") {
      p.gold = true;
      p.armor = Math.max(p.armor, 2);
      return finishPly({ ...next, board }, "Золотой снаряд и щит. Врагов бьёт, своим даёт щит.");
    }
    if (spell.id === "kill_any") {
      board[at.r][at.c] = null;
      return finishPly({ ...next, board }, "Фигура уничтожена.");
    }
    if (rng() < 0.5) {
      const free: Pos[] = [];
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (!board[r][c]) free.push({ r, c });
      if (free.length) {
        const spot = free[Math.floor(rng() * free.length)];
        board[spot.r][spot.c] = { ...p, frozen: 0 };
      }
      return finishPly({ ...next, board }, free.length ? "Фортуна улыбнулась — на доске копия." : "Фортуна хотела копию, но доска полна.");
    }
    board[at.r][at.c] = null;
    return finishPly({ ...next, board }, "Фортуна отвернулась — фигура погибла.");
  }

  if (spell.id === "pawn_rush" || spell.id === "cruel_pawns" || spell.id === "peaceful_pawns") {
    const next = addBuff(spend(withHistory(state), spell), spell.id);
    const note =
      spell.id === "pawn_rush"
        ? "Пешки ходят на 2 клетки вперёд с любой горизонтали — весь остаток партии."
        : spell.id === "cruel_pawns"
          ? "Пешки стали жестокими."
          : "Пешки сложили оружие и больше не бьют.";
    return finishPly(next, note);
  }

  if (spell.id === "bombard_row") return beginBomb(state, spell, "row", targets[0], now);
  if (spell.id === "bombard_col") return beginBomb(state, spell, "col", targets[0], now);
  if (spell.id === "bomb") return beginBomb(state, spell, "area", targets[0], now);

  if (spell.id === "freeze") {
    const next = finishPly(spend(withHistory(state), spell), "Синие клетки держатся два хода. Фигуры в них не ходят.");
    if (next.phase === "gameover") return next;
    return applyFreeze(next, targets[0].r, targets[0].c);
  }

  if (spell.id === "nothing") return finishPly(spend(withHistory(state), spell), "Ход пропущен.");

  if (spell.id === "trip") {
    const turningOff = !!state.trip;
    const next = finishPly(
      spend(withHistory(state), spell),
      turningOff ? "Трип схлынул. Снова обычная доска." : "Вторая доска: цвета наугад, буквы и цифры перепутаны.",
    );
    if (next.phase === "gameover") return next;
    return { ...next, trip: turningOff ? null : makeTrip(rng) };
  }

  if (spell.id === "betrayal") {
    const board = cloneBoard(state.board);
    let gone = false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.color === state.turn && p.kind === "Q") {
          board[r][c] = null;
          gone = true;
        }
      }
    }
    return finishPly({ ...spend(withHistory(state), spell), board }, gone ? "Ферзь покинул короля." : "Ферзя уже нет.");
  }

  if (spell.id === "blindness") {
    const next = finishPly(spend(withHistory(state), spell), "Слепота на два хода.");
    if (next.phase === "gameover") return next;
    return { ...next, blindTurns: 2 };
  }

  if (spell.id === "genghis") {
    const board = cloneBoard(state.board);
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.color === state.turn && p.kind !== "K") p.kind = "N";
      }
    }
    return finishPly({ ...spend(withHistory(state), spell), board }, "Орда: все, кроме короля, стали конями.");
  }

  return state;
}

function maybePromote(state: GameState, toR: number, toC: number): GameState | null {
  const p = state.board[toR][toC];
  if (p && p.kind === "P" && (toR === 0 || toR === 7)) {
    return { ...state, phase: "promotion", promo: { r: toR, c: toC }, selected: null, check: false, log: "Пешка дошла до края." };
  }
  return null;
}

export function tryMove(state: GameState, from: Pos, to: Pos, _now: number, rng: () => number = Math.random): GameState {
  if (state.phase !== "playing" || state.anim || state.targeting) return state;
  const hit = legalMoves(state, from.r, from.c).find((m) => m.r === to.r && m.c === to.c);
  const mover = state.board[from.r][from.c];
  if (!hit || !mover) return state;

  if (rng() < 0.0009) {
    const board = cloneBoard(state.board);
    board[from.r][from.c] = null;
    if (mover.kind === "K") return endNow({ ...withHistory(state), board, selected: null }, "КОРОЛЬ СПОТКНУЛСЯ!");
    return finishPly({ ...withHistory(state), board }, "Фигура споткнулась и сошла с доски.");
  }

  let next: GameState = {
    ...withHistory(state),
    board: applyGeometry(state.board, from.r, from.c, to.r, to.c, hit.kind),
    lastMove: {
      fromR: from.r,
      fromC: from.c,
      toR: to.r,
      toC: to.c,
      color: mover.color,
      kind: mover.kind,
      doubleStep: mover.kind === "P" && Math.abs(to.r - from.r) === 2,
    },
    selected: null,
  };
  next = pickupItems(next);
  if (hit.kind !== "chip") {
    const promo = maybePromote(next, to.r, to.c);
    if (promo) return promo;
  }
  const note =
    hit.kind === "chip"
      ? "Удар пришёлся в броню — фигура устояла."
      : hit.kind === "capture" || hit.kind === "enpassant"
        ? "Фигура взята."
        : "Ход сделан.";
  return finishPly(next, note);
}

export function tryShot(state: GameState, from: Pos, to: Pos, now: number): GameState {
  if (state.phase !== "playing" || state.anim || state.targeting) return state;
  const hit = legalShots(state, from.r, from.c).find((s) => s.r === to.r && s.c === to.c);
  const shooter = state.board[from.r][from.c];
  const target = state.board[to.r][to.c];
  if (!hit || !shooter || !target) return state;
  const useGold = hit.kind === "shield" || (!shooter.projectile && shooter.gold);
  const resolve: ShotAnim["resolve"] = hit.kind === "shield" ? "shield" : target.armor > 0 ? "chip" : "destroy";
  return {
    ...withHistory(state),
    selected: null,
    anim: { type: "shot", from, to, ink: useGold ? "gold" : "red", resolve, t0: now, dur: 280 },
    log: resolve === "shield" ? "Золотой снаряд летит к своим." : "Снаряд летит к цели.",
  };
}

export function choosePromotion(state: GameState, kind: PieceKind): GameState {
  if (state.phase !== "promotion" || !state.promo || kind === "K" || kind === "P") return state;
  const board = cloneBoard(state.board);
  const p = board[state.promo.r][state.promo.c];
  if (!p) return { ...state, phase: "playing", promo: null };
  p.kind = kind;
  return finishPly({ ...state, board, promo: null, phase: "playing" }, "Пешка превратилась.");
}

export function spawnItems(state: GameState, now: number, rng: () => number = Math.random): GameState {
  if (state.phase !== "playing" && state.phase !== "promotion") return state;
  if (state.anim) return state;
  let next = state;
  const spotFor = (): Pos | null => {
    const options: Pos[] = [];
    for (const r of [3, 4]) {
      for (let c = 0; c < 8; c++) {
        if (!next.board[r][c] && !next.items.some((i) => i.r === r && i.c === c) && !isTeleport(next.teleports, r, c)) {
          options.push({ r, c });
        }
      }
    }
    if (!options.length) return null;
    return options[Math.floor(rng() * options.length)];
  };
  if (now - next.armorAt >= ARMOR_SPAWN_MS) {
    const spot = spotFor();
    next = {
      ...next,
      armorAt: now,
      items: spot ? [...next.items, { ...spot, type: "armor" }] : next.items,
      log: spot ? "На доске появилась броня." : next.log,
    };
  }
  if (now - next.bombAt >= BOMB_SPAWN_MS) {
    const spot = spotFor();
    next = {
      ...next,
      bombAt: now,
      items: spot ? [...next.items, { ...spot, type: "bomb" }] : next.items,
      log: spot ? "На доске появился снаряд." : next.log,
    };
  }
  return next === state ? state : next;
}

export function buffLabel(id: BuffId): string {
  if (id === "pawn_rush") return "Нашествие: пешки ходят на 2";
  if (id === "cruel_pawns") return "Жестокие пешки";
  return "Мирные пешки";
}

export function formatClock(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}:${r.toString().padStart(2, "0")}` : `${s}с`;
}
