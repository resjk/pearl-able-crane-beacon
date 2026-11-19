import type { Color, PieceKind } from "@/game/logic";

export function PieceArt({ color, kind }: { color: Color; kind: PieceKind }) {
  const fill = color === "w" ? "var(--color-parchment)" : "var(--color-ink)";
  const stroke = color === "w" ? "var(--color-ink)" : "var(--color-gold)";
  const common = { fill, stroke, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
      {kind === "P" && (
        <>
          <circle cx="40" cy="24" r="11" {...common} />
          <path d="M28 44h24l6 18H22z" {...common} />
          <path d="M18 66h44v6H18z" {...common} />
        </>
      )}
      {kind === "R" && (
        <>
          <path d="M18 20h10v8h6v-8h12v8h6v-8h10v16H18z" {...common} />
          <path d="M24 36h32v22H24z" {...common} />
          <path d="M16 62h48v8H16z" {...common} />
        </>
      )}
      {kind === "N" && (
        <path
          d="M22 68h38v-7H30c1-8 8-12 12-20 6 3 14 1 16-7-8 1-10-7-6-13-8 3-14 8-14 8 1-9-7-14-13-9 3 7-2 11-7 16-7 7-10 18-8 28H22z"
          {...common}
        />
      )}
      {kind === "B" && (
        <>
          <circle cx="40" cy="16" r="5" {...common} />
          <path d="M40 22l12 14h-7l2 24H33l2-24h-7z" {...common} />
          <path d="M40 30v16" fill="none" stroke={stroke} strokeWidth="2.5" />
          <path d="M18 66h44v6H18z" {...common} />
        </>
      )}
      {kind === "Q" && (
        <>
          <circle cx="18" cy="28" r="4" {...common} />
          <circle cx="32" cy="18" r="4" {...common} />
          <circle cx="48" cy="18" r="4" {...common} />
          <circle cx="62" cy="28" r="4" {...common} />
          <circle cx="40" cy="14" r="4" {...common} />
          <path d="M16 32l8 26h32l8-26-12 10L40 24 28 42z" {...common} />
          <path d="M16 64h48v7H16z" {...common} />
        </>
      )}
      {kind === "K" && (
        <>
          <path d="M36 6h8v8h8v8h-8v6h-8v-6h-8v-8h8z" {...common} />
          <path d="M18 36h44l-6 22H24z" {...common} />
          <path d="M16 62h48v8H16z" {...common} />
        </>
      )}
    </svg>
  );
}

const NAMES: Record<PieceKind, string> = {
  K: "король",
  Q: "ферзь",
  R: "ладья",
  B: "слон",
  N: "конь",
  P: "пешка",
};

export function pieceName(color: Color, kind: PieceKind): string {
  return `${color === "w" ? "белая" : "чёрная"} ${NAMES[kind]}`;
}
