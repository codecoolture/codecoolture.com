import React from "react";
import { classNames } from "../../lib/classNames";

interface CodeblockProps {
  children: React.ReactNode;
  className?: string;
}

export function Codeblock({ children, className }: CodeblockProps) {
  return <pre className={classNames("Codeblock", className)}>{children}</pre>;
}
