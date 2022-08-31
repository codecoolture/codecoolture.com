export type TextProps = Pick<JSX.IntrinsicElements["p"], "children" | "className"> & {
  size?: "l" | "m";
};

export function Text({ children, className, size = "m" }: TextProps) {
  const classes = ["Text", size === "l" && "Text--Large", className].filter(Boolean).join(" ");

  return <p className={classes}>{children}</p>;
}
