import React from "react";
import { classNames } from "../../lib/classNames";

interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  size?: "jumbo" | "xl" | "l" | "m";
  el?: "h1" | "h2" | "h3" | "p";

  "data-qa"?: string;
}

export function Heading({ children, className, el: Element = "h1", size = "xl", ...props }: HeadingProps) {
  const classes = classNames("Heading", `Heading--${size.charAt(0).toUpperCase() + size.slice(1)}`, className);

  return (
    <Element className={classes} data-qa={props["data-qa"]}>
      {children}
    </Element>
  );
}
