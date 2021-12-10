import React from "react";

interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  size?: "jumbo" | "xl" | "l" | "m";
  el?: "h1" | "h2" | "h3" | "p";
}

export function Heading({ children, className, el = "h1", size = "xl" }: HeadingProps) {
  const classes = ["Heading", `Heading--${size.charAt(0).toUpperCase() + size.slice(1)}`, className]
    .filter(Boolean)
    .join(" ");

  const Element = el;

  return <Element className={classes}>{children}</Element>;
}
