/** Sets the last `words` words of a heading in a yellow highlighter stroke. */
export function Highlight({ text, words = 2 }: { text: string; words?: number }) {
  const parts = text.split(" ");
  const head = parts.slice(0, -words).join(" ");
  const tail = parts.slice(-words).join(" ");
  return (
    <>
      {head && `${head} `}
      <span className="hl">{tail}</span>
    </>
  );
}
