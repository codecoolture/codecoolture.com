export function Blockquote({ children }: Pick<JSX.IntrinsicElements["blockquote"], "children">) {
  return <blockquote className="Blockquote">{children}</blockquote>;
}
