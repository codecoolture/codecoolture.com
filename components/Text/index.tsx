import React from "react";

export interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export function Text({ children, className = "" }: TextProps) {
  const classes = ["Text", className].join(" ");

  return <p className={classes}>{children}</p>;
}
