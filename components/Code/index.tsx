import React from "react";

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  const classes = ["Code", className].filter(Boolean).join(" ");

  return <code className={classes}>{children}</code>;
}
