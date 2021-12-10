import React from "react";

interface CodeblockProps {
  children: React.ReactNode;
  className?: string;
}

export function Codeblock({ children, className }: CodeblockProps) {
  const classes = ["Codeblock", className].filter(Boolean).join(" ");

  return <pre className={classes}>{children}</pre>;
}
