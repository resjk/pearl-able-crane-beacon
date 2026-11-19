import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as BookOpen, i as Shield, r as Timer, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D2nVoSSI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PieceArt({ color, kind }) {
	const fill = color === "w" ? "var(--color-parchment)" : "var(--color-ink)";
	const stroke = color === "w" ? "var(--color-ink)" : "var(--color-gold)";
	const common = {
		fill,
		stroke,
		strokeWidth: 2.5,
		strokeLinejoin: "round",
		strokeLinecap: "round"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className: "h-full w-full",
		"aria-hidden": "true",
		children: [
			kind === "P" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "24",
					r: "11",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M28 44h24l6 18H22z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 66h44v6H18z",
					...common
				})
			] }),
			kind === "R" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 20h10v8h6v-8h12v8h6v-8h10v16H18z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M24 36h32v22H24z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 62h48v8H16z",
					...common
				})
			] }),
			kind === "N" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22 68h38v-7H30c1-8 8-12 12-20 6 3 14 1 16-7-8 1-10-7-6-13-8 3-14 8-14 8 1-9-7-14-13-9 3 7-2 11-7 16-7 7-10 18-8 28H22z",
				...common
			}),
			kind === "B" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "16",
					r: "5",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 22l12 14h-7l2 24H33l2-24h-7z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M40 30v16",
					fill: "none",
					stroke,
					strokeWidth: "2.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 66h44v6H18z",
					...common
				})
			] }),
			kind === "Q" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "18",
					cy: "28",
					r: "4",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "32",
					cy: "18",
					r: "4",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "48",
					cy: "18",
					r: "4",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "62",
					cy: "28",
					r: "4",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "14",
					r: "4",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 32l8 26h32l8-26-12 10L40 24 28 42z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 64h48v7H16z",
					...common
				})
			] }),
			kind === "K" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M36 6h8v8h8v8h-8v6h-8v-6h-8v-8h8z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 36h44l-6 22H24z",
					...common
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 62h48v8H16z",
					...common
				})
			] })
		]
	});
}
var NAMES = {
	K: "король",
	Q: "ферзь",
	R: "ладья",
	B: "слон",
	N: "конь",
	P: "пешка"
};
function pieceName(color, kind) {
	return `${color === "w" ? "белая" : "чёрная"} ${NAMES[kind]}`;
}
var ARMOR_SPAWN_MS = 3e5;
var BOMB_SPAWN_MS = 6e5;
var FILES = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h"
];
var RANKS = [
	"8",
	"7",
	"6",
	"5",
	"4",
	"3",
	"2",
	"1"
];
var ALL_SPELLS = [
	{
		char: "瞬",
		id: "teleport",
		name: "Телепорт",
		desc: "Выберите 2 пустые точки, сквозь которые можно ходить, но нельзя стоять на них.",
		targets: 2
	},
	{
		char: "弹",
		id: "give_projectile",
		name: "Снаряд",
		desc: "Даёт фигуре красный снаряд. Он бьёт как ферзь, фигура не двигается. Ход — перетаскиванием, выстрел — нажатием по цели.",
		targets: 1
	},
	{
		char: "杀",
		id: "kill_any",
		name: "Убийство",
		desc: "Мгновенно уничтожает любую фигуру на доске, кроме короля.",
		targets: 1
	},
	{
		char: "换",
		id: "swap",
		name: "Замена",
		desc: "Меняет местами две любые фигуры, кроме королей. Если ваш король окажется под шахом, замена отменяется.",
		targets: 2
	},
	{
		char: "时",
		id: "rewind",
		name: "Время",
		desc: "Откатывает игру на 3 хода назад.",
		targets: 0
	},
	{
		char: "攻",
		id: "pawn_rush",
		name: "Пешечное нашествие",
		desc: "Ваши пешки навсегда могут ходить на 2 клетки вперёд с любой горизонтали, каждый ход.",
		targets: 0
	},
	{
		char: "酷",
		id: "cruel_pawns",
		name: "Жестокие",
		desc: "Ваши пешки ходят по диагонали вперёд и атакуют 3 клетки перед собой.",
		targets: 0
	},
	{
		char: "和",
		id: "peaceful_pawns",
		name: "Мирные",
		desc: "Ваши пешки больше не могут атаковать, только ходить вперёд.",
		targets: 0
	},
	{
		char: "炸",
		id: "bombard_row",
		name: "Бомбардировка",
		desc: "Снаряд летит от вашего короля и уничтожает выбранную горизонталь. Клетки с королями — ПВО, залп гаснет.",
		targets: 1
	},
	{
		char: "列",
		id: "bombard_col",
		name: "Бомбардировка 2",
		desc: "Снаряд летит от вашего короля и уничтожает выбранную вертикаль. Клетки с королями — ПВО, залп гаснет.",
		targets: 1
	},
	{
		char: "冻",
		id: "freeze",
		name: "Заморозка",
		desc: "Замораживает область 3×3 на 2 хода. Замороженные фигуры не могут ходить.",
		targets: 1
	},
	{
		char: "爆",
		id: "bomb",
		name: "Бомба",
		desc: "Снаряд летит от вашего короля и уничтожает все фигуры в области 3×3. Король в зоне — ПВО, взрыва нет.",
		targets: 1
	},
	{
		char: "运",
		id: "fortune",
		name: "Фортуна",
		desc: "С шансом 50% вы получаете копию выбранной фигуры на свободной клетке. Если не повезло, фигура погибает.",
		targets: 1
	},
	{
		char: "无",
		id: "nothing",
		name: "Ничего",
		desc: "Просто пропускает ход.",
		targets: 0
	},
	{
		char: "幻",
		id: "trip",
		name: "Нарко-трип",
		desc: "Появляется вторая доска: клетки покрашены наугад, буквы и цифры перепутаны.",
		targets: 0
	},
	{
		char: "叛",
		id: "betrayal",
		name: "Измена",
		desc: "Ваш ферзь предаёт короля и уходит с доски.",
		targets: 0
	},
	{
		char: "友",
		id: "friendship",
		name: "Дружба",
		desc: "Немедленная ничья. Партия заканчивается сразу.",
		targets: 0
	},
	{
		char: "盲",
		id: "blindness",
		name: "Слепота",
		desc: "Все фигуры становятся невидимыми на 2 хода.",
		targets: 0
	},
	{
		char: "金",
		id: "gold",
		name: "Золото",
		desc: "Даёт фигуре золотой снаряд и щит. Выстрел бьёт врагов, а своим даёт щит. Ход — перетаскиванием, выстрел — нажатием.",
		targets: 1
	},
	{
		char: "汗",
		id: "genghis",
		name: "Чингисхан",
		desc: "Все ваши фигуры, кроме короля, становятся конями.",
		targets: 0
	}
];
Object.fromEntries(ALL_SPELLS.map((s) => [s.id, s]));
function opposite(color) {
	return color === "w" ? "b" : "w";
}
function onBoard(r, c) {
	return r >= 0 && r < 8 && c >= 0 && c < 8;
}
function cloneBoard(board) {
	return board.map((row) => row.map((p) => p ? { ...p } : null));
}
function makePiece(color, kind, extra = {}) {
	return {
		color,
		kind,
		armor: 0,
		projectile: false,
		gold: false,
		moved: false,
		frozen: 0,
		...extra
	};
}
function makeStartBoard() {
	const board = Array.from({ length: 8 }, () => Array(8).fill(null));
	const back = [
		"R",
		"N",
		"B",
		"Q",
		"K",
		"B",
		"N",
		"R"
	];
	for (let c = 0; c < 8; c++) {
		board[0][c] = makePiece("b", back[c]);
		board[1][c] = makePiece("b", "P");
		board[6][c] = makePiece("w", "P");
		board[7][c] = makePiece("w", back[c]);
	}
	return board;
}
function emptyBuffs() {
	return {
		w: [],
		b: []
	};
}
function menuState() {
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
		startedAt: 0
	};
}
function shuffle(list, rng) {
	const arr = [...list];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
function sampleSpells(rng = Math.random) {
	return shuffle(ALL_SPELLS, rng).slice(0, 6);
}
function tripColor(rng) {
	return `hsl(${Math.floor(rng() * 360)} ${62 + Math.floor(rng() * 28)}% ${42 + Math.floor(rng() * 16)}%)`;
}
function makeTrip(rng = Math.random) {
	return {
		colors: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => tripColor(rng))),
		files: shuffle(FILES, rng),
		ranks: shuffle(RANKS, rng)
	};
}
function startGame(now, rng = Math.random) {
	return {
		...menuState(),
		phase: "playing",
		board: makeStartBoard(),
		spells: sampleSpells(rng),
		armorAt: now,
		bombAt: now,
		startedAt: now,
		log: "Книга открыта. Шесть печатей на партию — каждая один раз."
	};
}
function hasBuff(buffs, color, id) {
	return buffs[color].includes(id);
}
function isTeleport(teleports, r, c) {
	return teleports.some((t) => t.r === r && t.c === c);
}
function findKing(board, color) {
	for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
		const p = board[r][c];
		if (p && p.color === color && p.kind === "K") return {
			r,
			c
		};
	}
	return null;
}
function pathClear(board, r, c, tr, tc) {
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
function rayOk(dr, dc, kind) {
	if (dr === 0 && dc === 0) return false;
	const rook = dr === 0 || dc === 0;
	const bishop = Math.abs(dr) === Math.abs(dc) && dr !== 0;
	if (kind === "R") return rook;
	if (kind === "B") return bishop;
	return rook || bishop;
}
function attacksSquare(board, fromR, fromC, toR, toC, buffs) {
	const attacker = board[fromR][fromC];
	if (!attacker || attacker.frozen > 0) return false;
	if (fromR === toR && fromC === toC) return false;
	const target = board[toR][toC];
	if (target && target.color === attacker.color) return false;
	const dr = toR - fromR;
	const dc = toC - fromC;
	if (attacker.kind === "N") return Math.abs(dr) === 2 && Math.abs(dc) === 1 || Math.abs(dr) === 1 && Math.abs(dc) === 2;
	if (attacker.kind === "K") return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
	if (attacker.kind === "P") {
		if (dr !== (attacker.color === "w" ? -1 : 1)) return false;
		if (hasBuff(buffs, attacker.color, "cruel_pawns") && dc >= -1 && dc <= 1) return true;
		if (hasBuff(buffs, attacker.color, "peaceful_pawns")) return false;
		return Math.abs(dc) === 1;
	}
	const kind = attacker.kind === "R" || attacker.kind === "B" || attacker.kind === "Q" ? attacker.kind : null;
	if (!kind || !rayOk(dr, dc, kind)) return false;
	return pathClear(board, fromR, fromC, toR, toC);
}
function kingInCheck(board, color, buffs) {
	const king = findKing(board, color);
	if (!king) return true;
	const enemy = opposite(color);
	for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
		const p = board[r][c];
		if (p && p.color === enemy && attacksSquare(board, r, c, king.r, king.c, buffs)) return true;
	}
	return false;
}
function shiftKing(board, r, c, tr, tc) {
	const next = cloneBoard(board);
	next[tr][tc] = next[r][c];
	next[r][c] = null;
	return next;
}
function castleOk(board, fromR, fromC, toC, buffs) {
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
function classifyMove(state, fromR, fromC, toR, toC) {
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
		if (!peaceful && Math.abs(dc) === 1 && dr === dir && target) return target.armor > 0 ? "chip" : "capture";
		if (!peaceful && Math.abs(dc) === 1 && dr === dir && !target && state.lastMove) {
			const lm = state.lastMove;
			if (lm.doubleStep && lm.kind === "P" && lm.color !== pieceAt.color && lm.toR === fromR && lm.toC === toC && board[fromR][toC]?.kind === "P" && board[fromR][toC]?.color !== pieceAt.color) return board[fromR][toC].armor > 0 ? "chip" : "enpassant";
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
function applyGeometry(board, fromR, fromC, toR, toC, kind) {
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
		next[toR][toC] = {
			...mover,
			moved: true
		};
		next[fromR][fromC] = null;
		if (toC - fromC === 2) {
			next[fromR][5] = next[fromR][7] ? {
				...next[fromR][7],
				moved: true
			} : null;
			next[fromR][7] = null;
		} else {
			next[fromR][3] = next[fromR][0] ? {
				...next[fromR][0],
				moved: true
			} : null;
			next[fromR][0] = null;
		}
		return next;
	}
	if (kind === "enpassant") {
		next[toR][toC] = {
			...mover,
			moved: true
		};
		next[fromR][fromC] = null;
		next[fromR][toC] = null;
		return next;
	}
	next[toR][toC] = {
		...mover,
		moved: true
	};
	next[fromR][fromC] = null;
	return next;
}
function leavesKingSafe(state, fromR, fromC, toR, toC, kind) {
	const mover = state.board[fromR][fromC];
	if (!mover) return false;
	return !kingInCheck(applyGeometry(state.board, fromR, fromC, toR, toC, kind), mover.color, state.buffs);
}
function legalMoves(state, r, c) {
	const out = [];
	const p = state.board[r][c];
	if (!p || p.color !== state.turn || p.frozen > 0) return out;
	for (let tr = 0; tr < 8; tr++) for (let tc = 0; tc < 8; tc++) {
		const kind = classifyMove(state, r, c, tr, tc);
		if (kind && leavesKingSafe(state, r, c, tr, tc, kind)) out.push({
			r: tr,
			c: tc,
			kind
		});
	}
	return out;
}
function queenRay(board, r, c, tr, tc) {
	return rayOk(tr - r, tc - c, "Q") && pathClear(board, r, c, tr, tc);
}
function legalShots(state, r, c) {
	const shooter = state.board[r][c];
	if (!shooter || shooter.color !== state.turn || shooter.frozen > 0) return [];
	if (!shooter.projectile && !shooter.gold) return [];
	const out = [];
	for (let tr = 0; tr < 8; tr++) for (let tc = 0; tc < 8; tc++) {
		const target = state.board[tr][tc];
		if (!target || !queenRay(state.board, r, c, tr, tc)) continue;
		let kind = null;
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
		if (!kingInCheck(next, shooter.color, state.buffs)) out.push({
			r: tr,
			c: tc,
			kind
		});
	}
	return out;
}
function snapshot(state) {
	return {
		board: cloneBoard(state.board),
		turn: state.turn,
		moveCounter: state.moveCounter,
		buffs: {
			w: [...state.buffs.w],
			b: [...state.buffs.b]
		},
		lastMove: state.lastMove ? { ...state.lastMove } : null,
		items: state.items.map((i) => ({ ...i })),
		frozenZones: state.frozenZones.map((z) => ({ ...z })),
		teleports: state.teleports.map((t) => ({ ...t })),
		blindTurns: state.blindTurns,
		trip: state.trip ? {
			colors: state.trip.colors.map((row) => [...row]),
			files: [...state.trip.files],
			ranks: [...state.trip.ranks]
		} : null
	};
}
function restore(state, snap, history) {
	return {
		...state,
		board: cloneBoard(snap.board),
		turn: snap.turn,
		moveCounter: snap.moveCounter,
		buffs: {
			w: [...snap.buffs.w],
			b: [...snap.buffs.b]
		},
		lastMove: snap.lastMove ? { ...snap.lastMove } : null,
		items: snap.items.map((i) => ({ ...i })),
		frozenZones: snap.frozenZones.map((z) => ({ ...z })),
		teleports: snap.teleports.map((t) => ({ ...t })),
		blindTurns: snap.blindTurns,
		trip: snap.trip ? {
			colors: snap.trip.colors.map((row) => [...row]),
			files: [...snap.trip.files],
			ranks: [...snap.trip.ranks]
		} : null,
		history,
		selected: null,
		targeting: null,
		promo: null,
		anim: null,
		phase: "playing",
		check: kingInCheck(snap.board, snap.turn, snap.buffs)
	};
}
function tickStatuses(state) {
	const board = cloneBoard(state.board);
	for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
		const p = board[r][c];
		if (p && p.frozen > 0) p.frozen -= 1;
	}
	return {
		...state,
		board,
		frozenZones: state.frozenZones.map((z) => ({
			...z,
			turns: z.turns - 1
		})).filter((z) => z.turns > 0),
		blindTurns: Math.max(0, state.blindTurns - 1)
	};
}
function pickupItems(state) {
	const board = cloneBoard(state.board);
	const items = [];
	for (const item of state.items) {
		const p = board[item.r][item.c];
		if (!p) {
			items.push(item);
			continue;
		}
		if (item.type === "armor") p.armor = Math.max(p.armor, 2);
		else p.projectile = true;
	}
	return {
		...state,
		board,
		items
	};
}
function sideStatus(state, color) {
	if (!findKing(state.board, color)) return "checkmate";
	const probe = {
		...state,
		turn: color
	};
	for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
		const p = state.board[r][c];
		if (!p || p.color !== color || p.frozen > 0) continue;
		if (legalMoves(probe, r, c).length || legalShots(probe, r, c).length) return kingInCheck(state.board, color, state.buffs) ? "check" : "ok";
	}
	return kingInCheck(state.board, color, state.buffs) ? "checkmate" : "stalemate";
}
function mateMessage(loser) {
	return `МАТ! Победа ${loser === "w" ? "чёрных" : "белых"}.`;
}
function finishPly(state, log) {
	const ticked = tickStatuses(state);
	const turn = opposite(ticked.turn);
	let next = {
		...ticked,
		turn,
		moveCounter: ticked.moveCounter + 1,
		selected: null,
		targeting: null,
		bookOpen: false,
		log: log ?? ticked.log
	};
	next = pickupItems(next);
	return sealTurn(next);
}
function sealTurn(state) {
	if (state.phase !== "playing") return state;
	const status = sideStatus(state, state.turn);
	if (status === "checkmate") return {
		...state,
		phase: "gameover",
		check: true,
		checkPulse: state.checkPulse + 1,
		endMessage: mateMessage(state.turn)
	};
	if (status === "stalemate") return {
		...state,
		phase: "gameover",
		check: false,
		endMessage: "ПАТ! Ничья."
	};
	const entering = status === "check" && !state.check;
	return {
		...state,
		check: status === "check",
		checkPulse: entering ? state.checkPulse + 1 : state.checkPulse
	};
}
function withHistory(state) {
	return {
		...state,
		history: [...state.history, snapshot(state)]
	};
}
function endNow(state, message) {
	return {
		...state,
		phase: "gameover",
		endMessage: message,
		selected: null,
		targeting: null,
		bookOpen: false,
		anim: null,
		check: false,
		log: message
	};
}
function spend(state, spell) {
	return {
		...state,
		used: state.used.includes(spell.id) ? state.used : [...state.used, spell.id],
		lastSpell: spell,
		targeting: null,
		bookOpen: false
	};
}
function squaresInZone(r, c) {
	const out = [];
	for (let rr = r - 1; rr <= r + 1; rr++) for (let cc = c - 1; cc <= c + 1; cc++) if (onBoard(rr, cc)) out.push({
		r: rr,
		c: cc
	});
	return out;
}
function highlightFor(spell, r, c) {
	if (spell === "bombard_row") return Array.from({ length: 8 }, (_, i) => ({
		r,
		c: i
	}));
	if (spell === "bombard_col") return Array.from({ length: 8 }, (_, i) => ({
		r: i,
		c
	}));
	if (spell === "freeze" || spell === "bomb") return squaresInZone(r, c);
	return [{
		r,
		c
	}];
}
function applyFreeze(state, r, c) {
	const board = cloneBoard(state.board);
	for (const sq of squaresInZone(r, c)) {
		const p = board[sq.r][sq.c];
		if (p) p.frozen = Math.max(p.frozen, 2);
	}
	return sealTurn({
		...state,
		board,
		frozenZones: [...state.frozenZones, {
			r,
			c,
			turns: 2
		}]
	});
}
function blastSquares(mode, at) {
	if (mode === "row") return Array.from({ length: 8 }, (_, i) => ({
		r: at.r,
		c: i
	}));
	if (mode === "col") return Array.from({ length: 8 }, (_, i) => ({
		r: i,
		c: at.c
	}));
	return squaresInZone(at.r, at.c);
}
function blastHasKing(board, squares) {
	return squares.some((sq) => board[sq.r][sq.c]?.kind === "K");
}
function resolveBlast(state, anim) {
	const squares = blastSquares(anim.mode, anim.to);
	if (blastHasKing(state.board, squares)) return finishPly({
		...state,
		anim: null
	}, "ПВО короля — залп погас, фигуры целы.");
	const board = cloneBoard(state.board);
	for (const sq of squares) board[sq.r][sq.c] = null;
	return finishPly({
		...state,
		board,
		anim: null
	}, "Залп накрыл клетки.");
}
function resolveShot(state, anim) {
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
	const verb = anim.resolve === "shield" ? "Золото дало щит своей фигуре." : anim.resolve === "chip" ? "Снаряд сбил броню." : "Снаряд поразил цель.";
	return finishPly({
		...state,
		board,
		anim: null
	}, verb);
}
function completeAnim(state) {
	if (!state.anim) return state;
	return state.anim.type === "bomb" ? resolveBlast(state, state.anim) : resolveShot(state, state.anim);
}
function beginBomb(state, spell, mode, at, now) {
	const king = findKing(state.board, state.turn);
	return {
		...spend(withHistory(state), spell),
		anim: {
			type: "bomb",
			from: king ?? at,
			to: at,
			mode,
			t0: now,
			dur: 480
		},
		selected: null,
		log: "Снаряд сорвался с короля…"
	};
}
function addBuff(state, id) {
	if (hasBuff(state.buffs, state.turn, id)) return state;
	return {
		...state,
		buffs: {
			...state.buffs,
			[state.turn]: [...state.buffs[state.turn], id]
		}
	};
}
function castSpell(state, spell, targets, now, rng = Math.random) {
	if (state.phase !== "playing" || state.anim || state.used.includes(spell.id)) return state;
	if (spell.id === "rewind") {
		if (state.history.length < 3) return {
			...state,
			targeting: null,
			log: "Мало ходов: для отката нужно три. Печать не потрачена."
		};
		const snap = state.history[state.history.length - 3];
		return {
			...restore(spend(state, spell), snap, state.history.slice(0, -3)),
			log: "Время откатилось на три хода."
		};
	}
	if (spell.id === "friendship") return endNow(spend(withHistory(state), spell), "ДРУЖБА! Ничья.");
	if (spell.targets === 1 && targets.length < 1) return state;
	if (spell.targets === 2 && targets.length < 2) return state;
	if (spell.id === "teleport") {
		const [a, b] = targets;
		if (!a || !b || a.r === b.r && a.c === b.c) return {
			...state,
			log: "Нужны две разные клетки."
		};
		if (!!state.board[a.r][a.c] || !!state.board[b.r][b.c] || state.items.some((i) => i.r === a.r && i.c === a.c || i.r === b.r && i.c === b.c)) return {
			...state,
			log: "Телепорт ставится только на пустые клетки.",
			targeting: {
				spell,
				first: a
			}
		};
		return finishPly({
			...spend(withHistory(state), spell),
			teleports: [a, b]
		}, "Два портала открыты. Сквозь них ходят, стоять нельзя.");
	}
	if (spell.id === "swap") {
		const [a, b] = targets;
		const p1 = a ? state.board[a.r][a.c] : null;
		const p2 = b ? state.board[b.r][b.c] : null;
		if (!a || !b || !p1 || !p2) return {
			...state,
			log: "Нужны две фигуры."
		};
		if (p1.kind === "K" || p2.kind === "K") return {
			...state,
			log: "Королей менять нельзя."
		};
		if (a.r === b.r && a.c === b.c) return state;
		const board = cloneBoard(state.board);
		board[a.r][a.c] = { ...p2 };
		board[b.r][b.c] = { ...p1 };
		const next = spend(withHistory(state), spell);
		if (kingInCheck(board, state.turn, state.buffs)) return finishPly(next, "Замена отменена: ваш король под шахом.");
		return finishPly({
			...next,
			board
		}, "Фигуры поменялись местами.");
	}
	if (spell.id === "give_projectile" || spell.id === "gold" || spell.id === "kill_any" || spell.id === "fortune") {
		const at = targets[0];
		const victim = state.board[at.r][at.c];
		if (!victim) return {
			...state,
			log: "На клетке никого нет."
		};
		if ((spell.id === "kill_any" || spell.id === "fortune") && victim.kind === "K") return {
			...state,
			log: "Король под защитой ПВО."
		};
		const next = spend(withHistory(state), spell);
		const board = cloneBoard(next.board);
		const p = board[at.r][at.c];
		if (!p) return state;
		if (spell.id === "give_projectile") {
			p.projectile = true;
			return finishPly({
				...next,
				board
			}, "Красный снаряд заряжен. Тащите фигуру, чтобы пойти, и нажмите по цели, чтобы выстрелить.");
		}
		if (spell.id === "gold") {
			p.gold = true;
			p.armor = Math.max(p.armor, 2);
			return finishPly({
				...next,
				board
			}, "Золотой снаряд и щит. Врагов бьёт, своим даёт щит.");
		}
		if (spell.id === "kill_any") {
			board[at.r][at.c] = null;
			return finishPly({
				...next,
				board
			}, "Фигура уничтожена.");
		}
		if (rng() < .5) {
			const free = [];
			for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (!board[r][c]) free.push({
				r,
				c
			});
			if (free.length) {
				const spot = free[Math.floor(rng() * free.length)];
				board[spot.r][spot.c] = {
					...p,
					frozen: 0
				};
			}
			return finishPly({
				...next,
				board
			}, free.length ? "Фортуна улыбнулась — на доске копия." : "Фортуна хотела копию, но доска полна.");
		}
		board[at.r][at.c] = null;
		return finishPly({
			...next,
			board
		}, "Фортуна отвернулась — фигура погибла.");
	}
	if (spell.id === "pawn_rush" || spell.id === "cruel_pawns" || spell.id === "peaceful_pawns") return finishPly(addBuff(spend(withHistory(state), spell), spell.id), spell.id === "pawn_rush" ? "Пешки ходят на 2 клетки вперёд с любой горизонтали — весь остаток партии." : spell.id === "cruel_pawns" ? "Пешки стали жестокими." : "Пешки сложили оружие и больше не бьют.");
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
		const next = finishPly(spend(withHistory(state), spell), turningOff ? "Трип схлынул. Снова обычная доска." : "Вторая доска: цвета наугад, буквы и цифры перепутаны.");
		if (next.phase === "gameover") return next;
		return {
			...next,
			trip: turningOff ? null : makeTrip(rng)
		};
	}
	if (spell.id === "betrayal") {
		const board = cloneBoard(state.board);
		let gone = false;
		for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
			const p = board[r][c];
			if (p && p.color === state.turn && p.kind === "Q") {
				board[r][c] = null;
				gone = true;
			}
		}
		return finishPly({
			...spend(withHistory(state), spell),
			board
		}, gone ? "Ферзь покинул короля." : "Ферзя уже нет.");
	}
	if (spell.id === "blindness") {
		const next = finishPly(spend(withHistory(state), spell), "Слепота на два хода.");
		if (next.phase === "gameover") return next;
		return {
			...next,
			blindTurns: 2
		};
	}
	if (spell.id === "genghis") {
		const board = cloneBoard(state.board);
		for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
			const p = board[r][c];
			if (p && p.color === state.turn && p.kind !== "K") p.kind = "N";
		}
		return finishPly({
			...spend(withHistory(state), spell),
			board
		}, "Орда: все, кроме короля, стали конями.");
	}
	return state;
}
function maybePromote(state, toR, toC) {
	const p = state.board[toR][toC];
	if (p && p.kind === "P" && (toR === 0 || toR === 7)) return {
		...state,
		phase: "promotion",
		promo: {
			r: toR,
			c: toC
		},
		selected: null,
		check: false,
		log: "Пешка дошла до края."
	};
	return null;
}
function tryMove(state, from, to, _now, rng = Math.random) {
	if (state.phase !== "playing" || state.anim || state.targeting) return state;
	const hit = legalMoves(state, from.r, from.c).find((m) => m.r === to.r && m.c === to.c);
	const mover = state.board[from.r][from.c];
	if (!hit || !mover) return state;
	if (rng() < 9e-4) {
		const board = cloneBoard(state.board);
		board[from.r][from.c] = null;
		if (mover.kind === "K") return endNow({
			...withHistory(state),
			board,
			selected: null
		}, "КОРОЛЬ СПОТКНУЛСЯ!");
		return finishPly({
			...withHistory(state),
			board
		}, "Фигура споткнулась и сошла с доски.");
	}
	let next = {
		...withHistory(state),
		board: applyGeometry(state.board, from.r, from.c, to.r, to.c, hit.kind),
		lastMove: {
			fromR: from.r,
			fromC: from.c,
			toR: to.r,
			toC: to.c,
			color: mover.color,
			kind: mover.kind,
			doubleStep: mover.kind === "P" && Math.abs(to.r - from.r) === 2
		},
		selected: null
	};
	next = pickupItems(next);
	if (hit.kind !== "chip") {
		const promo = maybePromote(next, to.r, to.c);
		if (promo) return promo;
	}
	const note = hit.kind === "chip" ? "Удар пришёлся в броню — фигура устояла." : hit.kind === "capture" || hit.kind === "enpassant" ? "Фигура взята." : "Ход сделан.";
	return finishPly(next, note);
}
function tryShot(state, from, to, now) {
	if (state.phase !== "playing" || state.anim || state.targeting) return state;
	const hit = legalShots(state, from.r, from.c).find((s) => s.r === to.r && s.c === to.c);
	const shooter = state.board[from.r][from.c];
	const target = state.board[to.r][to.c];
	if (!hit || !shooter || !target) return state;
	const useGold = hit.kind === "shield" || !shooter.projectile && shooter.gold;
	const resolve = hit.kind === "shield" ? "shield" : target.armor > 0 ? "chip" : "destroy";
	return {
		...withHistory(state),
		selected: null,
		anim: {
			type: "shot",
			from,
			to,
			ink: useGold ? "gold" : "red",
			resolve,
			t0: now,
			dur: 280
		},
		log: resolve === "shield" ? "Золотой снаряд летит к своим." : "Снаряд летит к цели."
	};
}
function choosePromotion(state, kind) {
	if (state.phase !== "promotion" || !state.promo || kind === "K" || kind === "P") return state;
	const board = cloneBoard(state.board);
	const p = board[state.promo.r][state.promo.c];
	if (!p) return {
		...state,
		phase: "playing",
		promo: null
	};
	p.kind = kind;
	return finishPly({
		...state,
		board,
		promo: null,
		phase: "playing"
	}, "Пешка превратилась.");
}
function spawnItems(state, now, rng = Math.random) {
	if (state.phase !== "playing" && state.phase !== "promotion") return state;
	if (state.anim) return state;
	let next = state;
	const spotFor = () => {
		const options = [];
		for (const r of [3, 4]) for (let c = 0; c < 8; c++) if (!next.board[r][c] && !next.items.some((i) => i.r === r && i.c === c) && !isTeleport(next.teleports, r, c)) options.push({
			r,
			c
		});
		if (!options.length) return null;
		return options[Math.floor(rng() * options.length)];
	};
	if (now - next.armorAt >= 3e5) {
		const spot = spotFor();
		next = {
			...next,
			armorAt: now,
			items: spot ? [...next.items, {
				...spot,
				type: "armor"
			}] : next.items,
			log: spot ? "На доске появилась броня." : next.log
		};
	}
	if (now - next.bombAt >= 6e5) {
		const spot = spotFor();
		next = {
			...next,
			bombAt: now,
			items: spot ? [...next.items, {
				...spot,
				type: "bomb"
			}] : next.items,
			log: spot ? "На доске появился снаряд." : next.log
		};
	}
	return next === state ? state : next;
}
function buffLabel(id) {
	if (id === "pawn_rush") return "Нашествие: пешки ходят на 2";
	if (id === "cruel_pawns") return "Жестокие пешки";
	return "Мирные пешки";
}
function formatClock(ms) {
	const s = Math.max(0, Math.ceil(ms / 1e3));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return m > 0 ? `${m}:${r.toString().padStart(2, "0")}` : `${s}с`;
}
function blip(freq, dur = .05) {
	try {
		const Ctx = window.AudioContext || window.webkitAudioContext;
		const ctx = blip.ctx ?? new Ctx();
		blip.ctx = ctx;
		if (ctx.state === "suspended") ctx.resume();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.type = "triangle";
		osc.frequency.value = freq;
		gain.gain.value = .035;
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.start();
		gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + dur);
		osc.stop(ctx.currentTime + dur);
	} catch {}
}
function samePos(a, b) {
	return !!a && !!b && a.r === b.r && a.c === b.c;
}
function ChessApp() {
	const [state, setState] = (0, import_react.useState)(menuState);
	const [now, setNow] = (0, import_react.useState)(0);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [ghost, setGhost] = (0, import_react.useState)(null);
	const ref = (0, import_react.useRef)(state);
	ref.current = state;
	const boardRef = (0, import_react.useRef)(null);
	const press = (0, import_react.useRef)(null);
	const completing = (0, import_react.useRef)(false);
	const apply = (next) => {
		ref.current = next;
		setState(next);
	};
	(0, import_react.useEffect)(() => {
		let frame = 0;
		let lastUi = 0;
		const loop = (t) => {
			const current = ref.current;
			if (current.anim && t - current.anim.t0 >= current.anim.dur) {
				if (!completing.current) {
					completing.current = true;
					const next = completeAnim(current);
					ref.current = next;
					setState(next);
					blip(next.phase === "gameover" ? 196 : 740, .08);
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
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key !== "Escape") return;
			const current = ref.current;
			if (current.bookOpen) apply({
				...current,
				bookOpen: false
			});
			else if (current.targeting) apply({
				...current,
				targeting: null,
				log: "Выбор отменён."
			});
			else if (current.selected) apply({
				...current,
				selected: null
			});
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const squareAt = (x, y) => {
		const el = boardRef.current;
		if (!el) return null;
		const rect = el.getBoundingClientRect();
		const c = Math.floor((x - rect.left) / rect.width * 8);
		const r = Math.floor((y - rect.top) / rect.height * 8);
		return onBoard(r, c) ? {
			r,
			c
		} : null;
	};
	const aim = (current, to) => {
		const targeting = current.targeting;
		if (!targeting) return;
		if (targeting.spell.targets === 2 && !targeting.first) {
			apply({
				...current,
				targeting: {
					spell: targeting.spell,
					first: to
				},
				log: "Теперь вторая клетка."
			});
			return;
		}
		const targets = targeting.first ? [targeting.first, to] : [to];
		apply(castSpell(current, targeting.spell, targets, performance.now()));
	};
	const release = (from, to, dragged) => {
		const current = ref.current;
		if (current.phase === "menu" || current.phase === "gameover" || current.phase === "promotion" || current.anim) return;
		if (current.targeting) {
			if (to) aim(current, to);
			return;
		}
		if (dragged && to) {
			const moved = tryMove(current, from, to, performance.now());
			if (moved !== current) {
				blip(620, .045);
				apply(moved);
				return;
			}
		}
		if (!to) {
			apply({
				...current,
				selected: null
			});
			return;
		}
		const sel = current.selected;
		if (sel && !samePos(sel, to)) {
			const shooter = current.board[sel.r][sel.c];
			const armed = !!shooter && (shooter.projectile || shooter.gold);
			if (armed && legalShots(current, sel.r, sel.c).some((shot) => shot.r === to.r && shot.c === to.c)) {
				blip(880, .06);
				apply(tryShot(current, sel, to, performance.now()));
				return;
			}
			if (!armed && legalMoves(current, sel.r, sel.c).some((move) => move.r === to.r && move.c === to.c)) {
				blip(620, .045);
				apply(tryMove(current, sel, to, performance.now()));
				return;
			}
		}
		const piece = current.board[to.r][to.c];
		if (piece && piece.color === current.turn && piece.frozen === 0 && !dragged) apply({
			...current,
			selected: {
				r: to.r,
				c: to.c
			}
		});
		else if (!dragged) apply({
			...current,
			selected: null
		});
	};
	const onPointerDown = (event) => {
		if (event.button !== 0) return;
		const current = ref.current;
		if (current.bookOpen || current.anim || current.phase === "promotion" || current.phase === "gameover" || current.phase === "menu") return;
		const sq = squareAt(event.clientX, event.clientY);
		if (!sq) return;
		event.preventDefault();
		press.current = {
			from: sq,
			x: event.clientX,
			y: event.clientY,
			dragging: false,
			pid: event.pointerId
		};
		event.currentTarget.setPointerCapture(event.pointerId);
	};
	const onPointerMove = (event) => {
		const sq = squareAt(event.clientX, event.clientY);
		setHover((prev) => prev?.r === sq?.r && prev?.c === sq?.c ? prev : sq);
		const active = press.current;
		if (!active || active.pid !== event.pointerId || ref.current.targeting) return;
		if (!active.dragging && Math.hypot(event.clientX - active.x, event.clientY - active.y) > 8) active.dragging = true;
		if (!active.dragging) return;
		const piece = ref.current.board[active.from.r][active.from.c];
		if (piece && piece.color === ref.current.turn && piece.frozen === 0) setGhost({
			x: event.clientX,
			y: event.clientY,
			piece
		});
	};
	const onPointerUp = (event) => {
		const active = press.current;
		press.current = null;
		setGhost(null);
		if (!active || active.pid !== event.pointerId) return;
		release(active.from, squareAt(event.clientX, event.clientY), active.dragging);
	};
	const pickSpell = (spell) => {
		const current = ref.current;
		if (current.used.includes(spell.id) || current.anim) return;
		if (spell.targets === 0) {
			blip(540, .06);
			apply(castSpell(current, spell, [], performance.now()));
			return;
		}
		apply({
			...current,
			bookOpen: false,
			selected: null,
			targeting: {
				spell,
				first: null
			},
			log: spell.targets === 2 ? `${spell.name}: выберите первую клетку.` : `${spell.name}: выберите клетку на доске.`
		});
	};
	if (state.phase === "menu") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-ink text-parchment",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-25",
			children: Array.from({ length: 64 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (Math.floor(i / 8) + i % 8) % 2 === 0 ? "bg-light-sq" : "bg-dark-sq" }, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-6 px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-widest text-gold uppercase",
					children: "книга печатей"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl leading-none text-parchment sm:text-6xl",
					children: "Шахматы Resjka"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-base leading-relaxed text-muted",
					children: "Обычная партия, пока не откроете книгу. Шесть случайных печатей, броня на центре и снаряды, которые не прощают ближний бой."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-testid": "play",
					className: "min-h-12 rounded-xl bg-gold px-10 py-3 font-semibold text-ink",
					onClick: () => {
						const t = performance.now();
						setNow(t);
						apply(startGame(t));
					},
					children: "Играть"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-w-md space-y-2 text-left text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Фигура без снаряда ходит нажатием: сначала она, потом клетка." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Снаряд и золото: перетащите, чтобы пойти. Нажмите по цели, чтобы выстрелить — фигура остаётся." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Золото бьёт врагов и даёт щит своим. Броню можно сбивать вплотную." })
					]
				})
			]
		})]
	});
	const clock = now > 0 ? now : state.startedAt;
	const armorLeft = formatClock(ARMOR_SPAWN_MS - (clock - state.armorAt));
	const bombLeft = formatClock(BOMB_SPAWN_MS - (clock - state.bombAt));
	const selected = state.selected;
	const selectedPiece = selected ? state.board[selected.r][selected.c] : null;
	const armed = !!selectedPiece && (selectedPiece.projectile || selectedPiece.gold);
	const moves = selected && !state.targeting && !state.anim ? legalMoves(state, selected.r, selected.c) : [];
	const shots = selected && !state.targeting && !state.anim ? legalShots(state, selected.r, selected.c) : [];
	const marks = /* @__PURE__ */ new Set();
	if (state.targeting && hover) for (const sq of highlightFor(state.targeting.spell.id, hover.r, hover.c)) marks.add(`${sq.r}-${sq.c}`);
	const frozen = /* @__PURE__ */ new Set();
	for (const zone of state.frozenZones) for (const sq of squaresInZone(zone.r, zone.c)) frozen.add(`${sq.r}-${sq.c}`);
	const anim = state.anim;
	let orb = null;
	if (anim && clock > 0) {
		const p = Math.min(1, (clock - anim.t0) / anim.dur);
		const ease = 1 - (1 - p) * (1 - p);
		orb = {
			x: (anim.from.c + (anim.to.c - anim.from.c) * ease + .5) / 8 * 100,
			y: (anim.from.r + (anim.to.r - anim.from.r) * ease + .5) / 8 * 100,
			ink: anim.type === "bomb" ? "var(--color-blood)" : anim.ink === "gold" ? "var(--color-gold)" : "var(--color-blood)"
		};
	}
	const files = state.trip?.files ?? [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h"
	];
	const ranks = state.trip?.ranks ?? [
		"8",
		"7",
		"6",
		"5",
		"4",
		"3",
		"2",
		"1"
	];
	const turnLabel = state.turn === "w" ? "Ход белых" : "Ход чёрных";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-ink text-parchment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-4 lg:flex-row lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto w-full max-w-xl flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "mb-3 flex items-end justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl leading-none",
								children: "Шахматы Resjka"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									turnLabel,
									state.check && state.phase === "playing" ? " · шах" : "",
									" · ",
									"ход ",
									state.moveCounter
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-xl border border-line px-3 text-sm text-muted",
								onClick: () => apply(menuState()),
								children: "Меню"
							})]
						}),
						state.trip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-center font-display text-2xl text-gold",
							children: "Вторая доска — буквы и цифры врут"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [state.trip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": "true",
								className: "pointer-events-none absolute inset-y-3 -left-5 -z-10 grid w-full grid-cols-8 grid-rows-8 overflow-hidden rounded-xl opacity-90",
								children: state.trip.colors.flat().map((color, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: color } }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								ref: boardRef,
								"data-testid": "board",
								className: "relative grid aspect-square w-full touch-none grid-cols-8 overflow-hidden rounded-xl border border-line select-none",
								onPointerDown,
								onPointerMove,
								onPointerUp,
								onPointerCancel: () => {
									press.current = null;
									setGhost(null);
								},
								onPointerLeave: () => setHover(null),
								children: [
									state.board.map((row, r) => row.map((piece, c) => {
										const key = `${r}-${c}`;
										const light = (r + c) % 2 === 0;
										const move = moves.find((item) => item.r === r && item.c === c);
										const shot = shots.find((item) => item.r === r && item.c === c);
										const isSel = samePos(selected, {
											r,
											c
										});
										const portal = state.teleports.some((tp) => tp.r === r && tp.c === c);
										const item = state.items.find((entry) => entry.r === r && entry.c === c);
										const aimed = marks.has(key);
										const iced = frozen.has(key);
										const hide = state.blindTurns > 0;
										const dim = ghost && isSel;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-sq": key,
											className: light && !state.trip ? "relative bg-light-sq" : "relative bg-dark-sq",
											style: state.trip ? { background: state.trip.colors[r][c] } : void 0,
											children: [
												aimed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-blood/45" }),
												iced && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-ice/50" }),
												isSel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 border-2 border-gold" }),
												state.targeting?.first && samePos(state.targeting.first, {
													r,
													c
												}) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-1 rounded-full border-2 border-gold" }),
												portal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-2 rounded-full border-2 border-ice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-4 rounded-full border border-parchment" })] }),
												item && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.type === "armor" ? "absolute top-1/2 left-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted" : "absolute top-1/2 left-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood" }),
												move && !shot && move.kind === "move" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/40" }),
												move && !shot && move.kind !== "move" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-1 rounded-full border-2 border-blood" }),
												shot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: shot.kind === "shield" ? "absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-gold/50" : "absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blood bg-blood/60" }),
												piece && !hide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: dim ? "absolute inset-0 opacity-40" : "absolute inset-0",
													"aria-label": pieceName(piece.color, piece.kind),
													children: [
														piece.armor > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1 rounded-full border-2 border-parchment" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceArt, {
															color: piece.color,
															kind: piece.kind
														}),
														piece.projectile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-3 size-2.5 rounded-full bg-blood" }),
														piece.gold && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 left-3 size-2.5 rounded-full bg-gold" }),
														piece.armor > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "absolute right-0.5 bottom-0.5 text-xs font-semibold text-ink",
															children: piece.armor
														})
													]
												}),
												c === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: state.trip ? "absolute top-0.5 left-0.5 rounded bg-ink/75 px-1 text-xs font-semibold text-parchment" : light ? "absolute top-0.5 left-0.5 text-xs font-semibold text-dark-sq" : "absolute top-0.5 left-0.5 text-xs font-semibold text-light-sq",
													children: ranks[r]
												}),
												r === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: state.trip ? "absolute right-0.5 bottom-0.5 rounded bg-ink/75 px-1 text-xs font-semibold text-parchment" : light ? "absolute right-0.5 bottom-0.5 text-xs font-semibold text-dark-sq" : "absolute right-0.5 bottom-0.5 text-xs font-semibold text-light-sq",
													children: files[c]
												})
											]
										}, key);
									})),
									orb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pointer-events-none absolute z-10 size-5 rounded-full",
										style: {
											left: `${orb.x}%`,
											top: `${orb.y}%`,
											transform: "translate(-50%, -50%)",
											background: orb.ink,
											boxShadow: "0 0 16px var(--color-gold)"
										}
									}),
									state.check && state.phase === "playing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "check-pop pointer-events-none absolute top-1/2 left-1/2 z-10 font-display text-6xl text-blood",
										children: "ШАХ!"
									}, state.checkPulse)
								]
							})]
						}),
						armed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-sm text-gold",
							children: selectedPiece?.gold ? "Перетащите, чтобы пойти. Нажмите по врагу — удар, по своему — щит." : "Перетащите, чтобы пойти. Нажмите по врагу, чтобы выстрелить. Фигура не двигается."
						}),
						state.targeting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between gap-3 rounded-xl border border-blood bg-panel px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									state.targeting.spell.name,
									state.targeting.spell.targets === 2 && !state.targeting.first ? " — первая клетка" : "",
									state.targeting.spell.targets === 2 && state.targeting.first ? " — вторая клетка" : "",
									state.targeting.spell.targets === 1 ? " — ведите по доске" : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm text-muted",
								onClick: () => apply({
									...ref.current,
									targeting: null,
									log: "Выбор отменён. Печать не потрачена."
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), "Отмена"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "sr-only",
							"aria-live": "polite",
							children: [
								turnLabel,
								". ",
								state.log
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "w-full rounded-2xl border border-line bg-panel p-4 lg:w-80",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-testid": "book",
							className: "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold font-semibold text-ink disabled:opacity-40",
							disabled: !!state.anim || state.phase !== "playing" || !!state.targeting,
							onClick: () => apply({
								...ref.current,
								bookOpen: true,
								selected: null
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" }), "Книга печатей"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-center text-xs text-muted",
							children: [
								"Осталось ",
								state.spells.length - state.used.length,
								" из ",
								state.spells.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 text-parchment" }),
									"Броня через ",
									armorLeft
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "size-4 text-blood" }),
									"Снаряд через ",
									bombLeft
								]
							})]
						}),
						(state.buffs.w.length > 0 || state.buffs.b.length > 0 || state.blindTurns > 0 || state.frozenZones.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-1 text-sm",
							children: [
								state.buffs.w.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Белые: ", buffLabel(id)] }, `w-${id}`)),
								state.buffs.b.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Чёрные: ", buffLabel(id)] }, `b-${id}`)),
								state.blindTurns > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"Слепота: ещё ",
									state.blindTurns,
									" ход."
								] }),
								state.frozenZones.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"Синие клетки: ещё ",
									Math.max(...state.frozenZones.map((z) => z.turns)),
									" ход."
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-line pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl text-gold",
									children: state.lastSpell ? state.lastSpell.name : "Печать"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-parchment",
									children: state.lastSpell?.desc ?? "Откройте книгу. Печать тратится сразу и в этой партии больше не вернётся."
								}),
								state.log && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted",
									children: state.log
								})
							]
						})
					]
				})]
			}),
			state.bookOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-30 flex items-end justify-center bg-ink/80 p-3 sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Закрыть книгу",
					className: "absolute inset-0",
					onClick: () => apply({
						...ref.current,
						bookOpen: false
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-panel p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Книга"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 px-2 text-sm text-muted",
							onClick: () => apply({
								...ref.current,
								bookOpen: false
							}),
							children: "Закрыть"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: state.spells.map((spell) => {
							const used = state.used.includes(spell.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: used,
								onClick: () => pickSpell(spell),
								className: "min-h-16 rounded-xl border border-line bg-panel-2 p-3 text-left disabled:opacity-40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-3xl",
										children: spell.char
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: used ? "font-semibold line-through" : "font-semibold",
										children: spell.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm leading-relaxed text-muted",
									children: spell.desc
								})]
							}, spell.id);
						})
					})]
				})]
			}),
			state.phase === "promotion" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 flex items-center justify-center bg-ink/80 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl border border-line bg-panel p-5 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Выберите фигуру"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-4 gap-3",
						children: [
							"Q",
							"R",
							"B",
							"N"
						].map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex aspect-square items-center justify-center rounded-xl bg-dark-sq",
							onClick: () => apply(choosePromotion(ref.current, kind)),
							"aria-label": pieceName(state.turn, kind),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-14",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceArt, {
									color: state.turn,
									kind
								})
							})
						}, kind))
					})]
				})
			}),
			state.phase === "gameover" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-center justify-center bg-ink/85 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-2xl border border-line bg-panel px-6 py-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-5xl leading-tight",
						children: state.endMessage
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-xl bg-gold px-6 font-semibold text-ink",
							onClick: () => apply(menuState()),
							children: "Играть"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-xl border border-gold px-6 font-semibold text-gold",
							onClick: () => {
								const t = performance.now();
								setNow(t);
								apply(startGame(t));
							},
							children: "Реванш"
						})]
					})]
				})
			}),
			ghost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed z-50 size-16",
				style: {
					left: ghost.x,
					top: ghost.y,
					transform: "translate(-50%, -60%)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieceArt, {
					color: ghost.piece.color,
					kind: ghost.piece.kind
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChessApp, {});
}
//#endregion
export { Home as component };
