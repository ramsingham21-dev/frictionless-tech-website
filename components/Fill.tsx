import { Fragment } from "react";

const PATTERN = /(\[FILL:[^\]]*\])/g;
const IS_SLOT = /^\[FILL:/;

/** Renders copy, turning any [FILL: ...] slot into a visible placeholder chip. */
export function Fill({ text }: { text: string }) {
  const parts = text.split(PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        IS_SLOT.test(part) ? (
          <span key={i} className="fill">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export const isFilled = (value: string | null | undefined) => !!value && !value.includes("[FILL:");
