import assert from "node:assert/strict";
import {
  blastHasKing,
  buffLabel,
  castSpell,
  completeAnim,
  emptyBoard,
  legalMoves,
  legalShots,
  loadPosition,
  makePiece,
  spellById,
  startGame,
  tryMove,
  tryShot,
} from "./logic.ts";

const quiet = () => 1;

function arena() {
  const board = emptyBoard();
  board[7][0] = makePiece("w", "K");
  board[0][7] = makePiece("b", "K");
  return board;
}

const fails: string[] = [];
function check(name: string, fn: () => void) {
  try {
    fn();
    console.log("ok", name);
  } catch (error) {
    fails.push(name);
    console.error("FAIL", name, error);
  }
}

check("pawn rush from any rank, every move", () => {
  const board = arena();
  board[4][4] = makePiece("w", "P", { moved: true });
  let state = loadPosition(startGame(0, quiet), board, "w");
  assert.equal(legalMoves(state, 4, 4).some((m) => m.r === 2 && m.c === 4), false);
  state = castSpell(state, spellById("pawn_rush"), [], 0, quiet);
  assert.equal(state.turn, "b");
  assert.ok(state.buffs.w.includes("pawn_rush"));
  state = { ...state, turn: "w" };
  const moves = legalMoves(state, 4, 4);
  assert.ok(moves.some((m) => m.r === 3 && m.c === 4));
  assert.ok(moves.some((m) => m.r === 2 && m.c === 4));
  const stepped = tryMove(state, { r: 4, c: 4 }, { r: 2, c: 4 }, 0, quiet);
  assert.equal(stepped.board[2][4]?.kind, "P");
  assert.equal(stepped.board[4][4], null);
  assert.equal(buffLabel("pawn_rush").includes("2"), true);
});

check("armor can be struck from beside, then captured", () => {
  const board = arena();
  board[4][4] = makePiece("w", "R");
  board[4][5] = makePiece("b", "P", { armor: 2 });
  let state = loadPosition(startGame(0, quiet), board, "w");
  state = tryMove(state, { r: 4, c: 4 }, { r: 4, c: 5 }, 0, quiet);
  assert.equal(state.board[4][4]?.kind, "R");
  assert.equal(state.board[4][5]?.armor, 1);
  assert.equal(state.turn, "b");
  state = { ...state, turn: "w", history: state.history };
  state = tryMove(state, { r: 4, c: 4 }, { r: 4, c: 5 }, 0, quiet);
  assert.equal(state.board[4][5]?.armor, 0);
  assert.equal(state.board[4][4]?.kind, "R");
  state = { ...state, turn: "w" };
  state = tryMove(state, { r: 4, c: 4 }, { r: 4, c: 5 }, 0, quiet);
  assert.equal(state.board[4][5]?.kind, "R");
  assert.equal(state.board[4][4], null);
});

check("king can hit an armored piece up close", () => {
  const board = arena();
  board[7][0] = null;
  board[4][4] = makePiece("w", "K");
  board[4][5] = makePiece("b", "N", { armor: 1 });
  let state = loadPosition(startGame(0, quiet), board, "w");
  state = tryMove(state, { r: 4, c: 4 }, { r: 4, c: 5 }, 0, quiet);
  assert.equal(state.board[4][4]?.kind, "K");
  assert.equal(state.board[4][5]?.armor, 0);
  assert.notEqual(state.phase, "gameover");
});

check("friendship ends the game immediately", () => {
  const state = castSpell(startGame(0, quiet), spellById("friendship"), [], 0, quiet);
  assert.equal(state.phase, "gameover");
  assert.match(state.endMessage, /Ничья/);
});

check("stalemate ends immediately", () => {
  const board = emptyBoard();
  board[0][0] = makePiece("b", "K");
  board[2][2] = makePiece("w", "K");
  board[2][1] = makePiece("w", "Q");
  let state = loadPosition(startGame(0, quiet), board, "w");
  state = castSpell(state, spellById("nothing"), [], 0, quiet);
  assert.equal(state.phase, "gameover");
  assert.match(state.endMessage, /Ничья/);
});

check("freeze stays for two turns and tracks the 3x3", () => {
  let state = castSpell(startGame(0, quiet), spellById("freeze"), [{ r: 0, c: 0 }], 0, quiet);
  assert.equal(state.turn, "b");
  assert.equal(state.board[0][0]?.frozen, 2);
  assert.equal(state.board[1][1]?.frozen, 2);
  assert.equal(state.frozenZones[0]?.turns, 2);
  assert.equal(state.board[0][3]?.frozen ?? 0, 0);
  state = tryMove(state, { r: 1, c: 7 }, { r: 2, c: 7 }, 0, quiet);
  assert.equal(state.board[0][0]?.frozen, 1);
  assert.equal(state.frozenZones[0]?.turns, 1);
  state = tryMove(state, { r: 6, c: 0 }, { r: 5, c: 0 }, 0, quiet);
  assert.equal(state.board[0][0]?.frozen ?? 0, 0);
  assert.equal(state.frozenZones.length, 0);
});

