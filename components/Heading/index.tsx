import React from "react";
import { classNames } from "../../lib/classNames";

interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
  size?: "jumbo" | "xl" | "l" | "m";
  el?: "h1" | "h2" | "h3" | "p";
}

export function Heading({ children, className, el: Element = "h1", size = "xl" }: HeadingProps) {
  return (
    <Element className={classNames("Heading", `Heading--${size.charAt(0).toUpperCase() + size.slice(1)}`, className)}>
      {children}
    </Element>
  );
}