check("gold hits enemies and shields friends, red does not shoot friends", () => {
  const board = arena();
  board[4][0] = makePiece("w", "B", { gold: true });
  board[4][3] = makePiece("w", "N");
  board[2][0] = makePiece("b", "P");
  let state = loadPosition(startGame(0, quiet), board, "w");
  const shots = legalShots(state, 4, 0);
  assert.ok(shots.some((s) => s.c === 3 && s.kind === "shield"));
  assert.ok(shots.some((s) => s.r === 2 && s.c === 0 && s.kind === "hit"));
  state = completeAnim(tryShot(state, { r: 4, c: 0 }, { r: 4, c: 3 }, 0));
  assert.ok((state.board[4][3]?.armor ?? 0) >= 2);
  assert.equal(state.board[4][0]?.gold, false);
  assert.equal(state.turn, "b");

  const redBoard = arena();
  redBoard[4][0] = makePiece("w", "R", { projectile: true });
  redBoard[4][3] = makePiece("w", "N");
  redBoard[6][0] = makePiece("b", "P");
  const red = loadPosition(startGame(0, quiet), redBoard, "w");
  assert.equal(legalShots(red, 4, 0).some((s) => s.c === 3), false);
  assert.ok(legalShots(red, 4, 0).some((s) => s.r === 6 && s.kind === "hit"));
  const pawn = makePiece("w", "P", { projectile: true });
  const pawnBoard = arena();
  pawnBoard[6][4] = pawn;
  const pawnState = loadPosition(startGame(0, quiet), pawnBoard, "w");
  const pawnMoves = legalMoves(pawnState, 6, 4);
  assert.ok(pawnMoves.every((m) => m.c === 4));
});

check("bombard waits for the king's shot and respects AA", () => {
  const board = arena();
  board[3][3] = makePiece("b", "N");
  let state = loadPosition(startGame(0, quiet), board, "w");
  state = castSpell(state, spellById("bombard_row"), [{ r: 3, c: 1 }], 10, quiet);
  assert.equal(state.board[3][3]?.kind, "N");
  assert.equal(state.anim?.type, "bomb");
  if (state.anim?.type === "bomb") {
    assert.deepEqual(state.anim.from, { r: 7, c: 0 });
    assert.equal(state.anim.mode, "row");
  }
  state = completeAnim(state);
  assert.equal(state.board[3][3], null);
  assert.equal(state.turn, "b");

  const safe = arena();
  safe[3][3] = makePiece("b", "N");
  safe[3][7] = safe[0][7];
  safe[0][7] = null;
  let blocked = loadPosition(startGame(0, quiet), safe, "w");
  blocked = completeAnim(castSpell(blocked, spellById("bombard_row"), [{ r: 3, c: 0 }], 0, quiet));
  assert.equal(blocked.board[3][3]?.kind, "N");
  assert.equal(blocked.board[3][7]?.kind, "K");
  assert.match(blocked.log, /ПВО/);
  assert.equal(blastHasKing(safe, [{ r: 3, c: 7 }]), true);
});

check("portals can be crossed but not occupied", () => {
  const board = arena();
  board[4][0] = makePiece("w", "R");
  board[4][5] = makePiece("b", "P");
  let state = loadPosition(startGame(0, quiet), board, "w");
  state = castSpell(state, spellById("teleport"), [{ r: 4, c: 2 }, { r: 4, c: 3 }], 0, quiet);
  state = { ...state, turn: "w" };
  const moves = legalMoves(state, 4, 0).map((m) => m.c);
  assert.equal(moves.includes(2), false);
  assert.equal(moves.includes(3), false);
  assert.ok(moves.includes(4));
  assert.ok(moves.includes(5));
});

check("swap that checks your king is cancelled", () => {
  const board = arena();
  board[5][1] = makePiece("w", "P");
  board[4][4] = makePiece("b", "N");
  const before = board.map((row) => row.map((p) => (p ? p.kind + p.color : ".")));
  let state = loadPosition(startGame(0, quiet), board, "w");
  state = castSpell(state, spellById("swap"), [{ r: 4, c: 4 }, { r: 5, c: 1 }], 0, quiet);
  const after = state.board.map((row) => row.map((p) => (p ? p.kind + p.color : ".")));
  assert.deepEqual(after, before);
  assert.match(state.log, /отменена/);
  assert.equal(state.turn, "b");
  assert.ok(state.used.includes("swap"));
});

if (fails.length) {
  console.error(fails.length + " failed");
  process.exit(1);
}
console.log("all passed");
